export default function About() {
  return (
    <section id="about" className="section section--alt">
      <div className="container about__inner">
        <div className="about__visual" aria-hidden="true">
          <div className="about__panel">
            <div className="about__panel-glow" />
            <span className="about__panel-label">Placeholder imagery</span>
          </div>
        </div>

        <div className="about__content">
          <span className="section__eyebrow">About us</span>
          <h2 className="section__title">A technology partner, not just a vendor</h2>
          <p>
            Triple Dynamic Solutions, LLC was founded to give small and mid-sized businesses
            access to enterprise-grade technology without enterprise complexity. We combine
            technical depth with straightforward, responsive service.
          </p>
          <p>
            Our team works as an extension of yours. We learn your operations, automate
            routine work where it makes sense, and address problems before they affect
            your business.
          </p>

          <ul className="about__values">
            <li><strong>Reliability</strong> — systems you can count on, around the clock.</li>
            <li><strong>Innovation</strong> — modern tools applied where they serve a clear purpose.</li>
            <li><strong>Transparency</strong> — clear communication and straightforward pricing.</li>
            <li><strong>Partnership</strong> — recommendations driven by your goals.</li>
          </ul>
        </div>
      </div>
    </section>
  )
}
