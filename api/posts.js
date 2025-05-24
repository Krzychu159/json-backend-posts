let posts = [
  {
    userId: 1,
    id: 1,
    title: "Why You Should Always Review Before Publishing",
    body: "Because every detail matters, reviewing before publishing helps avoid mistakes, ensures clarity, and improves overall quality.",
  },
  {
    userId: 1,
    id: 2,
    title: "The Importance Of Asking The Right Questions",
    body: "In life and work, asking the right questions often leads to the best outcomes. It’s how we solve problems, learn, and grow.",
  },
  {
    userId: 1,
    id: 3,
    title: "Small Mistakes That Can Break Big Projects",
    body: "Even minor oversights can derail complex plans. Staying organized and mindful is key to success.",
  },
  {
    userId: 1,
    id: 4,
    title: "When Plans Fail, Stay Calm And Adjust",
    body: "Mistakes happen. What matters is how we respond—adapt, reassess, and move forward with new perspective.",
  },
  {
    userId: 1,
    id: 5,
    title: "What I Learned From A Failed Launch",
    body: "Sometimes things don’t go as expected. Here’s what I took away from a recent project that didn’t hit the mark.",
  },
  {
    userId: 1,
    id: 6,
    title: "Working Smart Vs. Working Hard",
    body: "Hard work is important, but smart planning and focused effort often get better results with less burnout.",
  },
  {
    userId: 1,
    id: 7,
    title: "Tips For Staying Focused While Working Remotely",
    body: "Remote work has its perks, but it also brings distractions. Here are a few tricks I use to stay productive at home.",
  },
  {
    userId: 1,
    id: 8,
    title: "Lessons From My First Year As A Freelancer",
    body: "Going freelance changed how I work and live. These are some of the key lessons I’ve picked up along the way.",
  },
  {
    userId: 1,
    id: 9,
    title: "What Happens When You Say Yes Too Much",
    body: "Taking on too much can backfire. Here’s what I learned about boundaries, balance, and the value of saying no.",
  },
  {
    userId: 1,
    id: 10,
    title: "How To Recover From A Bad Client Experience",
    body: "Not every client relationship works out. Here's how I handled a rough one and came back stronger.",
  },
  {
    userId: 2,
    id: 11,
    title: "Why Feedback Is A Gift",
    body: "Even when it’s hard to hear, honest feedback helps us grow. Here's why I now ask for it every time.",
  },
  {
    userId: 2,
    id: 12,
    title: "How To Spot Burnout Before It Hits",
    body: "Burnout doesn’t always show up clearly. These are the signs I watch for—and what I do when they appear.",
  },
];

function setCorsHeaders(res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
}

export default function handler(req, res) {
  setCorsHeaders(res);

  if (req.method === "OPTIONS") {
    // Preflight request
    return res.status(200).end();
  }

  const { method, url } = req;
  const match = url.match(/\/api\/posts\/?(\d+)?/);
  const id = match?.[1] ? parseInt(match[1]) : null;

  if (method === "GET") {
    if (id) {
      const post = posts.find((p) => p.id === id);
      setCorsHeaders(res);
      return post
        ? res.status(200).json(post)
        : res.status(404).json({ message: "Post not found" });
    }
    setCorsHeaders(res);
    return res.status(200).json(posts);
  }

  if (method === "POST") {
    const newPost = req.body;
    newPost.id = posts.length ? Math.max(...posts.map((p) => p.id)) + 1 : 1;
    posts.push(newPost);
    setCorsHeaders(res);
    return res.status(201).json(newPost);
  }

  if (method === "PUT") {
    if (!id) {
      setCorsHeaders(res);
      return res.status(400).json({ message: "Missing post ID" });
    }
    const index = posts.findIndex((p) => p.id === id);
    if (index === -1) {
      setCorsHeaders(res);
      return res.status(404).json({ message: "Post not found" });
    }
    posts[index] = { ...posts[index], ...req.body };
    setCorsHeaders(res);
    return res.status(200).json(posts[index]);
  }

  if (method === "DELETE") {
    if (!id) {
      setCorsHeaders(res);
      return res.status(400).json({ message: "Missing post ID" });
    }
    const index = posts.findIndex((p) => p.id === id);
    if (index === -1) {
      setCorsHeaders(res);
      return res.status(404).json({ message: "Post not found" });
    }
    posts.splice(index, 1);
    setCorsHeaders(res);
    return res.status(204).end();
  }

  setCorsHeaders(res);
  return res.status(405).json({ message: "Method not allowed" });
}
