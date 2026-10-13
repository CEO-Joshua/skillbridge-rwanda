import prisma from '@/lib/db';
import { notFound } from 'next/navigation';

export default async function OpportunityDetailPage({ params }: { params: { id: string } }) {
  const opportunity = await prisma.opportunity.findUnique({
    where: { id: params.id },
    include: { organization: true },
  });

  if (!opportunity) notFound();

  return (
    <div className="container py-16">
      <div className="grid gap-8 lg:grid-cols-[2fr_1fr]">
        <div className="card p-8">
          <div className="badge">{opportunity.type}</div>
          <h1 className="mt-4 text-3xl font-bold text-slate-900">{opportunity.title}</h1>
          <p className="mt-3 text-lg text-slate-600">{opportunity.organization.name}</p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div><p className="text-xs uppercase text-slate-500">Location</p><p className="mt-1">{opportunity.location}</p></div>
            <div><p className="text-xs uppercase text-slate-500">Compensation</p><p className="mt-1">{opportunity.compensation || 'Undisclosed'}</p></div>
            <div><p className="text-xs uppercase text-slate-500">Work style</p><p className="mt-1">{opportunity.remote ? 'Remote' : 'On-site'}</p></div>
            <div><p className="text-xs uppercase text-slate-500">Deadline</p><p className="mt-1">{opportunity.deadline ? new Date(opportunity.deadline).toDateString() : 'Rolling'}</p></div>
          </div>

          <div className="mt-8">
            <h2 className="text-xl font-semibold">Description</h2>
            <p className="mt-3 text-slate-600">{opportunity.description}</p>
          </div>

          <div className="mt-8">
            <h2 className="text-xl font-semibold">Required skills</h2>
            <div className="mt-3 flex flex-wrap gap-2">
              {opportunity.requiredSkills.map((skill) => (
                <span key={skill} className="rounded-full bg-slate-100 px-2.5 py-1 text-xs text-slate-700">{skill}</span>
              ))}
            </div>
          </div>
        </div>

        <aside className="space-y-6">
          <div className="card p-6">
            <h3 className="text-lg font-semibold">Apply</h3>
            <p className="mt-2 text-sm text-slate-600">Applications are available for registered candidates.</p>
            <form action="/api/applications" method="post" className="mt-5 space-y-3">
              <input type="hidden" name="opportunityId" value={opportunity.id} />
              <textarea name="coverLetter" className="input min-h-28" placeholder="Share why you are a fit for this opportunity" />
              <button type="submit" className="button-primary w-full">Submit application</button>
            </form>
          </div>
          <div className="card p-6">
            <h3 className="text-lg font-semibold">Organization</h3>
            <p className="mt-2 font-medium">{opportunity.organization.name}</p>
            <p className="mt-2 text-sm text-slate-600">{opportunity.organization.description}</p>
          </div>
        </aside>
      </div>
    </div>
  );
}
