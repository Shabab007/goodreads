import { Table, Column, Model, ForeignKey, BelongsTo, HasMany, DataType } from 'sequelize-typescript';
import { User } from './User';
import { Book } from './Book';
import { Comment } from './Comment';

@Table({
  timestamps: true,
  tableName: 'reviews',
})
export class Review extends Model {
  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  content!: string;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  userId!: number;

  @ForeignKey(() => Book)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  bookId!: number;

  @BelongsTo(() => User)
  user!: User;

  @BelongsTo(() => Book)
  book!: Book;

  @HasMany(() => Comment)
  comments!: Comment[];
}
