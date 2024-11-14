// This is the data storage (in-memory database)
let books = [
  { id: 1, title: "The Great Gatsby", author: "F. Scott Fitzgerald" },
  { id: 2, title: "1984", author: "George Orwell" },
];

export default function handler(req, res) {
  // Handling GET request - returning the list of books
  if (req.method === "GET") {
    res.status(200).json(books);
  }
  // Handling POST request - adding a new book
  else if (req.method === "POST") {
    const { title, author } = req.body;
    const newBook = {
      id: books.length + 1, // Increment the book ID
      title,
      author,
    };
    books.push(newBook); // Add the new book to the books list
    res.status(201).json(newBook); // Return the newly created book
  } else {
    // Method Not Allowed
    res.status(405).json({ message: "Method not allowed" });
  }
}
