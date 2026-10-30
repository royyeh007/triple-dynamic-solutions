// Small stroke icons on a 24px grid (currentColor), matching Services.jsx.
const Icon = ({ children }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    {children}
  </svg>
)

// Illustrative activity feed for the operations console. Each row stands for one
// service pillar: monitoring, security, managed IT, and cloud.
const activity = [
  {
    time: '02:14',
    icon: (
      <Icon>
        <path d="M3 12h4l2-6 4 12 2-6h6" />
      </Icon>
    ),
    title: 'Disk pressure on file server',
    detail: 'Auto-remediated by cleanup policy',
    status: 'Resolved',
    tone: 'ok',
  },
  {
    time: '07:48',
    icon: (
      <Icon>
        <path d="M12 3 5 6v5c0 4.4 3 8.4 7 9.5 4-1.1 7-5.1 7-9.5V6l-7-3Z" />
        <path d="M9.5 12l2 2 3.5-4" />
      </Icon>
    ),
    title: 'Phishing message quarantined',
    detail: 'Sender blocked, user notified',
    status: 'Contained',
    tone: 'ok',
  },
  {
    time: '09:05',
    icon: (
      <Icon>
        <circle cx="12" cy="8" r="3.5" />
        <path d="M5 20a7 7 0 0 1 14 0" />
      </Icon>
    ),
    title: 'New-hire onboarding',
    detail: 'Accounts, laptop, and MFA provisioned',
    status: 'Done',
    tone: 'ok',
  },
  {
    time: 'Fri',
    icon: (
      <Icon>
        <path d="M17.5 18.5H7a4.5 4.5 0 0 1-.4-8.98A6 6 0 0 1 18.3 10a4.25 4.25 0 0 1-.8 8.5Z" />
      </Icon>
    ),
    title: 'Monthly cloud cost review',
    detail: 'Idle resources flagged for rightsizing',
    status: 'Scheduled',
    tone: 'warn',
  },
]

export default function About() {
  return (
    <section id="about" className="section section--alt">
      <div className="container about__inner">
        {/* Decorative operations console: shows the kind of work we do day to day. */}
        <div className="about__visual" aria-hidden="true">
          <div className="about__panel">
            <div className="about__panel-glow" />

            <div className="ops">
              <div className="ops__bar">
                <span /><span /><span />
                <em>operations<span className="ops__bar-live"> · live</span></em>
                <b className="ops__live"><i />24/7 coverage</b>
              </div>

              <div className="ops__tiles">
                <div className="ops__tile">
                  <strong><span className="ops__dot" />Endpoints</strong>
                  <small>Healthy</small>
                </div>
                <div className="ops__tile">
                  <strong><span className="ops__dot" />Backups</strong>
                  <small>Verified</small>
                </div>
                <div className="ops__tile">
                  <strong><span className="ops__dot ops__dot--warn" />Patching</strong>
                  <small>Scheduled</small>
                </div>
              </div>

              <ul className="ops__feed">
                {activity.map((a) => (
                  <li key={a.title}>
                    <span className="ops__time">{a.time}</span>
                    <span className="ops__icon">{a.icon}</span>
                    <div>
                      <strong>{a.title}</strong>
                      <small>{a.detail}</small>
                    </div>
                    <em className={`ops__status ops__status--${a.tone}`}>{a.status}</em>
                  </li>
                ))}
              </ul>
            </div>
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
