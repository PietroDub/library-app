import Book from "../Models/Book.js";

export default class BookController {
    static async CreateBook(req, res) {
        const { title, author, isbn, status, publishedYear } = req.body;
        if(!title || !author || !isbn) {
            return res.status(400).json({ error: "Title, author, and ISBN are required." });
        }
        
        try {
            const newBook = new Book({ title, author, isbn, status, publishedYear });
            await newBook.save();
            res.status(201).json(newBook);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
}