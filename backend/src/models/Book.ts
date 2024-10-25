import { Table, Column, Model, HasMany, DataType } from 'sequelize-typescript';
import { Review } from './Review';

@Table({
  timestamps: true,
  tableName: 'books',
})
export class Book extends Model {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  title!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  author!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  coverImage!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  description!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  publishedDate!: string;

  @HasMany(() => Review)
  reviews!: Review[];
}
