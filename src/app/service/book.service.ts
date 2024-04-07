// book.service.ts

import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Book } from '../model/book.model';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  private books: Book[] = [
    { name: 'Book 1', author: 'Author 1', category: 'Fiction', imageUrl: 'https://via.placeholder.com/150', abstract: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Vero quas cum ut expedita molestias distinctio? Nostrum deleniti optio quaerat soluta! Accusantium delectus, enim perspiciatis iure assumenda expedita omnis saepe nihil?', pdfUrl: 'Bootstrap-vs-Material-Design-vs-Prime-vs-Tailwind.pdf' },
    { name: 'Book 2', author: 'Author 2', category: 'Non-fiction', imageUrl: 'https://via.placeholder.com/150', abstract: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Vero quas cum ut expedita molestias distinctio? Nostrum deleniti optio quaerat soluta! Accusantium delectus, enim perspiciatis iure assumenda expedita omnis saepe nihil?', pdfUrl: 'ObjectOrientedProgramminginC4thEdition.pdf' },
    { name: 'Book 3', author: 'Author 3', category: 'Fiction', imageUrl: 'https://via.placeholder.com/150', abstract: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Vero quas cum ut expedita molestias distinctio? Nostrum deleniti optio quaerat soluta! Accusantium delectus, enim perspiciatis iure assumenda expedita omnis saepe nihil?', pdfUrl: '' },
    { name: 'Book 4', author: 'Author 4', category: 'Science', imageUrl: 'https://via.placeholder.com/150', abstract: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Vero quas cum ut expedita molestias distinctio? Nostrum deleniti optio quaerat soluta! Accusantium delectus, enim perspiciatis iure assumenda expedita omnis saepe nihil?' , pdfUrl: ''},
    { name: 'Book 5', author: 'Author 5', category: 'History', imageUrl: 'https://via.placeholder.com/150', abstract: '  Lorem ipsum dolor sit, amet consectetur adipisicing elit. Vero quas cum ut expedita molestias distinctio? Nostrum deleniti optio quaerat soluta! Accusantium delectus, enim perspiciatis iure assumenda expedita omnis saepe nihil?', pdfUrl: '' },
    { name: 'Book 6', author: 'Author 5', category: 'History', imageUrl: 'https://via.placeholder.com/150', abstract: '  Lorem ipsum dolor sit, amet consectetur adipisicing elit. Vero quas cum ut expedita molestias distinctio? Nostrum deleniti optio quaerat soluta! Accusantium delectus, enim perspiciatis iure assumenda expedita omnis saepe nihil?' , pdfUrl: ''},
    { name: 'Book 7', author: 'Author 5', category: 'History', imageUrl: 'https://via.placeholder.com/150', abstract: '  Lorem ipsum dolor sit, amet consectetur adipisicing elit. Vero quas cum ut expedita molestias distinctio? Nostrum deleniti optio quaerat soluta! Accusantium delectus, enim perspiciatis iure assumenda expedita omnis saepe nihil?' , pdfUrl: ''},
    { name: 'Book 8', author: 'Author 5', category: 'History', imageUrl: 'https://via.placeholder.com/150', abstract: '  Lorem ipsum dolor sit, amet consectetur adipisicing elit. Vero quas cum ut expedita molestias distinctio? Nostrum deleniti optio quaerat soluta! Accusantium delectus, enim perspiciatis iure assumenda expedita omnis saepe nihil?', pdfUrl: '' },
    { name: 'Book 9', author: 'Author 5', category: 'History', imageUrl: 'https://via.placeholder.com/150', abstract: '  Lorem ipsum dolor sit, amet consectetur adipisicing elit. Vero quas cum ut expedita molestias distinctio? Nostrum deleniti optio quaerat soluta! Accusantium delectus, enim perspiciatis iure assumenda expedita omnis saepe nihil?' , pdfUrl: ''},
    { name: 'Book 10', author: 'Author 1', category: 'Fiction', imageUrl: 'https://via.placeholder.com/150', abstract: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Vero quas cum ut expedita molestias distinctio? Nostrum deleniti optio quaerat soluta! Accusantium delectus, enim perspiciatis iure assumenda expedita omnis saepe nihil?' , pdfUrl: ''},
    { name: 'Book 11', author: 'Author 2', category: 'Non-fiction', imageUrl: 'https://via.placeholder.com/150', abstract: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Vero quas cum ut expedita molestias distinctio? Nostrum deleniti optio quaerat soluta! Accusantium delectus, enim perspiciatis iure assumenda expedita omnis saepe nihil?' , pdfUrl: ''},
    { name: 'Book 12', author: 'Author 3', category: 'Fiction', imageUrl: 'https://via.placeholder.com/150', abstract: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Vero quas cum ut expedita molestias distinctio? Nostrum deleniti optio quaerat soluta! Accusantium delectus, enim perspiciatis iure assumenda expedita omnis saepe nihil?', pdfUrl: '' },
    { name: 'Book 13', author: 'Author 4', category: 'Science', imageUrl: 'https://via.placeholder.com/150', abstract: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Vero quas cum ut expedita molestias distinctio? Nostrum deleniti optio quaerat soluta! Accusantium delectus, enim perspiciatis iure assumenda expedita omnis saepe nihil?' , pdfUrl: ''},
    { name: 'Book 14', author: 'Author 5', category: 'History', imageUrl: 'https://via.placeholder.com/150', abstract: '  Lorem ipsum dolor sit, amet consectetur adipisicing elit. Vero quas cum ut expedita molestias distinctio? Nostrum deleniti optio quaerat soluta! Accusantium delectus, enim perspiciatis iure assumenda expedita omnis saepe nihil?' , pdfUrl: ''},
    { name: 'Book 15', author: 'Author 5', category: 'History', imageUrl: 'https://via.placeholder.com/150', abstract: '  Lorem ipsum dolor sit, amet consectetur adipisicing elit. Vero quas cum ut expedita molestias distinctio? Nostrum deleniti optio quaerat soluta! Accusantium delectus, enim perspiciatis iure assumenda expedita omnis saepe nihil?' , pdfUrl: ''},
    { name: 'Book 16', author: 'Author 5', category: 'History', imageUrl: 'https://via.placeholder.com/150', abstract: '  Lorem ipsum dolor sit, amet consectetur adipisicing elit. Vero quas cum ut expedita molestias distinctio? Nostrum deleniti optio quaerat soluta! Accusantium delectus, enim perspiciatis iure assumenda expedita omnis saepe nihil?', pdfUrl: '' },
    { name: 'Book 17', author: 'Author 5', category: 'History', imageUrl: 'https://via.placeholder.com/150', abstract: '  Lorem ipsum dolor sit, amet consectetur adipisicing elit. Vero quas cum ut expedita molestias distinctio? Nostrum deleniti optio quaerat soluta! Accusantium delectus, enim perspiciatis iure assumenda expedita omnis saepe nihil?', pdfUrl: '' },
    { name: 'Book 18', author: 'Author 5', category: 'History', imageUrl: 'https://via.placeholder.com/150', abstract: '  Lorem ipsum dolor sit, amet consectetur adipisicing elit. Vero quas cum ut expedita molestias distinctio? Nostrum deleniti optio quaerat soluta! Accusantium delectus, enim perspiciatis iure assumenda expedita omnis saepe nihil?', pdfUrl: ''}
    

  ];

  private topBooks: Book[] = [
    { name: 'Top Book 1', author: 'Top Author 1', category: 'Fiction', imageUrl: 'https://via.placeholder.com/150',  abstract: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Vero quas cum ut expedita molestias distinctio? Nostrum deleniti optio quaerat soluta! Accusantium delectus, enim perspiciatis iure assumenda expedita omnis saepe nihil?' , pdfUrl: ''},
    { name: 'Top Book 2', author: 'Top Author 2', category: 'Non-fiction', imageUrl: 'https://via.placeholder.com/150', abstract: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Vero quas cum ut expedita molestias distinctio? Nostrum deleniti optio quaerat soluta! Accusantium delectus, enim perspiciatis iure assumenda expedita omnis saepe nihil?', pdfUrl: '' },
    { name: 'Top Book 3', author: 'Top Author 3', category: 'Fiction', imageUrl: 'https://via.placeholder.com/150', abstract: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Vero quas cum ut expedita molestias distinctio? Nostrum deleniti optio quaerat soluta! Accusantium delectus, enim perspiciatis iure assumenda expedita omnis saepe nihil?', pdfUrl: '' },
  ];

  private categories: string[] = ['Fiction', 'Non-fiction', 'Science', 'History'];

  constructor() { }

  getBooks(page: number = 1, pageSize: number = this.books.length): Observable<Book[]> {
    const startIndex = (page - 1) * pageSize;
    const endIndex = Math.min(startIndex + pageSize, this.books.length);
    return of(this.books.slice(startIndex, endIndex));
  }

  getTopBooks(): Observable<Book[]> {
    return of(this.topBooks);
  }

  getCategories(): Observable<string[]> {
    return of(this.categories);
  }
}
