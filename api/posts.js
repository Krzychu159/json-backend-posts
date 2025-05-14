const fs = require("fs");
const path = require("path");

// Ścieżka do pliku data.json
const postsFilePath = path.join(__dirname, "../data.json");

module.exports = (req, res) => {
  fs.readFile(postsFilePath, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading data file:", err);
      return res.status(500).json({ message: "Error reading data file." });
    }

    try {
      const posts = JSON.parse(data);
      res.status(200).json(posts);
    } catch (parseErr) {
      console.error("Error parsing data file:", parseErr);
      res.status(500).json({ message: "Error parsing data file." });
    }
  });
};
