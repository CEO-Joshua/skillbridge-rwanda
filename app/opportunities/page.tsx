import Link from 'next/link';
import prisma from '@/lib/db';

async function getOpportunities(search: string | undefined) {
  return prisma.opportunity.findMany({
    where: search
      ? {
          OR: [
            { title: { contains: search, mode: 'insensitive' } },
            { description: { contains: search, mode: 'insensitive' } },
            { requiredSkills: { hasSome: [search] } },
          ],
          isPublished: true,
        }
      : { isPublished: true },
    include: { organization: true },
    orderBy: { createdAt: 'desc' },
    take: 12,
  });
}

export default async function OpportunitiesPage({
  searchParams,
}: {
  searchParams?: { q?: string };
}) {
  const q = searchParams?.q ?? '';
  const opportunities = await getOpportunities(q);

  return (
    <div className="container py-16">
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-600">Opportunities</p>
          <h1 className="mt-2 text-4xl font-bold text-slate-900">Discover roles and practical experience</h1>
        </div>
      </div>

      <form className="mt-8 card p-4" method="get">
        <div className="flex flex-col gap-4 md:flex-row">
          <input
            type="text"
            name="q"
            defaultValue={q}
            className="input"
            placeholder="Search by title, skill, or keyword"
          />
          <button type="submit" className="button-primary">Apply filters</button>
        </div>
      </form>

      <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {opportunities.map((opportunity) => (
          <article key={opportunity.id} className="card p-6">
            <div className="badge">{opportunity.type}</div>
            <h2 className="mt-4 text-xl font-semibold">{opportunity.title}</h2>
            <p className="mt-2 text-sm text-slate-600">{opportunity.organization.name}</p>
            <p className="mt-4 text-sm text-slate-600">{opportunity.location}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {opportunity.requiredSkills.slice(0, 3).map((skill) => (
                <span key={skill} className="rounded-full bg-slate-100 px-2.5 py-1 text-xs text-slate-700">{skill}</span>
              ))}
            </div>
            <div className="mt-5 flex items-center justify-between">
              <span className="text-sm font-medium text-slate-900">{opportunity.compensation || 'Compensation undisclosed'}</span>
              <Link href={`/opportunities/${opportunity.id}`} className="text-sm font-semibold text-emerald-700">
                View details
              </Link>
            </div>
          </article>
        ))}
      </div>

      {opportunities.length === 0 && (
        <div className="card mt-10 p-8 text-center text-slate-600">
          No opportunities match your filters yet. Try another search term or come back soon.
        </div>
      )}
    </div>
  );
}
