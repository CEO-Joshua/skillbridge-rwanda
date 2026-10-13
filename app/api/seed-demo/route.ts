import prisma from '@/lib/db';

export async function GET() {
  const opportunities = await prisma.opportunity.findMany({
    where: { isPublished: true },
    include: { organization: true },
    orderBy: { createdAt: 'desc' },
    take: 10,
  });

  return Response.json({ opportunities });
}
