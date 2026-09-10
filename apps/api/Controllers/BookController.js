import Book from "../Models/Book.js";

export default class BookController {
  static async CreateBook(req, res) {
    const { title, author, isbn, status, publishedYear } = req.body;
    if (!title || !author || !isbn) {
      return res
        .status(400)
        .json({ error: "Title, author, and ISBN are required." });
    }

    try {
      const newBook = new Book({ title, author, isbn, status, publishedYear });
      await newBook.save();
      res.status(201).json(newBook);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static async GetAllBooks(req, res) {
    try {
      const books = await Book.find();
      res.status(200).json(books);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async GetBookById(req, res) {
    try {
      const book = await Book.findById(req.params.id);
      if (!book) {
        return res.status(404).json({ error: "Book not found." });
      }
      res.status(200).json(book);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async UpdateBook(req, res) {
    try{
        const updatedBook = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedBook) {
            return res.status(404).json({ error: "Book not found." });
        }
        res.status(200).json(updatedBook);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
  }

  static async DeleteBook(req, res) {
    try {
        const deletedBook = await Book.findByIdAndDelete(req.params.id);
        if (!deletedBook) {
            return res.status(404).json({ error: "Book not found." });
        }
        res.status(200).json({ message: "Book deleted successfully." });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
  }
}
