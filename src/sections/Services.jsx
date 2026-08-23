// Simple stroke icons (24px grid, currentColor) so the cards read as product
// design rather than emoji.
const Icon = ({ children }) => (
  <svg
    viewBox="0 0 24 24"
    width="24"
    height="24"
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

const services = [
  {
    icon: (
      <Icon>
        <rect x="5" y="5" width="14" height="14" rx="2" />
        <rect x="9.5" y="9.5" width="5" height="5" />
        <path d="M9 2v3M15 2v3M9 19v3M15 19v3M2 9h3M2 15h3M19 9h3M19 15h3" />
      </Icon>
    ),
    title: 'AI & Automation',
    desc: 'Custom assistants grounded in your own data, workflow automation, and document processing, scoped to measurable outcomes.',
  },
  {
    icon: (
      <Icon>
        <rect x="3" y="4" width="18" height="7" rx="1.5" />
        <rect x="3" y="13" width="18" height="7" rx="1.5" />
        <path d="M7 7.5h.01M7 16.5h.01" />
      </Icon>
    ),
    title: 'Managed IT Services',
    desc: 'Proactive monitoring, patching, help desk, and network management that keep your team productive.',
  },
  {
    icon: (
      <Icon>
        <path d="M17.5 18.5H7a4.5 4.5 0 0 1-.4-8.98A6 6 0 0 1 18.3 10a4.25 4.25 0 0 1-.8 8.5Z" />
      </Icon>
    ),
    title: 'Cloud Solutions',
    desc: 'Migration, architecture, and cost management across AWS, Azure, and Google Cloud.',
  },
  {
    icon: (
      <Icon>
        <path d="M12 3 5 6v5c0 4.4 3 8.4 7 9.5 4-1.1 7-5.1 7-9.5V6l-7-3Z" />
        <path d="M9.5 12l2 2 3.5-4" />
      </Icon>
    ),
    title: 'Cybersecurity',
    desc: 'Threat detection, endpoint protection, compliance support, and security awareness training for your whole organization.',
  },
  {
    icon: (
      <Icon>
        <path d="M9 8l-4 4 4 4M15 8l4 4-4 4" />
      </Icon>
    ),
    title: 'Custom Software',
    desc: 'Web and internal business applications built around your workflows, with AI capabilities such as chat assistants and document automation where they add value.',
  },
  {
    icon: (
      <Icon>
        <path d="M4 19h16" />
        <path d="M5 15l4-4 3 3 6-6" />
        <path d="M14 8h4v4" />
      </Icon>
    ),
    title: 'IT Consulting & AI Strategy',
    desc: 'Technology roadmaps, budgeting, and AI adoption guidance aligned with your business goals.',
  },
]

export default function Services() {
  return (
    <section id="services" className="section">
      <div className="container">
        <div className="section__head">
          <span className="section__eyebrow">What we do</span>
          <h2 className="section__title">Services built around your business</h2>
          <p className="section__lead">
            A single partner for strategy, implementation, security, and support across
            your technology stack.
          </p>
        </div>

        <div className="grid grid--3">
          {services.map((s) => (
            <article key={s.title} className="card">
              <div className="card__icon" aria-hidden="true">{s.icon}</div>
              <h3 className="card__title">{s.title}</h3>
              <p className="card__desc">{s.desc}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
