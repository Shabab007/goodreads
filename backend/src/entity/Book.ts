import { Entity, Column, OneToMany } from 'typeorm';
import { Review } from './Review';
import { Base } from '../entity/Base';

@Entity('books')
export class Book extends Base {
  @Column()
  title: string;

  @Column({ type: 'varchar', length: 255 })
  author!: string;

  @Column()
  publishedDate: string;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: true })
  coverImage: string;

  @OneToMany(() => Review, (review) => review.book)
  reviews: Review[];
}
