import { Service } from 'typedi';
import BookRepository from '../repositories/BookRepository';
import { plainToInstance } from 'class-transformer';
import { BookDto } from '../dto/book/book';

@Service()
export class BookService {
  constructor(public bookRepository: BookRepository) {}
  addBook = async (bookData: any): Promise<BookDto> => {
    const book = await this.bookRepository.addBook(bookData);
    return plainToInstance(BookDto, book);
  };

  getAllBooks = async (page: any, limit: any): Promise<{ books: BookDto[]; count: number }> => {
    const [books, count] = await this.bookRepository.findAllBooks(parseInt(page), parseInt(limit));
    const res = plainToInstance(BookDto, books);
    return { books: res, count };
  };
  getBookDetailsWithRating = async (bookId: string): Promise<any> => {
    const book = await this.bookRepository.findBookById(bookId);

    if (!book) {
      throw new Error('Book not found');
    }

    const averageRating = await this.bookRepository.findAverageRatingByid(bookId);

    return { ...book, averageRating };
  };
}
