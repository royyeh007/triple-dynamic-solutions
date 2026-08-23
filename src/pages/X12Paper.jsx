// Technical brief (/x12-paper/): a mini white paper on @x12/core for a
// technologist audience — why the engine is built the way it is and how that
// differs from cloud EDI APIs, legacy translators, and hand-rolled parsers.
// Prose-first document layout; deliberately no scroll animations.

function Aside({ title, children }) {
  return (
    <aside className="paper__aside">
      <span className="paper__aside-k">{title}</span>
      {children}
    </aside>
  )
}

export default function X12Paper() {
  return (
    <main className="x12 paper">
      <style>{`
        .paper { max-width: 760px; margin: 0 auto; padding: 140px 22px 90px; }
        .paper .back { display: inline-flex; align-items: center; gap: 6px; color: var(--muted); font-size: .85rem; margin-bottom: 26px; transition: color .15s ease; }
        .paper .back:hover { color: var(--accent); }
        .paper__kicker { font-family: var(--mono); font-size: .74rem; letter-spacing: .12em; text-transform: uppercase; color: var(--accent); }
        .paper h1 { font-size: clamp(1.9rem, 4.5vw, 2.7rem); font-weight: 800; letter-spacing: -0.02em; line-height: 1.12; margin: 12px 0 14px; }
        .paper__sub { color: var(--muted); font-size: 1.06rem; line-height: 1.7; }
        .paper__meta { display: flex; flex-wrap: wrap; gap: 8px 18px; font-family: var(--mono); font-size: .74rem; color: var(--muted); margin: 22px 0 0; padding-top: 16px; border-top: 1px solid var(--border); }
        .paper__abstract { margin: 40px 0 0; border: 1px solid var(--border); border-left: 3px solid var(--accent); border-radius: 0 12px 12px 0; background: rgba(56, 189, 248, .05); padding: 20px 24px; }
        .paper__abstract h2 { font-family: var(--mono); font-size: .74rem; letter-spacing: .12em; text-transform: uppercase; color: var(--accent); margin: 0 0 10px; }
        .paper__abstract p { color: var(--text); font-size: .98rem; line-height: 1.75; }
        .paper section { margin-top: 54px; }
        .paper h2.paper__h { font-size: 1.45rem; font-weight: 700; letter-spacing: -0.01em; line-height: 1.25; margin: 0 0 6px; }
        .paper h2.paper__h .n { color: var(--accent); font-family: var(--mono); font-size: .95rem; font-weight: 600; margin-right: 10px; }
        .paper h3 { font-size: 1.05rem; font-weight: 700; margin: 26px 0 6px; }
        .paper p { color: var(--muted); line-height: 1.8; margin-top: 14px; }
        .paper p strong, .paper li strong { color: var(--text); font-weight: 600; }
        .paper ul { margin: 14px 0 0 2px; padding-left: 20px; }
        .paper li { color: var(--muted); line-height: 1.8; margin-top: 8px; }
        .paper code { font-family: var(--mono); font-size: .86em; background: rgba(148, 163, 184, .12); border: 1px solid var(--border); border-radius: 5px; padding: 1px 6px; color: var(--text); }
        .paper__sig { display: block; margin: 22px 0 0; border: 1px solid var(--border); border-radius: 12px; background: rgba(15, 23, 41, .75); padding: 18px 20px; font-family: var(--mono); font-size: .82rem; line-height: 1.75; color: var(--text); overflow-x: auto; }
        .paper__sig .c { color: var(--muted); }
        .paper__sig .a { color: var(--accent); }
        .paper__aside { margin: 24px 0 0; border-left: 2px solid var(--border); padding: 4px 0 4px 18px; }
        .paper__aside-k { display: block; font-family: var(--mono); font-size: .7rem; letter-spacing: .1em; text-transform: uppercase; color: var(--accent); margin-bottom: 6px; }
        .paper__aside p { margin-top: 0; font-size: .92rem; }
        .paper__fig { margin: 26px 0 0; border: 1px solid var(--border); border-radius: 12px; background: rgba(15, 23, 41, .75); padding: 22px; }
        .paper__fig-row { display: flex; align-items: stretch; justify-content: center; gap: 12px; flex-wrap: wrap; }
        .paper__fig-box { flex: 1 1 150px; max-width: 220px; border: 1px solid var(--border); border-radius: 10px; padding: 12px 14px; text-align: center; }
        .paper__fig-box b { display: block; font-size: .88rem; color: var(--text); }
        .paper__fig-box span { font-family: var(--mono); font-size: .7rem; color: var(--muted); }
        .paper__fig-box--core { border-color: var(--accent); background: rgba(56, 189, 248, .07); }
        .paper__fig-arrow { align-self: center; color: var(--muted); font-family: var(--mono); }
        .paper__fig-cap { text-align: center; font-size: .82rem; color: var(--muted); margin-top: 14px; }
        .paper__tablewrap { margin-top: 26px; overflow-x: auto; border: 1px solid var(--border); border-radius: 12px; }
        .paper__cmp { width: 100%; border-collapse: collapse; min-width: 720px; font-size: .88rem; }
        .paper__cmp th, .paper__cmp td { text-align: left; padding: 12px 16px; border-bottom: 1px solid var(--border); vertical-align: top; line-height: 1.6; }
        .paper__cmp thead th { font-family: var(--mono); font-size: .7rem; letter-spacing: .08em; text-transform: uppercase; color: var(--muted); background: rgba(15, 23, 41, .8); }
        .paper__cmp tbody tr:last-child td { border-bottom: 0; }
        .paper__cmp td:first-child { color: var(--text); font-weight: 600; white-space: nowrap; }
        .paper__cmp td { color: var(--muted); }
        .paper__cmp td.us { color: var(--text); background: rgba(56, 189, 248, .05); }
        .paper__cta { margin-top: 60px; border: 1px solid var(--border); border-radius: var(--radius); background: rgba(15, 23, 41, .75); padding: 30px 28px; text-align: center; }
        .paper__cta h2 { font-size: 1.3rem; font-weight: 700; margin-bottom: 8px; }
        .paper__cta p { margin: 0 auto 20px; max-width: 460px; }
        .paper__cta .row { display: flex; gap: 12px; justify-content: center; flex-wrap: wrap; }
      `}</style>

      <a className="back" href="/x12-studio/">← Back to the X12 Engine</a>

      <header>
        <span className="paper__kicker">Technical brief · @x12/core</span>
        <h1>Why the engine is the product</h1>
        <p className="paper__sub">
          The four design decisions behind <strong>@x12/core</strong>, our self-hosted X12
          translation engine, and their practical consequences for an EDI program.
        </p>
        <div className="paper__meta">
          <span>Triple Dynamic Solutions</span>
          <span>2026</span>
          <span>~8 min read</span>
          <span>Audience: engineers &amp; architects</span>
        </div>
      </header>

      <div className="paper__abstract">
        <h2>Abstract</h2>
        <p>
          Many EDI failures are not parsing failures but consistency failures: a mapping that
          passed in a test tool emits different bytes in production, a validator disagrees with
          the translator, or an edit silently changes the output of a live endpoint. @x12/core is
          designed to remove these failure modes structurally. The engine is a pure function; the
          X12 specification is represented as typed data rather than code; SNIP validation runs
          inside the engine; and every mapping is an immutable revision that must pass validation
          before it can serve traffic. This brief describes each decision and its consequences,
          and compares the result with the common alternatives.
        </p>
      </div>

      <section>
        <h2 className="paper__h"><span className="n">01</span>Where EDI tooling goes wrong</h2>
        <p>
          Teams that need to exchange X12 documents generally choose between three categories of
          tooling, each with a structural weakness:
        </p>
        <ul>
          <li>
            <strong>Cloud translation APIs and clearinghouses.</strong> Convenient, but documents
            (in healthcare, PHI) leave your network on every call, and the translator itself is
            opaque: it cannot run in CI, its output cannot be diffed offline, and its exact
            behavior cannot be audited in advance.
          </li>
          <li>
            <strong>Legacy on-premise translators.</strong> Mappings are built in a proprietary
            designer and compiled into a separate runtime. Because the design-time preview and the
            production path are different code, discrepancies between the two are a routine
            failure mode, and new transaction sets typically require vendor services.
          </li>
          <li>
            <strong>Hand-rolled parsers and open-source libraries.</strong> Parsing segments is a
            small fraction of the work. Most of the effort is the specification itself: loops,
            situational rules, code sets, and balancing, which end up re-implemented as
            application code with limited validation coverage.
          </li>
        </ul>
        <p>
          In all three cases, <strong>the component that validates, the component that
          translates, and the component that was tested are not the same.</strong> @x12/core
          removes that gap by making a single engine the source of truth for translation and
          validation; the rest of the product exists to drive it.
        </p>
      </section>

      <section>
        <h2 className="paper__h"><span className="n">02</span>Decision 1 — the engine is a pure function</h2>
        <p>
          @x12/core contains no I/O. It never touches the network or the filesystem, reads no
          clock, and draws no randomness. Everything that varies, including envelope values and
          control numbers, enters as explicit input. Conceptually, translation is one function:
        </p>
        <code className="paper__sig">
          translate(<span className="a">spec</span>, <span className="a">mapping</span>, <span className="a">payload</span>) <span className="c">→</span> {'{'} x12, valid, issues {'}'}<br />
          <span className="c">// identical inputs produce identical output</span>
        </code>
        <p>
          This has three practical consequences:
        </p>
        <ul>
          <li>
            <strong>The preview matches production.</strong> The mapping studio and{' '}
            <code>POST /api/translate</code> execute the same engine, so the wire an analyst sees
            while mapping is byte-identical to what production sends. There is no second
            implementation to fall out of sync.
          </li>
          <li>
            <strong>It is directly testable.</strong> Deterministic output makes golden-file
            testing reliable: every installed specification is verified byte-for-byte through the
            full pipeline, and engine output can be diffed in CI the same way.
          </li>
          <li>
            <strong>It runs air-gapped.</strong> Because the engine performs no I/O, zero external
            requests at runtime is a structural property of the code rather than a configuration
            setting.
          </li>
        </ul>
        <div className="paper__fig" role="img" aria-label="The studio preview and the translate API both call the same @x12/core engine, producing identical bytes">
          <div className="paper__fig-row">
            <div className="paper__fig-box"><b>Studio preview</b><span>analyst mapping</span></div>
            <div className="paper__fig-arrow">→</div>
            <div className="paper__fig-box paper__fig-box--core"><b>@x12/core</b><span>pure · no I/O</span></div>
            <div className="paper__fig-arrow">→</div>
            <div className="paper__fig-box"><b>The wire</b><span>identical bytes</span></div>
          </div>
          <div className="paper__fig-row" style={{ marginTop: 12 }}>
            <div className="paper__fig-box"><b>POST /api/translate</b><span>production traffic</span></div>
            <div className="paper__fig-arrow">↗</div>
          </div>
          <p className="paper__fig-cap">The studio and the API drive the same engine and produce identical output.</p>
        </div>
      </section>

      <section>
        <h2 className="paper__h"><span className="n">03</span>Decision 2 — the specification is data, not code</h2>
        <p>
          Everything the engine knows about X12, from segment and element rules to code sets,
          documentation, and wire templates, lives as typed data rather than branching logic. The
          engine is a small, stable interpreter of that data; the 33 installed transaction sets,
          from 270/271 eligibility through 837 claims to 850 purchase orders and 820 remittance,
          are data files that it interprets.
        </p>
        <p>
          This changes the economics of coverage. In a conventional translator, each transaction
          set is code, so each addition carries risk for the ones that already work. Here,{' '}
          <strong>adding a transaction set is a data change rather than a code change</strong>,
          and every specification ships with golden-file tests comparing the full pipeline
          byte-for-byte, so coverage grows without destabilizing the core. The same design is why
          the studio can render documentation, sample payloads, and live validation uniformly for
          every set: they are all views of the same data.
        </p>
        <Aside title="In practice">
          <p>
            When a trading partner requires a transaction set you do not yet run, supporting it
            means adding a tested data file rather than commissioning a project.
          </p>
        </Aside>
      </section>

      <section>
        <h2 className="paper__h"><span className="n">04</span>Decision 3 — validation lives inside the engine</h2>
        <p>
          SNIP validation levels L1 through L7, covering element syntax, structural rules,
          balancing, situational requirements, code-set membership, and partner-specific rules
          such as NPI and ICD-10 checks where the specification defines them, are enforced by the
          engine itself rather than by a separate validator product. The validator cannot disagree
          with the translator, because they are the same code reading the same specification data.
        </p>
        <p>
          Because validation is intrinsic, it gates every stage with the same rules:
        </p>
        <ul>
          <li><strong>Design time</strong> — the studio re-validates on every keystroke as the wire preview builds.</li>
          <li><strong>Activation time</strong> — a revision that fails its chosen SNIP level is refused activation (<code>409</code>). A broken mapping can never serve traffic.</li>
          <li><strong>Runtime</strong> — a payload that fails validation is refused (<code>422</code>) with structured issues, before a malformed interchange ever reaches a partner.</li>
        </ul>
      </section>

      <section>
        <h2 className="paper__h"><span className="n">05</span>Decision 4 — history is immutable</h2>
        <p>
          Saving a mapping never edits it; it appends a new revision. Callers pin the revision
          they were certified against, or omit it to follow the explicitly activated one. Only
          revisions that pass validation can be activated, and nothing rewrites history, so an
          edit can never silently change what a production endpoint emits. Rolling back means
          re-pinning an earlier revision, and reproducing historical output means re-running the
          revision that produced it.
        </p>
        <p>
          Combined with deterministic output, this provides{' '}
          <strong>a complete, replayable audit trail</strong>: any interchange ever produced can
          be regenerated exactly from the revision that produced it.
        </p>
      </section>

      <section>
        <h2 className="paper__h"><span className="n">06</span>The deployment model follows from the architecture</h2>
        <p>
          Because the engine is pure and the specification is data, the platform is delivered as
          a single container: engine, mapping studio, and API in one process on one origin, with
          immutable revisions stored in SQLite via <code>node:sqlite</code>. There are no native
          dependencies and no external database. The platform makes zero external requests at
          runtime; fonts are bundled, and there are no CDNs or analytics. Documents, including
          PHI in healthcare deployments, never leave your network, and the software runs in fully
          air-gapped environments.
        </p>
        <p>
          For a security review, the surface to assess is one self-hosted process whose engine
          performs no I/O. That is a significantly smaller scope than a third-party data
          processing arrangement.
        </p>
      </section>

      <section>
        <h2 className="paper__h"><span className="n">07</span>Side by side</h2>
        <div className="paper__tablewrap">
          <table className="paper__cmp">
            <thead>
              <tr>
                <th></th>
                <th>Cloud EDI APIs</th>
                <th>Legacy translators</th>
                <th>DIY libraries</th>
                <th>@x12/core</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Where your data goes</td>
                <td>Vendor cloud, on every call</td>
                <td>Stays on-premise</td>
                <td>Stays in-house</td>
                <td className="us">Your network only; zero external requests</td>
              </tr>
              <tr>
                <td>Preview vs production</td>
                <td>Opaque; testing requires the live service</td>
                <td>Separate designer and runtime; prone to drift</td>
                <td>Depends on implementation</td>
                <td className="us">Same engine; byte-identical</td>
              </tr>
              <tr>
                <td>Spec knowledge</td>
                <td>Vendor-maintained, opaque</td>
                <td>Compiled into maps per project</td>
                <td>Re-implemented as application code</td>
                <td className="us">Typed data, 33 sets, golden-file tested</td>
              </tr>
              <tr>
                <td>Validation</td>
                <td>Varies; often a separate step</td>
                <td>Separate validator product</td>
                <td>Typically limited to parsing</td>
                <td className="us">SNIP L1–L7 inside the engine, applied at every stage</td>
              </tr>
              <tr>
                <td>Change safety</td>
                <td>Vendor release cycle</td>
                <td>Edits go live on deploy</td>
                <td>Depends on process</td>
                <td className="us">Immutable pinned revisions; only validated revisions activate</td>
              </tr>
              <tr>
                <td>Runs in CI / air-gapped</td>
                <td>No</td>
                <td>Rarely; heavyweight installations</td>
                <td>Partially; specification coverage is manual</td>
                <td className="us">Yes; one container with deterministic output</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h2 className="paper__h"><span className="n">08</span>Practical consequences</h2>
        <ul>
          <li><strong>Simpler partner certification.</strong> Partner testing runs against the same bytes production will send, and engine output can be diffed in CI like any other build artifact.</li>
          <li><strong>A smaller compliance surface.</strong> Self-hosted and air-gapped, with no third-party data processor in the path of PHI.</li>
          <li><strong>Faster incident resolution.</strong> Pinned revisions and deterministic output make any historical interchange exactly reproducible.</li>
          <li><strong>A clear division of labor.</strong> Analysts map by business concept in the studio, and engineers integrate a single <code>POST /api/translate</code> call.</li>
        </ul>
        <p>
          Each of these follows directly from the four design decisions rather than from
          individual features. They are properties of the architecture, and they are the reason
          the engine, rather than the tooling around it, is the product.
        </p>
      </section>

      <div className="paper__cta">
        <h2>See it in practice</h2>
        <p>
          Watch the engine drive a real 270 eligibility mapping on the product page, or contact
          us to discuss your transaction sets and volumes.
        </p>
        <div className="row">
          <a href="/#contact" className="btn btn--primary">Request a demo</a>
          <a href="/x12-studio/" className="btn btn--ghost">Back to the X12 Engine</a>
        </div>
      </div>
    </main>
  )
}
