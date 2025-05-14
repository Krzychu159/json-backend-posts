const data = require("../data.json");

export default function handler(req, res) {
  const { postId } = req.query;

  if (postId) {
    const filtered = data.comments.filter((c) => c.postId == postId);
    res.status(200).json(filtered);
  } else {
    res.status(200).json(data.comments);
  }
}
