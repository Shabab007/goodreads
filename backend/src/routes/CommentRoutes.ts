import { Router } from 'express';
import CommentController from '../controllers/CommentController';
import { Container } from 'typedi';

const commentRouter = Router();
const commentController = Container.get(CommentController);

// Create a new comment
commentRouter.post('/', commentController.addComment);

// Fetch comments by reviewId
commentRouter.get('/review/:reviewId', commentController.getCommentsByReviewId);

// Fetch comments by userId
commentRouter.get('/user/:userId', commentController.getCommentsByUserId);

export default commentRouter;
