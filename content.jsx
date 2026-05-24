// Shared content for all 10 direction artboards.
// Put on window so all babel scripts can read it.

const __KARTHIK_BDAY = new Date(2012, 9, 14); // 14 Oct 2012 (month is 0-indexed)
const __computeAge = () => {
  const now = new Date();
  let a = now.getFullYear() - __KARTHIK_BDAY.getFullYear();
  const m = now.getMonth() - __KARTHIK_BDAY.getMonth();
  if (m < 0 || (m === 0 && now.getDate() < __KARTHIK_BDAY.getDate())) a--;
  return a;
};

window.CONTENT = {
  name: "Karthik",
  handle: "karthikunreal",
  tagline: "Class 9. Curious about everything. Betting on biology.",
  taglineLong: "I write C++ for fun, fall asleep reading Feynman, and I think biology is where the most interesting problems are — not because it's fashionable, but because the cell is the most complicated thing anyone has ever tried to understand.",
  location: "Gurgaon, India",
  school: "DPS Sector 45",
  birthday: "14 Oct 2012",
  age: __computeAge(),
  grade: "Class 9 · CBSE",
  thesis: "Biology is the next silicon.",
  email: "karthikbkollabathula@gmail.com",
  github: "KarthikUnreal",
  stack: ["C", "C++", "Python", "HTML", "CSS"],
  loves: ["Mathematics", "Physics", "Computer Science", "Biotechnology"],

  projects: [
    { name: "Sieve", year: "2026", lang: "C++", blurb: "A prime-number sieve visualizer. Watch composites get crossed out in real time, then race the Sieve of Atkin." },
    { name: "Chesswright", year: "2026", lang: "C++", blurb: "A tiny chess engine. ~600 lines. Beats me. Doesn't beat my dad. Yet." },
    { name: "Fractal Garden", year: "2025", lang: "Python", blurb: "Mandelbrot + Julia explorer with deep-zoom and palette presets. Made because the textbook one was ugly." },
    { name: "Newton's Toybox", year: "2025", lang: "Python", blurb: "Drop balls, pendulums and springs into a canvas. The physics is correct. The chaos isn't." },
    { name: "K&R Notes", year: "2024", lang: "HTML/CSS", blurb: "Every K&R exercise, solved, annotated, and laid out like a textbook. Hard mode: zero JS." },
  ],

  writing: [
    { title: "Biology is the next silicon", date: "draft", read: "6 min" },
    { title: "Reading War and Peace at 14", date: "draft", read: "4 min" },
  ],

  now: [
    "Tearing through The Man Who Knew Infinity.",
    "Teaching myself the basics of molecular biology.",
    "Google Workshop starts tomorrow. Already taking notes.",
    "Still figuring out Gurgaon. Two months in. Getting there.",
    "Writing essay #2. CRISPR. Harder than it looks.",
    "Avoiding social media. Mostly winning.",
  ],

  reading: [
    { title: "War and Peace", author: "Leo Tolstoy", state: "queued" },

    { title: "The Brothers Karamazov", author: "Fyodor Dostoevsky", state: "queued" },
    { title: "Crime and Punishment", author: "Fyodor Dostoevsky", state: "queued" },
    { title: "The Feynman Lectures on Physics", author: "Richard Feynman", state: "queued" },
    { title: "Regenesis", author: "George Church", state: "queued" },
    { title: "The Genesis Machine", author: "Amy Webb & Andrew Hessel", state: "queued" },
    { title: "The Code Breaker", author: "Walter Isaacson", state: "queued" },
    { title: "The Vital Question", author: "Nick Lane", state: "queued" },
    { title: "The Selfish Gene", author: "Richard Dawkins", state: "queued" },
    { title: "Gödel, Escher, Bach", author: "Douglas Hofstadter", state: "queued" },
    { title: "The Three-Body Problem", author: "Liu Cixin", state: "queued" },
    { title: "The Man Who Knew Infinity", author: "Robert Kanigel", state: "reading" },
    { title: "How to Solve It", author: "George Pólya", state: "queued" },

    { title: "A Mathematician's Apology", author: "G. H. Hardy", state: "done", note: "Made me want to do something real, not just clever." },
    { title: "Project Hail Mary", author: "Andy Weir", state: "done", note: "The best argument for cross-disciplinary thinking I've read in fiction." },
    { title: "Surely You're Joking, Mr. Feynman!", author: "Richard Feynman", state: "done", note: "Read the man, not the textbook. This is why." },
    { title: "The C Programming Language", author: "Kernighan & Ritchie", state: "done", note: "Every page felt like someone finally explaining how things actually work." },
  ],

  workingToward: {
    goal: "IISc Bengaluru — BSc Research, Biological Sciences",
    why: "I spent eight years in Bengaluru. IISc was always on the horizon — the place where the kind of work I want to do actually happens. Computational biology, systems thinking, the intersection of math and life. That's the plan. Class 9 is where it starts.",
    by: "2030",
    steps: [
      "Build a strong foundation in math and biology through self-study",
      "Clear KVPY / IISER aptitude tests",
      "Publish at least one essay worth reading per month",
      "Finish Future Human",
    ]
  },

  photos: [
    "desk · 11:42pm",
    "notebook page 88",
    "mango tree, monsoon",
    "first chess engine win",
    "math olympiad pin",
    "K&R, dog-eared",
  ],
};
