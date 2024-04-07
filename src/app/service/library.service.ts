// library.service.ts
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Library } from '../model/library.model';

@Injectable({
  providedIn: 'root'
})
export class LibraryService {
  private books: Library[] = [
    {
      id: 1,
      title: 'Book 1',
      author: 'Author 1',
      category: 'Fiction',
      coverImage: 'path/to/cover1.jpg',
      pdfUrl: 'Bootstrap-vs-Material-Design-vs-Prime-vs-Tailwind.pdf',
      relatedData: {
        summary: 'Summary of Book 1',
        publicationDate: '2022-01-01',
        publisher: 'Publisher A'
      }
    },
    {
      id: 2,
      title: 'Book 2',
      author: 'Author 2',
      category: 'Non-Fiction',
      coverImage: 'path/to/cover2.jpg',
      pdfUrl: '',
      relatedData: {
        summary: 'Summary of Book 2',
        publicationDate: '2022-02-01',
        publisher: 'Publisher B'
      }
    },
    // Add more dummy books with related data as needed
  ];

  constructor() {}

  getAllBooks(): Observable<Library[]> {
    return of(this.books);
  }

  uploadBook(bookData: Library): Observable<Library> {
    const newBook: Library = { ...bookData, id: this.books.length + 1 };
    this.books.push(newBook);
    return of(newBook);
}



getBookById(id: number): Observable<Library | undefined> {
  return of(this.books.find(book => book.id === id));
}



}
