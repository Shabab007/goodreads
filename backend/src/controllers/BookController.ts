import { Request, Response } from 'express';
import { Service } from 'typedi';
import { BookService } from '../services/BookService';

@Service()
export default class BookController {
  constructor(private bookService: BookService) {}

  addBook = async (req: Request, res: Response) => {
    const book = await this.bookService.addBook(req.body);
    res.successResponse({ book });
  };

  getAllBooks = async (req: Request, res: Response) => {
    const books = await this.bookService.getAllBooks();
    res.successResponse(books);
  };

  getBookDetails = async (req: Request, res: Response) => {
    try {
      const bookId = parseInt(req.params.bookId);
      const bookDetails = await this.bookService.getBookDetailsWithRating(bookId.toString());
      return res.json(bookDetails);
    } catch (error) {
      return res.status(404).json({ message: error.message });
    }
  };
}
