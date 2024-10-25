// src/BookSeeder.ts

import AppDataSource from './DataSource';
import { Book } from './entity/Book';

export class BookSeeder {
  private booksData = [
    {
      title: 'When we met',
      author: 'Hossain',
      description: 'Its a thriller novel',
      publishedDate: '15-10-2021',
      reviews: [] as any,
      coverImage: 'https://random-image-pepebigotes.vercel.app/api/random-image',
    },
    {
      title: 'Angels and Demons',
      author: 'Shabab',
      description: 'Its a thriller novel',
      publishedDate: '15-10-2022',
      reviews: [],
      coverImage: 'https://random-image-pepebigotes.vercel.app/api/random-image',
    },
    {
      title: 'Da Vinci Code',
      author: 'Shabab',
      description: 'Its a thriller novel',
      publishedDate: '15-10-2022',
      reviews: [],
      coverImage: 'https://random-image-pepebigotes.vercel.app/api/random-image',
    },
    {
      title: 'Da Vinci Code2',
      author: 'Shabab',
      description: 'Its a thriller novel',
      publishedDate: '15-10-2023',
      reviews: [],
      coverImage: 'https://random-image-pepebigotes.vercel.app/api/random-image',
    },
    {
      title: 'Twilight',
      author: 'Rhythm',
      description: 'Its a thriller novel',
      publishedDate: '15-10-2023',
      reviews: [],
      coverImage: 'https://random-image-pepebigotes.vercel.app/api/random-image',
    },
    {
      title: 'Harry Poeter - The Chamber of secret',
      author: 'J.K Rowlings',
      description: 'Its a thriller novel',
      publishedDate: '12-04-1998',
      reviews: [],
      coverImage: 'https://random-image-pepebigotes.vercel.app/api/random-image',
    },

    {
      title: 'Twilight2',
      author: 'Rhythm',
      description: 'Its a thriller love story novel',
      publishedDate: '15-10-2005',
      reviews: [],
      coverImage: 'https://random-image-pepebigotes.vercel.app/api/random-image',
    },
    {
      title: 'The Witcher',
      author: 'J.K Rowlings',
      description: 'Its a faantasy novel',
      publishedDate: '12-04-2010',
      reviews: [],
      coverImage: 'https://random-image-pepebigotes.vercel.app/api/random-image',
    },
  ];

  public async seed() {
    const bookRepository = AppDataSource.getRepository(Book);

    // Check if books already exist
    const existingBooks = await bookRepository.find();
    if (existingBooks.length > 0) {
      console.log('Books already exist. Seeding skipped.');
      return;
    }

    // Insert books
    await bookRepository.save(this.booksData);
    console.log('Books seeded successfully!');
  }
}
