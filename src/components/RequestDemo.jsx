import { useState } from 'react'

// "Request a demo" — posts to the vendor's request-demo Edge Function,
// which records the lead and emails the download link + instructions.
// Same backend pattern as the license portal (X12License.jsx): the static
// site has no server of its own.
const REQUEST_URL = 'https://ykzolgkulvrhhncouylk.supabase.co/functions/v1/request-demo'

export default function RequestDemo() {
  const [busy, setBusy] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState(null)

  const submit = async (e) => {
    e.preventDefault()
    const form = e.target
    setBusy(true)
    setError(null)
    try {
      const r = await fetch(REQUEST_URL, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          name: form.name.value,
          email: form.email.value,
          company: form.company.value,
          message: form.message.value,
          // Honeypot — off-screen, humans never see it; bots fill it.
          website: form.website.value,
          sourcePage: window.location.pathname,
        }),
      })
      const body = await r.json().catch(() => ({}))
      if (!r.ok) {
        setError(body.error || 'Something went wrong — please try again shortly.')
        return
      }
      setSent(true)
    } catch {
      setError('Could not reach the demo service. Please check your connection and try again.')
    } finally {
      setBusy(false)
    }
  }

  return (
    <section className="section" id="x12-request">
      <style>{`
        .x12req { max-width: 560px; margin: 0 auto; }
        .x12req .hp { position: absolute; left: -9999px; top: -9999px; height: 0; width: 0; overflow: hidden; }
        .x12req .err { color: #ff8a7a; background: rgba(255,90,60,.08); border: 1px solid rgba(255,90,60,.3); border-radius: 8px; padding: 10px 13px; margin-top: 14px; line-height: 1.5; }
        .x12req .done { text-align: center; padding: 34px 20px; }
        .x12req .done h3 { margin: 0 0 10px; font-size: 1.35rem; }
        .x12req .done p { color: var(--muted); line-height: 1.65; margin: 0; }
      `}</style>
      <div className="container">
        <div className="section__head reveal">
          <span className="section__eyebrow">Try it yourself</span>
          <h2 className="section__title">Request the demo</h2>
          <p className="section__lead">
            We'll email you the download link and setup instructions — one Docker command and
            the full studio is running on your machine. Nothing to sign up for, and your data
            never leaves your network.
          </p>
        </div>

        <div className="x12req reveal">
          {sent ? (
            <div className="contact__form done">
              <h3>Check your inbox ✓</h3>
              <p>
                Your download link and setup instructions are on the way. If nothing arrives in
                a few minutes, check spam — or write to us at{' '}
                <a href="mailto:support@tdsolve.com">support@tdsolve.com</a>.
              </p>
            </div>
          ) : (
            <form className="contact__form" onSubmit={submit}>
              <div className="field">
                <label htmlFor="rd-name">Name</label>
                <input id="rd-name" name="name" type="text" required maxLength="120" placeholder="Jane Smith" />
              </div>
              <div className="field">
                <label htmlFor="rd-email">Work email</label>
                <input id="rd-email" name="email" type="email" required maxLength="254" placeholder="jane@company.com" />
              </div>
              <div className="field">
                <label htmlFor="rd-company">Company</label>
                <input id="rd-company" name="company" type="text" maxLength="160" placeholder="Company (optional)" />
              </div>
              <div className="field">
                <label htmlFor="rd-message">What are you translating?</label>
                <textarea id="rd-message" name="message" rows="3" maxLength="2000" placeholder="e.g. 837P claims from our clinic system (optional)" />
              </div>
              <div className="hp" aria-hidden="true">
                <label htmlFor="rd-website">Website</label>
                <input id="rd-website" name="website" type="text" tabIndex="-1" autoComplete="off" />
              </div>
              <button type="submit" className="btn btn--primary btn--block" disabled={busy}>
                {busy ? 'Sending…' : 'Email me the demo'}
              </button>
              {error && <p className="err">{error}</p>}
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
