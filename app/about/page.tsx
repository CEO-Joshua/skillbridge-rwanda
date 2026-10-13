export default function AboutPage() {
  return (
    <div className="container py-16">
      <div className="max-w-3xl">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-600">About SkillBridge Rwanda</p>
        <h1 className="mt-4 text-4xl font-bold text-slate-900">Building fair pathways into professional work.</h1>
        <p className="mt-6 text-lg text-slate-600">
          SkillBridge Rwanda exists to help young people transform capability into opportunity. Many candidates have strong technical and practical experience but limited access to professional networks, internships, or entry-level work. This platform connects them with real employers, supportive organizations, and learning opportunities that match their skills.
        </p>
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <div className="card p-6">
            <h2 className="text-xl font-semibold">Mission</h2>
            <p className="mt-3 text-slate-600">Make opportunity matching more transparent, accessible, and practical for rising talent across Rwanda.</p>
          </div>
          <div className="card p-6">
            <h2 className="text-xl font-semibold">Vision</h2>
            <p className="mt-3 text-slate-600">Expand a fair, skills-based hiring ecosystem that helps learners, employers, and institutions grow together.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
