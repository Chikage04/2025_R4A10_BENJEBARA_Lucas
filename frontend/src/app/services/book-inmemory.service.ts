import { Injectable } from '@angular/core';
import { Book } from '../models/book';

@Injectable({ providedIn: 'root' })
export class BooksInMemoryService {
  private books: Book[] = [
    {
      id: 1,
      title: '1984',
      author: 'George Orwell',
      description: 'Dystopie politique',
      coverUrl: 'https://placehold.co/150x200',
    },
    {
      id: 2,
      title: 'Dune',
      author: 'Frank Herbert',
      description: 'Science-fiction épique',
      coverUrl: 'https://placehold.co/150x200',
    },
    {
      id: 3,
      title: 'Le Petit Prince',
      author: 'Antoine de Saint-Exupéry',
      description: 'Conte philosophique',
      coverUrl: 'https://placehold.co/150x200',
    },
  ];

  getAllBooks(): Book[] {
    return this.books;
  }

  getBookById(id: number): Book | undefined {
    return this.books.find((book) => book.id === id);
  }

  createBook(book: Omit<Book, 'id' | 'coverUrl'>) {
    const nextID = Math.max(...this.books.map((b) => b.id)) + 1;
    this.books.push({
      ...book,
      coverUrl: 'https://placehold.co/150x200',
      id: nextID,
    });
    return nextID;
  }

  deleteBook(id: number): void {
    this.books = this.books.filter((b) => b.id !== id);
  }
}
