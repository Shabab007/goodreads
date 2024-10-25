import { Exclude, Expose } from 'class-transformer';
import { Book } from '../../entity/Book';
import { User } from '../../entity/User';

@Exclude()
export class ReviewDto {
  @Expose()
  id: number;

  @Expose()
  content: string;

  @Expose()
  rating: number;

  @Expose()
  book: Book;

  @Expose()
  user: User;

  @Expose()
  createdAt?: Date;

  @Expose()
  updatedAt?: Date;
}
export interface ReviewData {
  content: string;

  userId: string;

  bookId: string;

  rating: number;
}

export interface AddReview {
  content: string;

  user: User;

  book: Book;

  rating: number;

  userId: string;

  bookId: string;
}

export interface UserSingIn {
  email: string;

  password: string;
}
