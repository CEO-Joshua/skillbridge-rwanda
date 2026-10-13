import Link from 'next/link';
import { BriefcaseBusiness } from 'lucide-react';

export default function Header() {
  return (
    <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm">
      <div className="container flex h-20 items-center justify-between gap-6">
        <Link href="/" className="flex items-center gap-3 font-semibold text-slate-900">
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-slate-900 text-white">
            <BriefcaseBusiness className="h-5 w-5" />
          </span>
          <span>SkillBridge Rwanda</span>
        </Link>

        <nav className="hidden items-center gap-6 text-sm font-medium text-slate-700 md:flex">
          <Link href="/opportunities">Find Opportunities</Link>
          <Link href="/about">About</Link>
          <Link href="/resources">Career Resources</Link>
          <Link href="/employers">For Employers</Link>
        </nav>

        <div className="flex items-center gap-3">
          <Link href="/signin" className="button-secondary">Sign in</Link>
          <Link href="/register" className="button-primary">Get Started</Link>
        </div>
      </div>
    </header>
  );
}
