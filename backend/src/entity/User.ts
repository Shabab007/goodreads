import { Entity, Column, OneToMany } from 'typeorm';

import { Base } from './Base';
import { Review } from './Review';
import { Comment } from './Comment';

@Entity('users')
export class User extends Base {
  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @Column({ unique: true })
  email: string;

  @OneToMany(() => Review, (review) => review.user)
  reviews: Review[];

  @OneToMany(() => Comment, (comment) => comment.user)
  comments: Comment[];
}
