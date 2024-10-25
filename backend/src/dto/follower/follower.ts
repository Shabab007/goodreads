// src/dto/follower/FollowerDto.ts

import { IsNotEmpty, IsInt } from 'class-validator';

export class FollowerDto {
  @IsNotEmpty()
  @IsInt()
  followerId!: number;

  @IsNotEmpty()
  @IsInt()
  followingId!: number;
}
