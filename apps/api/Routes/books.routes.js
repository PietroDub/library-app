import { Router } from 'express';
import BookController from '../Controllers/BookController.js';

const bookRoutes = Router();

bookRoutes.post('/create', BookController.CreateBook);
bookRoutes.get('/all', BookController.GetAllBooks);
bookRoutes.get('/:id', BookController.GetBookById);
bookRoutes.put('/:id', BookController.UpdateBook);
bookRoutes.delete('/:id', BookController.DeleteBook);
export default bookRoutes;