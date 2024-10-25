import { BadRequestError } from '../utils/response/errors/bad-request-error';
import { Service } from 'typedi';
import ReviewRepository from '../repositories/ReviewRepository';
import { ReviewDto, ReviewData as ReviewInterface } from '../dto/review/review';
import { plainToClass, plainToInstance } from 'class-transformer';
import { NotFoundError } from '../utils/response/errors/not-found-error';
import UserRepository from '../repositories/UserRepository';
import BookRepository from '../repositories/BookRepository';

@Service()
export default class ReviewService {
  constructor(
    private reviewRepository: ReviewRepository,
    private userRepository: UserRepository,
    private bookRepository: BookRepository
  ) {}

  // Add a new review
  addReview = async (data: ReviewInterface): Promise<ReviewDto> => {
    const { bookId, userId } = data;

    let review;
    try {
      // Check if the review already exists for this book and user
      let review = await this.reviewRepository.getReviewByUserAndBookId(parseInt(bookId), parseInt(userId));
      if (review) {
        review = await this.reviewRepository.updateReview(review, data);
      } else {
        const user = await this.userRepository.findUserById(userId);
        if (!user) {
          throw new Error('User not found');
        }

        const book = await this.bookRepository.findBookById(bookId);
        if (!book) {
          throw new Error('Book not found');
        }
        review = await this.reviewRepository.addReview({
          ...data,
          user,
          book,
        });
      }

      // const review = await this.reviewRepository.addReview(data);
      return plainToClass(ReviewDto, review);
    } catch (error) {
      throw new BadRequestError('Error creating review');
    }
  };

  // Get all reviews
  getAllReviews = async (): Promise<ReviewDto[]> => {
    try {
      const reviews = await this.reviewRepository.findAll();
      return plainToInstance(ReviewDto, reviews);
    } catch (error) {
      throw new NotFoundError('Reviews not found');
    }
  };

  // Fetch reviews by bookId
  findByBookId = async (bookId: number): Promise<ReviewDto[]> => {
    try {
      const reviews = await this.reviewRepository.findByBookId(bookId);
      if (!reviews) {
        throw new NotFoundError(`Reviews for bookId: ${bookId} not found`);
      }
      return plainToInstance(ReviewDto, reviews);
    } catch (error) {
      throw new BadRequestError('Error fetching reviews by bookId');
    }
  };

  // Fetch reviews by userId
  findByUserId = async (userId: number): Promise<ReviewDto[]> => {
    try {
      const reviews = await this.reviewRepository.findByUserId(userId);
      if (!reviews) {
        throw new NotFoundError(`Reviews for userId: ${userId} not found`);
      }
      return plainToInstance(ReviewDto, reviews);
    } catch (error) {
      throw new BadRequestError('Error fetching reviews by userId');
    }
  };
}
