// import { Component, OnInit } from '@angular/core';
// import { BookService } from '../../service/book.service';
// import { Book } from '../../model/book.model';


// @Component({
//   selector: 'app-books',
//   templateUrl: './book.component.html',
//   styleUrls: ['./book.component.css']
// })
// export class BookComponent implements OnInit {
//   books: Book[] = [];
//   topBooks: Book[] = [];
//   categories: string[] = [];
//   filteredBooks: Book[] = [];
//   selectedBook: Book | null = null;
//   currentPage: number = 1;
//   pageSize: number = 6;
//   totalPages: number = 1;

//   constructor(private bookService: BookService) { }

//   ngOnInit(): void {
//     this.getBooks();
//     this.getTopBooks();
//     this.getCategories();
//   }

//   getBooks(): void {
//     const startIndex = (this.currentPage - 1) * this.pageSize;
//     const endIndex = startIndex + this.pageSize;
    
//     this.bookService.getBooks()
//       .subscribe(books => {
//         this.books = books || [];
//         this.filteredBooks = this.books.slice(startIndex, endIndex);
//         this.totalPages = Math.ceil(this.books.length / this.pageSize);
//       });
//   }
  

//   getTopBooks(): void {
//     this.bookService.getTopBooks()
//       .subscribe(topBooks => this.topBooks = topBooks || []);
//   }

//   getCategories(): void {
//     this.bookService.getCategories()
//       .subscribe(categories => this.categories = categories || []);
//   }

//   filterBooks(category: string): void {
//     if (category === 'All') {
//       this.filteredBooks = this.books;
//     } else {
//       this.filteredBooks = this.books.filter(book => book.category === category);
//     }
//   }

//   searchBooks(searchTerm: string): void {
//     this.filteredBooks = this.books.filter(book =>
//       book.name.toLowerCase().includes(searchTerm.toLowerCase())
//     );
//   }

//   onSearchChange(event: Event): void {
//     const searchTerm = (event.target as HTMLInputElement).value;
//     this.searchBooks(searchTerm);
//   }

//   selectBook(book: Book): void {
//     this.selectedBook = book;
//   }

//   handleBack(): void {
//     this.selectedBook = null;
//   }

//   nextPage(): void {
//     if (this.currentPage < this.totalPages) {
//       this.currentPage++;
//       this.getBooks();
//     }
//   }

//   prevPage(): void {
//     if (this.currentPage > 1) {
//       this.currentPage--;
//       this.getBooks();
//     }
//   }
// }


import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ThemeService } from '../../service/theme.service';
import { Subscription } from 'rxjs';

interface Book {
  title: string;
  image: string;
  link: string;
  page: string;
  year: string;
  downloads: string;
}

@Component({
  selector: 'app-books',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent {
  searchTerm: string = '';
  searchedBooks: Book[] = [];
  previewUrl: SafeResourceUrl = '';
  selectedBook: Book | null = null;
  theme!: string;
  subscription: Subscription

    Dark = 'dark';
  Light = 'light';
  downloadUrl: any;
  loading!: boolean;

  Initail: string[] = ['Harry Potter', 'Rich Dad Poor Dad', 'Programming in Python'];

  selectedString: string = '';

  selectRandomString() {
    const randomIndex = Math.floor(Math.random() * this.Initail.length);
    this.selectedString = this.Initail[randomIndex];
  }


  constructor(private http: HttpClient, private sanitizer: DomSanitizer, private themeService: ThemeService) { 
    this.subscription = this.themeService.theme$.subscribe(theme => {
      this.theme = theme;
    });

    
  this.selectRandomString();

    this.http.get<any>(`https://drfapi-production.up.railway.app/api/songs/BookSearch/?search=${this.selectedString}`).subscribe(data => {
        this.searchedBooks = data.books || [];

        console.log(data)
      });
  }

  toggleTheme(): void {
    const newTheme = this.theme === 'dark' ? 'light' : 'dark';
    this.themeService.setTheme(newTheme);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  searchBooks(): void {
    if (this.searchTerm.trim()) {
      this.http.get<any>(`https://drfapi-production.up.railway.app/api/songs/BookSearch/?search=${this.searchTerm}`).subscribe(data => {
        this.searchedBooks = data.books || [];

        console.log(data)
      });
    } 
  }

  downloadBook(book: Book): void {
    this.loading = true;
    this.http.get<any>(`https://drfapi-production.up.railway.app/api/songs/download-pdf/?url=https://www.pdfdrive.com${book.link}`).subscribe(data => {
      this.downloadUrl = data.download_link;
      const link = document.createElement('a');
      link.href = this.downloadUrl;
      link.download = 'downloaded_file.pdf'; // Specify the filename
      document.body.appendChild(link);
      link.click();
      console.log(data);
      this.loading = false;
    });
  }
  

  previewBook(book: Book): void {
    this.selectedBook = book;
    console.log(book.image)
    this.http.get<any>(`https://drfapi-production.up.railway.app/api/songs/extract-data/?required_html=${book.link}`).subscribe(data => {
      this.previewUrl = this.sanitizer.bypassSecurityTrustResourceUrl(data.view_url || '');
    });
  }

  closePreview(): void {
    this.selectedBook = null;
    this.previewUrl = '';
  }


  modifyImageUrl(imageUrl: string): string {
    // Remove "-s" from the end of the filename if it exists
    return imageUrl.replace(/-s\.jpg$/, '.jpg');
  }

  replaceUrl(url: string): string {
    return url.replace(/-e(\d+)\.html/, '-d$1.html');
  }
}
