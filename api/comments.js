export default function handler(req, res) {
  const comments = [
    {
      postId: 96,
      id: 476,
      name: "quia hic adipisci modi fuga aperiam",
      email: "Amely.Kunde@rodrigo.co.uk",
      body: "officia quas aut culpa eum\neaque quia rem unde ea quae reiciendis omnis\nexcepturi nemo est vel sequi accusantium tenetur at earum\net rerum quisquam temporibus cupiditate",
    },
  ];

  if (req.method === "GET") {
    return res.status(200).json(comments); // Zwrócenie komentarzy
  } else {
    return res.status(405).json({ message: "Method Not Allowed" });
  }
}
