let posts = [
  {
    userId: 1,
    id: 1,
    title: "Why You Should Always Review Before Publishing",
    body: "Because every detail matters, reviewing before publishing helps avoid mistakes, ensures clarity, and improves overall quality.",
    likes: 78,
  },
  {
    userId: 1,
    id: 2,
    title: "The Importance Of Asking The Right Questions",
    body: "In life and work, asking the right questions often leads to the best outcomes. It’s how we solve problems, learn, and grow.",
    likes: 91,
  },
  {
    userId: 1,
    id: 3,
    title: "Small Mistakes That Can Break Big Projects",
    body: "Even minor oversights can derail complex plans. Staying organized and mindful is key to success.",
    likes: 83,
  },
  {
    userId: 1,
    id: 4,
    title: "When Plans Fail, Stay Calm And Adjust",
    body: "Mistakes happen. What matters is how we respond—adapt, reassess, and move forward with new perspective.",
    likes: 65,
  },
  {
    userId: 1,
    id: 5,
    title: "What I Learned From A Failed Launch",
    body: "Sometimes things don’t go as expected. Here’s what I took away from a recent project that didn’t hit the mark.",
    likes: 72,
  },
  {
    userId: 1,
    id: 6,
    title: "Working Smart Vs. Working Hard",
    body: "Hard work is important, but smart planning and focused effort often get better results with less burnout.",
    likes: 88,
  },
  {
    userId: 1,
    id: 7,
    title: "Tips For Staying Focused While Working Remotely",
    body: "Remote work has its perks, but it also brings distractions. Here are a few tricks I use to stay productive at home.",
    likes: 54,
  },
  {
    userId: 1,
    id: 8,
    title: "Lessons From My First Year As A Freelancer",
    body: "Going freelance changed how I work and live. These are some of the key lessons I’ve picked up along the way.",
    likes: 97,
  },
  {
    userId: 1,
    id: 9,
    title: "What Happens When You Say Yes Too Much",
    body: "Taking on too much can backfire. Here’s what I learned about boundaries, balance, and the value of saying no.",
    likes: 59,
  },
  {
    userId: 1,
    id: 10,
    title: "How To Recover From A Bad Client Experience",
    body: "Not every client relationship works out. Here's how I handled a rough one and came back stronger.",
    likes: 81,
  },
  {
    userId: 2,
    id: 11,
    title: "Why Feedback Is A Gift",
    body: "Even when it’s hard to hear, honest feedback helps us grow. Here's why I now ask for it every time.",
    likes: 69,
  },
  {
    userId: 2,
    id: 12,
    title: "How To Spot Burnout Before It Hits",
    body: "Burnout doesn’t always show up clearly. These are the signs I watch for—and what I do when they appear.",
    likes: 94,
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

  if (req.method === "OPTIONS") return res.status(200).end();

  const { method, url } = req;
  const match = url.match(/\/api\/posts\/?(\d+)?(\/like)?/);
  const id = match?.[1] ? parseInt(match[1]) : null;
  const isLikeRequest = match?.[2] === "/like";

  if (method === "GET") {
    if (id) {
      const post = posts.find((p) => p.id === id);
      return post
        ? res.status(200).json(post)
        : res.status(404).json({ message: "Post not found" });
    }
    return res.status(200).json(posts);
  }

  if (method === "POST" && isLikeRequest && id) {
    const post = posts.find((p) => p.id === id);
    if (!post) return res.status(404).json({ message: "Post not found" });
    post.likes += 1;
    return res.status(200).json({ likes: post.likes });
  }

  if (method === "POST") {
    const newPost = req.body;
    newPost.id = posts.length ? Math.max(...posts.map((p) => p.id)) + 1 : 1;
    newPost.likes = 0;
    posts.push(newPost);
    return res.status(201).json(newPost);
  }

  if (method === "PUT" && id) {
    const index = posts.findIndex((p) => p.id === id);
    if (index === -1)
      return res.status(404).json({ message: "Post not found" });

    posts[index] = { ...posts[index], ...req.body };
    return res.status(200).json(posts[index]);
  }

  if (method === "DELETE" && id) {
    const index = posts.findIndex((p) => p.id === id);
    if (index === -1)
      return res.status(404).json({ message: "Post not found" });

    posts.splice(index, 1);
    return res.status(204).end();
  }

  return res.status(405).json({ message: "Method not allowed" });
}
