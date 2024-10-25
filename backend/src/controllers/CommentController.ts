import { Request, Response } from 'express';
import CommentService from '../services/CommentService';
import { Service } from 'typedi';

@Service()
export default class CommentController {
  constructor(private commentService: CommentService) {}

  // Create new comment
  addComment = async (req: Request, res: Response): Promise<void> => {
    const comment = await this.commentService.addComment(req.body);
    res.successResponse({ comment });
  };

  // Fetch comments by reviewId
  getCommentsByReviewId = async (req: Request, res: Response): Promise<void> => {
    const reviewId = Number(req.params.reviewId);
    const comments = await this.commentService.findByReviewId(reviewId);
    res.successResponse({ comments });
  };

  // Fetch comments by userId
  getCommentsByUserId = async (req: Request, res: Response): Promise<void> => {
    const userId = Number(req.params.userId);
    const comments = await this.commentService.findByUserId(userId);
    res.successResponse({ comments });
  };
}
