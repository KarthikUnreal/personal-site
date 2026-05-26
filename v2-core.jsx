// v2-core.jsx
const V2 = {
  ...window.CONTENT,
  quotes: [
    { text: "Biology is the next silicon.", attrib: "me · 2026", tag: "self" },
    { text: "Compounding curiosity beats raw IQ.", attrib: "me", tag: "self" },
    { text: "Read the man, not the textbook.", attrib: "me", tag: "self" },
    { text: "Math gives you the rules. Code lets you break them, fast.", attrib: "me", tag: "self" },

    { text: "What I cannot create, I do not understand.", attrib: "Richard Feynman", tag: "physics" },
    { text: "If you can't draw it, you don't understand it.", attrib: "Richard Feynman", tag: "physics" },
    { text: "Nature uses only the longest threads to weave her patterns.", attrib: "Richard Feynman", tag: "physics" },
    { text: "Study hard what interests you the most in the most undisciplined, irreverent and original manner possible.", attrib: "Richard Feynman", tag: "physics" },

    { text: "Imagination is more important than knowledge.", attrib: "Albert Einstein", tag: "physics" },
    { text: "The important thing is not to stop questioning.", attrib: "Albert Einstein", tag: "physics" },
    { text: "Pure mathematics is, in its way, the poetry of logical ideas.", attrib: "Albert Einstein", tag: "maths" },

    { text: "Nothing in life is to be feared, it is only to be understood.", attrib: "Marie Curie", tag: "physics" },
    { text: "Be less curious about people and more curious about ideas.", attrib: "Marie Curie", tag: "physics" },

    { text: "Now I am become Death, the destroyer of worlds.", attrib: "J. Robert Oppenheimer", tag: "physics" },
    { text: "The optimist thinks this is the best of all possible worlds. The pessimist fears it is true.", attrib: "J. Robert Oppenheimer", tag: "physics" },

    { text: "e^(iπ) + 1 = 0", attrib: "Leonhard Euler", tag: "maths" },
    { text: "To those who ask what the infinitely small quantity in mathematics is, we answer that it is actually zero.", attrib: "Leonhard Euler", tag: "maths" },

    { text: "It is not knowledge, but the act of learning that grants the greatest enjoyment.", attrib: "Carl Friedrich Gauss", tag: "maths" },
    { text: "Mathematics is the queen of the sciences and number theory is the queen of mathematics.", attrib: "Carl Friedrich Gauss", tag: "maths" },

    { text: "If I have seen further, it is by standing on the shoulders of giants.", attrib: "Isaac Newton", tag: "physics" },
    { text: "Nature is pleased with simplicity.", attrib: "Isaac Newton", tag: "physics" },

    { text: "An expert is a person who has made all the mistakes that can be made in a very narrow field.", attrib: "Niels Bohr", tag: "physics" },
    { text: "If quantum mechanics hasn't profoundly shocked you, you haven't understood it yet.", attrib: "Niels Bohr", tag: "physics" },

    { text: "An equation for me has no meaning unless it expresses a thought of God.", attrib: "Srinivasa Ramanujan", tag: "maths" },
    { text: "I beg to introduce myself to you as a clerk in the Accounts Department.", attrib: "Srinivasa Ramanujan", tag: "maths" },

    { text: "There is no royal road to geometry.", attrib: "Pythagoras", tag: "maths" },
    { text: "Number rules the universe.", attrib: "Pythagoras", tag: "maths" },

    { text: "Young man, in mathematics you don't understand things. You just get used to them.", attrib: "John von Neumann", tag: "maths" },
    { text: "Anyone who attempts to generate random numbers by deterministic means is, of course, living in a state of sin.", attrib: "John von Neumann", tag: "cscience" },

    { text: "It is not the strongest of the species that survive, nor the most intelligent, but the one most responsive to change.", attrib: "Charles Darwin", tag: "biology" },
    { text: "A man who dares to waste one hour of time has not discovered the value of life.", attrib: "Charles Darwin", tag: "biology" },

    { text: "Omnis cellula e cellula — every cell from a cell.", attrib: "Rudolf Virchow", tag: "biology" },
    { text: "All living things are composed of cells.", attrib: "Schwann & Schleiden", tag: "biology" },

    { text: "Mathematics is the language in which God has written the universe.", attrib: "Galileo Galilei", tag: "maths" },
    { text: "And yet it moves.", attrib: "Galileo Galilei", tag: "physics" },

    { text: "All the mathematical sciences are founded on relations between physical laws and laws of numbers.", attrib: "James Clerk Maxwell", tag: "physics" },

    { text: "Science cannot solve the ultimate mystery of nature. We ourselves are part of the mystery.", attrib: "Max Planck", tag: "physics" },
    { text: "A new scientific truth does not triumph by convincing its opponents, but because its opponents eventually die.", attrib: "Max Planck", tag: "physics" },

    { text: "Pick a flower on Earth and you move the farthest star.", attrib: "Paul Dirac", tag: "physics" },
    { text: "A theory with mathematical beauty is more likely to be correct than an ugly one.", attrib: "Paul Dirac", tag: "physics" },

    { text: "If you are out to describe the truth, leave elegance to the tailor.", attrib: "Ludwig Boltzmann", tag: "physics" },
    { text: "Bring forward what is true, write it so that it is clear, defend it to your last breath.", attrib: "Ludwig Boltzmann", tag: "physics" },

    { text: "Nothing is too wonderful to be true, if it be consistent with the laws of nature.", attrib: "Michael Faraday", tag: "physics" },

    { text: "If you cannot — in the long run — tell everyone what you have been doing, your doing has been worthless.", attrib: "Erwin Schrödinger", tag: "physics" },
    { text: "The present moment always will have been.", attrib: "Erwin Schrödinger", tag: "physics" },

    { text: "Nothing is lost, nothing is created, everything is transformed.", attrib: "Antoine Lavoisier", tag: "chemistry" },

    { text: "There is no science without fancy, and no art without facts.", attrib: "Dmitri Mendeleev", tag: "chemistry" },
    { text: "I saw in a dream a table where all the elements fell into place as required.", attrib: "Dmitri Mendeleev", tag: "chemistry" },

    { text: "Measuring programming progress by lines of code is like measuring aircraft building progress by weight.", attrib: "Bill Gates", tag: "cscience" },

    { text: "We can only see a short distance ahead, but we can see plenty there that needs to be done.", attrib: "Alan Turing", tag: "cscience" },
    { text: "A computer would deserve to be called intelligent if it could deceive a human into believing that it was human.", attrib: "Alan Turing", tag: "cscience" },

    { text: "Nothing in biology makes sense except in the light of evolution.", attrib: "Theodosius Dobzhansky", tag: "biology" },

    { text: "We are the cosmos made conscious and life is the means by which the universe understands itself.", attrib: "Brian Cox", tag: "physics" },

    { text: "The secret of life is in the structure.", attrib: "Francis Crick", tag: "biology" },
    { text: "If you want to understand function, study structure.", attrib: "Francis Crick", tag: "biology" },

    { text: "Debugging is twice as hard as writing the code in the first place.", attrib: "Brian Kernighan", tag: "cscience" },
    { text: "Programs must be written for people to read, and only incidentally for machines to execute.", attrib: "Kernighan & Ritchie", tag: "cscience" },
    { text: "The ability to reduce everything to simple fundamental laws does not imply the ability to start from those laws and reconstruct the universe.", attrib: "Philip Anderson", tag: "physics" },
    { text: "Life is the most complex chemical reaction in the universe.", attrib: "Nick Lane", tag: "biology" },
    { text: "We are at the very beginning of time for the human race.", attrib: "Richard Feynman", tag: "feynman" },
    { text: "The greatest shortcoming of the human race is our inability to understand the exponential function.", attrib: "Albert Bartlett", tag: "maths" },
  ],
  thinking: [
    "Why does evolution converge on the same solutions independently?",
    "Whether Dostoevsky would have liked C.",
    "If emergence is the same thing as intelligence.",
    "What the first self-replicating molecule felt like — if anything.",
    "Whether math is discovered or invented.",
    "Why the cell membrane is the most underrated structure in science.",
    "What it means to understand something vs. being able to solve it.",
    "If the universe is a simulation, does it run on cells or silicon?",
    "What a Google engineer actually thinks about all day.",
    "Whether the best scientists are also the best explainers.",
    "What it would take to sequence a genome on a budget.",
  ],
  resume: [
    { when: "14 Oct 2012", what: "Born", where: "Gurgaon, India", tag: "school" },
    { when: "2026 — now", what: "Class 9, CBSE", where: "DPS Sector 45 · Gurgaon", tag: "school" },
    { when: "2024 — now", what: "Self-teaching C, C++, Python", where: "K&R, nights, weekends", tag: "study" },
    { when: "future", what: "PhD-track in computational biology", where: "TBD · betting on it", tag: "plan" },
  ],
};

const PALETTES = {
  paper: {
    bg: '#fefcf3',
    grid: '#c8d4e0',
    gridAlpha: 0.55,
    ink: '#1e3a5f',
    inkSoft: '#2a3a55',
    pencil: '#5a6470',
    rule: '#d4dae0',
    cardBg: '#ffffff',
    cardShadow: 'rgba(30,58,95,0.15)',
    holeBg: '#ffffff',
    holeShadow: 'rgba(0,0,0,0.18)',
    accents: { red: '#c0392b', navy: '#1e3a5f', forest: '#2d6a4f', plum: '#7a4988' },
  },
  chalkboard: {
    bg: '#1d2f1e',
    grid: '#3a5040',
    gridAlpha: 0.45,
    ink: '#f0ebd8',
    inkSoft: '#cfc9b3',
    pencil: '#8a9582',
    rule: 'rgba(240,235,216,0.22)',
    cardBg: 'rgba(240,235,216,0.06)',
    cardShadow: 'rgba(0,0,0,0.35)',
    holeBg: '#0c1810',
    holeShadow: 'rgba(0,0,0,0.6)',
    accents: { red: '#f4a294', navy: '#93b8d8', forest: '#9fd9b0', plum: '#d4b3d8' },
  },
};

const FONT_PAIRS = {
  'radon+caveat': { hand: '"Caveat", "Patrick Hand", cursive', serif: '"Monaspace Radon", "Maple Mono", ui-monospace, monospace', label: 'Monaspace Radon × Caveat' },
  'maple+caveat': { hand: '"Caveat", "Patrick Hand", cursive', serif: '"Maple Mono", "Monaspace Radon", ui-monospace, monospace', label: 'Maple Mono × Caveat' },
  'radon+patrickhand': { hand: '"Patrick Hand", "Caveat", cursive', serif: '"Monaspace Radon", "Maple Mono", ui-monospace, monospace', label: 'Monaspace Radon × Patrick Hand' },
  'radon-only': { hand: '"Monaspace Radon", ui-monospace, monospace', serif: '"Monaspace Radon", ui-monospace, monospace', label: 'Monaspace Radon (everywhere)' },
};
const MONO = '"Maple Mono", "JetBrains Mono", "IBM Plex Mono", monospace';

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "theme": "paper",
  "accent": "red",
  "fontPair": "radon+caveat",
  "density": "regular",
  "hero": "equation"
}/*EDITMODE-END*/;

const ThemeCtx = React.createContext(null);
const useT = () => React.useContext(ThemeCtx);

function useReveal(threshold = 0.12) {
  const ref = React.useRef(null);
  const [seen, setSeen] = React.useState(false);
  React.useEffect(() => {
    if (!ref.current) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setSeen(true); io.disconnect(); }
    }, { threshold });
    io.observe(ref.current);
    return () => io.disconnect();
  }, [threshold]);
  return [ref, seen];
}

const Reveal = ({ children, delay = 0, y = 18, style }) => {
  const [ref, seen] = useReveal();
  return (
    <div ref={ref} style={{
      opacity: seen ? 1 : 0,
      transform: seen ? 'translateY(0)' : `translateY(${y}px)`,
      transition: `opacity .8s ${delay}ms cubic-bezier(.2,.7,.3,1), transform .8s ${delay}ms cubic-bezier(.2,.7,.3,1)`,
      willChange: 'opacity, transform',
      ...style,
    }}>{children}</div>
  );
};

const PageChrome = ({ height }) => {
  const t = useT();
  const holes = [];
  for (let y = 80; y < height; y += 180) holes.push(y);
  return (
    <React.Fragment>
      {/* margin line */}
      <div style={{ position: 'absolute', left: 88, top: 0, bottom: 0, width: 2, background: t.accent, opacity: 0.45, pointerEvents: 'none' }} />
      {/* binder holes */}
      {holes.map(y => (
        <div key={y} style={{
          position: 'absolute', left: 28, top: y, width: 18, height: 18, borderRadius: 9,
          background: t.palette.holeBg,
          boxShadow: `inset 0 1px 2px ${t.palette.holeShadow}, 0 0 0 1px ${t.palette.rule}`,
          pointerEvents: 'none',
        }} />
      ))}
    </React.Fragment>
  );
};

// margin equation drifting in from left
const MarginEq = ({ children, top, color }) => {
  const t = useT();
  const [ref, seen] = useReveal(0.4);
  return (
    <div ref={ref} style={{
      position: 'absolute', left: 12, top, width: 70,
      fontFamily: t.fonts.serif, fontStyle: 'italic', fontSize: 13, color: color || t.accent,
      opacity: seen ? 0.85 : 0, transform: seen ? 'translateX(0)' : 'translateX(-10px)',
      transition: 'opacity 1.2s ease, transform 1.2s ease', lineHeight: 1.3, textAlign: 'center',
      pointerEvents: 'none',
    }}>{children}</div>
  );
};

// section heading: handwritten with red underline
const H2 = ({ n, children }) => {
  const t = useT();
  return (
    <div style={{ display: 'flex', alignItems: 'baseline', gap: 16, marginBottom: 24 }}>
      <span style={{ fontFamily: t.fonts.serif, fontSize: 18, color: t.palette.pencil, fontStyle: 'italic' }}>§ {n}</span>
      <span style={{
        fontFamily: t.fonts.hand, fontSize: 56, fontWeight: 700, color: t.palette.ink,
        borderBottom: `3px solid ${t.accent}`, paddingBottom: 2, lineHeight: 1,
      }}>{children}</span>
    </div>
  );
};

// little sticky tape strip
const Tape = ({ rot = -3, style }) => {
  const t = useT();
  return (
    <div style={{
      position: 'absolute', width: 80, height: 22, background: t.dark ? 'rgba(244,211,94,0.55)' : 'rgba(244,211,94,0.7)',
      transform: `rotate(${rot}deg)`, ...style,
      boxShadow: '0 2px 6px rgba(0,0,0,0.08)',
    }} />
  );
};

const NUM_WORDS = {
  10: "ten", 11: "eleven", 12: "twelve", 13: "thirteen", 14: "fourteen",
  15: "fifteen", 16: "sixteen", 17: "seventeen", 18: "eighteen", 19: "nineteen",
  20: "twenty", 21: "twenty-one", 22: "twenty-two", 23: "twenty-three",
  24: "twenty-four", 25: "twenty-five",
};
function subAge(s) {
  if (typeof s !== 'string') return s;
  const a = (window.CONTENT && window.CONTENT.age) || 14;
  const w = NUM_WORDS[a] || String(a);
  const y = new Date().getFullYear();
  return s
    .replace(/\{ageWord\}/g, w)
    .replace(/\{age\}/g, String(a))
    .replace(/\{year\}/g, String(y));
}
window.subAge = subAge;

window.V2 = V2; window.PALETTES = PALETTES; window.FONT_PAIRS = FONT_PAIRS; window.MONO = MONO;
window.TWEAK_DEFAULTS = TWEAK_DEFAULTS; window.ThemeCtx = ThemeCtx; window.useT = useT;
window.useReveal = useReveal; window.Reveal = Reveal;
window.PageChrome = PageChrome; window.MarginEq = MarginEq; window.H2 = H2; window.Tape = Tape;
