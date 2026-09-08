import { Router } from 'express';
import BookController from '../Controllers/BookController.js';

const bookRoutes = Router();

bookRoutes.post('/books', BookController.CreateBook);

export default bookRoutes;