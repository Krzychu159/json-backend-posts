let posts = [
  {
    userId: 1,
    id: 1,
    title:
      "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
    body: "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto",
  },
];

// Metoda GET - Pobierz wszystkie posty
export default function handler(req, res) {
  if (req.method === "GET") {
    return res.status(200).json(posts); // Zwrócenie listy postów
  }

  // Metoda POST - Dodaj nowy post
  if (req.method === "POST") {
    const newPost = req.body; // Nowy post, który przychodzi w treści żądania
    newPost.id = posts.length + 1; // Automatyczne nadanie ID
    posts.push(newPost); // Dodanie nowego posta do listy
    return res.status(201).json(newPost); // Zwrócenie nowego posta z kodem 201
  }

  // Metoda PUT - Aktualizuj post
  if (req.method === "PUT") {
    const { id, title, body } = req.body;
    const postIndex = posts.findIndex((post) => post.id === id);

    if (postIndex !== -1) {
      posts[postIndex] = { id, title, body }; // Zaktualizowanie postu
      return res.status(200).json(posts[postIndex]);
    }

    return res.status(404).json({ message: "Post not found" });
  }

  // Metoda DELETE - Usuń post
  if (req.method === "DELETE") {
    const { id } = req.body;
    const postIndex = posts.findIndex((post) => post.id === id);

    if (postIndex !== -1) {
      posts = posts.filter((post) => post.id !== id); // Usunięcie posta
      return res.status(204).json({ message: "Post deleted successfully" });
    }

    return res.status(404).json({ message: "Post not found" });
  }

  // Jeśli metoda nie jest rozpoznana
  return res.status(405).json({ message: "Method Not Allowed" });
}
