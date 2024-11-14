"use client"; // This enables client-side rendering

import { useState, useEffect } from "react";

// Book interface for TypeScript typing
interface Book {
  id: number;
  title: string;
  author: string;
}

const Home = () => {
  const [books, setBooks] = useState<Book[]>([]); // State to store the list of books
  const [title, setTitle] = useState(""); // State to store the new book title
  const [author, setAuthor] = useState(""); // State to store the new book author

  // Fetch the list of books when the page loads
  useEffect(() => {
    fetch("/api/books")
      .then((response) => response.json())
      .then((data) => setBooks(data));
  }, []);

  // Handle adding a new book
  const handleAddBook = () => {
    const newBook = { title, author };
    fetch("/api/books", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newBook),
    })
      .then((response) => response.json())
      .then((data) => setBooks([...books, data]));

    setTitle(""); // Reset the title input
    setAuthor(""); // Reset the author input
  };

  // Handle updating an existing book
  const handleUpdateBook = (id: number) => {
    const newTitle = prompt("Enter new title:");
    const newAuthor = prompt("Enter new author:");

    if (newTitle && newAuthor) {
      fetch(`/api/books/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title: newTitle, author: newAuthor }),
      })
        .then((response) => response.json())
        .then((updatedBook) => {
          setBooks(books.map((book) => (book.id === id ? updatedBook : book)));
        });
    }
  };

  // Handle deleting a book
  const handleDeleteBook = (id: number) => {
    fetch(`/api/books/${id}`, {
      method: "DELETE",
    }).then(() => {
      setBooks(books.filter((book) => book.id !== id));
    });
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold">Books API</h1>
      <div className="mt-4">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          className="border p-2"
        />
        <input
          type="text"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          placeholder="Author"
          className="border p-2 ml-2"
        />
        <button
          onClick={handleAddBook}
          className="bg-blue-500 text-white p-2 ml-2"
        >
          Add Book
        </button>
      </div>

      <div className="mt-4">
        <h2 className="text-xl font-semibold">Books List</h2>
        <ul>
          {books.map((book) => (
            <li key={book.id} className="flex justify-between items-center p-2 border-b">
              <span>{book.title} by {book.author}</span>
              <div>
                <button
                  onClick={() => handleUpdateBook(book.id)}
                  className="bg-yellow-500 text-white p-1 mr-2"
                >
                  Update
                </button>
                <button
                  onClick={() => handleDeleteBook(book.id)}
                  className="bg-red-500 text-white p-1"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Home;
