import { Table, Column, Model, HasMany, DataType } from 'sequelize-typescript';
import { Review } from './Review';
import { Comment } from './Comment';

@Table({
  timestamps: true,
  tableName: 'users',
})
export class User extends Model {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  email!: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  password!: string;

  @HasMany(() => Review)
  reviews!: Review[];

  @HasMany(() => Comment)
  comments!: Comment[];
}
