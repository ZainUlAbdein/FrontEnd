import { Component } from '@angular/core';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent {

  selectedFile: File | null = null;
  pdfUrl: string | null = null;
  flag: boolean = false;

  constructor() { }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  uploadFile() {
    if (!this.selectedFile) {
      console.error('No file selected.');
      return;
    }
  
    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = reader.result as string;
      this.saveFile(dataUrl);
    };
    reader.readAsDataURL(this.selectedFile as Blob);
  }
  
  private saveFile(dataUrl: string) {
    const fileName = this.selectedFile?.name;
    const filePath = `assets/uploads/${fileName}`;
    
    const link = document.createElement('a');
    link.href = dataUrl;
    link.download = fileName as string;
    link.click();
  }

  toggleFlag() {
    this.flag = !this.flag;
  }
}
