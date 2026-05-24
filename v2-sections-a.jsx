// v2-sections-a.jsx

// ─── Sticky nav ──────────────────────────────────────────────────────
const Nav = () => {
  const t = useT();
  const [scrolled, setScrolled] = React.useState(false);
  React.useEffect(() => {
    const on = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', on, { passive: true }); on();
    return () => window.removeEventListener('scroll', on);
  }, []);
  const items = [
    ['about', 'about'], ['code', 'code'],
    ['quotes', 'quotes'], ['writing', 'writing'],
    ['shelf', 'shelf'], ['now', 'now'], ['cv', 'cv'],
    ['toward', 'toward'], ['changelog', 'log'], ['hello', 'hello'],
  ];
  return (
    <div style={{
      position: 'sticky', top: 0, zIndex: 50, background: scrolled ? `${t.palette.bg}f5` : 'transparent',
      backdropFilter: scrolled ? 'blur(8px)' : 'none',
      borderBottom: scrolled ? `1px solid ${t.palette.rule}` : '1px solid transparent',
      transition: 'background .25s, border-color .25s',
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 56px 14px 120px' }}>
        <div style={{ display: 'flex', gap: 18, fontFamily: MONO, fontSize: 11, letterSpacing: 1.2, textTransform: 'uppercase' }}>
          {items.map(([id, label]) => (
            <a key={id} href={`#${id}`} style={{ color: t.palette.pencil, textDecoration: 'none', cursor: 'pointer', transition: 'color .15s' }}
               onMouseEnter={(e) => e.target.style.color = t.accent} onMouseLeave={(e) => e.target.style.color = t.palette.pencil}>
              {label}
            </a>
          ))}
        </div>
        <button
          onClick={() => { if (window.__toggleTheme) window.__toggleTheme(); }}
          title="Toggle dark / light"
          style={{
            background: 'none', border: `1.5px solid ${t.palette.pencil}`,
            borderRadius: 4, padding: '4px 10px', cursor: 'pointer',
            fontFamily: MONO, fontSize: 10, color: t.palette.pencil,
            letterSpacing: 1, transition: 'all .2s',
          }}
          onMouseEnter={(e) => { e.target.style.color = t.accent; e.target.style.borderColor = t.accent; }}
          onMouseLeave={(e) => { e.target.style.color = t.palette.pencil; e.target.style.borderColor = t.palette.pencil; }}
        >
          {t.dark ? '☀ light' : '◑ dark'}
        </button>
      </div>
    </div>
  );
};

// ─── HERO VARIANTS ───────────────────────────────────────────────────
const HeroClassic = ({ onPageClick }) => {
  const t = useT(); const c = V2;
  return (
    <section style={{ padding: t.dense ? '40px 56px 40px 120px' : '64px 56px 56px 120px', position: 'relative' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
        <div onClick={onPageClick} style={{ fontFamily: t.fonts.hand, fontSize: 24, color: t.accent, cursor: 'pointer', userSelect: 'none' }} title="click me">page 1 / ∞</div>
      </div>
      <div style={{ marginTop: 6, fontFamily: MONO, fontSize: 11, color: t.palette.pencil, letterSpacing: 1 }}>
        {`SUBJECT: SELF · DATE: ${new Date().toLocaleDateString('en-GB').split('/').join('.')} · BETTING ON BIOTECH`}
      </div>
      <h1 style={{ fontFamily: t.fonts.hand, fontSize: 200, lineHeight: 0.96, margin: '40px 0 0', fontWeight: 700, color: t.palette.ink, letterSpacing: -2 }}>
        Hi, I'm <u style={{ textDecorationColor: t.accent, textDecorationThickness: 5, textUnderlineOffset: 10 }}>Karthik</u>.
      </h1>
      <div style={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr', gap: 56, marginTop: 40 }}>
        <p style={{ fontFamily: t.fonts.serif, fontSize: t.dense ? 22 : 26, lineHeight: 1.5, margin: 0, color: t.palette.ink }}>{c.taglineLong}</p>
        <div style={{ border: `2px solid ${t.palette.ink}`, padding: 18, background: t.palette.cardBg, transform: 'rotate(1.6deg)', boxShadow: `4px 4px 0 ${t.palette.cardShadow}`, position: 'relative' }}>
          <Tape rot={-4} style={{ top: -14, left: 20 }} />
          <div style={{ fontFamily: t.fonts.hand, fontSize: 24, color: t.accent, marginBottom: 8 }}>∴ identity card</div>
          <div style={{ fontFamily: MONO, fontSize: 12, lineHeight: 2, color: t.palette.ink }}>
            name &nbsp;&nbsp;: {c.name}<br />
            born &nbsp;&nbsp;: {c.birthday}<br />
            age &nbsp;&nbsp;&nbsp;: {c.age}<br />
            school : {c.school}<br />
            grade &nbsp;: {c.grade}<br />
            thesis : <span style={{ color: t.accent }}>biology is the next silicon</span><br />
            where &nbsp;: {c.location}<br />
            stack &nbsp;: {c.stack.join(', ')}
          </div>
        </div>
      </div>
      <MarginEq top={260} color={t.accent}>∫₀<sup>∞</sup> curiosity · dt</MarginEq>
    </section>
  );
};

const HeroEquation = ({ onPageClick }) => {
  const t = useT(); const c = V2;
  const I = (s) => <i style={{ fontFamily: t.fonts.serif }}>{s}</i>;
  const ink = t.palette.ink, dim = t.palette.pencil, soft = t.palette.inkSoft;
  const navy = t.palette.accents.navy, forest = t.palette.accents.forest, plum = t.palette.accents.plum;

  const Sec = ({ n, children }) => (
    <div style={{ display: 'flex', alignItems: 'baseline', gap: 14, margin: '28px 0 14px' }}>
      <span style={{ fontFamily: MONO, fontSize: 11, color: t.accent, letterSpacing: 2, fontWeight: 600 }}>§ {n}</span>
      <span style={{ fontFamily: t.fonts.serif, fontSize: 22, fontWeight: 600, color: ink, textTransform: 'uppercase', letterSpacing: 1 }}>{children}</span>
      <span style={{ flex: 1, height: 1, background: t.palette.rule }} />
    </div>
  );

  const Stmt = ({ kind, n, color, children }) => (
    <div style={{ marginBottom: 14, fontFamily: t.fonts.serif, fontSize: 19, lineHeight: 1.55, color: ink }}>
      <span style={{ fontWeight: 600, color: color || t.accent, marginRight: 6 }}>{kind} {n}.</span>
      <span>{children}</span>
    </div>
  );

  const Eq = ({ children, n }) => (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 80px', alignItems: 'center', margin: '20px 0' }}>
      <div style={{ textAlign: 'center', fontFamily: t.fonts.serif, fontSize: 30, lineHeight: 1.3, color: ink }}>{children}</div>
      <div style={{ textAlign: 'right', fontFamily: t.fonts.serif, fontSize: 16, color: dim, fontStyle: 'italic' }}>{n}</div>
    </div>
  );

  const Where = ({ children }) => (
    <div style={{ marginLeft: 40, fontFamily: t.fonts.serif, fontSize: 16, fontStyle: 'italic', color: soft, lineHeight: 1.6, marginBottom: 6 }}>{children}</div>
  );

  const Ref = ({ n, children }) => (
    <div style={{ display: 'grid', gridTemplateColumns: '40px 1fr', gap: 6, fontFamily: t.fonts.serif, fontSize: 14, color: soft, lineHeight: 1.5, marginBottom: 4 }}>
      <span style={{ color: t.accent }}>[{n}]</span><span>{children}</span>
    </div>
  );

  return (
    <section style={{ padding: t.dense ? '40px 56px 40px 120px' : '64px 56px 56px 120px', position: 'relative' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
        <div onClick={onPageClick} style={{ fontFamily: t.fonts.hand, fontSize: 24, color: t.accent, cursor: 'pointer', userSelect: 'none' }}>page 1 / ∞</div>
      </div>
      <div style={{ marginTop: 6, fontFamily: MONO, fontSize: 11, color: dim, letterSpacing: 1.2 }}>
        {`arXiv:2605.${String((c.age || 13)).padStart(2, '0')}142 [self.IDENT] · v26 · ${new Date().toLocaleDateString('en-GB', {day:'2-digit',month:'short',year:'numeric'}).toUpperCase()} · ${window.ESSAYS ? window.ESSAYS.length : 1} pages`}
      </div>
      <div style={{ marginTop: 36, textAlign: 'center', maxWidth: 980, marginLeft: 'auto', marginRight: 'auto' }}>
        <div style={{ fontFamily: MONO, fontSize: 11, color: t.accent, letterSpacing: 3, textTransform: 'uppercase', marginBottom: 12 }}>
          A note on identity, in three sections
        </div>
        <h1 style={{ fontFamily: t.fonts.serif, fontSize: 52, fontWeight: 600, margin: 0, color: ink, letterSpacing: -0.3, lineHeight: 1.05 }}>
          On the existence of <span style={{ fontStyle: 'italic', color: t.accent }}>Myself</span>:<br />
          A constructive proof in three substrates.
        </h1>
        <div style={{ marginTop: 18, fontFamily: t.fonts.serif, fontSize: 17, color: soft, fontStyle: 'italic' }}>
          Karthik<sup>1</sup> &nbsp;·&nbsp; {c.school}<sup>1</sup>, {c.location}
        </div>
        <div style={{ marginTop: 4, fontFamily: MONO, fontSize: 11, color: dim }}>
          <sup>1</sup>correspondence: <span style={{ color: ink }}>{c.email}</span>
        </div>
      </div>
      <div style={{ marginTop: 36, padding: '20px 28px', border: `1px solid ${t.palette.rule}`, background: t.palette.cardBg, maxWidth: 900, marginLeft: 'auto', marginRight: 'auto' }}>
        <div style={{ fontFamily: MONO, fontSize: 10, letterSpacing: 2, color: t.accent, fontWeight: 600, textTransform: 'uppercase', marginBottom: 8 }}>Abstract.</div>
        <div style={{ fontFamily: t.fonts.serif, fontSize: 17, color: ink, lineHeight: 1.55 }}>
          We define a Class-9 student {I("K")}({I("t")}) ∈ <i>ℳ</i> and prove that {I("K")} is non-trivial. A constructive characterization (Thm. 2.1) shows {I("K")}({I("t")}) admits a decomposition as the time-integral of three orthogonal substrates: {' '}
          <span style={{ color: t.accent, fontStyle: 'italic' }}>math, code, cells</span>. We further conjecture that lim<sub>{I("t")}→∞</sub> {I("K")}({I("t")})/{I("t")} = ∞ (Conj. 2.4). The proof is sketched in §3; counter-examples have not been found at time of writing.
        </div>
        <div style={{ marginTop: 10, fontFamily: MONO, fontSize: 11, color: dim, letterSpacing: 0.5 }}>
          <b style={{ color: ink }}>Keywords —</b> identity; biotech; OS theory; integration over curiosity; CBSE.
        </div>
        <div style={{ marginTop: 4, fontFamily: MONO, fontSize: 11, color: dim, letterSpacing: 0.5 }}>
          <b style={{ color: ink }}>MSC2020 —</b> 00A30 · 03B30 · 92-02 · 68-06.
        </div>
      </div>
      <Sec n="1">Preliminaries</Sec>
      <Stmt kind="Definition" n="1.1" color={navy}>
        Let {I("K")}({I("t")}) ∈ ℳ denote a Class-9 student of CBSE persuasion, born 14 Oct 2012, indexed by {I("t")} ∈ [0, ∞), located in {c.location}, with stack ⟨{c.stack.join(', ')}⟩.
      </Stmt>
      <Stmt kind="Axiom" n="1.1" color={navy}>(Existence.) &nbsp; ∃ {I("K")} such that {I("K")} ≡ {I("K")}. &nbsp; <i>(trivial.)</i></Stmt>
      <Stmt kind="Lemma" n="1.2" color={navy}>(Non-triviality.) &nbsp; ∀ε &gt; 0, &nbsp;∃ <i>idea</i> ∈ {I("K")} &nbsp; with &nbsp; ‖<i>idea</i>‖ &gt; ε.</Stmt>
      <div style={{ fontFamily: t.fonts.serif, fontSize: 16, fontStyle: 'italic', color: soft, marginLeft: 24, marginBottom: 10, lineHeight: 1.55 }}>
        <span style={{ fontStyle: 'normal', fontWeight: 600, color: ink }}>Proof.</span> Take ε = 0. Then any non-zero idea suffices. By inspection of the author's notebook, such ideas exist. <span style={{ color: ink }}>∎</span>
      </div>
      <Sec n="2">Main result</Sec>
      <Stmt kind="Theorem" n="2.1" color={t.accent}>(Main.) &nbsp;For all {I("t")} ≥ 0,</Stmt>
      <Eq n="(2.1)">
        <span style={{ color: t.accent, fontStyle: 'italic' }}>K</span>(<i>t</i>) &nbsp;=&nbsp; ∫<sub style={{ fontSize: 16 }}>0</sub><sup style={{ fontSize: 16 }}>t</sup>&nbsp;
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
          <span>(</span>
          <i style={{ color: navy }}>m</i>(τ) &nbsp;⊕&nbsp; <i style={{ color: forest }}>c</i>(τ) &nbsp;⊕&nbsp; <i style={{ color: plum }}>b</i>(τ)
          <span>)</span>
        </span>
        &nbsp;<i>dτ</i>
      </Eq>
      <Where>where &nbsp;<i style={{ color: navy }}>m</i>(<i>t</i>), <i style={{ color: forest }}>c</i>(<i>t</i>), <i style={{ color: plum }}>b</i>(<i>t</i>) are the <b style={{ color: navy }}>math</b>, <b style={{ color: forest }}>code</b>, and <b style={{ color: plum }}>cells</b> rates respectively,</Where>
      <Where>and &nbsp;⊕ : ℳ × ℳ → ℳ &nbsp;is the non-commutative <i>idea-sum</i>; {I("t")} ∈ [0, ∞); ℳ is a complete metric space of identities.</Where>
      <Stmt kind="Corollary" n="2.2" color={t.accent}>Differentiating (2.1) with respect to {I("t")},</Stmt>
      <Eq n="(2.2)">
        <span style={{ fontSize: 26 }}>∂<i>K</i>/∂<i>t</i></span> &nbsp;=&nbsp; <i style={{ color: navy }}>m</i>(<i>t</i>) &nbsp;⊕&nbsp; <i style={{ color: forest }}>c</i>(<i>t</i>) &nbsp;⊕&nbsp; <i style={{ color: plum }}>b</i>(<i>t</i>)
      </Eq>
      <Eq n="(2.3)">
        <span style={{ fontSize: 26 }}>∂²<i>K</i>/∂<i>t</i> ∂<i style={{ color: t.accent }}>κ</i></span> &nbsp;&gt;&nbsp; 0 &nbsp;&nbsp;<span style={{ fontFamily: MONO, fontSize: 13, color: dim }}>(κ = curiosity; monotone in both)</span>
      </Eq>
      <Stmt kind="Conjecture" n="2.3" color={plum}>(Strong form.) &nbsp;</Stmt>
      <Eq n="(2.4)">
        lim<sub style={{ fontSize: 14 }}>{I("t")} → ∞</sub> &nbsp;<i style={{ color: t.accent }}>K</i>(<i>t</i>) / <i>t</i> &nbsp;=&nbsp; ∞
      </Eq>
      <Sec n="3">Discussion</Sec>
      <div style={{ fontFamily: t.fonts.serif, fontSize: 17, lineHeight: 1.6, color: soft, marginBottom: 14 }}>
        <span style={{ fontWeight: 600, color: ink }}>Proof (sketch).</span> The author offers the following in lieu of formal argument: <span style={{ color: ink, fontStyle: 'italic' }}>{c.taglineLong}</span>
      </div>
      <div style={{ fontFamily: t.fonts.serif, fontSize: 17, lineHeight: 1.6, color: soft, marginBottom: 14 }}>
        <span style={{ fontWeight: 600, color: ink }}>Counter-example.</span> Not yet found. Reader invited to submit.
      </div>
      <div style={{ fontFamily: t.fonts.serif, fontSize: 17, lineHeight: 1.6, color: soft, marginBottom: 14 }}>
        <span style={{ fontWeight: 600, color: ink }}>Open problem.</span> Compute the closed-form of <span style={{ color: forest, fontStyle: 'italic' }}>c</span>(<i>t</i>) under the constraint <span style={{ fontFamily: MONO, fontSize: 14 }}>OS_v0.boot() = true</span>. <span style={{ color: t.accent }}>(Work in progress.)</span>
      </div>
      <Sec n="4">References</Sec>
      <Ref n="1">Feynman, R. P. (1963). <i>The Feynman Lectures on Physics</i>, Vol. I. Addison-Wesley.</Ref>
      <Ref n="2">Church, G. M., Regis, E. (2012). <i>Regenesis: How Synthetic Biology Will Reinvent Nature and Ourselves</i>. Basic Books.</Ref>
      <Ref n="3">Pólya, G. (1945). <i>How to Solve It</i>. Princeton University Press.</Ref>
      <Ref n="4">Hardy, G. H. (1940). <i>A Mathematician's Apology</i>. Cambridge University Press.</Ref>
      <Ref n="5">Karthik (in prep.). <i>Future Human</i>. Self-published, Gurgaon.</Ref>
      <Ref n="6">Tolstoy, L. (1869). <i>War and Peace</i>. Read in margin during proof of (2.1).</Ref>
      <div style={{ marginTop: 32, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16, borderTop: `1px solid ${t.palette.rule}`, paddingTop: 18 }}>
        <div style={{ fontFamily: MONO, fontSize: 11, color: dim, letterSpacing: 1 }}>
          ACK · advisors: Feynman (post.), K&amp;R · funding: parents · conflicts: none declared
        </div>
        <div style={{ fontFamily: t.fonts.serif, fontSize: 22, fontWeight: 700, color: t.accent, letterSpacing: 2, padding: '4px 16px', border: `2.5px solid ${t.accent}`, transform: 'rotate(-3deg)' }}>
          Q.E.D. ∎
        </div>
      </div>
      <div style={{ marginTop: 12, fontFamily: MONO, fontSize: 10, color: dim, letterSpacing: 1 }}>
        © 2026 KARTHIK · CC-BY 4.0 · TYPESET IN MONASPACE RADON × CAVEAT · MMXXVI
      </div>
      <MarginEq top={420} color={t.accent}>∀ε &gt; 0<br />∃ idea</MarginEq>
      <MarginEq top={820} color={plum}>lim<sub>t→∞</sub><br />K(t)</MarginEq>
      <MarginEq top={1280} color={navy}>see<br />Fig. 1?</MarginEq>
    </section>
  );
};

const HeroMinimal = ({ onPageClick }) => {
  const t = useT();
  return (
    <section style={{ padding: '120px 56px 80px 120px', position: 'relative', minHeight: 720 }}>
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <div onClick={onPageClick} style={{ fontFamily: t.fonts.hand, fontSize: 24, color: t.accent, cursor: 'pointer', userSelect: 'none' }}>page 1 / ∞</div>
      </div>
      <div style={{ textAlign: 'center', marginTop: 100 }}>
        <div style={{ fontFamily: t.fonts.hand, fontSize: 360, lineHeight: 0.9, color: t.palette.ink, fontWeight: 700 }}>
          K<span style={{ color: t.accent }}>.</span>
        </div>
        <div style={{ fontFamily: t.fonts.serif, fontStyle: 'italic', fontSize: 26, color: t.palette.pencil, marginTop: 32 }}>
          — a personal notebook by Karthik
        </div>
        <div style={{ fontFamily: MONO, fontSize: 12, color: t.palette.pencil, marginTop: 16, letterSpacing: 2 }}>
          {new Date().toLocaleDateString('en-GB').split('/').join(' · ')} · {V2.location.toUpperCase()}
        </div>
        <div style={{ fontFamily: t.fonts.hand, fontSize: 28, color: t.accent, marginTop: 56 }}>~ open at any page ~</div>
      </div>
      <MarginEq top={400} color={t.accent}>scratch<br />paper<br />ahead.</MarginEq>
    </section>
  );
};

// ─── About ───────────────────────────────────────────────────────────
const About = () => {
  const t = useT(); const c = V2;
  return (
    <section id="about" style={{ padding: t.dense ? '40px 56px 40px 120px' : '64px 56px 56px 120px', position: 'relative' }}>
      <Reveal><H2 n="01">ABOUT</H2></Reveal>
      <Reveal delay={120}>
        <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 56 }}>
          <div style={{ fontFamily: t.fonts.serif, fontSize: 22, lineHeight: 1.55, color: t.palette.ink }}>
            <p style={{ margin: '0 0 18px' }}>I split my time between problem sets and weird little programs. Math gives me the rules; code lets me break them, fast.</p>
            <p style={{ margin: '0 0 18px' }}>The thing I actually care about: <u style={{ textDecorationColor: t.accent, textDecorationThickness: 2, textUnderlineOffset: 4 }}>biotech</u>. The last century was engineered in silicon — the next one will be engineered in <i>cells</i>, and I want to be in the room when it happens.</p>
            <p style={{ margin: '0 0 18px' }}>I grew up in Bengaluru for eight years. Two months ago I moved to Gurgaon. Still finding my footing, but the curiosity came with me.</p>
            <p style={{ margin: '0 0 18px' }}>I write villains who aren't wrong — I'm not sure that's intentional. I keep a notebook. By 20, I'd like to be at IISc. That's the plan, anyway.</p>
            <p style={{ margin: 0 }}>The novel is called <i>Future Human</i>. The villain makes a point I haven't been able to argue with yet.</p>
          </div>
          <div style={{ fontFamily: MONO, fontSize: 13, lineHeight: 2, color: t.palette.ink, paddingTop: 4 }}>
            <div><span style={{ color: t.palette.pencil }}>// stack</span></div>
            <div>{c.stack.join(', ')}</div>
            <div style={{ marginTop: 12 }}><span style={{ color: t.palette.pencil }}>// loves</span></div>
            <div>{c.loves.join(', ')}</div>
            <div style={{ marginTop: 12 }}><span style={{ color: t.palette.pencil }}>// fuel</span></div>
            <div>problem sets, curiosity that compounds, the work itself</div>
          </div>
        </div>
      </Reveal>
    </section>
  );
};

// ─── Quotes ──────────────────────────────────────────────────────────
const Quotes = () => {
  const t = useT();
  const [qFilter, setQFilter] = React.useState('all');
  const qTags = [
    { key: 'all',       label: 'All'       },
    { key: 'self',      label: 'Self'      },
    { key: 'maths',     label: 'Maths'     },
    { key: 'biology',   label: 'Biology'   },
    { key: 'physics',   label: 'Physics'   },
    { key: 'chemistry', label: 'Chemistry' },
    { key: 'cscience',  label: 'C.Science' },
  ];
  const visible = qFilter === 'all' ? V2.quotes : V2.quotes.filter(q => q.tag === qFilter);
  return (
    <section id="quotes" style={{ padding: t.dense ? '40px 56px 40px 120px' : '64px 56px 56px 120px', position: 'relative' }}>
      <Reveal><H2 n="04">NICE QUOTES</H2></Reveal>
      <div style={{ display: 'flex', gap: 10, margin: '10px 0 24px', flexWrap: 'wrap' }}>
        {qTags.map(({ key, label }) => (
          <button key={key} onClick={() => setQFilter(key)} style={{
            fontFamily: MONO, fontSize: 11, letterSpacing: 1,
            padding: '4px 14px', borderRadius: 3, cursor: 'pointer',
            border: `1.5px solid ${qFilter === key ? t.accent : t.palette.rule}`,
            background: qFilter === key ? t.accent : 'transparent',
            color: qFilter === key ? '#fff' : t.palette.pencil,
            transition: 'all .18s',
          }}>{label}</button>
        ))}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32, rowGap: 28 }}>
        {visible.map((q, i) => (
          <div key={q.text}
            onMouseEnter={(e) => e.currentTarget.style.transform = `rotate(${i % 2 === 0 ? -1.5 : 1.5}deg)`}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'rotate(0deg)'}
            style={{ transition: 'transform .25s', position: 'relative', paddingLeft: 32, paddingRight: 12 }}>
            <span style={{ position: 'absolute', left: 0, top: -16, fontFamily: t.fonts.serif, fontSize: 80, color: t.accent, fontStyle: 'italic', lineHeight: 1 }}>"</span>
            <div style={{ fontFamily: t.fonts.hand, fontSize: 30, lineHeight: 1.25, color: t.palette.ink }}>{q.text}</div>
            <div style={{ marginTop: 8, fontFamily: t.fonts.serif, fontStyle: 'italic', fontSize: 14, color: t.palette.pencil }}>— {q.attrib}</div>
          </div>
        ))}
      </div>
    </section>
  );
};

window.Nav = Nav;
window.HeroClassic = HeroClassic; window.HeroEquation = HeroEquation; window.HeroMinimal = HeroMinimal;
window.About = About; window.Quotes = Quotes;
