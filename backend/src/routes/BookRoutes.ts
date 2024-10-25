import express from 'express';
import { Container } from 'typedi';
import BookController from '../controllers/BookController';

const router = express.Router();

const bookController = Container.get(BookController);

// Books routes
router.get('/', bookController.getAllBooks);
router.post('/createBook', bookController.addBook);
router.get('/:bookId', bookController.getBookDetails);

export default router;
