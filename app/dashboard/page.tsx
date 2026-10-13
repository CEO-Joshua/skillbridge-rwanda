import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import prisma from '@/lib/db';

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) redirect('/signin');

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    include: {
      candidateProfile: true,
      notifications: { orderBy: { createdAt: 'desc' }, take: 5 },
    },
  });

  return (
    <div className="container py-16">
      <div className="card p-8">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-600">Candidate dashboard</p>
        <h1 className="mt-3 text-3xl font-bold text-slate-900">Welcome, {user?.name || 'Candidate'}.</h1>
        <p className="mt-2 text-slate-600">Your profile completion and recommended opportunities are shown below.</p>
      </div>

      <div className="mt-8 grid gap-6 md:grid-cols-3">
        <div className="card p-6">
          <div className="text-sm text-slate-500">Profile completion</div>
          <div className="mt-2 text-3xl font-bold">{user?.candidateProfile ? '78%' : '24%'}</div>
        </div>
        <div className="card p-6">
          <div className="text-sm text-slate-500">Applications</div>
          <div className="mt-2 text-3xl font-bold">0</div>
        </div>
        <div className="card p-6">
          <div className="text-sm text-slate-500">Saved</div>
          <div className="mt-2 text-3xl font-bold">0</div>
        </div>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-[2fr_1fr]">
        <div className="card p-6">
          <h2 className="text-xl font-semibold">Recommended opportunities</h2>
          <div className="mt-4 space-y-3">
            <div className="rounded-xl border border-slate-200 p-4">
              <div className="font-medium">Frontend Developer Internship</div>
              <div className="mt-1 text-sm text-slate-600">Rwanda Digital Hub • Kigali</div>
            </div>
            <div className="rounded-xl border border-slate-200 p-4">
              <div className="font-medium">UI Design Support</div>
              <div className="mt-1 text-sm text-slate-600">Creative Lab • Remote</div>
            </div>
          </div>
        </div>

        <div className="card p-6">
          <h2 className="text-xl font-semibold">Notifications</h2>
          <div className="mt-4 space-y-3">
            {user?.notifications.length ? user.notifications.map((item) => (
              <div key={item.id} className="rounded-xl bg-slate-50 p-3">
                <div className="font-medium">{item.title}</div>
                <div className="mt-1 text-sm text-slate-600">{item.message}</div>
              </div>
            )) : <div className="text-sm text-slate-600">No notifications yet.</div>}
          </div>
        </div>
      </div>
    </div>
  );
}
