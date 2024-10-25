import { Book } from '../entity/Book';
import { Book as BookInterface } from '../dto/book/book';
import { Service } from 'typedi';
import AppDataSource from '../DataSource';
@Service()
export default class BookRepository {
  bookRepo = AppDataSource.getRepository(Book);
  // Create a new book
  public async addBook(bookData: BookInterface): Promise<Book> {
    const book = new Book();
    book.title = bookData.title;
    book.author = bookData.author;
    book.publishedDate = bookData.publishedDate;
    book.reviews = [];
    book.coverImage = 'https://random-image-pepebigotes.vercel.app/api/random-image';

    await this.bookRepo.save(book);
    return book;
  }

  public async findAllBooks(page = 1, limit = 10): Promise<[Book[], number]> {
    const offset = (page - 1) * limit;

    const [books, total] = await this.bookRepo.findAndCount({
      relations: ['reviews', 'reviews.comments', 'reviews.user'], // Load reviews, comments, and the user who wrote the review
      skip: offset,
      take: limit,
    });

    return [books, total]; // Return books and total count of books
  }

  public async findById(bookId: string): Promise<Book> {
    const book = await this.bookRepo.findOne({
      where: { id: parseInt(bookId) },
      relations: ['reviews', 'reviews.comments', 'reviews.user'], // Fetch related reviews, comments, and user
    });

    return book; // Return books and total count of books
  }
  public async findBookById(id: string): Promise<Book | null> {
    return await this.bookRepo.findOne({ where: { id: parseInt(id) } });
  }

  public async findAverageRatingByid(id: string): Promise<number | null> {
    const average = await this.bookRepo
      .createQueryBuilder('book')
      .leftJoin('book.reviews', 'review')
      .select('ROUND(AVG(review.rating), 2)', 'avgRating')
      .where('book.id = :bookId', { bookId: parseInt(id) })
      .getRawOne();

    const averageRating = parseFloat(average.avgRating) || 0;
    return averageRating;
  }
}
