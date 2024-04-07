// book-details.component.ts

import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Library } from '../../model/library.model';

import { Router } from '@angular/router';
import { ChangeDetectionStrategy } from '@angular/core';
import { NgxExtendedPdfViewerService, pdfDefaultOptions } from 'ngx-extended-pdf-viewer';
// import { NgxExtendedPdfViewerComponent } from 'ngx-extended-pdf-viewer';

@Component({
  selector: 'app-lib-details',
  templateUrl: './lib-details.component.html',
  styleUrls: ['./lib-details.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LibDetailsComponent {
  @Input() selectedlib!: Library ;
  
  @Output() backClicked = new EventEmitter<void>();
  showPdfViewer: boolean = false; // Property to toggle visibility of PDF viewer


  

  constructor(private router: Router, pdfService: NgxExtendedPdfViewerService) {
    pdfDefaultOptions.assetsFolder = 'bleeding-edge';
  };

  // constructor(private pdfService: NgxExtendedPdfViewerComponent) {}

  goBack(): void {
    this.backClicked.emit();
  }

  // goBack(): void {
  //   this.router.navigate(['/books']);
  // }

  readBook(): void {
    // Navigate to the BookReadingComponent with the book ID as a parameter
    this.router.navigate(['/book', this.selectedlib.title]);
  }

  togglePdfView() {
    this.showPdfViewer = !this.showPdfViewer;
    console.log(this.selectedlib.pdfUrl)
  }
}
