import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class BookDto {
  @Expose()
  id: number;

  @Expose()
  title: string;

  @Expose()
  author: string;

  @Expose()
  description: string;

  @Expose()
  publishedDate: string;

  @Expose()
  reviews: string;

  @Expose()
  coverImage: string;
}

export interface Book {
  title: string;

  author: string;

  description?: string;

  publishedDate: string;
}
