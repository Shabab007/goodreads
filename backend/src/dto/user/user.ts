import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class UserDto {
  @Expose()
  id: number;

  @Expose()
  username: string;

  @Expose()
  email: string;

  @Expose()
  reviews: string;

  @Expose()
  comments: string;
}

export interface User {
  username: string;

  email: string;

  password?: string;
}

export interface UserSingIn {
  email: string;

  password: string;
}
