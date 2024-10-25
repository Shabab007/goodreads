import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { User } from './User';
import { Review } from './Review';
import { Base } from '../entity/Base';

@Entity('comments')
export class Comment extends Base {
  @Column()
  content: string;

  @ManyToOne(() => User, (user) => user.comments)
  @JoinColumn({ name: 'userId' })
  user!: User;

  @ManyToOne(() => Review, (review) => review.comments)
  @JoinColumn({ name: 'reviewId' })
  review!: Review;
}
