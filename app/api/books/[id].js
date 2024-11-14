let books = [
  { id: 1, title: "The Great Gatsby", author: "F. Scott Fitzgerald" },
  { id: 2, title: "1984", author: "George Orwell" },
];

export default function handler(req, res) {
  const { id } = req.query;
  const bookId = parseInt(id, 10); // Parse the book ID from the URL

  if (req.method === "PUT") {
    // Handle updating a book
    const { title, author } = req.body;
    const bookIndex = books.findIndex((book) => book.id === bookId);

    if (bookIndex !== -1) {
      // Update the book details
      books[bookIndex] = { id: bookId, title, author };
      res.status(200).json(books[bookIndex]); // Return the updated book
    } else {
      res.status(404).json({ message: "Book not found" });
    }
  } else if (req.method === "DELETE") {
    // Handle deleting a book
    const bookIndex = books.findIndex((book) => book.id === bookId);

    if (bookIndex !== -1) {
      books.splice(bookIndex, 1); // Remove the book from the array
      res.status(200).json({ message: "Book deleted" });
    } else {
      res.status(404).json({ message: "Book not found" });
    }
  } else {
    // Method Not Allowed
    res.status(405).json({ message: "Method not allowed" });
  }
}
