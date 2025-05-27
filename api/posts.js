let posts = [
  {
    userId: 1,
    id: 1,
    title: "Why You Should Always Review Before Publishing",
    body: "Because every detail matters...",
    likes: 72,
  },
  {
    userId: 1,
    id: 2,
    title: "The Importance Of Asking The Right Questions",
    body: "In life and work...",
    likes: 94,
  },
  {
    userId: 1,
    id: 3,
    title: "Small Mistakes That Can Break Big Projects",
    body: "Even minor oversights...",
    likes: 67,
  },
  {
    userId: 1,
    id: 4,
    title: "When Plans Fail, Stay Calm And Adjust",
    body: "Mistakes happen...",
    likes: 85,
  },
  {
    userId: 1,
    id: 5,
    title: "What I Learned From A Failed Launch",
    body: "Sometimes things don’t go as expected...",
    likes: 78,
  },
  {
    userId: 1,
    id: 6,
    title: "Working Smart Vs. Working Hard",
    body: "Hard work is important...",
    likes: 63,
  },
  {
    userId: 1,
    id: 7,
    title: "Tips For Staying Focused While Working Remotely",
    body: "Remote work has its perks...",
    likes: 97,
  },
  {
    userId: 1,
    id: 8,
    title: "Lessons From My First Year As A Freelancer",
    body: "Going freelance changed how I work...",
    likes: 81,
  },
  {
    userId: 1,
    id: 9,
    title: "What Happens When You Say Yes Too Much",
    body: "Taking on too much can backfire...",
    likes: 56,
  },
  {
    userId: 1,
    id: 10,
    title: "How To Recover From A Bad Client Experience",
    body: "Not every client relationship works out...",
    likes: 91,
  },
  {
    userId: 2,
    id: 11,
    title: "Why Feedback Is A Gift",
    body: "Even when it’s hard to hear...",
    likes: 88,
  },
  {
    userId: 2,
    id: 12,
    title: "How To Spot Burnout Before It Hits",
    body: "Burnout doesn’t always show up clearly...",
    likes: 53,
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
