import { Comment } from '../entity/Comment';
import { AddComment as CommentInterface } from '../dto/comment/comment';
import { Service } from 'typedi';
import AppDataSource from '../DataSource';
import { User } from '../entity/User'; // Import the User entity
import { Review } from '../entity/Review'; // Import the Review entity

@Service()
export default class CommentRepository {
  commentRepo = AppDataSource.getRepository(Comment);
  userRepo = AppDataSource.getRepository(User);
  reviewRepo = AppDataSource.getRepository(Review); // Get the Review repository

  // Add a new comment on a review
  public async addComment(commentData: CommentInterface): Promise<Comment> {
    const comment = new Comment();
    comment.content = commentData.content;

    // Fetch the User entity by the userId
    const user = await this.userRepo.findOne({ where: { id: parseInt(commentData.userId) } });
    if (!user) {
      throw new Error('User not found');
    }
    comment.user = user; // Assign the User entity to the comment

    // Fetch the Review entity by the reviewId
    const review = await this.reviewRepo.findOne({ where: { id: parseInt(commentData.reviewId) } });
    if (!review) {
      throw new Error('Review not found');
    }
    comment.review = review; // Assign the Review entity to the comment

    // Save the comment in the database
    await this.commentRepo.save(comment);
    return comment;
  }

  // Fetch all comments for a specific review
  public async findByReviewId(reviewId: number): Promise<Comment[] | null> {
    return await this.commentRepo.find({
      where: { review: { id: reviewId } },
      relations: ['user', 'review'], // Fetch related entities if necessary
    });
  }

  // Fetch all comments made by a specific user
  public async findByUserId(userId: number): Promise<Comment[] | null> {
    return await this.commentRepo.find({
      where: { user: { id: userId } },
      relations: ['user', 'review'], // Fetch related entities if necessary
    });
  }
}
