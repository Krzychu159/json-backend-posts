let posts = [
  {
    userId: 1,
    id: 1,
    title:
      "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
    body: "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto",
  },
  {
    userId: 1,
    id: 2,
    title: "qui est esse",
    body: "est rerum tempore vitae\nsequi sint nihil reprehenderit dolor beatae ea dolores neque\nfugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis\nqui aperiam non debitis possimus qui neque nisi nulla",
  },
  {
    userId: 1,
    id: 3,
    title: "ea molestias quasi exercitationem repellat qui ipsa sit aut",
    body: "et iusto sed quo iure\nvoluptatem occaecati omnis eligendi aut ad\nvoluptatem doloribus vel accusantium quis pariatur\nmolestiae porro eius odio et labore et velit aut",
  },
  {
    userId: 1,
    id: 4,
    title: "eum et est occaecati",
    body: "ullam et saepe reiciendis voluptatem adipisci\nsit amet autem assumenda provident rerum culpa\nquis hic commodi nesciunt rem tenetur doloremque ipsam iure\nquis sunt voluptatem rerum illo velit",
  },
  {
    userId: 1,
    id: 5,
    title: "nesciunt quas odio",
    body: "repudiandae veniam quaerat sunt sed\nalias aut fugiat sit autem sed est\nvoluptatem omnis possimus esse voluptatibus quis\nest aut tenetur dolor neque",
  },
  {
    userId: 1,
    id: 6,
    title: "dolorem eum magni eos aperiam quia",
    body: "ut aspernatur corporis harum nihil quis provident sequi\nmollitia nobis aliquid molestiae\nperspiciatis et ea nemo ab reprehenderit accusantium quas\nvoluptate dolores velit et doloremque molestiae",
  },
  {
    userId: 1,
    id: 7,
    title: "magnam facilis autem",
    body: "dolore placeat quibusdam ea quo vitae\nmagni quis enim qui quis quo nemo aut saepe\nquidem repellat excepturi ut quia\nsunt ut sequi eos ea sed quas",
  },
  {
    userId: 1,
    id: 8,
    title: "dolorem dolore est ipsam",
    body: "dignissimos aperiam dolorem qui eum\nfacilis quibusdam animi sint suscipit qui sint possimus cum\nquaerat magni maiores excepturi\nipsam ut commodi dolor voluptatum modi aut vitae",
  },
  {
    userId: 1,
    id: 9,
    title: "nesciunt iure omnis dolorem tempora et accusantium",
    body: "consectetur animi nesciunt iure dolore\nenim quia ad\nveniam autem ut quam aut nobis\net est aut quod aut provident voluptas autem voluptas",
  },
  {
    userId: 1,
    id: 10,
    title: "optio molestias id quia eum",
    body: "quo et expedita modi cum officia vel magni\ndoloribus qui repudiandae\nvero nisi sit\nquos veniam quod sed accusamus veritatis error",
  },
  {
    userId: 2,
    id: 11,
    title: "et ea vero quia laudantium autem",
    body: "delectus reiciendis molestiae occaecati non minima eveniet qui voluptatibus\naccusamus in eum beatae sit\nvel qui neque voluptates ut commodi qui incidunt\nut animi commodi",
  },
  {
    userId: 2,
    id: 12,
    title: "in quibusdam tempore odit est dolorem",
    body: "itaque id aut magnam\npraesentium quia et ea odit et ea voluptas et\nsapiente quia nihil amet occaecati quia id voluptatem\nincidunt ea est distinctio odio",
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
