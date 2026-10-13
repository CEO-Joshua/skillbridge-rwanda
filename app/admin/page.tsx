import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '@/lib/auth';

export default async function AdminPage() {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== 'ADMIN') {
    redirect('/signin');
  }

  return (
    <div className="container py-16">
      <div className="card p-8">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-600">Admin dashboard</p>
        <h1 className="mt-3 text-3xl font-bold text-slate-900">Platform control center</h1>
        <p className="mt-2 text-slate-600">Review verification requests, moderate content, and monitor activity.</p>
      </div>
    </div>
  );
}
