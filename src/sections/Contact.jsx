import { useState } from 'react'

export default function Contact() {
  const [sent, setSent] = useState(false)

  // Static hosting has no backend — this opens the visitor's email client.
  // Swap for a form service (Formspree, Netlify Forms, etc.) when ready.
  const handleSubmit = (e) => {
    e.preventDefault()
    const form = e.target
    const name = form.name.value
    const email = form.email.value
    const message = form.message.value
    const subject = encodeURIComponent(`Website inquiry from ${name}`)
    const body = encodeURIComponent(`${message}\n\nFrom: ${name} <${email}>`)
    window.location.href = `mailto:support@tdsolve.com?subject=${subject}&body=${body}`
    setSent(true)
  }

  return (
    <section id="contact" className="section section--alt">
      <div className="container contact__inner">
        <div className="contact__info">
          <span className="section__eyebrow">Get in touch</span>
          <h2 className="section__title">Let's talk about your technology</h2>
          <p>
            Tell us about your environment and your goals, and we'll outline a practical
            path forward. Consultations are free and carry no obligation.
          </p>

          <ul className="contact__details">
            <li><strong>Email</strong><a href="mailto:support@tdsolve.com">support@tdsolve.com</a></li>
            <li><strong>Hours</strong><span>Monday – Friday, 9:00am – 6:00pm</span></li>
          </ul>
        </div>

        <form className="contact__form" onSubmit={handleSubmit}>
          <div className="field">
            <label htmlFor="name">Name</label>
            <input id="name" name="name" type="text" required placeholder="Jane Smith" />
          </div>
          <div className="field">
            <label htmlFor="email">Email</label>
            <input id="email" name="email" type="email" required placeholder="jane@company.com" />
          </div>
          <div className="field">
            <label htmlFor="message">How can we help?</label>
            <textarea id="message" name="message" rows="4" required placeholder="Tell us a bit about your needs…" />
          </div>
          <button type="submit" className="btn btn--primary btn--block">Send Message</button>
          {sent && (
            <p className="contact__note">Thank you. Your email client should open with your message ready to send.</p>
          )}
        </form>
      </div>
    </section>
  )
}
