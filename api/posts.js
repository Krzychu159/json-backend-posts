const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "data.json");

function readData() {
  const data = fs.readFileSync(filePath, "utf8");
  return JSON.parse(data);
}

function writeData(data) {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

module.exports = (req, res) => {
  const data = readData();
  const postId = parseInt(req.query.id);

  if (req.method === "DELETE") {
    const index = data.posts.findIndex((post) => post.id === postId);
    if (index === -1) {
      return res.status(404).json({ error: "Post not found" });
    }
    data.posts.splice(index, 1);
    writeData(data);
    return res.status(200).json({ message: `Post ${postId} deleted` });
  }

  // ...obsługa GET, POST, PUT itd.
};
