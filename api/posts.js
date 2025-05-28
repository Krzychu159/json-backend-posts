let posts = [
  {
    userId: 1,
    id: 1,
    title: "Review Before Publishing",
    body: "Because every detail matters. Reviewing your content helps ensure accuracy, clarity, and a professional tone. It also reduces errors that could harm your credibility.",
    likes: 72,
  },
  {
    userId: 1,
    id: 2,
    title: "Ask Better Questions",
    body: "In life and work, asking clear, focused questions leads to better decisions and solutions. It's a skill that can boost communication and drive progress.",
    likes: 94,
  },
  {
    userId: 1,
    id: 3,
    title: "Tiny Mistakes, Big Impact",
    body: "Even minor oversights in planning, execution, or communication can snowball into serious problems. Attention to detail is crucial at every stage.",
    likes: 67,
  },
  {
    userId: 1,
    id: 4,
    title: "When Plans Collapse",
    body: "Mistakes happen, and plans often need adjustments. Staying calm helps you reassess, respond strategically, and minimize damage in the long run.",
    likes: 85,
  },
  {
    userId: 1,
    id: 5,
    title: "Lessons From Failure",
    body: "Sometimes things don’t go as expected. But each failed attempt offers a lesson, helping you build experience, resilience, and long-term success.",
    likes: 78,
  },
  {
    userId: 1,
    id: 6,
    title: "Smart Vs. Hard Work",
    body: "Hard work is valuable, but smart work multiplies results. Knowing what to prioritize, automate, and delegate often separates success from burnout.",
    likes: 63,
  },
  {
    userId: 1,
    id: 7,
    title: "Focus While Remote",
    body: "Remote work has perks and distractions. Build structure, set boundaries, and track goals to maintain focus and productivity over time.",
    likes: 97,
  },
  {
    userId: 1,
    id: 8,
    title: "First Year Freelance",
    body: "Going freelance changed how I work, manage time, and handle clients. It's a mix of freedom and challenge that taught me self-reliance and discipline.",
    likes: 81,
  },
  {
    userId: 1,
    id: 9,
    title: "Saying Yes Too Much",
    body: "Taking on too much can backfire. Overcommitting leads to stress, missed deadlines, and poor quality. Learn to say no with confidence and care.",
    likes: 56,
  },
  {
    userId: 1,
    id: 10,
    title: "Bad Client Recovery",
    body: "Not every client relationship works. Know when to walk away, how to communicate boundaries, and what to improve next time to avoid repeat issues.",
    likes: 91,
  },
  {
    userId: 2,
    id: 11,
    title: "Feedback Is a Gift",
    body: "Even when it’s hard to hear, good feedback helps us grow. Listening actively and applying insights can transform your work and relationships.",
    likes: 88,
  },
  {
    userId: 2,
    id: 12,
    title: "Spot Burnout Early",
    body: "Burnout doesn’t always show up clearly. Watch for subtle signs like fatigue, disconnection, and dread. Take breaks and set limits before it's too late.",
    likes: 53,
  },
  {
    userId: 2,
    id: 13,
    title: "Time Management Wins",
    body: "Managing time well isn’t just about to-do lists. It's about energy, focus, and eliminating distractions. Set goals and protect your most valuable hours.",
    likes: 69,
  },
  {
    userId: 2,
    id: 14,
    title: "Why Routine Matters",
    body: "A strong routine builds momentum. Start small, stay consistent, and build habits that make success feel natural rather than forced.",
    likes: 74,
  },
  {
    userId: 2,
    id: 15,
    title: "Creativity On Demand",
    body: "Creativity isn't just luck—it’s a process. Schedule time for deep thinking, limit input, and give your brain space to connect new ideas.",
    likes: 81,
  },
  {
    userId: 2,
    id: 16,
    title: "The Power of Breaks",
    body: "Working non-stop leads to diminishing returns. Short, regular breaks help recharge attention, reduce stress, and improve decision-making.",
    likes: 58,
  },
  {
    userId: 2,
    id: 17,
    title: "Say No Gracefully",
    body: "Declining requests with respect keeps you focused without burning bridges. Set limits, communicate clearly, and protect your time.",
    likes: 66,
  },
  {
    userId: 3,
    id: 18,
    title: "Building Trust Fast",
    body: "Trust is built through consistency and communication. Show up, deliver what you promise, and be transparent when things go wrong.",
    likes: 77,
  },
  {
    userId: 3,
    id: 19,
    title: "Handle Criticism Well",
    body: "Receiving criticism is tough, but it can guide growth. Listen objectively, filter what's useful, and apply it to improve your work.",
    likes: 62,
  },
  {
    userId: 3,
    id: 20,
    title: "Celebrate Small Wins",
    body: "Progress often happens in small steps. Acknowledging minor victories keeps you motivated and builds momentum toward bigger goals.",
    likes: 71,
  },
  {
    userId: 3,
    id: 21,
    title: "Clarity Beats Complexity",
    body: "Clear messages win. Whether in writing, speech, or design, simplicity helps your audience connect, understand, and act more easily.",
    likes: 87,
  },
  {
    userId: 3,
    id: 22,
    title: "Protect Your Focus",
    body: "Distraction is costly. Build an environment that shields your attention. Schedule deep work and say no to unnecessary meetings.",
    likes: 90,
  },
  {
    userId: 3,
    id: 23,
    title: "Lead By Listening",
    body: "Great leaders don’t just talk—they listen. Pay attention to feedback, ideas, and unspoken concerns to lead with empathy and insight.",
    likes: 84,
  },
  {
    userId: 3,
    id: 24,
    title: "Work-Life Balance Myth?",
    body: "Balance looks different for everyone. Instead of perfect symmetry, aim for boundaries that protect your values and well-being.",
    likes: 79,
  },
  {
    userId: 3,
    id: 25,
    title: "Why Simplicity Wins",
    body: "Whether in design or decision-making, simplicity reduces errors and boosts impact. Focus on the essentials to get better results.",
    likes: 93,
  },
];

function setCorsHeaders(res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE, OPTIONS"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
}

export default function handler(req, res) {
  setCorsHeaders(res);
  if (req.method === "OPTIONS") return res.status(200).end();

  const { method, url } = req;
  const match = url.match(/\/api\/posts\/?(\d+)?(\/like)?/);
  const id = match?.[1] ? parseInt(match[1]) : null;
  const isLikeRequest = match?.[2] === "/like";

  // GET all or one post
  if (method === "GET") {
    if (id) {
      const post = posts.find((p) => p.id === id);
      return post
        ? res.status(200).json(post)
        : res.status(404).json({ message: "Post not found" });
    }
    return res.status(200).json(posts);
  }

  // POST /api/posts/:id/like
  if (method === "POST" && isLikeRequest && id) {
    const post = posts.find((p) => p.id === id);
    if (!post) return res.status(404).json({ message: "Post not found" });
    post.likes += 1;
    return res.status(200).json({ likes: post.likes });
  }

  // POST new post
  if (method === "POST") {
    const newPost = req.body;
    newPost.id = posts.length ? Math.max(...posts.map((p) => p.id)) + 1 : 1;
    newPost.likes = Math.floor(Math.random() * 51) + 50; // 50-100
    posts.push(newPost);
    return res.status(201).json(newPost);
  }

  // PUT full update
  if (method === "PUT" && id) {
    const index = posts.findIndex((p) => p.id === id);
    if (index === -1)
      return res.status(404).json({ message: "Post not found" });
    posts[index] = { ...posts[index], ...req.body };
    return res.status(200).json(posts[index]);
  }

  // PATCH partial update
  if (method === "PATCH" && id) {
    const post = posts.find((p) => p.id === id);
    if (!post) return res.status(404).json({ message: "Post not found" });
    Object.assign(post, req.body);
    return res.status(200).json(post);
  }

  // DELETE post
  if (method === "DELETE" && id) {
    const index = posts.findIndex((p) => p.id === id);
    if (index === -1)
      return res.status(404).json({ message: "Post not found" });
    posts.splice(index, 1);
    return res.status(204).end();
  }

  return res.status(405).json({ message: "Method not allowed" });
}
