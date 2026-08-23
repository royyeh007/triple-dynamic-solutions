const reasons = [
  {
    title: 'Fast, human response',
    desc: 'Calls and tickets go to engineers who know your environment, with automated triage handling routine requests quickly.',
  },
  {
    title: 'Practical use of AI',
    desc: 'We apply AI where it delivers measurable value in automation, reporting, and support, and we are direct about where it does not.',
  },
  {
    title: 'Security-first mindset',
    desc: 'Threat detection, access control, and compliance are designed into every solution we deliver from the start.',
  },
  {
    title: 'Predictable pricing',
    desc: 'Flat-rate plans and clearly defined scopes, so costs stay predictable.',
  },
  {
    title: 'Scales with you',
    desc: 'From your first hire to your next office, our solutions grow alongside your business.',
  },
  {
    title: 'Built on standards',
    desc: 'We build on well-supported platforms, so adopting new capabilities rarely means starting over.',
  },
]

export default function WhyUs() {
  return (
    <section id="why" className="section">
      <div className="container">
        <div className="section__head">
          <span className="section__eyebrow">Why Triple Dynamic</span>
          <h2 className="section__title">Why businesses work with us</h2>
        </div>

        <div className="grid grid--2">
          {reasons.map((r, i) => (
            <div key={r.title} className="reason">
              <span className="reason__num">{String(i + 1).padStart(2, '0')}</span>
              <div>
                <h3 className="reason__title">{r.title}</h3>
                <p className="reason__desc">{r.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
