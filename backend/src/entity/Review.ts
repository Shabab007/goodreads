import { Entity, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { User } from './User';
import { Book } from './Book';
import { Base } from './Base';
import { Comment } from './Comment';

@Entity('reviews')
export class Review extends Base {
  @Column()
  content: string;

  @Column()
  rating: number;

  @ManyToOne(() => User, (user) => user.reviews)
  @JoinColumn({ name: 'userId' })
  user!: User;

  @ManyToOne(() => Book, (book) => book.reviews)
  @JoinColumn({ name: 'bookId' })
  book!: Book;

  @OneToMany(() => Comment, (comment) => comment.review)
  comments: Comment[];
}
