// v2-sections-b.jsx


// Keyboard Shortcuts
const KeyboardShortcuts = () => {
  const t = useT();
  React.useEffect(() => {
    const essays = window.ESSAYS || [];
    let openIdx = null;
    const setOpen = (i) => {
      openIdx = i;
      window.__setEssayIdx && window.__setEssayIdx(i);
    };
    const onKey = (e) => {
      if (e.target.matches('input,textarea,[contenteditable]')) return;
      if (e.key === 'q' || e.key === 'Q') { setOpen(null); }
      if (e.key === 'j' || e.key === 'J') {
        const next = openIdx === null ? 0 : Math.min(openIdx + 1, essays.length - 1);
        setOpen(next);
        document.getElementById('writing')?.scrollIntoView({ behavior: 'smooth' });
      }
      if (e.key === 'k' || e.key === 'K') {
        const prev = openIdx === null ? essays.length - 1 : Math.max(openIdx - 1, 0);
        setOpen(prev);
        document.getElementById('writing')?.scrollIntoView({ behavior: 'smooth' });
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);
  return null;
};

// Writing
const Writing = () => {
  const t = useT();
  const essays = (window.ESSAYS && window.ESSAYS.length) ? window.ESSAYS : [];
  const [openIdx, setOpenIdx] = React.useState(null);
  React.useEffect(() => { window.__setEssayIdx = setOpenIdx; return () => { window.__setEssayIdx = null; }; }, [setOpenIdx]);
  const [essayFilter, setEssayFilter] = React.useState('all');
  const essayTagMap = { 1: 'biology', 2: 'biology', 3: 'code' };
  const visibleEssays = essayFilter === 'all' ? essays : essays.filter(e => essayTagMap[e.num] === essayFilter);

  return (
    <section id="writing" style={{ padding: t.dense ? '40px 56px 40px 120px' : '64px 56px 56px 120px', position: 'relative' }}>
      <Reveal><H2 n="05">ESSAYS</H2></Reveal>
      <div style={{ fontFamily: MONO, fontSize: 11, color: t.palette.pencil, letterSpacing: 1, marginTop: 8, marginBottom: 16, opacity: 0.7 }}>
        // shortcuts &nbsp;·&nbsp; <span style={{ color: t.accent }}>j</span> next &nbsp;·&nbsp; <span style={{ color: t.accent }}>k</span> prev &nbsp;·&nbsp; <span style={{ color: t.accent }}>q</span> close &nbsp;·&nbsp; <span style={{ color: t.accent }}>f</span> ?
      </div>

      <div style={{ display: 'flex', gap: 10, margin: '10px 0 20px', flexWrap: 'wrap' }}>
        {['all', 'biology', 'code', 'math', 'life'].map(cat => (
          <button key={cat} onClick={() => setEssayFilter(cat)} style={{
            fontFamily: MONO, fontSize: 11, letterSpacing: 1,
            padding: '3px 12px', borderRadius: 3, cursor: 'pointer',
            border: `1.5px solid ${essayFilter === cat ? t.accent : t.palette.rule}`,
            background: essayFilter === cat ? t.accent : 'transparent',
            color: essayFilter === cat ? '#fff' : t.palette.pencil,
            transition: 'all .18s',
          }}>{cat}</button>
        ))}
      </div>
      <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
        {visibleEssays.map((w, i) => {
          const open = openIdx === i;
          const hasBody = !!w.body;
          return (
            <Reveal key={i} delay={i * 25}>
              <li style={{ borderTop: i === 0 ? `1px dashed ${t.palette.rule}` : 'none', borderBottom: `1px dashed ${t.palette.rule}` }}>
                <div
                  onClick={() => hasBody && setOpenIdx(open ? null : i)}
                  style={{ padding: '18px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', cursor: hasBody ? 'pointer' : 'default', paddingLeft: 44, position: 'relative', userSelect: 'none' }}>
                  <span style={{ position: 'absolute', left: 0, top: 22, fontFamily: t.fonts.hand, fontSize: 22, color: t.accent, width: 36, textAlign: 'right', paddingRight: 6 }}>{i + 1})</span>
                  <div>
                    <div style={{ fontFamily: t.fonts.serif, fontStyle: 'italic', fontSize: 26, color: t.palette.ink }}>{subAge(w.title)}</div>
                    <div style={{ fontFamily: MONO, fontSize: 11, color: t.palette.pencil, marginTop: 4, letterSpacing: 1 }}>{(w.date || '').toUpperCase()} · {w.body ? `${Math.max(1, Math.round(w.body.split(' ').length / 200))} min` : w.read}</div>
                  </div>
                  <span style={{
                    fontFamily: t.fonts.hand, fontSize: 32, color: t.accent,
                    transition: 'transform .25s cubic-bezier(.2,.7,.3,1)',
                    transform: open ? 'rotate(90deg)' : 'rotate(0deg)',
                    display: 'inline-block',
                  }}>→</span>
                </div>
                {open && hasBody && (
                  <div style={{
                    padding: '8px 56px 36px 44px',
                    background: t.dark ? 'rgba(240,235,216,0.04)' : 'rgba(192,57,43,0.025)',
                    borderTop: `1px solid ${t.palette.rule}`,
                    animation: 'essayFade .35s ease',
                  }}>
                    <style>{`@keyframes essayFade { from { opacity: 0; transform: translateY(-6px) } to { opacity: 1; transform: translateY(0) } }`}</style>
                    <div style={{ maxWidth: 720, fontFamily: t.fonts.serif, fontSize: 18, lineHeight: 1.7, color: t.palette.ink }}>
                      {subAge(w.body).split(/\n\n+/).map((para, j) => (
                        <p key={j} style={{ margin: j === 0 ? '8px 0 1em' : '0 0 1em', textWrap: 'pretty' }}>
                          {j === 0 ? (
                            <React.Fragment>
                              <span style={{ float: 'left', fontFamily: t.fonts.hand, fontSize: 56, lineHeight: 0.85, paddingRight: 10, paddingTop: 4, color: t.accent }}>{para.charAt(0)}</span>
                              {para.slice(1)}
                            </React.Fragment>
                          ) : para}
                        </p>
                      ))}
                      <div style={{ marginTop: 24, paddingTop: 16, borderTop: `1px dashed ${t.palette.rule}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div style={{ fontFamily: MONO, fontSize: 11, color: t.palette.pencil, letterSpacing: 1 }}>END · ESSAY {String(w.num || (i + 1)).padStart(2, '0')} · {(w.date || '').toUpperCase()}</div>
                        <div style={{ display: 'flex', gap: 10 }}>
                          <button onClick={(e) => { e.stopPropagation(); const d = document.createElement('a'); d.href = 'data:text/plain;charset=utf-8,' + encodeURIComponent(w.title + '\n\n' + w.body); d.download = w.title.replace(/[^a-z0-9]/gi,'_') + '.txt'; d.click(); }} style={{
                            fontFamily: t.fonts.hand, fontSize: 20, color: t.palette.pencil, background: 'transparent',
                            border: `1.5px solid ${t.palette.rule}`, padding: '4px 14px', cursor: 'pointer', borderRadius: 3,
                          }}>save ↓</button>
                          <button onClick={(e) => { e.stopPropagation(); setOpenIdx(null); }} style={{
                            fontFamily: t.fonts.hand, fontSize: 20, color: t.accent, background: 'transparent',
                            border: `1.5px solid ${t.accent}`, padding: '4px 14px', cursor: 'pointer', borderRadius: 3,
                          }}>close ↑</button>
                        </div>
                      </div>
                      {visibleEssays.filter((_, j) => j !== i).length > 0 && (
                        <div style={{ marginTop: 24, paddingTop: 16, borderTop: `1px dashed ${t.palette.rule}` }}>
                          <div style={{ fontFamily: MONO, fontSize: 11, color: t.palette.pencil, letterSpacing: 1, marginBottom: 12 }}>// READ NEXT</div>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                            {visibleEssays.filter((_, j) => j !== i).map((related, k) => (
                              <div key={k}
                                onClick={(e) => { e.stopPropagation(); setOpenIdx(visibleEssays.indexOf(related)); }}
                                style={{ display: 'flex', alignItems: 'baseline', gap: 12, cursor: 'pointer' }}>
                                <span style={{ fontFamily: t.fonts.hand, color: t.accent, fontSize: 20 }}>→</span>
                                <span style={{ fontFamily: t.fonts.serif, fontStyle: 'italic', fontSize: 18, color: t.palette.ink, borderBottom: `1px solid transparent`, transition: 'border-color .15s' }}
                                  onMouseEnter={(e) => e.target.style.borderColor = t.accent}
                                  onMouseLeave={(e) => e.target.style.borderColor = 'transparent'}>
                                  {related.title}
                                </span>
                                <span style={{ fontFamily: MONO, fontSize: 11, color: t.palette.pencil }}>{related.read}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </li>
            </Reveal>
          );
        })}
      </ul>
    </section>
  );
};


// Quote Card 
const QuoteCard = ({ q, i, t }) => {
  const [copied, setCopied] = React.useState(false);
  const copy = (e) => {
    e.stopPropagation();
    navigator.clipboard.writeText(`"${q.text}" — ${q.attrib}`).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    });
  };
  return (
    <div
      onMouseEnter={(e) => { e.currentTarget.style.transform = `rotate(${i % 2 === 0 ? -1.5 : 1.5}deg)`; e.currentTarget.querySelector('.copy-btn').style.opacity = '1'; }}
      onMouseLeave={(e) => { e.currentTarget.style.transform = 'rotate(0deg)'; e.currentTarget.querySelector('.copy-btn').style.opacity = '0'; }}
      style={{ transition: 'transform .25s', position: 'relative', paddingLeft: 32, paddingRight: 12 }}>
      <span style={{ position: 'absolute', left: 0, top: -16, fontFamily: t.fonts.serif, fontSize: 80, color: t.accent, fontStyle: 'italic', lineHeight: 1 }}>"</span>
      <div style={{ fontFamily: t.fonts.hand, fontSize: 30, lineHeight: 1.25, color: t.palette.ink }}>{q.text}</div>
      <div style={{ marginTop: 8, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ fontFamily: t.fonts.serif, fontStyle: 'italic', fontSize: 14, color: t.palette.pencil }}>— {q.attrib}</div>
        <button className="copy-btn" onClick={copy} style={{
          opacity: 0, transition: 'opacity .2s',
          fontFamily: MONO, fontSize: 10, letterSpacing: 1,
          color: copied ? t.palette.accents.forest : t.palette.pencil,
          background: 'transparent', border: 'none', cursor: 'pointer', padding: '2px 6px',
        }}>{copied ? '✓ copied' : 'copy'}</button>
      </div>
    </div>
  );
};

// Shelf 
const Reading = () => {
  const t = useT(); const c = V2;
  const stateLabel = (s) => ({ reading: '☞ now', done: '✓ done', queued: '○ queued', 're-reading': '↺ again' }[s] || s);
  return (
    <section id="shelf" style={{ padding: t.dense ? '40px 56px 40px 120px' : '64px 56px 56px 120px', position: 'relative' }}>
      <Reveal><H2 n="07">THE SHELF</H2></Reveal>
      <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 48px' }}>
        {c.reading.map((r, i) => (
          <Reveal key={i} delay={i * 50}>
            <li style={{ padding: '14px 0', borderTop: i < 2 ? 'none' : `1px dashed ${t.palette.rule}`, display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 16 }}>
              <div style={{ fontFamily: t.fonts.serif, fontSize: 18, color: t.palette.ink }}>
                <span style={{ fontStyle: 'italic' }}>{r.title}</span>
                <span style={{ color: t.palette.pencil }}> · {r.author}</span>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontFamily: t.fonts.hand, fontSize: 18, color: r.state === 'reading' ? t.accent : t.palette.pencil, whiteSpace: 'nowrap' }}>
                  {stateLabel(r.state)}
                </div>
                {r.state === 'reading' && (
                  <div style={{ marginTop: 6, display: 'flex', alignItems: 'center', gap: 8, justifyContent: 'flex-end' }}>
                    <div style={{ width: 90, height: 5, background: 'rgba(26,58,92,0.12)', borderRadius: 3, overflow: 'hidden' }}>
                      <div style={{ width: '20%', height: '100%', background: t.accent, borderRadius: 3 }} />
                    </div>
                    <span style={{ fontFamily: MONO, fontSize: 10, color: t.palette.pencil }}>~120/490p</span>
                  </div>
                )}
                {r.state === 'done' && r.note && (
                  <div style={{ fontFamily: t.fonts.serif, fontStyle: 'italic', fontSize: 13, color: t.palette.pencil, marginTop: 4, maxWidth: 220, textAlign: 'right', lineHeight: 1.4 }}>
                    "{r.note}"
                  </div>
                )}
              </div>
            </li>
          </Reveal>
        ))}
      </ul>
    </section>
  );
};

// Now
const Now = () => {
  const t = useT(); const c = V2;
  const thoughts = V2.thinking || [];
  const [thinkIdx, setThinkIdx] = React.useState(0);
  React.useEffect(() => {
    if (!thoughts.length) return;
    const id = setInterval(() => setThinkIdx(n => (n + 1) % thoughts.length), 4000);
    return () => clearInterval(id);
  }, [thoughts.length]);
  return (
    <section id="now" style={{ padding: t.dense ? '40px 56px 40px 120px' : '64px 56px 56px 120px', position: 'relative' }}>
      <Reveal><H2 n="08">RIGHT NOW</H2></Reveal>
      {thoughts.length > 0 && (
        <div style={{
          fontFamily: MONO, fontSize: 12, color: t.palette.pencil,
          borderLeft: `3px solid ${t.accent}`, paddingLeft: 14,
          marginBottom: 20, letterSpacing: 0.4,
        }}>
          <span style={{ color: t.accent }}>// thinking → </span>
          <span style={{ transition: 'opacity .4s' }}>{thoughts[thinkIdx]}</span>
        </div>
      )}
      <Reveal delay={100}>
        <div style={{ marginTop: 4, padding: 28, border: `2px dashed ${t.palette.pencil}`, background: t.palette.cardBg, position: 'relative' }}>
          <div style={{ position: 'absolute', top: -14, left: 24, background: t.palette.bg, padding: '0 10px', fontFamily: MONO, fontSize: 11, color: t.palette.pencil, letterSpacing: 1 }}>{`// status.txt — week of ${new Date().toLocaleDateString('en-GB')}`}</div>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {c.now.map((n, i) => (
              <li key={i} style={{ fontFamily: t.fonts.serif, fontSize: 20, lineHeight: 1.55, marginBottom: 10, paddingLeft: 32, position: 'relative', color: t.palette.ink }}>
                <span style={{ position: 'absolute', left: 0, fontFamily: t.fonts.hand, color: t.accent, fontSize: 24 }}>→</span>{n}
              </li>
            ))}
          </ul>
        </div>
      </Reveal>
    </section>
  );
};

// CV 
const Resume = () => {
  const t = useT();
  const tagColor = { study: t.accent, build: t.palette.accents.forest, school: t.palette.accents.navy, win: t.palette.accents.plum, plan: t.palette.accents.plum };
  return (
    <section id="cv" style={{ padding: t.dense ? '40px 56px 40px 120px' : '64px 56px 56px 120px', position: 'relative' }}>
      <Reveal><H2 n="09">RÉSUMÉ · THE LONG-FORM</H2></Reveal>
      <Reveal delay={80}>
        <div style={{ fontFamily: t.fonts.serif, fontStyle: 'italic', fontSize: 16, color: t.palette.pencil, marginBottom: 24 }}>
          {subAge("a {ageWord}-year-old's CV is mostly a promise. here's mine.")}
        </div>
      </Reveal>
      <div style={{ display: 'grid', gridTemplateColumns: '180px 1fr 1fr 80px', gap: '0 24px', fontFamily: t.fonts.serif, fontSize: 18, color: t.palette.ink }}>
        <Reveal><div style={{ fontFamily: MONO, fontSize: 11, color: t.palette.pencil, letterSpacing: 1, paddingBottom: 12, borderBottom: `2px solid ${t.palette.ink}` }}>WHEN</div></Reveal>
        <Reveal delay={40}><div style={{ fontFamily: MONO, fontSize: 11, color: t.palette.pencil, letterSpacing: 1, paddingBottom: 12, borderBottom: `2px solid ${t.palette.ink}` }}>WHAT</div></Reveal>
        <Reveal delay={80}><div style={{ fontFamily: MONO, fontSize: 11, color: t.palette.pencil, letterSpacing: 1, paddingBottom: 12, borderBottom: `2px solid ${t.palette.ink}` }}>WHERE</div></Reveal>
        <Reveal delay={120}><div style={{ fontFamily: MONO, fontSize: 11, color: t.palette.pencil, letterSpacing: 1, paddingBottom: 12, borderBottom: `2px solid ${t.palette.ink}`, textAlign: 'right' }}>TAG</div></Reveal>
        {V2.resume.map((r, i) => (
          <React.Fragment key={i}>
            <Reveal delay={i * 50}><div style={{ padding: '16px 0', borderBottom: `1px dashed ${t.palette.rule}`, fontFamily: t.fonts.hand, fontSize: 22, color: t.accent }}>{r.when}</div></Reveal>
            <Reveal delay={i * 50 + 30}><div style={{ padding: '16px 0', borderBottom: `1px dashed ${t.palette.rule}` }}>{r.what}</div></Reveal>
            <Reveal delay={i * 50 + 60}><div style={{ padding: '16px 0', borderBottom: `1px dashed ${t.palette.rule}`, color: t.palette.inkSoft, fontStyle: 'italic' }}>{r.where}</div></Reveal>
            <Reveal delay={i * 50 + 90}><div style={{ padding: '16px 0', borderBottom: `1px dashed ${t.palette.rule}`, textAlign: 'right', fontFamily: MONO, fontSize: 11, letterSpacing: 1, color: tagColor[r.tag] || t.palette.pencil, textTransform: 'uppercase' }}>· {r.tag}</div></Reveal>
          </React.Fragment>
        ))}
      </div>
    </section>
  );
};

// Working Toward
const WorkingToward = () => {
  const t = useT(); const c = V2;
  const w = c.workingToward;
  if (!w) return null;
  return (
    <section id="toward" style={{ padding: t.dense ? '40px 56px 40px 120px' : '64px 56px 56px 120px', position: 'relative' }}>
      <Reveal><H2 n="10">WORKING TOWARD</H2></Reveal>
      <Reveal delay={80}>
        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 48, marginTop: 8 }}>
          <div>
            <div style={{ fontFamily: t.fonts.hand, fontSize: 36, color: t.palette.ink, fontWeight: 700, lineHeight: 1.2, marginBottom: 16 }}>{w.goal}</div>
            <div style={{ fontFamily: t.fonts.serif, fontSize: 18, lineHeight: 1.65, color: t.palette.inkSoft }}>{w.why}</div>
          </div>
          <div style={{ paddingTop: 8 }}>
            <div style={{ fontFamily: MONO, fontSize: 11, color: t.palette.pencil, letterSpacing: 1, marginBottom: 16 }}>// STEPS · TARGET {w.by}</div>
            {w.steps.map((step, i) => (
              <div key={i} style={{ display: 'flex', gap: 12, marginBottom: 14, alignItems: 'flex-start' }}>
                <span style={{ fontFamily: t.fonts.hand, color: t.accent, fontSize: 22, lineHeight: 1.2 }}>{i + 1}.</span>
                <span style={{ fontFamily: t.fonts.serif, fontSize: 17, color: t.palette.ink, lineHeight: 1.5 }}>{step}</span>
              </div>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
};



// Changelog List 
const ChangelogList = ({ log, t }) => {
  const [showAll, setShowAll] = React.useState(false);
  const visible = showAll ? log : log.slice(0, 5);
  return (
    <div style={{ fontFamily: MONO, fontSize: 13, lineHeight: 1 }}>
      {visible.map((entry, i) => (
        <Reveal key={i} delay={i * 40}>
          <div style={{ display: 'grid', gridTemplateColumns: '52px 110px 1fr', gap: 16, padding: '10px 0', borderBottom: `1px dashed ${t.palette.rule}`, alignItems: 'baseline' }}>
            <span style={{ color: t.accent, fontWeight: 600 }}>{entry.v}</span>
            <span style={{ color: t.palette.pencil, fontSize: 11 }}>{entry.date}</span>
            <span style={{ color: t.palette.ink, fontSize: 12, lineHeight: 1.5 }}>{entry.note}</span>
          </div>
        </Reveal>
      ))}
      {log.length > 5 && (
        <div style={{ marginTop: 14 }}>
          <button onClick={() => setShowAll(v => !v)} style={{
            fontFamily: MONO, fontSize: 11, letterSpacing: 1,
            color: t.accent, background: 'transparent',
            border: `1px solid ${t.palette.rule}`, padding: '4px 14px',
            cursor: 'pointer', borderRadius: 3,
          }}>
            {showAll ? '↑ show less' : `↓ show ${log.length - 5} older entries`}
          </button>
        </div>
      )}
    </div>
  );
};

// Changelog
const Changelog = () => {
  const t = useT();
  const log = [
    { v: "v45", date: "27 May 2026", note: "Quote of the day. Save essay. Typos fixed. handle removed." },
    { v: "v44", date: "27 May 2026", note: "Personal edits — now, resume, abstract, changelog rewritten." },
    { v: "v40", date: "27 May 2026", note: "Troubleshoot success, site working." },
    { v: "v43", date: "27 May 2026", note: "Quote search bar added." },
    { v: "v42", date: "27 May 2026", note: "Random Additions 4." },
    { v: "v41", date: "27 May 2026", note: "Random Additions 3." },
    { v: "v40", date: "27 May 2026", note: "Essay filter added." },
    { v: "v39", date: "27 May 2026", note: "Essay #3 tagged as code." },
    { v: "v38", date: "26 May 2026", note: "Essay #3 published." },
    { v: "v37", date: "26 May 2026", note: "Shortcut bar." },
    { v: "v36", date: "26 May 2026", note: "Keyboard shortcuts (j/k/q) for essay navigation." },
    { v: "v35", date: "26 May 2026", note: "Thinking rotator." },
    { v: "v34", date: "26 May 2026", note: "Random additions 2." },
    { v: "v33", date: "26 May 2026", note: "Random additions." },
    { v: "v32", date: "26 May 2026", note: "Share button added to footer." },
    { v: "v31", date: "25 May 2026", note: "Right Now updated" },
    { v: "v30", date: "25 May 2026", note: "All dates switched to Indian Standard Time." },
    { v: "v29", date: "25 May 2026", note: "Essay Filter made." },
    { v: "v27", date: "25 May 2026", note: "Essay #2 published." },
    { v: "v26", date: "25 May 2026", note: "Changelog added." },
    { v: "v25", date: "25 May 2026", note: "Shelf updated." },
    { v: "v24", date: "25 May 2026", note: "Books marked done." },
    { v: "v23", date: "25 May 2026", note: "Quotes updated." },
    { v: "v21", date: "25 May 2026", note: "More Dynamic." },
    { v: "v20", date: "25 May 2026", note: "Attempted Cleanup." },
    { v: "v17", date: "24 May 2026", note: "Site launched on GitHub Pages. (Netlify ass)" },
    { v: "v15", date: "24 May 2026", note: "Working Toward section added." },
    { v: "v12", date: "24 May 2026", note: "About section updated." },
    { v: "v10", date: "24 May 2026", note: "Drawings added." },
    { v: "v9",  date: "24 May 2026", note: "More Quotes." },
    { v: "v8",  date: "24 May 2026", note: "Heavy Rebuilding of the original site." },
    { v: "v1",  date: "23 May 2026", note: "First commit." },
  ];
  return (
    <section id="changelog" style={{ padding: t.dense ? '40px 56px 40px 120px' : '64px 56px 56px 120px', position: 'relative' }}>
      <Reveal><H2 n="11">CHANGELOG</H2></Reveal>
      <Reveal delay={80}>
        <div style={{ fontFamily: MONO, fontSize: 12, color: t.palette.pencil, marginBottom: 20, letterSpacing: 0.5 }}>
          // git log --oneline karthik.dev
        </div>
      </Reveal>
      <ChangelogList log={log} t={t} />
    </section>
  );
};


// Share Button 
const ShareButton = ({ t }) => {
  const [copied, setCopied] = React.useState(false);
  const share = () => {
    const url = window.location.href;
    if (navigator.share) {
      navigator.share({ title: 'karthik · personal notebook', url });
    } else {
      navigator.clipboard.writeText(url).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      });
    }
  };
  return (
    <button onClick={share} style={{
      fontFamily: t.fonts.hand, fontSize: 24,
      color: copied ? t.palette.pencil : t.accent,
      background: 'transparent',
      border: `2px solid ${copied ? t.palette.rule : t.accent}`,
      padding: '8px 28px', cursor: 'pointer', borderRadius: 3,
      transform: 'rotate(-1deg)',
      transition: 'all .2s',
      display: 'flex', alignItems: 'center', gap: 12,
    }}>
      <span>{copied ? '✓ copied' : '↗ share this site'}</span>
    </button>
  );
};

// Contact
const Contact = () => {
  const t = useT(); const c = V2;
  return (
    <section id="hello" style={{ padding: t.dense ? '40px 56px 80px 120px' : '64px 56px 120px 120px', position: 'relative' }}>
      <Reveal>
        <div style={{ fontFamily: t.fonts.hand, fontSize: 120, lineHeight: 1, color: t.palette.ink, fontWeight: 700 }}>
          find me here<span style={{ color: t.accent }}>.</span>
        </div>
      </Reveal>
      <Reveal delay={60}>
        <div style={{ fontFamily: t.fonts.serif, fontSize: 20, color: t.palette.inkSoft, marginTop: 16, marginBottom: 8, maxWidth: 560, lineHeight: 1.6 }}>
          If you're working on something in biology, math, or systems — or you just read something I wrote and want to push back on it — I'd like to hear from you.
        </div>
      </Reveal>
      <Reveal delay={120}>
        <div style={{ display: 'flex', gap: 40, marginTop: 32, fontFamily: MONO, fontSize: 18, flexWrap: 'wrap' }}>
          <a style={{ color: t.palette.ink, textDecoration: 'none', borderBottom: `2px solid ${t.accent}`, paddingBottom: 2, cursor: 'pointer' }} href={`mailto:${c.email}`}>
            <span style={{ color: t.accent, marginRight: 8 }}>✉</span>{c.email}
          </a>
          <a style={{ color: t.palette.ink, textDecoration: 'none', borderBottom: `2px solid ${t.accent}`, paddingBottom: 2, cursor: 'pointer' }} href={`https://github.com/${c.github}`} target="_blank" rel="noreferrer">
            <span style={{ color: t.accent, marginRight: 8 }}>⌨</span>github / {c.github}
          </a>
        </div>
      </Reveal>
      <Reveal delay={300}>
        <div style={{ position: 'absolute', right: 80, bottom: 80, fontFamily: t.fonts.hand, fontSize: 24, color: t.accent, transform: 'rotate(-4deg)' }}>
          p.s. tell me what you're doing.
        </div>
      </Reveal>
      <Reveal delay={350}>
        <div style={{ marginTop: 48 }}>
          <ShareButton t={t} />
        </div>
      </Reveal>
      <Reveal delay={400}>
        <div style={{ marginTop: 40, fontFamily: MONO, fontSize: 10, color: t.palette.pencil, letterSpacing: 1, textTransform: 'uppercase' }}>
          {`PAGE ∞ / ∞ · SITE END · ${V2.location.toUpperCase()} · LAST UPDATED ${new Date().toLocaleDateString('en-GB', { timeZone: 'Asia/Kolkata', day:'2-digit', month:'short', year:'numeric' }).toUpperCase()}`}
        </div>
      </Reveal>
    </section>
  );
};

// Easter egg
const FermatNote = ({ open, onClose }) => {
  const t = useT();
  if (!open) return null;
  return (
    <div onClick={onClose} style={{
      position: 'fixed', inset: 0, zIndex: 200,
      background: t.dark ? 'rgba(0,0,0,0.55)' : 'rgba(254,252,243,0.65)',
      backdropFilter: 'blur(2px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 32,
      animation: 'fermatFade .4s ease',
    }}>
      <style>{`@keyframes fermatFade { from { opacity: 0; } to { opacity: 1; } }
               @keyframes fermatNote { from { opacity: 0; transform: rotate(-6deg) translateY(20px); } to { opacity: 1; transform: rotate(-3deg) translateY(0); } }`}</style>
      <div style={{
        background: t.dark ? '#f0ebd8' : '#fffbe6', color: '#1e3a5f',
        padding: '32px 36px', maxWidth: 560, border: '2px solid #1e3a5f',
        boxShadow: '12px 16px 0 rgba(0,0,0,0.18)', transform: 'rotate(-3deg)',
        animation: 'fermatNote .5s cubic-bezier(.2,.7,.3,1)', position: 'relative',
      }} onClick={(e) => e.stopPropagation()}>
        <div style={{ position: 'absolute', top: -16, left: 30, background: 'rgba(244,211,94,0.85)', width: 90, height: 22, transform: 'rotate(-7deg)' }} />
        <div style={{ fontFamily: '"Caveat", cursive', fontSize: 28, color: '#c0392b', marginBottom: 10 }}>scribbled in the margin —</div>
        <div style={{ fontFamily: '"Newsreader", Georgia, serif', fontStyle: 'italic', fontSize: 22, lineHeight: 1.45 }}>
          "I have discovered a truly remarkable proof of this proposition, which this margin is too narrow to contain."
        </div>
        <div style={{ marginTop: 14, fontFamily: '"Newsreader", serif', fontSize: 14, color: '#5a6470', fontStyle: 'italic' }}>— Fermat, 1637</div>
        <div style={{ marginTop: 18, fontFamily: '"Caveat", cursive', fontSize: 22, color: '#1e3a5f' }}> Good Job. You found the easter egg.</div>
        <div style={{ marginTop: 6, fontFamily: '"JetBrains Mono", monospace', fontSize: 11, color: '#5a6470' }}>(click anywhere to dismiss)</div>
      </div>
    </div>
  );
};

// Coding Timeline
const CodingTimeline = () => {
  const t = useT();
  const items = [
    { name: "HTML",   level: "basic",    start: 2023, end: 2025, ongoing: false },
    { name: "Ruby",   level: "basic",    start: 2024, end: 2024, ongoing: false },
    { name: "Unreal", level: "advanced", start: 2024, end: 2026, ongoing: true  },
    { name: "Unity",  level: "basic",    start: 2024, end: 2024, ongoing: false },
    { name: "C",      level: "medium",   start: 2025, end: 2026, ongoing: true  },
    { name: "C++",    level: "basic",    start: 2025, end: 2026, ongoing: false },
    { name: "Python", level: "basic",    start: 2026, end: 2026, ongoing: true  },
  ];
  const yearStart = 2023, yearEnd = 2026.6;
  const span = yearEnd - yearStart;
  const pos = (y) => ((y - yearStart) / span) * 100;
  const levelColor = { basic: t.palette.pencil, medium: t.palette.accents.navy, advanced: t.accent };
  const levelPips = { basic: 1, medium: 2, advanced: 3 };
  const years = [2023, 2024, 2025, 2026];

  return (
    <section id="code" style={{ padding: t.dense ? '40px 56px 40px 120px' : '64px 56px 56px 120px', position: 'relative' }}>
      <Reveal><H2 n="03">CODING TIMELINE</H2></Reveal>
      <Reveal delay={80}>
        <div style={{ fontFamily: t.fonts.serif, fontStyle: 'italic', fontSize: 16, color: t.palette.pencil, marginBottom: 24 }}>
          languages &amp; engines, in order of arrival. "ongoing" means it's still on the desk.
        </div>
      </Reveal>
      <Reveal delay={120}>
        <div style={{ position: 'relative', marginTop: 12 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '110px 1fr 120px', gap: 20, alignItems: 'end', marginBottom: 10 }}>
            <div style={{ fontFamily: MONO, fontSize: 10, letterSpacing: 1.5, color: t.palette.pencil, textTransform: 'uppercase' }}>language</div>
            <div style={{ position: 'relative', height: 22 }}>
              {years.map((y) => (
                <div key={y} style={{ position: 'absolute', left: `${pos(y)}%`, top: 0, fontFamily: MONO, fontSize: 12, color: t.palette.ink, fontWeight: 500, letterSpacing: 0.5, transform: 'translateX(-50%)' }}>{y}</div>
              ))}
              <div style={{ position: 'absolute', left: `${pos(yearEnd - 0.05)}%`, top: 0, fontFamily: MONO, fontSize: 12, color: t.accent, fontWeight: 500, transform: 'translateX(-50%)' }}>→ now</div>
            </div>
            <div style={{ fontFamily: MONO, fontSize: 10, letterSpacing: 1.5, color: t.palette.pencil, textTransform: 'uppercase', textAlign: 'right' }}>level</div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '110px 1fr 120px', gap: 20, marginBottom: 6 }}>
            <div /><div style={{ height: 2, background: t.palette.ink }} /><div />
          </div>
          {items.map((it, i) => (
            <Reveal key={i} delay={i * 70}>
              <div style={{ display: 'grid', gridTemplateColumns: '110px 1fr 120px', gap: 20, alignItems: 'center', padding: '8px 0', borderBottom: `1px dashed ${t.palette.rule}` }}>
                <div style={{ fontFamily: t.fonts.hand, fontSize: 28, color: t.palette.ink, lineHeight: 1, fontWeight: 600 }}>{it.name}</div>
                <div style={{ position: 'relative', height: 32 }}>
                  {years.map((y) => (
                    <div key={y} style={{ position: 'absolute', left: `${pos(y)}%`, top: -4, bottom: -4, width: 1, background: t.palette.rule, opacity: 0.6 }} />
                  ))}
                  <div style={{
                    position: 'absolute',
                    left: `${pos(it.start)}%`,
                    width: `${Math.max(2, pos(it.ongoing ? yearEnd - 0.15 : it.end + 0.6) - pos(it.start))}%`,
                    top: 6, bottom: 6,
                    background: it.ongoing ? `linear-gradient(90deg, ${levelColor[it.level]}33 0%, ${levelColor[it.level]}33 70%, ${levelColor[it.level]}10 100%)` : `${levelColor[it.level]}33`,
                    border: `1.5px solid ${levelColor[it.level]}`,
                    borderRight: it.ongoing ? `1.5px dashed ${levelColor[it.level]}` : `1.5px solid ${levelColor[it.level]}`,
                    borderRadius: 4,
                    display: 'flex', alignItems: 'center', paddingLeft: 10,
                    fontFamily: MONO, fontSize: 10, color: levelColor[it.level], letterSpacing: 1, textTransform: 'uppercase',
                    boxShadow: `1.5px 1.5px 0 ${t.palette.cardShadow}`,
                  }}>
                    <span style={{ whiteSpace: 'nowrap' }}>
                      {it.start === it.end ? `${it.start}` : `${it.start} — ${it.ongoing ? 'now' : it.end}`}
                    </span>
                  </div>
                  {it.ongoing && (
                    <div style={{ position: 'absolute', left: `${pos(yearEnd - 0.1)}%`, top: '50%', transform: 'translate(-50%, -50%)', fontFamily: t.fonts.hand, fontSize: 22, color: levelColor[it.level], fontWeight: 700 }}>→</div>
                  )}
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 4 }}>
                  <div style={{ display: 'flex', gap: 4 }}>
                    {[1, 2, 3].map(p => (
                      <span key={p} style={{ width: 11, height: 11, borderRadius: 6, border: `1.5px solid ${levelColor[it.level]}`, background: p <= levelPips[it.level] ? levelColor[it.level] : 'transparent' }} />
                    ))}
                  </div>
                  <div style={{ fontFamily: MONO, fontSize: 10, color: levelColor[it.level], letterSpacing: 1, textTransform: 'uppercase' }}>{it.level}</div>
                </div>
              </div>
            </Reveal>
          ))}
          <div style={{ marginTop: 18, display: 'flex', gap: 24, fontFamily: MONO, fontSize: 11, color: t.palette.pencil, letterSpacing: 0.5, flexWrap: 'wrap' }}>
            <span><span style={{ display: 'inline-block', width: 10, height: 10, borderRadius: 5, border: `1.5px solid ${levelColor.basic}`, marginRight: 6, verticalAlign: 'middle' }} />basic · 1 pip</span>
            <span><span style={{ display: 'inline-block', width: 10, height: 10, borderRadius: 5, border: `1.5px solid ${levelColor.medium}`, background: levelColor.medium, marginRight: 6, verticalAlign: 'middle' }} />medium · 2 pips</span>
            <span><span style={{ display: 'inline-block', width: 10, height: 10, borderRadius: 5, border: `1.5px solid ${levelColor.advanced}`, background: levelColor.advanced, marginRight: 6, verticalAlign: 'middle' }} />advanced · 3 pips</span>
            <span style={{ marginLeft: 'auto' }}>dashed edge = still ongoing</span>
          </div>
        </div>
      </Reveal>
    </section>
  );
};


// Back to Top 
const BackToTop = () => {
  const t = useT();
  const [visible, setVisible] = React.useState(false);
  React.useEffect(() => {
    const on = () => setVisible(window.scrollY > 600);
    window.addEventListener('scroll', on, { passive: true });
    return () => window.removeEventListener('scroll', on);
  }, []);
  if (!visible) return null;
  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      style={{
        position: 'fixed', bottom: 32, right: 32, zIndex: 100,
        fontFamily: t.fonts.hand, fontSize: 20, color: t.accent,
        background: t.palette.bg, border: `1.5px solid ${t.accent}`,
        borderRadius: 3, padding: '6px 16px', cursor: 'pointer',
        boxShadow: `2px 2px 0 ${t.palette.cardShadow}`,
        transform: 'rotate(-2deg)', transition: 'opacity .3s',
        opacity: visible ? 1 : 0,
      }}>↑ top</button>
  );
};

window.Writing = Writing; window.Reading = Reading; window.BackToTop = BackToTop; window.QuoteCard = QuoteCard; window.Changelog = Changelog;
window.Now = Now; window.Resume = Resume; window.Contact = Contact;
window.CodingTimeline = CodingTimeline; window.WorkingToward = WorkingToward;
window.FermatNote = FermatNote;
