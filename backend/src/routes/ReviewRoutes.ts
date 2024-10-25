import { Router } from 'express';
import ReviewController from '../controllers/ReviewController';
import { Container } from 'typedi';

const reviewRouter = Router();
const reviewController = Container.get(ReviewController);

// Create a new review
reviewRouter.patch('/addReview', reviewController.addReview);

// Get all reviews
reviewRouter.get('/', reviewController.getAllReviews);

// Fetch reviews by bookId
reviewRouter.get('/book/:bookId', reviewController.getReviewsByBookId);

// Fetch reviews by userId
reviewRouter.get('/user/:userId', reviewController.getReviewsByUserId);

export default reviewRouter;
