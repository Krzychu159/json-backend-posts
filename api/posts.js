export default function handler(req, res) {
  const posts = [
    {
      userId: 1,
      id: 1,
      title:
        "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
      body: "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto",
    },
  ];

  if (req.method === "GET") {
    return res.status(200).json(posts); // Zwrócenie listy postów
  } else {
    return res.status(405).json({ message: "Method Not Allowed" });
  }
}
