import { BadRequestError } from '../utils/response/errors/bad-request-error';
import { Service } from 'typedi';
import CommentRepository from '../repositories/CommentRepository';
import { CommentDto, Comment as CommentInterface } from '../dto/comment/comment';
import { plainToClass, plainToInstance } from 'class-transformer';
import { NotFoundError } from '../utils/response/errors/not-found-error';
import UserRepository from '../repositories/UserRepository';
import ReviewRepository from '../repositories/ReviewRepository';

@Service()
export default class CommentService {
  constructor(
    private commentRepository: CommentRepository,
    private userRepository: UserRepository,
    private reviewRepository: ReviewRepository
  ) {}

  addComment = async (data: CommentInterface): Promise<CommentDto> => {
    try {
      // Fetch the User entity by the userId
      const user = await this.userRepository.findUserById(data.userId);
      if (!user) {
        throw new Error('User not found');
      }

      // Fetch the Review entity by the reviewId
      const review = await this.reviewRepository.findByReviewId(data.reviewId);
      if (!review) {
        throw new Error('Review not found');
      }

      const comment = await this.commentRepository.addComment({ ...data, user, review });
      return plainToClass(CommentDto, comment);
    } catch (error) {
      throw new BadRequestError('Error creating comment');
    }
  };

  // Fetch comments by reviewId
  findByReviewId = async (reviewId: number): Promise<CommentDto[]> => {
    try {
      const comments = await this.commentRepository.findByReviewId(reviewId);
      if (!comments) {
        throw new NotFoundError(`Comments for reviewId: ${reviewId} not found`);
      }
      return plainToInstance(CommentDto, comments);
    } catch (error) {
      throw new BadRequestError('Error fetching comments by reviewId');
    }
  };

  // Fetch comments by userId
  findByUserId = async (userId: number): Promise<CommentDto[]> => {
    try {
      const comments = await this.commentRepository.findByUserId(userId);
      if (!comments) {
        throw new NotFoundError(`Comments for userId: ${userId} not found`);
      }
      return plainToInstance(CommentDto, comments);
    } catch (error) {
      throw new BadRequestError('Error fetching comments by userId');
    }
  };
}
