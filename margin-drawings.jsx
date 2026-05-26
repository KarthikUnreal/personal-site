// margin-drawings.jsx — large scattered blueprint drawings across the page
// Absolutely positioned inside the page's position:relative wrapper.
// Colors adapt to dark/light mode via ThemeCtx.

const makeDefs = (dark) => {
  const BP = dark ? '#a8c8e8' : '#1a3a5c';
  const RD = dark ? '#f4a294' : '#c0392b';
  const DIM = dark ? '#7a9ab8' : '#5a7a9c';
  const FLL = dark ? 'rgba(168,200,232,0.08)' : 'rgba(26,58,92,0.07)';
  const FLM = dark ? 'rgba(168,200,232,0.16)' : 'rgba(26,58,92,0.14)';
  const CSS = `
    .bpd  { font-family:'Courier New',monospace; font-size:10px; fill:${DIM}; }
    .bpt  { font-family:'Courier New',monospace; font-size:8px; fill:${RD}; font-weight:bold; letter-spacing:2px; }
    .bpsl { font-family:'Courier New',monospace; font-size:8px; fill:${DIM}; letter-spacing:2px; }
    .bps  { fill:none; stroke:${BP}; stroke-width:1; }
    .bptn { fill:none; stroke:${BP}; stroke-width:0.5; }
    .bptk { fill:none; stroke:${BP}; stroke-width:1.8; }
    .bpfl { fill:${FLL}; stroke:${BP}; stroke-width:0.7; }
    .bpfm { fill:${FLM}; stroke:${BP}; stroke-width:0.7; }
    .bprd { stroke:${RD}; fill:none; stroke-width:0.8; }
    .bpld { stroke:${DIM}; stroke-width:0.5; fill:none; stroke-dasharray:4 3; }
  `;
  return { BP, RD, DIM,
    DEFS: `<defs>
      <marker id="bpa" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
        <path d="M2 1L8 5L2 9" fill="none" stroke="context-stroke" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      </marker>
      <style>${CSS}</style>
    </defs>`
  };
};

// Fallback for components that still use module-level BP/RD
const BP = '#1a3a5c';
const RD = '#c0392b';
const DEFS = makeDefs(false).DEFS;

// Wrapper: large, rotated, scattered, with subtle parallax
const Doodle = ({ top, left, right, width = 180, rotate = 0, opacity = 0.55, parallax = 0.05, children }) => {
  const side = right != null ? { right } : { left };
  const [offset, setOffset] = React.useState(0);
  React.useEffect(() => {
    const on = () => setOffset(window.scrollY * parallax);
    window.addEventListener('scroll', on, { passive: true });
    return () => window.removeEventListener('scroll', on);
  }, [parallax]);
  return (
    <div style={{
      position: 'absolute',
      top,
      ...side,
      width,
      opacity,
      pointerEvents: 'none',
      zIndex: 0,
      transform: `rotate(${rotate}deg) translateY(${offset}px)`,
      transformOrigin: 'center center',
      willChange: 'transform',
    }}>
      {children}
    </div>
  );
};

// Hook to get dark mode state
const useDark = () => {
  const t = React.useContext(typeof ThemeCtx !== 'undefined' ? ThemeCtx : React.createContext(null));
  return t ? t.dark : false;
};

// ── CELL ────────────────────────────────────────────────────────────
const Cell = ({ top, left, right, rotate }) => {
  const dark = useDark();
  const { BP, RD, DIM, DEFS } = makeDefs(dark);
  return (
  <Doodle top={top} left={left} right={right} rotate={rotate} width={200}>
    <svg viewBox="0 0 200 280" width="100%" style={{overflow:'visible'}}
      dangerouslySetInnerHTML={{__html:`${DEFS}
      <text x="100" y="16" text-anchor="middle" class="bpt">FIG. 01 · EUKARYOTIC CELL</text>
      <ellipse cx="100" cy="145" rx="80" ry="105" class="bpfl"/>
      <ellipse cx="86" cy="128" rx="30" ry="25" class="bpfm"/>
      <ellipse cx="86" cy="128" rx="11" ry="9" fill="rgba(26,58,92,0.28)" stroke="${BP}" stroke-width="0.5"/>
      <ellipse cx="86" cy="128" rx="30" ry="25" class="bptn" stroke-dasharray="3 2"/>
      <ellipse cx="148" cy="90" rx="22" ry="10" class="bpfm" transform="rotate(-30,148,90)"/>
      <path d="M138 83 Q148 88 160 83" class="bptn"/>
      <path d="M137 90 Q148 95 161 90" class="bptn"/>
      <path d="M32 168 Q46 157 60 168 Q74 179 88 168 Q102 157 116 168 Q130 179 142 168" class="bptn"/>
      <path d="M30 180 Q44 169 58 180 Q72 191 86 180 Q100 169 114 180 Q128 191 142 180" class="bptn"/>
      <circle cx="32" cy="183" r="3" fill="${BP}" opacity="0.45"/>
      <circle cx="60" cy="172" r="3" fill="${BP}" opacity="0.45"/>
      <circle cx="88" cy="183" r="3" fill="${BP}" opacity="0.45"/>
      <circle cx="116" cy="172" r="3" fill="${BP}" opacity="0.45"/>
      <path d="M148 162 Q164 155 170 162" class="bptn"/>
      <path d="M147 170 Q164 163 172 170" class="bptn"/>
      <path d="M147 178 Q164 170 173 178" class="bptn"/>
      <line x1="40" y1="14" x2="40" y2="35" class="bpld"/>
      <text x="42" y="29" class="bpd">membrane</text>
      <line x1="116" y1="104" x2="150" y2="88" class="bpld"/>
      <text x="152" y="91" class="bpd">mitochondria</text>
      <line x1="110" y1="128" x2="150" y2="128" class="bpld"/>
      <text x="152" y="131" class="bpd">nucleus</text>
      <line x1="86" y1="168" x2="50" y2="200" class="bpld"/>
      <text x="28" y="203" class="bpd">ER</text>
      <line x1="160" y1="170" x2="178" y2="195" class="bpld"/>
      <text x="155" y="208" class="bpd">golgi</text>
      <line x1="60" y1="248" x2="140" y2="248" stroke="${BP}" stroke-width="0.8"/>
      <line x1="60" y1="244" x2="60" y2="252" stroke="${BP}" stroke-width="0.8"/>
      <line x1="140" y1="244" x2="140" y2="252" stroke="${BP}" stroke-width="0.8"/>
      <text x="100" y="262" text-anchor="middle" class="bpd">10 μm</text>
      <text x="100" y="275" text-anchor="middle" class="bpsl">GENERALISED · NOT TO SCALE</text>
    `}}/>
  </Doodle>
  );
};

// ── DNA HELIX ───────────────────────────────────────────────────────
const DNA = ({ top, left, right, rotate }) => {
  const dark = useDark();
  const { BP, RD, DIM, DEFS } = makeDefs(dark);
  return (
  <Doodle top={top} left={left} right={right} rotate={rotate} width={160}>
    <svg viewBox="0 0 160 340" width="100%" style={{overflow:'visible'}}
      dangerouslySetInnerHTML={{__html:`${DEFS}
      <text x="80" y="14" text-anchor="middle" class="bpt">FIG. 02 · B-DNA</text>
      <path d="M50 26 C36 50 72 74 58 98 C44 122 80 146 66 170 C52 194 88 218 74 242 C60 266 96 290 82 314" class="bptk"/>
      <path d="M110 26 C124 50 88 74 102 98 C116 122 80 146 94 170 C108 194 72 218 86 242 C100 266 64 290 78 314" class="bptk"/>
      <line x1="54" y1="42" x2="106" y2="42" class="bptn"/>
      <line x1="42" y1="66" x2="118" y2="66" class="bptn"/>
      <line x1="64" y1="90" x2="96" y2="90" class="bptn"/>
      <line x1="54" y1="114" x2="106" y2="114" class="bptn"/>
      <line x1="44" y1="138" x2="116" y2="138" class="bptn"/>
      <line x1="62" y1="162" x2="98" y2="162" class="bptn"/>
      <line x1="70" y1="186" x2="90" y2="186" class="bptn"/>
      <line x1="66" y1="210" x2="94" y2="210" class="bptn"/>
      <line x1="58" y1="234" x2="102" y2="234" class="bptn"/>
      <line x1="50" y1="258" x2="110" y2="258" class="bptn"/>
      <line x1="60" y1="282" x2="100" y2="282" class="bptn"/>
      <line x1="68" y1="306" x2="92" y2="306" class="bptn"/>
      <text x="80" y="49"  text-anchor="middle" class="bpd">A·T</text>
      <text x="80" y="97"  text-anchor="middle" class="bpd">G·C</text>
      <text x="80" y="145" text-anchor="middle" class="bpd">T·A</text>
      <text x="80" y="193" text-anchor="middle" class="bpd">C·G</text>
      <text x="80" y="241" text-anchor="middle" class="bpd">A·T</text>
      <text x="80" y="289" text-anchor="middle" class="bpd">G·C</text>
      <line x1="122" y1="26"  x2="138" y2="26"  stroke="${RD}" stroke-width="0.7"/>
      <line x1="122" y1="138" x2="138" y2="138" stroke="${RD}" stroke-width="0.7"/>
      <line x1="130" y1="26"  x2="130" y2="138" stroke="${RD}" stroke-width="0.7"/>
      <text x="141" y="88" class="bpd" style="fill:${RD};font-size:9px">3.4</text>
      <text x="141" y="100" class="bpd" style="fill:${RD};font-size:9px">nm</text>
      <text x="80" y="330" text-anchor="middle" class="bpsl">DOUBLE HELIX · SCHEMATIC</text>
    `}}/>
  </Doodle>
  );
};

// ── LINUX KERNEL ────────────────────────────────────────────────────
const Kernel = ({ top, left, right, rotate }) => {
  const dark = useDark();
  const { BP, RD, DIM, DEFS } = makeDefs(dark);
  return (
  <Doodle top={top} left={left} right={right} rotate={rotate} width={190}>
    <svg viewBox="0 0 190 260" width="100%" style={{overflow:'visible'}}
      dangerouslySetInnerHTML={{__html:`${DEFS}
      <text x="95" y="14" text-anchor="middle" class="bpt">FIG. 03 · LINUX KERNEL</text>
      <rect x="8" y="24"  width="174" height="32" fill="rgba(192,57,43,0.08)" stroke="${RD}" stroke-width="0.7" stroke-dasharray="4 2" rx="3"/>
      <text x="95" y="36" text-anchor="middle" class="bpd" style="fill:${RD}">APPLICATIONS</text>
      <text x="95" y="50" text-anchor="middle" style="font-family:'Courier New'; font-size:8px; fill:${RD}">bash · vim · hyprland</text>
      <rect x="8" y="60"  width="174" height="32" fill="rgba(192,57,43,0.05)" stroke="${RD}" stroke-width="0.6" stroke-dasharray="4 2" rx="3"/>
      <text x="95" y="72" text-anchor="middle" class="bpd" style="fill:${RD}">USER SPACE · ring 3</text>
      <text x="95" y="86" text-anchor="middle" style="font-family:'Courier New'; font-size:8px; fill:${RD}">glibc · daemons · processes</text>
      <rect x="8" y="96"  width="174" height="32" fill="rgba(26,58,92,0.08)" stroke="${BP}" stroke-width="0.8" rx="3"/>
      <text x="95" y="108" text-anchor="middle" class="bpd">SYSCALL INTERFACE</text>
      <text x="95" y="122" text-anchor="middle" style="font-family:'Courier New'; font-size:8px; fill:#5a7a9c">POSIX · ABI boundary</text>
      <rect x="8" y="132" width="174" height="32" fill="rgba(26,58,92,0.13)" stroke="${BP}" stroke-width="0.8" rx="3"/>
      <text x="95" y="144" text-anchor="middle" class="bpd">KERNEL CORE · ring 0</text>
      <text x="95" y="158" text-anchor="middle" style="font-family:'Courier New'; font-size:8px; fill:#5a7a9c">sched · mm · vfs · net</text>
      <rect x="8" y="168" width="174" height="32" fill="rgba(26,58,92,0.18)" stroke="${BP}" stroke-width="0.9" rx="3"/>
      <text x="95" y="180" text-anchor="middle" class="bpd">DEVICE DRIVERS</text>
      <text x="95" y="194" text-anchor="middle" style="font-family:'Courier New'; font-size:8px; fill:#5a7a9c">char · block · network</text>
      <rect x="8" y="204" width="174" height="32" fill="rgba(26,58,92,0.25)" stroke="${BP}" stroke-width="1.1" rx="3"/>
      <text x="95" y="216" text-anchor="middle" class="bpd">HARDWARE</text>
      <text x="95" y="230" text-anchor="middle" style="font-family:'Courier New'; font-size:8px; fill:#5a7a9c">cpu · ram · disk · net</text>
      <line x1="95" y1="60"  x2="95" y2="57"  stroke="${BP}" stroke-width="0.8" marker-end="url(#bpa)"/>
      <line x1="95" y1="96"  x2="95" y2="93"  stroke="${BP}" stroke-width="0.8" marker-end="url(#bpa)"/>
      <line x1="95" y1="132" x2="95" y2="129" stroke="${BP}" stroke-width="0.8" marker-end="url(#bpa)"/>
      <line x1="95" y1="168" x2="95" y2="165" stroke="${BP}" stroke-width="0.8" marker-end="url(#bpa)"/>
      <line x1="95" y1="204" x2="95" y2="201" stroke="${BP}" stroke-width="0.8" marker-end="url(#bpa)"/>
      <text x="95" y="252" text-anchor="middle" class="bpsl">PRIVILEGE RING MODEL</text>
    `}}/>
  </Doodle>
  );
};

// ── NEURON ──────────────────────────────────────────────────────────
const Neuron = ({ top, left, right, rotate }) => {
  const dark = useDark();
  const { BP, RD, DIM, DEFS } = makeDefs(dark);
  return (
  <Doodle top={top} left={left} right={right} rotate={rotate} width={210}>
    <svg viewBox="0 0 220 180" width="100%" style={{overflow:'visible'}}
      dangerouslySetInnerHTML={{__html:`${DEFS}
      <text x="110" y="14" text-anchor="middle" class="bpt">FIG. 04 · NEURON</text>
      <path d="M10 80 Q24 62 38 70 Q34 50 50 44" class="bps"/>
      <path d="M10 95 Q28 100 42 88 Q54 81 64 91" class="bps"/>
      <path d="M10 112 Q28 126 42 118 Q50 130 50 148" class="bps"/>
      <ellipse cx="86" cy="95" rx="28" ry="26" class="bpfm"/>
      <text x="86" y="98" text-anchor="middle" class="bpd">soma</text>
      <path d="M114 95 Q130 95 200 95" class="bptk"/>
      <rect x="122" y="86" width="14" height="18" class="bpfl" rx="2"/>
      <rect x="146" y="86" width="14" height="18" class="bpfl" rx="2"/>
      <rect x="170" y="86" width="14" height="18" class="bpfl" rx="2"/>
      <circle cx="206" cy="84" r="10" class="bpfm"/>
      <circle cx="206" cy="106" r="10" class="bpfm"/>
      <circle cx="196" cy="81" r="5" class="bptn" fill="rgba(192,57,43,0.15)"/>
      <circle cx="198" cy="95" r="5" class="bptn" fill="rgba(192,57,43,0.15)"/>
      <circle cx="196" cy="109" r="5" class="bptn" fill="rgba(192,57,43,0.15)"/>
      <path d="M136 72 L143 72 L146 60 L151 84 L155 66 L160 72 L166 72" class="bprd"/>
      <text x="150" y="56" text-anchor="middle" class="bpd" style="fill:${RD}">+40mV</text>
      <line x1="38" y1="68"  x2="38" y2="45"  class="bpld"/>
      <text x="6"  y="43" class="bpd">dendrite</text>
      <line x1="129" y1="86" x2="120" y2="70" class="bpld"/>
      <text x="98" y="68" class="bpd">myelin</text>
      <line x1="199" y1="76" x2="210" y2="58" class="bpld"/>
      <text x="186" y="55" class="bpd">synapse</text>
      <text x="110" y="170" text-anchor="middle" class="bpsl">CHEMICAL SYNAPSE · SIGNAL PROPAGATION</text>
    `}}/>
  </Doodle>
  );
};

// ── BST ─────────────────────────────────────────────────────────────
const BST = ({ top, left, right, rotate }) => {
  const dark = useDark();
  const { BP, RD, DIM, DEFS } = makeDefs(dark);
  return (
  <Doodle top={top} left={left} right={right} rotate={rotate} width={185}>
    <svg viewBox="0 0 185 230" width="100%" style={{overflow:'visible'}}
      dangerouslySetInnerHTML={{__html:`${DEFS}
      <text x="92" y="14" text-anchor="middle" class="bpt">FIG. 05 · BINARY SEARCH TREE</text>
      <line x1="92" y1="40"  x2="52"  y2="78"  class="bptn"/>
      <line x1="92" y1="40"  x2="132" y2="78"  class="bptn"/>
      <line x1="52" y1="96"  x2="28"  y2="134" class="bptn"/>
      <line x1="52" y1="96"  x2="76"  y2="134" class="bptn"/>
      <line x1="132" y1="96" x2="108" y2="134" class="bptn"/>
      <line x1="132" y1="96" x2="156" y2="134" class="bptn"/>
      <line x1="28"  y1="150" x2="14" y2="184" class="bptn"/>
      <line x1="28"  y1="150" x2="42" y2="184" class="bptn"/>
      <circle cx="92"  cy="28"  r="16" class="bpfm"/>
      <text x="92"  y="33"  text-anchor="middle" class="bpd" style="font-size:12px">42</text>
      <circle cx="52"  cy="87"  r="13" class="bpfl"/>
      <text x="52"  y="92"  text-anchor="middle" class="bpd" style="font-size:11px">18</text>
      <circle cx="132" cy="87"  r="13" class="bpfl"/>
      <text x="132" y="92"  text-anchor="middle" class="bpd" style="font-size:11px">67</text>
      <circle cx="28"  cy="142" r="11" class="bpfl"/>
      <text x="28"  y="147" text-anchor="middle" class="bpd" style="font-size:10px">9</text>
      <circle cx="76"  cy="142" r="11" class="bpfl"/>
      <text x="76"  y="147" text-anchor="middle" class="bpd" style="font-size:10px">27</text>
      <circle cx="108" cy="142" r="11" class="bpfl"/>
      <text x="108" y="147" text-anchor="middle" class="bpd" style="font-size:10px">54</text>
      <circle cx="156" cy="142" r="11" class="bpfl"/>
      <text x="156" y="147" text-anchor="middle" class="bpd" style="font-size:10px">89</text>
      <circle cx="14"  cy="192" r="9"  class="bpfl"/>
      <text x="14"  y="197" text-anchor="middle" class="bpd" style="font-size:9px">3</text>
      <circle cx="42"  cy="192" r="9"  class="bpfl"/>
      <text x="42"  y="197" text-anchor="middle" class="bpd" style="font-size:9px">12</text>
      <text x="92" y="218" text-anchor="middle" class="bpd" style="fill:${RD}">O(log n) search</text>
      <text x="92" y="228" text-anchor="middle" class="bpsl">left &lt; parent &lt; right</text>
    `}}/>
  </Doodle>
  );
};

// ── ATOM ────────────────────────────────────────────────────────────
const Atom = ({ top, left, right, rotate }) => {
  const dark = useDark();
  const { BP, RD, DIM, DEFS } = makeDefs(dark);
  return (
  <Doodle top={top} left={left} right={right} rotate={rotate} width={170}>
    <svg viewBox="0 0 170 200" width="100%" style={{overflow:'visible'}}
      dangerouslySetInnerHTML={{__html:`${DEFS}
      <text x="85" y="14" text-anchor="middle" class="bpt">FIG. 06 · BOHR MODEL</text>
      <circle cx="85" cy="105" r="14" fill="rgba(26,58,92,0.28)" stroke="${BP}" stroke-width="1.2"/>
      <text x="85" y="109" text-anchor="middle" class="bpd" style="font-size:11px">C</text>
      <ellipse cx="85" cy="105" rx="55" ry="19" class="bptn"/>
      <ellipse cx="85" cy="105" rx="55" ry="19" class="bptn" transform="rotate(60,85,105)"/>
      <ellipse cx="85" cy="105" rx="55" ry="19" class="bptn" transform="rotate(120,85,105)"/>
      <circle cx="140" cy="105" r="5" fill="${BP}" opacity="0.7"/>
      <circle cx="112" cy="58"  r="5" fill="${BP}" opacity="0.7"/>
      <circle cx="58"  cy="59"  r="5" fill="${BP}" opacity="0.7"/>
      <circle cx="30"  cy="105" r="5" fill="${BP}" opacity="0.7"/>
      <circle cx="58"  cy="151" r="5" fill="${BP}" opacity="0.7"/>
      <circle cx="112" cy="152" r="5" fill="${BP}" opacity="0.7"/>
      <line x1="85" y1="91" x2="85" y2="50" class="bpld"/>
      <text x="87" y="48" class="bpd">2p orbital</text>
      <line x1="71" y1="93" x2="40" y2="72" class="bpld"/>
      <text x="8" y="70" class="bpd">2s</text>
      <line x1="140" y1="105" x2="152" y2="88" class="bpld"/>
      <text x="154" y="86" class="bpd">e⁻</text>
      <text x="85" y="188" text-anchor="middle" class="bpsl">CARBON · 6 ELECTRONS</text>
    `}}/>
  </Doodle>
  );
};

// ── PROTEIN ─────────────────────────────────────────────────────────
const Protein = ({ top, left, right, rotate }) => {
  const dark = useDark();
  const { BP, RD, DIM, DEFS } = makeDefs(dark);
  return (
  <Doodle top={top} left={left} right={right} rotate={rotate} width={180}>
    <svg viewBox="0 0 180 220" width="100%" style={{overflow:'visible'}}
      dangerouslySetInnerHTML={{__html:`${DEFS}
      <text x="90" y="14" text-anchor="middle" class="bpt">FIG. 07 · PROTEIN 2°</text>
      <path d="M16 52 Q32 40 48 52 Q64 64 80 52 Q96 40 112 52 Q128 64 144 52 Q160 40 168 52" class="bptk"/>
      <ellipse cx="92" cy="52" rx="80" ry="16" fill="rgba(26,58,92,0.04)" stroke="${BP}" stroke-width="0.4" stroke-dasharray="3 2"/>
      <text x="90" y="84" text-anchor="middle" class="bpd">α-HELIX</text>
      <path d="M16 118 L164 118" stroke="${BP}" stroke-width="7" marker-end="url(#bpa)" fill="none"/>
      <path d="M164 140 L16 140" stroke="${BP}" stroke-width="7" marker-end="url(#bpa)" fill="none"/>
      <path d="M16 162 L164 162" stroke="${BP}" stroke-width="7" marker-end="url(#bpa)" fill="none"/>
      <line x1="50"  y1="122" x2="50"  y2="138" stroke="${RD}" stroke-width="0.7" stroke-dasharray="2 1.5"/>
      <line x1="90"  y1="122" x2="90"  y2="138" stroke="${RD}" stroke-width="0.7" stroke-dasharray="2 1.5"/>
      <line x1="130" y1="122" x2="130" y2="138" stroke="${RD}" stroke-width="0.7" stroke-dasharray="2 1.5"/>
      <line x1="50"  y1="144" x2="50"  y2="160" stroke="${RD}" stroke-width="0.7" stroke-dasharray="2 1.5"/>
      <line x1="90"  y1="144" x2="90"  y2="160" stroke="${RD}" stroke-width="0.7" stroke-dasharray="2 1.5"/>
      <line x1="130" y1="144" x2="130" y2="160" stroke="${RD}" stroke-width="0.7" stroke-dasharray="2 1.5"/>
      <text x="172" y="122" class="bpd" style="font-size:8px">N→</text>
      <text x="172" y="144" class="bpd" style="font-size:8px">←C</text>
      <text x="172" y="166" class="bpd" style="font-size:8px">N→</text>
      <text x="90" y="186" text-anchor="middle" class="bpd">β-SHEET (ANTIPARALLEL)</text>
      <text x="90" y="200" text-anchor="middle" style="font-family:'Courier New'; font-size:8px; fill:${RD}">H-bonds shown dashed</text>
      <text x="90" y="214" text-anchor="middle" class="bpsl">SECONDARY STRUCTURE</text>
    `}}/>
  </Doodle>
  );
};

// ── CIRCUIT ─────────────────────────────────────────────────────────
const Circuit = ({ top, left, right, rotate }) => {
  const dark = useDark();
  const { BP, RD, DIM, DEFS } = makeDefs(dark);
  return (
  <Doodle top={top} left={left} right={right} rotate={rotate} width={190}>
    <svg viewBox="0 0 200 160" width="100%" style={{overflow:'visible'}}
      dangerouslySetInnerHTML={{__html:`${DEFS}
      <text x="100" y="14" text-anchor="middle" class="bpt">FIG. 08 · LOGIC CIRCUIT</text>
      <polyline points="10,55 30,55 30,75 56,75" class="bps" fill="none"/>
      <polyline points="10,95 36,95 36,75 56,75" class="bps" fill="none"/>
      <polyline points="104,75 124,75 124,55 160,55" class="bps" fill="none"/>
      <polyline points="104,75 124,75 124,95 160,95" class="bps" fill="none"/>
      <polyline points="160,55 162,55 162,38 190,38" class="bps" fill="none"/>
      <path d="M56 57 L80 57 Q104 57 104 75 Q104 93 80 93 L56 93 Z" class="bpfl"/>
      <text x="78" y="78" text-anchor="middle" class="bpd" style="font-size:13px">&amp;</text>
      <path d="M160,38 L160,72 L190,55 Z" class="bpfl"/>
      <circle cx="195" cy="55" r="5" class="bptn" fill="white"/>
      <circle cx="30" cy="75" r="4" fill="white" stroke="${BP}" stroke-width="0.8"/>
      <circle cx="124" cy="75" r="4" fill="white" stroke="${BP}" stroke-width="0.8"/>
      <text x="4"   y="58" class="bpd" style="font-size:11px">A</text>
      <text x="4"   y="98" class="bpd" style="font-size:11px">B</text>
      <text x="167" y="38" class="bpd" style="font-size:11px">Q̄</text>
      <text x="167" y="98" class="bpd" style="font-size:11px">Q</text>
      <text x="100" y="128" text-anchor="middle" class="bpd">AND · NOT · OUTPUT</text>
      <text x="100" y="148" text-anchor="middle" class="bpsl">PCB TRACE SCHEMATIC</text>
    `}}/>
  </Doodle>
  );
};

// ── MAIN: place drawings at calculated offsets ───────────────────────
const MarginDrawings = () => {
  const [tops, setTops] = React.useState({});

  React.useEffect(() => {
    const measure = () => {
      const ids = ['about','wins','code','quotes','writing','shelf','now','cv','hello'];
      const result = {};
      ids.forEach(id => {
        const el = document.getElementById(id);
        if (!el) return;
        let t = 0, cur = el;
        while (cur && cur.id !== 'root') { t += cur.offsetTop; cur = cur.offsetParent; }
        result[id] = t;
      });
      setTops(result);
    };
    setTimeout(measure, 400);
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, []);

  if (!Object.keys(tops).length) return null;

  const at = (id, d = 0) => (tops[id] || 0) + d;

  return (
    <>
      {/* Cell — right side, near about */}
      <Cell    top={at('about',   120)} right={20}   rotate={2}   />
      {/* DNA — left side, between wins and code */}
      <DNA     top={at('wins',    300)} left={30}    rotate={-3}  />
      {/* Kernel — right side, near code */}
      <Kernel  top={at('code',    200)} right={40}   rotate={1.5} />
      {/* Neuron — left side, near quotes */}
      <Neuron  top={at('quotes',  150)} left={20}    rotate={-2}  />
      {/* Atom — right side, near writing */}
      <Atom    top={at('writing', 200)} right={30}   rotate={3}   />
      {/* Protein — left side, near shelf */}
      <Protein top={at('shelf',   120)} left={40}    rotate={-1.5}/>
      {/* BST — right side, near now */}
      <BST     top={at('now',     100)} right={20}   rotate={2}   />
      {/* Circuit — left side, near cv */}
      <Circuit top={at('cv',      180)} left={30}    rotate={-2}  />
    </>
  );
};

window.MarginDrawings = MarginDrawings;
