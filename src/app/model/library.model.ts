export interface Library {
  id: number;
  title: string;
  author: string;
  category: string;
  coverImage: string; // This should be a URL pointing to the cover image
  pdfUrl: string; // This should be a URL pointing to the PDF file
  relatedData: {
    summary: string;
    publicationDate: string; // Should be in YYYY-MM-DD format
    publisher: string;
  };
}
