// v2-app.jsx

function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);

  React.useEffect(() => {
    window.__toggleTheme = () => setTweak('theme', t.theme === 'paper' ? 'chalkboard' : 'paper');
    return () => { window.__toggleTheme = null; };
  }, [t.theme]);

  const [fermat, setFermat] = React.useState(false);

  const palette = PALETTES[t.theme] || PALETTES.paper;
  const accent = palette.accents[t.accent] || palette.accents.red;
  const fonts = FONT_PAIRS[t.fontPair] || FONT_PAIRS['radon+caveat'];
  const theme = {
    palette, accent, accentName: t.accent, fonts,
    dense: t.density === 'compact',
    dark: t.theme === 'chalkboard',
    themeKey: t.theme,
  };

  React.useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'f' && !e.target.matches('input,textarea,[contenteditable]')) setFermat(true);
      if (e.key === 'Escape') setFermat(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const [chromeH, setChromeH] = React.useState(8000);
  React.useEffect(() => {
    const update = () => setChromeH(Math.max(document.documentElement.scrollHeight, window.innerHeight));
    update();
    const ro = new ResizeObserver(update);
    ro.observe(document.documentElement);
    return () => ro.disconnect();
  }, [t.theme, t.density, t.hero, t.fontPair]);

  React.useEffect(() => {
    if (document.getElementById('karthik-anim-css')) return;
    const style = document.createElement('style');
    style.id = 'karthik-anim-css';
    style.textContent = `
      @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
      @keyframes fadeIn { from{opacity:0;transform:translateY(4px)} to{opacity:1;transform:none} }
    `;
    document.head.appendChild(style);
  }, []);

  const Hero = t.hero === 'equation' ? HeroEquation : t.hero === 'minimal' ? HeroMinimal : HeroClassic;

  const pageBg = {
    background: `
      linear-gradient(to right, ${palette.grid} 1px, transparent 1px) 0 0/40px 40px,
      linear-gradient(to bottom, ${palette.grid} 1px, transparent 1px) 0 0/40px 40px,
      ${palette.bg}
    `,
    color: palette.ink,
    minHeight: '100vh',
    position: 'relative',
    fontFamily: fonts.serif,
    transition: 'background-color .4s ease',
  };

  return (
    <ThemeCtx.Provider value={theme}>
      <div style={pageBg}>
        <PageChrome height={chromeH} />
        <Nav />
        <Hero onPageClick={() => setFermat(true)} />
        <About />
        <CodingTimeline />
        <Quotes />
        <Writing />
        <Reading />
        <Now />
        <Resume />
        <WorkingToward />
        <Changelog />
        <Contact />
        <FermatNote open={fermat} onClose={() => setFermat(false)} />
        <BackToTop />
        {typeof MarginDrawings !== "undefined" && <MarginDrawings />}
        <TweaksPanel>
          <TweakSection label="Theme" />
          <TweakRadio label="Mode" value={t.theme} options={['paper', 'chalkboard']}
            onChange={(v) => setTweak('theme', v)} />
          <TweakColor label="Accent" value={accent}
            options={[palette.accents.red, palette.accents.navy, palette.accents.forest, palette.accents.plum]}
            onChange={(v) => {
              const name = Object.keys(palette.accents).find(k => palette.accents[k] === v);
              if (name) setTweak('accent', name);
            }} />
          <TweakSection label="Typography" />
          <TweakSelect label="Font pair" value={t.fontPair}
            options={Object.entries(FONT_PAIRS).map(([k, v]) => ({ value: k, label: v.label }))}
            onChange={(v) => setTweak('fontPair', v)} />
          <TweakSection label="Layout" />
          <TweakRadio label="Density" value={t.density} options={['compact', 'regular']}
            onChange={(v) => setTweak('density', v)} />
          <TweakRadio label="Hero" value={t.hero} options={['classic', 'equation', 'minimal']}
            onChange={(v) => setTweak('hero', v)} />
          <TweakSection label="Easter egg" />
          <TweakButton label="press F or click page 1/∞" onClick={() => setFermat(true)}>open it</TweakButton>
        </TweaksPanel>
      </div>
    </ThemeCtx.Provider>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
