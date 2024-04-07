import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PdfDocumentInfo } from 'ngx-extended-pdf-viewer';
import { NgxExtendedPdfViewerService, pdfDefaultOptions } from 'ngx-extended-pdf-viewer';
import { trigger, state, style, animate, transition } from '@angular/animations';




interface PDFDocument {
cover_image: any;
  id: number;
  title: string;
  author: string;
  category: string;
  pdf_file: string;
}

@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.css'],

  animations: [
    trigger('toggleUploadForm', [
      state('false', style({ transform: 'translateY(100%)' })),
      state('true', style({ transform: 'translateY(0)' })),
      transition('false => true', animate('300ms ease-in')),
      transition('true => false', animate('300ms ease-out'))
    ])
  ]

})



export class LibraryComponent {
  pdfTitle: string = '';
  pdfAuthor: string = '';
  pdfCategory: string = '';
  coverImageFile: File | null = null;
  pdfFile: File | null = null;
  // showUploadForm!: boolean;
  showPdfViewer!: boolean;
  selectedPdfUrl!: string;

  showUploadForm: boolean = false;

  // toggleUploadForm() {
  //   this.showUploadForm = !this.showUploadForm;
  // }
  constructor(private http: HttpClient, pdfService: NgxExtendedPdfViewerService) {
    pdfDefaultOptions.assetsFolder = 'bleeding-edge';
   };

  onCoverImageChange(event: any) {
    this.coverImageFile = event.target.files[0];
  }

  onPdfFileChange(event: any) {
    this.pdfFile = event.target.files[0];
  }

  // uploadPdf() {
  //   const formData = new FormData();
  //   formData.append('title', this.pdfTitle);
  //   formData.append('author', this.pdfAuthor);
  //   formData.append('category', this.pdfCategory);
  //   if (this.coverImageFile) {
  //     formData.append('cover_image', this.coverImageFile, this.coverImageFile.name);
  //   }
  //   if (this.pdfFile) {
  //     formData.append('pdf_file', this.pdfFile, this.pdfFile.name);
  //   }

  //   this.http.post<any>('http://localhost:8000/api/upload/', formData).subscribe(
  //     (response) => {
  //       console.log('PDF uploaded successfully:', response);
  //       // Reset form fields
  //       this.pdfTitle = '';
  //       this.pdfAuthor = '';
  //       this.pdfCategory = '';
  //       this.coverImageFile = null;
  //       this.pdfFile = null;
  //       this.fetchPDFDocuments();
  //       this.showUploadForm = !this.showUploadForm;
  //     },
  //     (error) => {
  //       console.error('Error uploading PDF:', error);
  //     }
  //   );
  // }

  async uploadPdf() {
    const formData = new FormData();
    formData.append('title', this.pdfTitle);
    formData.append('author', this.pdfAuthor);
    formData.append('category', this.pdfCategory);
    if (this.coverImageFile) {
      formData.append('cover_image', this.coverImageFile, this.coverImageFile.name);
    }
    if (this.pdfFile) {
      formData.append('pdf_file', this.pdfFile, this.pdfFile.name);
    }


    
  
    try {
      const token = localStorage.getItem('token'); // Replace with your authentication token
      const response = await fetch('http://localhost:8000/api/upload/', {
        method: 'POST',
        body: formData,
        headers: {
          Authorization: `Token ${token}`
        }
      });
  
      if (!response.ok) {
        throw new Error('Failed to upload PDF');
      }
  
      const responseData = await response.json();
      console.log('PDF uploaded successfully:', responseData);
  
      // Reset form fields
      this.pdfTitle = '';
      this.pdfAuthor = '';
      this.pdfCategory = '';
      this.coverImageFile = null;
      this.pdfFile = null;
  
      // Assuming fetchPDFDocuments() and showUploadForm toggle method exist
      await this.fetchPDFDocuments();
      this.showUploadForm = !this.showUploadForm;
    } catch (error) {
      console.error('Error uploading PDF:', error);
    }
  }
  



  pdfDocuments: PDFDocument[] = [];


  ngOnInit(): void {
    this.fetchPDFDocuments();
  }

  // fetchPDFDocuments() {
  //   this.http.get<PDFDocument[]>('http://localhost:8000/api/documents/').subscribe(
  //     (data) => {
  //       this.pdfDocuments = data;
  //       console.log(data)
  //     },
  //     (error) => {
  //       console.error('Error fetching PDF documents:', error);
  //     }
  //   );
  // }

  async fetchPDFDocuments() {
    try {
      const authToken = localStorage.getItem('token');
      if (!authToken) {
        throw new Error('No authentication token found');
      }
  
      const response = await fetch('http://localhost:8000/api/documents/', {
        method: 'GET',
        headers: {
          'Authorization': `Token ${authToken}`,
          'Content-Type': 'application/json' // Add any other headers if needed
        }
      });
  
      if (!response.ok) {
        throw new Error(`Failed to fetch PDF documents: ${response.status} ${response.statusText}`);
      }
  
      const data = await response.json();
      this.pdfDocuments = data;
      console.log(data);
    } catch (error) {
      console.error('Error fetching PDF documents:', error);
    }
  }
  
  


  toggleUploadForm() {
    this.showUploadForm = !this.showUploadForm;
  }

  togglePdfView() {
    this.showPdfViewer = !this.showPdfViewer;
    // console.log(this)
  }

  // Method to view the selected PDF document
  viewPdf(document: PDFDocument): void {
    this.selectedPdfUrl = document.pdf_file;
    this.togglePdfView();
  }
}
