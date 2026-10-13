import Link from 'next/link';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export default async function SignInPage() {
  const session = await getServerSession(authOptions);

  if (session) {
    return <div className="container py-20 text-center">You are already signed in.</div>;
  }

  return (
    <div className="container flex min-h-[70vh] items-center justify-center py-16">
      <div className="card w-full max-w-md p-8">
        <h1 className="text-2xl font-bold text-slate-900">Welcome back</h1>
        <p className="mt-2 text-sm text-slate-600">Sign in to continue.</p>
        <form action="/api/auth/callback/credentials" method="post" className="mt-6 space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">Email</label>
            <input name="email" type="email" className="input" required />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">Password</label>
            <input name="password" type="password" className="input" required />
          </div>
          <button type="submit" className="button-primary w-full">Sign in</button>
        </form>
        <p className="mt-4 text-sm text-slate-600">
          New here? <Link href="/register" className="font-semibold text-emerald-700">Create account</Link>
        </p>
      </div>
    </div>
  );
}
