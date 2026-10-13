import { getServerSession } from 'next-auth';
import { z } from 'zod';
import prisma from '@/lib/db';
import { authOptions } from '@/lib/auth';

const schema = z.object({
  opportunityId: z.string().min(1),
  coverLetter: z.string().optional(),
});

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const candidate = await prisma.user.findUnique({ where: { email: session.user.email } });
  if (!candidate || candidate.role !== 'CANDIDATE') {
    return Response.json({ error: 'Only candidates can apply.' }, { status: 403 });
  }

  const body = schema.safeParse(await req.json());
  if (!body.success) {
    return Response.json({ error: 'Invalid application payload.' }, { status: 400 });
  }

  const opportunity = await prisma.opportunity.findUnique({ where: { id: body.data.opportunityId } });
  if (!opportunity || !opportunity.isPublished) {
    return Response.json({ error: 'Opportunity is not available.' }, { status: 404 });
  }

  const existing = await prisma.application.findUnique({
    where: { opportunityId_candidateId: { opportunityId: body.data.opportunityId, candidateId: candidate.id } },
  });

  if (existing) {
    return Response.json({ error: 'Duplicate application detected.' }, { status: 409 });
  }

  const application = await prisma.application.create({
    data: {
      opportunityId: body.data.opportunityId,
      candidateId: candidate.id,
      coverLetter: body.data.coverLetter ?? '',
      status: 'SUBMITTED',
    },
  });

  return Response.json({ application }, { status: 201 });
}
