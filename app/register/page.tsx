import Link from 'next/link';
import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export default async function RegisterPage() {
  const session = await getServerSession(authOptions);
  if (session) redirect('/dashboard');

  return (
    <div className="container flex min-h-[70vh] items-center justify-center py-16">
      <div className="card w-full max-w-md p-8">
        <h1 className="text-2xl font-bold text-slate-900">Create your account</h1>
        <p className="mt-2 text-sm text-slate-600">Start building your profile and opportunities.</p>
        <form action="/api/register" method="post" className="mt-6 space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">Full name</label>
            <input name="name" className="input" required />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">Email</label>
            <input name="email" type="email" className="input" required />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">Password</label>
            <input name="password" type="password" className="input" minLength={8} required />
          </div>
          <button type="submit" className="button-primary w-full">Create account</button>
        </form>
        <p className="mt-4 text-sm text-slate-600">
          Already have an account? <Link href="/signin" className="font-semibold text-emerald-700">Sign in</Link>
        </p>
      </div>
    </div>
  );
}
