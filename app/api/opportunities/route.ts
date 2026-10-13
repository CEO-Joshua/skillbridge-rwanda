import { z } from 'zod';
import { getServerSession } from 'next-auth';
import prisma from '@/lib/db';
import { authOptions } from '@/lib/auth';

const schema = z.object({
  title: z.string().min(2),
  type: z.enum(['FULL_TIME', 'PART_TIME', 'INTERNSHIP', 'APPRENTICESHIP', 'FREELANCE', 'CONTRACT', 'PROJECT', 'VOLUNTEER']),
  location: z.string().min(2),
  description: z.string().min(20),
  organizationId: z.string().optional(),
});

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const user = await prisma.user.findUnique({ where: { email: session.user.email } });
  if (!user || !['EMPLOYER', 'ADMIN'].includes(user.role)) {
    return Response.json({ error: 'Forbidden' }, { status: 403 });
  }

  const data = schema.safeParse(await req.json());
  if (!data.success) {
    return Response.json({ error: 'Invalid opportunity payload.' }, { status: 400 });
  }

  const opportunity = await prisma.opportunity.create({
    data: {
      title: data.data.title,
      type: data.data.type,
      location: data.data.location,
      description: data.data.description,
      organizationId: data.data.organizationId || 'demo-org',
      isPublished: true,
      requiredSkills: ['Communication', 'Problem solving'],
      compensation: 'Competitive',
      remote: false,
    },
  });

  return Response.json({ opportunity }, { status: 201 });
}
