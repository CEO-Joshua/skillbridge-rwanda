export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="container py-10">
        <div className="grid gap-8 md:grid-cols-4">
          <div>
            <h3 className="text-lg font-semibold text-slate-900">SkillBridge Rwanda</h3>
            <p className="mt-3 text-sm text-slate-600">Your Skills. Your Opportunity. Your Future.</p>
          </div>
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Company</h4>
            <ul className="mt-3 space-y-2 text-sm text-slate-600">
              <li>About</li>
              <li>Contact</li>
              <li>Privacy</li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Resources</h4>
            <ul className="mt-3 space-y-2 text-sm text-slate-600">
              <li>Career guides</li>
              <li>Portfolio tips</li>
              <li>Blog</li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Support</h4>
            <ul className="mt-3 space-y-2 text-sm text-slate-600">
              <li>hello@skillbridge.rw</li>
              <li>+250 788 000 000</li>
              <li>Kigali, Rwanda</li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
