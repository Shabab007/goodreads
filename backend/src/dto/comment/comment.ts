import { Exclude, Expose } from 'class-transformer';
import { User } from '../../entity/User';
import { Review } from '../../entity/Review';

@Exclude()
export class CommentDto {
  @Expose()
  id: number;

  @Expose()
  content: string;

  @Expose()
  user: string;

  @Expose()
  reviews: string;

  @Expose()
  comments: string;

  @Expose()
  following: string;

  @Expose()
  followers: string;

  @Expose()
  updatedAt: Date;
}

export interface Comment {
  userId: string;

  reviewId: string;

  content: string;
}

export interface AddComment {
  userId: string;

  reviewId: string;

  content: string;

  user: User;

  review: Review;
}
