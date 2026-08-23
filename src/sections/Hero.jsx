export default function Hero() {
  return (
    <section id="home" className="hero-v">
      {/* Full-screen looping video background */}
      <video
        className="hero-v__video"
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
      >
        <source
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260328_105406_16f4600d-7a92-4292-b96e-b19156c7830a.mp4"
          type="video/mp4"
        />
      </video>
      <div className="hero-v__overlay" aria-hidden="true" />

      <div className="container hero-v__inner">
        {/* Intro row below the nav */}
        <div className="hero-v__intro">
          <p className="hero-v__intro-lead">
            We design, secure, and manage the technology that growing companies rely on.
            That includes intelligent monitoring, automated incident response, and custom
            AI tooling, delivered by a team that knows your environment.
          </p>
          <p className="hero-v__intro-stat">Monitoring and security coverage, 24/7.</p>
        </div>

        {/* Center hero */}
        <div className="hero-v__center">
          <span className="hero-v__kicker">AI-powered IT · Cloud · Cybersecurity</span>
          <h1 className="hero-v__title">
            <span className="hero-v__line hero-v__line--plain">Technology that</span>
            <span className="hero-v__line shiny-text">thinks ahead.</span>
          </h1>
          <a href="#contact" className="hero-v__cta">
            <span>Schedule a Consultation</span>
            <svg
              className="hero-v__cta-arrow"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  )
}
