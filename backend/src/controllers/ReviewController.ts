import { Request, Response } from 'express';
import ReviewService from '../services/ReviewService';
import { Service } from 'typedi';

@Service()
export default class ReviewController {
  constructor(private reviewService: ReviewService) {}

  // Create new review
  public addReview = async (req: Request, res: Response): Promise<void> => {
    const review = await this.reviewService.addReview(req.body);
    res.successResponse({ review });
  };

  // Get all reviews
  public getAllReviews = async (req: Request, res: Response): Promise<void> => {
    const reviews = await this.reviewService.getAllReviews();
    res.successResponse({ reviews });
  };

  // Fetch reviews by bookId
  public getReviewsByBookId = async (req: Request, res: Response): Promise<void> => {
    const bookId = Number(req.params.bookId);
    const reviews = await this.reviewService.findByBookId(bookId);
    res.successResponse({ reviews });
  };

  // Fetch reviews by userId
  public getReviewsByUserId = async (req: Request, res: Response): Promise<void> => {
    const userId = Number(req.params.userId);
    const reviews = await this.reviewService.findByUserId(userId);
    res.successResponse({ reviews });
  };
}
