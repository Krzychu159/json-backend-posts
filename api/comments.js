const fs = require("fs");
const path = require("path");

// Ścieżka do pliku comments.json
const commentsFilePath = path.join(__dirname, "../comments.json");

module.exports = (req, res) => {
  fs.readFile(commentsFilePath, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading comments file:", err);
      return res.status(500).json({ message: "Error reading comments file." });
    }

    try {
      const comments = JSON.parse(data);
      const postId = parseInt(req.query.postId); // Pobieramy postId z zapytania URL

      // Filtrujemy komentarze, aby zwrócić tylko te powiązane z konkretnym postem
      const filteredComments = comments.filter(
        (comment) => comment.postId === postId
      );

      res.status(200).json(filteredComments);
    } catch (parseErr) {
      console.error("Error parsing comments file:", parseErr);
      res.status(500).json({ message: "Error parsing comments file." });
    }
  });
};
