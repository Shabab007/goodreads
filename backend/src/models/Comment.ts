import { Table, Column, Model, ForeignKey, BelongsTo, DataType } from 'sequelize-typescript';
import { User } from './User';
import { Review } from './Review';

@Table({
  timestamps: true,
  tableName: 'comments',
})
export class Comment extends Model {
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

  @ForeignKey(() => Review)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  reviewId!: number;

  @BelongsTo(() => User)
  user!: User;

  @BelongsTo(() => Review)
  review!: Review;
}
