const __KARTHIK_BDAY = new Date(2012, 9, 14);
const __computeAge = () => {
  const now = new Date();
  let a = now.getFullYear() - __KARTHIK_BDAY.getFullYear();
  const m = now.getMonth() - __KARTHIK_BDAY.getMonth();
  if (m < 0 || (m === 0 && now.getDate() < __KARTHIK_BDAY.getDate())) a--;
  return a;
};

window.CONTENT = {
  name: "Karthik",
  tagline: "Class 9. Curious about everything. Betting on biology.",
  taglineLong: "I write C++ for fun, fall asleep reading Feynman, and I think biology is where the most interesting problems are — not because it's fashionable, but because the cell is the most complicated thing anyone has ever tried to understand.",
  location: "Gurgaon, India",
  school: "DPS Sector 45",
  birthday: "14 Oct 2012",
  age: __computeAge(),
  grade: "Class 9 · CBSE",
  gurgaonSince: "2026-03-25",
  email: "karthikbkollabathula@gmail.com",
  github: "KarthikUnreal",
  stack: ["C", "C++", "Python", "HTML", "CSS"],
  loves: ["Mathematics", "Physics", "Computer Science", "Biotechnology"],

  now: [
    "Teaching myself the basics of molecular biology.",
    "Attending Orahi Workshop.",
    "Still figuring out Gurgaon. Two months in. Getting there.",
    "Thinking on Calculus.",
    "Avoiding social media. Mostly winning.",
  ],

  reading: [
    { title: "The Man Who Knew Infinity", author: "Robert Kanigel", state: "done", note: "Ramanujan is proof that mathematics doesn't care where you're from." },

    { title: "War and Peace", author: "Leo Tolstoy", state: "queued" },
    { title: "The Brothers Karamazov", author: "Fyodor Dostoevsky", state: "queued" },
    { title: "Crime and Punishment", author: "Fyodor Dostoevsky", state: "done", note: "A magnificent exploration of the human psyche." },
    { title: "The Feynman Lectures on Physics", author: "Richard Feynman", state: "queued" },
    { title: "Regenesis", author: "George Church", state: "queued" },
    { title: "The Genesis Machine", author: "Amy Webb & Andrew Hessel", state: "queued" },
    { title: "The Code Breaker", author: "Walter Isaacson", state: "reading" },
    { title: "The Vital Question", author: "Nick Lane", state: "queued" },
    { title: "The Selfish Gene", author: "Richard Dawkins", state: "queued" },
    { title: "Gödel, Escher, Bach", author: "Douglas Hofstadter", state: "queued" },
    { title: "The Three-Body Problem", author: "Liu Cixin", state: "queued" },
    { title: "How to Solve It", author: "George Pólya", state: "done", note: "The best book on thinking I've read." },

    { title: "A Mathematician's Apology", author: "G. H. Hardy", state: "done", note: "An Interesting take." },
    { title: "Project Hail Mary", author: "Andy Weir", state: "done", note: "Rocky steals the show." },
    { title: "Surely You're Joking, Mr. Feynman!", author: "Richard Feynman", state: "done", note: "Funny." },
    { title: "The C Programming Language", author: "Kernighan & Ritchie", state: "done", note: "The Original and Best C tutorial." },
    { title: "The Double Helix", author: "James Watson", state: "queued" },
    { title: "What Is Life?", author: "Erwin Schrödinger", state: "queued" },
    { title: "The Pragmatic Programmer", author: "Hunt & Thomas", state: "queued" },
    { title: "Zero to One", author: "Peter Thiel", state: "queued" },
    { title: "The Emperor of All Maladies", author: "Siddhartha Mukherjee", state: "queued" },
  ],

  workingToward: {
    goal: "IISc Bengaluru — BSc Research, Biological Sciences",
    why: "I spent eight years in Bengaluru. IISc was always on the horizon — the place where the kind of work I want to do actually happens. Computational biology, systems thinking, the intersection of math and life. That's the plan. Class 9 is where it starts.",
    by: "2030",
    steps: [
      "Write and publish 10 essays before end of 2026",
      "Finish Future Human Vol. 2 before Class 10",
      "Work through Campbell Biology cover to cover",
      "Apply to IISc BSc Research — 2030",
    ]
  },
};
