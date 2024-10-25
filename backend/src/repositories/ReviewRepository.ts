import { Review } from '../entity/Review';
import { AddReview as ReviewInterface, ReviewData } from '../dto/review/review';
import { Service } from 'typedi';
import AppDataSource from '../DataSource';
import { User } from '../entity/User';
import { Book } from '../entity/Book';

@Service()
export default class ReviewRepository {
  reviewRepo = AppDataSource.getRepository(Review);
  userRepo = AppDataSource.getRepository(User);
  bookRepo = AppDataSource.getRepository(Book);

  // Create a new review
  public async addReview(reviewData: ReviewInterface): Promise<Review> {
    const review = new Review();
    review.content = reviewData.content;
    review.rating = reviewData.rating;
    review.user = reviewData.user;
    review.book = reviewData.book;

    // Save the review in the database
    await this.reviewRepo.save(review);
    return review;
  }

  //updateReview
  public async updateReview(review: Review, reviewData: ReviewData): Promise<Review> {
    review.content = reviewData.content;
    review.rating = reviewData.rating;
    return await this.reviewRepo.save(review);
  }

  public getReviewByUserAndBookId = async (bookId: number, userId: number) => {
    return await this.reviewRepo.findOne({
      where: {
        user: { id: userId },
        book: { id: bookId },
      },
    });
  };

  // Fetch all reviews
  public async findAll(): Promise<Review[] | null> {
    return await this.reviewRepo.find();
  }

  // Fetch reviews for a specific book
  public async findByBookId(bookId: number): Promise<Review[] | null> {
    return await this.reviewRepo.find({
      where: { book: { id: bookId } },
      relations: ['user', 'book', 'comments'], // Include related User and Book entities
    });
  }
  // Fetch reviews by a specific user
  public async findByUserId(userId: number): Promise<Review[] | null> {
    return await this.reviewRepo.find({ where: { user: { id: userId } } });
  }

  public async findByReviewId(id: string): Promise<Review | null> {
    return await this.reviewRepo.findOne({ where: { id: parseInt(id) } });
  }
}
