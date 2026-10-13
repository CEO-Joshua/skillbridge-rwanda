import Link from 'next/link';
import { ArrowRight, BriefcaseBusiness, Building2, Search, Sparkles, Users } from 'lucide-react';
import prisma from '@/lib/db';

const statCards = [
  { label: 'Registered candidates', value: '1.8k+' },
  { label: 'Verified employers', value: '260' },
  { label: 'Published opportunities', value: '480' },
  { label: 'Partner institutions', value: '34' },
];

async function getCounts() {
  const [users, opportunities, organizations] = await Promise.all([
    prisma.user.count(),
    prisma.opportunity.count({ where: { isPublished: true } }),
    prisma.organization.count({ where: { verified: true } }),
  ]);

  return { users, opportunities, organizations };
}

export default async function HomePage() {
  const stats = await getCounts();

  return (
    <>
      <section className="container py-16 md:py-24">
        <div className="grid items-center gap-10 md:grid-cols-2">
          <div>
            <span className="badge">Skills. Opportunity. Future.</span>
            <h1 className="mt-6 text-4xl font-bold tracking-tight text-slate-900 md:text-6xl">
              Help young talent connect with real opportunities in Rwanda.
            </h1>
            <p className="mt-6 max-w-xl text-lg text-slate-600">
              SkillBridge Rwanda helps students, graduates, and early-career professionals discover internships, jobs, and practical experience aligned with their skills.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link href="/opportunities" className="button-primary">
                Find Opportunities
              </Link>
              <Link href="/register" className="button-secondary">
                Post an Opportunity
              </Link>
            </div>

            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              <div className="card p-4">
                <div className="text-xs uppercase text-slate-500">Jobs</div>
                <div className="mt-2 text-2xl font-bold">{stats.opportunities}</div>
              </div>
              <div className="card p-4">
                <div className="text-xs uppercase text-slate-500">Candidates</div>
                <div className="mt-2 text-2xl font-bold">{stats.users}</div>
              </div>
              <div className="card p-4">
                <div className="text-xs uppercase text-slate-500">Verified orgs</div>
                <div className="mt-2 text-2xl font-bold">{stats.organizations}</div>
              </div>
            </div>
          </div>

          <div className="card p-6">
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
              <div className="flex items-center justify-between">
                <div className="text-sm font-medium text-slate-500">Opportunity search</div>
                <Search className="h-4 w-4 text-slate-500" />
              </div>
              <div className="mt-6 space-y-3">
                <input className="input" placeholder="Search title, skill, or keyword" />
                <div className="grid gap-3 sm:grid-cols-2">
                  <select className="input">
                    <option>All locations</option>
                    <option>Kigali</option>
                    <option>Huye</option>
                    <option>Remote</option>
                  </select>
                  <select className="input">
                    <option>Any type</option>
                    <option>Full-time</option>
                    <option>Internship</option>
                    <option>Freelance</option>
                  </select>
                </div>
                <Link href="/opportunities" className="button-primary w-full">
                  Search opportunities
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="container">
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-600">Featured opportunities</p>
            <h2 className="mt-4 text-3xl font-bold text-slate-900">Opportunities built for starting careers</h2>
          </div>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {[1,2,3].map((item) => (
              <div key={item} className="card p-6">
                <div className="badge">Internship</div>
                <h3 className="mt-4 text-xl font-semibold">Frontend Developer ({item})</h3>
                <p className="mt-3 text-sm text-slate-600">Build responsive interfaces and collaborate with design and product teams.</p>
                <div className="mt-5 space-y-2 text-sm text-slate-600">
                  <div>Kigali, Rwanda</div>
                  <div>Entry level</div>
                  <div>RWF 150,000</div>
                </div>
                <Link href="/opportunities" className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-slate-900">
                  View role <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container py-16">
        <div className="grid gap-6 md:grid-cols-3">
          {[
            { icon: Users, title: 'For candidates', description: 'Create a profile, highlight projects, and discover roles that match your goals.' },
            { icon: Building2, title: 'For employers', description: 'Post opportunities, review candidates, and manage hiring with confidence.' },
            { icon: BriefcaseBusiness, title: 'For training partners', description: 'Connect learners with practical work and structured mentorship opportunities.' },
          ].map(({ icon: Icon, title, description }) => (
            <div key={title} className="card p-6">
              <div className="mb-4 inline-flex rounded-xl bg-emerald-50 p-3 text-emerald-700">
                <Icon className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold">{title}</h3>
              <p className="mt-3 text-slate-600">{description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-slate-900 py-16 text-white">
        <div className="container">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-300">Why it works</p>
              <h2 className="mt-3 text-3xl font-bold">A simpler way to match skills with opportunity.</h2>
            </div>
            <div className="rounded-full border border-slate-700 bg-slate-800 px-3 py-2 text-sm text-slate-200">Demonstration setup</div>
          </div>
        </div>
      </section>

      <section className="container py-16">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {statCards.map((item) => (
            <div key={item.label} className="card p-6 text-center">
              <div className="text-3xl font-bold text-slate-900">{item.value}</div>
              <div className="mt-2 text-sm text-slate-600">{item.label}</div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
