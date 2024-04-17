// import { Component, OnInit, inject } from '@angular/core';
// import { HttpClient } from '@angular/common/http';

// @Component({
//   selector: 'app-music',
//   templateUrl: './music.component.html',
//   styleUrls: ['./music.component.css']
// })
// export class MusicComponent implements OnInit{
//   httpClient = inject(HttpClient);
//   songs! : []
// play(arg0: any) {
// throw new Error('Method not implemented.');
// }
//   searchQuery!: string;
//   searchResults!: any[];

//   constructor(private http: HttpClient) { }
//   ngOnInit(): void {
//     // throw new Error('Method not implemented.');
//   }

//   search(): void {
//     if (!this.searchQuery) {
//       return;
//     }
//     const apiUrl = 'http://localhost:8000/api/search/';
//     const requestData = { query: this.searchQuery };
//     console.log(requestData)
//     this.httpClient.post(apiUrl, requestData).subscribe((data: any) => {
//       this.searchResults = data.items;

//       this.songs = data['result']

//       console.log(this.songs)

      

//       data.result.forEach((result: { title: any; videoId: any; thumbnails: { url: any; }[]; artists: { name: any; }[]; }) => {
//         console.log("Title:", result.title);
//         console.log("Video ID:", result.videoId);
//         console.log("Thumbnail URL:", result.thumbnails[0].url); // Assuming there is only one thumbnail
//         // console.log("Artist:", result.artists[1].name); // Assuming the artist is always the second item in the artists array
//         console.log("---------------------------------------");
//       });
//     });
//   }



// }



// import { Component, OnInit } from '@angular/core';
// import { HttpClient } from '@angular/common/http';


// @Component({
//   selector: 'app-music',
//   templateUrl: './music.component.html',
//   styleUrls: ['./music.component.css']
// })
// export class MusicComponent implements OnInit {
//   searchQuery: string = '';
//   searchResults: any[] = [];
//   songs: any[] = [];
//   pageSize: number = 10;
//   currentPage: number = 0;
//   defaultThumbnailUrl: string = 'assets/song_default/default.png'; // Replace with your default image URL
//   // Pagination properties
// visiblePages: number[] = [];
// totalPages: number = 0;


//   constructor(private http: HttpClient) { }

//   ngOnInit(): void {
//   }

//   search(): void {
//     if (!this.searchQuery) {
//       return;
//     }
//     const apiUrl = 'http://localhost:8000/api/search/';
//     const requestData = { query: this.searchQuery };
//     this.http.post(apiUrl, requestData).subscribe((data: any) => {
//       this.searchResults = data.result;
//       this.songs = data['result'];
//     });
//   }

//   play(videoId: string): void {
//     // Your play functionality here
//   }

//   // Method to handle pagination
//   // pageChanged(event: PageEvent): void {
//   //   // Calculate the starting index of the new page
//   //   const startIndex = event.pageIndex * event.pageSize;
//   //   // Slice the songs array to get the songs for the new page
//   //   this.searchResults = this.songs.slice(startIndex, startIndex + event.pageSize);
//   // }


//   extractSubstring(url: string): string {
//     return url.split('=')[0];
//   }

 

// // updatePagedResults(): void {
// //     const startIndex = this.currentPage * this.pageSize;
// //     this.searchResults = this.searchResults.slice(startIndex, startIndex + this.pageSize);


// // }
// // Other methods...

// pageChanged(event: any): void {
//   this.currentPage = event.pageIndex;
//   this.updatePagedResults();
//   this.calculateVisiblePages();
// }

// updatePagedResults(): void {
//   const startIndex = this.currentPage * this.pageSize;
//   this.searchResults = this.searchResults.slice(startIndex, startIndex + this.pageSize);
// }

// calculateVisiblePages(): void {
//   const numPagesToShow = 5; // Adjust as needed
//   const startPage = Math.max(0, this.currentPage - Math.floor(numPagesToShow / 2));
//   const endPage = Math.min(this.totalPages - 1, startPage + numPagesToShow - 1);
//   this.visiblePages = Array.from({ length: endPage - startPage + 1 }, (_, i) => i + startPage);
// }

// goToPage(page: number): void {
//   if (page >= 0 && page < this.totalPages) {
//       this.currentPage = page;
//       this.updatePagedResults();
//       this.calculateVisiblePages();
//   }
// }

// goToFirstPage(): void {
//   this.goToPage(0);
// }

// goToLastPage(): void {
//   this.goToPage(this.totalPages - 1);
// }

// goToPreviousPage(): void {
//   this.goToPage(this.currentPage - 1);
// }

// goToNextPage(): void {
//   this.goToPage(this.currentPage + 1);
// }


// }



import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';
import { ThemeService } from '../../service/theme.service';

interface ChartItem {
  title: string;
  videoId: string;
  thumbnail_url: string;
  artists: string;
}

@Component({
  selector: 'app-music',
  templateUrl: './music.component.html',
  styleUrls: ['./music.component.css']
})
export class MusicComponent implements OnInit {
  searchQuery: string = '';
  searchResults: any[] = [];
  songs: any[] = [];
  defaultThumbnailUrl: string = 'assets/song_default/default.png'; // Replace with your default image URL
  showPlayer: boolean = false;  // to toggle player
  showSearched: boolean = false;
  searchedd: boolean = false;
  song: any = {};
  vid: any;
  notSong: any = {};
  notVid: any ;
  searchButton = document.getElementById('searchButton');
  // searchInput = document.getElementById('searchInput') as HTMLInputElement;
  @ViewChild('searchInput') searchInput!: ElementRef<HTMLInputElement>;
  chartData:  any[] = [];
  songName: any;
  finalVid: any;
  audiu_urll: any;
  loading: boolean =false;
  errorMessage!: string;
  query: any;
  result: any;




  Dark = 'dark';
  Light = 'light';
  subscription: any;
  theme!: string;

  constructor(private http: HttpClient, private sanitizer: DomSanitizer, private themeService: ThemeService) { 
    this.subscription = this.themeService.theme$.subscribe(theme => {
      this.theme = theme;
    });
  }

  toggleTheme(): void {
    const newTheme = this.theme === 'dark' ? 'light' : 'dark';
    this.themeService.setTheme(newTheme);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }


  Initail: string[] = ['Maher zain', 'Atif Aslam', 'Asim Azhar', 'linkin Park', 'Coke studio', 'Nescafe Basement', 'shubh', 'sami yousuf', 'harif j', 'maroon 5', 'pakistani ost'];

  selectedString: string = '';

  selectRandomString() {
    const randomIndex = Math.floor(Math.random() * this.Initail.length);
    this.selectedString = this.Initail[randomIndex];
  }


  ngOnInit(): void {

  this.selectRandomString();
  this.makeApiCall(this.selectedString)



  //   const requestOptions: RequestInit = {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json'
  //     },
  //     body: JSON.stringify({ query: this.selectedString + 'mp3', result: '' }) // 'result' field is not used, so we can leave it empty
  //   };

  //   fetch('https://bs-backend.vercel.app/api/search/', requestOptions)
  // .then(response => {
  //   if (!response.ok) {
  //     throw new Error('Network response was not ok');
  //   }
  //   return response.json();
  // })
  // .then(data => {
  //   // Filter the results to only include those with a 'videoId'
  //   const resultsWithVideoId = data.result.filter((result: { videoId: any; }) => result.videoId);

  //   if (resultsWithVideoId.length > 0) {
  //     // If there are results with a 'videoId', assign them to chartData
  //     this.chartData = resultsWithVideoId;
  //     console.log(this.chartData);
  //   } else {
  //     // If there are no results with a 'videoId', handle the case accordingly
  //     console.log('No results with videoId found.');
  //   }
  // })
  // .catch(error => {
  //   // Handle any errors that occur during the fetch request
  //   console.error('Error:', error);
  // });
    // fetch('https://bs-backend.vercel.app/api/search/', requestOptions)
    //   .then(response => {
    //     if (!response.ok) {
    //       throw new Error('Network response was not ok');
    //     }
    //     return response.json();
    //   })
    //   .then(data => {
    //     this.chartData = data.result;
    //     console.log(this.chartData)

    //   })
      


      //   // Retrieve authentication token from local storage
      

      // // Make the fetch request with the authentication token included in the headers
      // fetch('https://bs-backend.vercel.app/api/chart-data/', {
      //   method: 'GET',
      //   headers: {
      //       'Content-Type': 'application/json',
      //   }
      // })
      // .then(response => {
      //   if (!response.ok) {
      //       throw new Error(`Failed to fetch chart data: ${response.status} ${response.statusText}`);
      //   }
      //   return response.json();
      // })
      // .then(data => {
      //   this.chartData = data;
      //   console.log(data);
      // })
      // .catch(error => {
      //   console.error('Error fetching chart data:', error);
      // });


    
  }





  makeApiCall(selectedString: string) {
    const requestOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      body: {
        query: selectedString + 'mp3',
        result: ''
      }
    };

    this.http.post<any>('https://bs-backend.vercel.app/api/search/', requestOptions.body, { headers: requestOptions.headers })
      .subscribe(
        data => {
          // Filter the results to only include those with a 'videoId'
          const resultsWithVideoId = data.result.filter((result: { videoId: any; }) => result.videoId);

          if (resultsWithVideoId.length > 0) {
            // If there are results with a 'videoId', assign them to chartData
            console.log(resultsWithVideoId);
            // Assign to chartData if needed
            this.chartData = resultsWithVideoId
          } else {
            // If there are no results with a 'videoId', handle the case accordingly
            console.log('No results with videoId found.');
          }
        },
        error => {
          // Handle any errors that occur during the API call
          console.error('Error:', error);
        }
      );
  }

  

  onKeyPress(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      this.search();
      console.log("Enter hit");
    }
  }

  // search(): void {
  //   if (!this.searchQuery) {
  //     return;
  //   }
  //   const apiUrl = 'http://localhost:8000/api/search/';
  //   const requestData = { query: this.searchQuery };
  //   this.http.post(apiUrl, requestData).subscribe((data: any) => {
  //     this.searchResults = data.result;
  //     this.songs = data['result'];
  //     this.showPlayer= false; 
  //     this.showSearched = true;

  //   });
  // }


//   search(): void {
//     if (!this.searchQuery) {
//         return;
//     }

//     const apiUrl = 'https://bs-backend.vercel.app/api/search/';
//     const requestData = { query: this.searchQuery };

//     // Make the fetch request
//     fetch(apiUrl, {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(requestData)
//     })
//     .then(response => {
//         if (!response.ok) {
//             throw new Error(`Failed to search: ${response.status} ${response.statusText}`);
//         }
//         return response.json();
//     })
//     .then(data => {
//         // Assuming your API returns result field containing search results
//         this.searchResults = data.result;
//         // Additional logic if you have specific fields you want to extract
//         this.songs = data.result;
//         // Additional logic to control UI display
//         this.showPlayer = false;
//         this.showSearched = true;
//     })
//     .catch(error => {
//         console.error('Error searching:', error);
//     });
// }

search(): void {

  console.log('clicked search')
  if (!this.query) {
    this.errorMessage = 'Please enter a search query.';
    return;
  }

  this.errorMessage = ''; // Clear previous error message

  const requestOptions: RequestInit = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ query: this.query, result: '' }) // 'result' field is not used, so we can leave it empty
  };

  fetch('https://bs-backend.vercel.app/api/search/', requestOptions)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      // this.result = data.result;
      // Assuming response.result is an array of search results
      console.log(this.result)
      this.searchResults = data.result;
      this.songs = data['result'];
      this.showPlayer= false; 
      this.showSearched = true;
    })
    .catch(error => {
      console.error('There was a problem with the fetch operation:', error);
      this.errorMessage = 'An error occurred. Please try again later.';
    });
}


  // play(song: any) {
  //   // Access the clicked song data here
  //   console.log(song);
  //   // Perform further actions as needed
  // }

  getsong(song: any, video_id: any) {
    console.log('song:  ',song)
    this.song = song;
    this.vid = video_id;
  }

  getnotsong(song: any, video_id: any) {
    console.log('song:  ',song)
    this.notSong = song;
    this.notVid = video_id;

    console.log(this.notSong, this.notVid)
  }

  extractSubstring(url: string): string {
    return url.split('=')[0];
  }

  toggleReceiver(what1:  any, what_2:any) {
    this.showPlayer = what1;
    this.showSearched = what_2;
  }

  toggleSearched(what: any) {
    this.searchedd = what;
  }


  downloadAudioFromURL() {
    this.loading = true; // Show the spinner
    if (this.searchedd == false) {
      this.finalVid = this.vid;
      this.songName = this.song.title;
     } else if (this.searchedd == true) {
       this.finalVid = this.notVid;
       this.songName = this.notSong.title;
     }



     const apiUrl = 'https://repo-opal-ten.vercel.app/api/songs/play/';
    const requestData = { video_id: this.finalVid };

    fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestData)
    })
      .then(response => response.json())
      .then(data => {
        if (data && data.audio_url) {
          this.audiu_urll = data.audio_url;
          console.log(this.audiu_urll)
          this.downloadAudio(this.audiu_urll)
          // // this.http.get(this.audiu_urll, { responseType: 'blob' }).subscribe(response => {
          // //   this.saveFile(response);
          // //   this.loading = false;

            
          // });
        } else {
          console.error('Error: No audio URL found in response');
        }
      })
  
    // const apiURL = `https://bs-backend.vercel.app/api/download-audio/?video_id=${this.finalVid}`;
  
    // this.http.get(apiURL).subscribe((data: any) => {
    //   console.log(data.audio_url)
    //   this.audiu_urll = data.audio_url;
    //   const url = this.audiu_urll;
    //   this.http.get(url, { responseType: 'blob' }).subscribe(response => {
    //   this.saveFile(response);
    //   this.loading = false;
      
    // });

    // });

    

  }


//   downloadAudioFromURL() {
    // this.loading = true; // Show the spinner
    // if (this.searchedd == false) {
    //     this.finalVid = this.vid;
    //     this.songName = this.song.title;
    // } else if (this.searchedd == true) {
    //     this.finalVid = this.notVid;
    //     this.songName = this.notSong.value.title;
    // }

//     const apiURL = `http://localhost:8000/api/download-audio/?video_id=${this.finalVid}`;



//     fetch(apiURL, {
//         method: 'GET',
//     })
//     .then(response => {
//         if (!response.ok) {
//             throw new Error(`Failed to fetch audio URL: ${response.status} ${response.statusText}`);
//         }
//         return response.json();
//     })
//     .then(data => {
//         console.log(data.audio_url);
//         const audioUrl = data.audio_url;
//         return fetch(audioUrl);
//     })
//     .then(response => response.blob())
//     .then(blob => {
//         this.saveFile(blob);
//         this.loading = false; // Hide the spinner
//     })
//     .catch(error => {
//         console.error('Error downloading audio:', error);
//         this.loading = false; // Hide the spinner
//     });
// }


  saveFile(response: Blob) {
    const blob = new Blob([response], { type: 'audio/mp3' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${this.songName}.mp3`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  }

  downloadAudio(videoId: string): void {
    this.loading = true; // Show the spinner
    if (this.searchedd == false) {
        this.finalVid = this.vid;
        this.songName = this.song.title;
    } else if (this.searchedd == true) {
        this.finalVid = this.notVid;
        this.songName = this.notSong.title;
    }

    const apiUrl = `https://bs-backend.vercel.app/api/audio/${this.finalVid}/`; // Replace with your API URL
    this.http.get(apiUrl, { responseType: 'blob' }).subscribe(
      (blob: Blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${this.songName}.mp3`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
        this.loading = false; // Show the spinner
      },
      (error) => {
        console.error('Failed to fetch audio:', error);
      }
    );
    
  }


  isPlaying: boolean = false;
  animationFrame!: number;
  currentTime: string = '0:00';

  togglePlay() {
    this.isPlaying = !this.isPlaying;
    if (this.isPlaying) {
      this.play();
    } else {
      this.pause();
    }
  }

  play() {
    // Add your play logic here
    // You can use HTMLMediaElement or other audio libraries for playing the song
    console.log('Playing...');
    // Start animation if needed
    this.animateProgressBar();
  }

  pause() {
    // Add your pause logic here
    console.log('Paused.');
    // Stop animation if needed
    cancelAnimationFrame(this.animationFrame);
  }

  animateProgressBar() {
    const startTime = Date.now();
    const duration = 137; // Example duration in seconds

    const updateProgress = () => {
      const elapsed = Date.now() - startTime;
      const progress = (elapsed / (duration * 1000)) * 100;
      this.currentTime = this.formatTime(elapsed / 1000);
      if (progress <= 100 && this.isPlaying) {
        this.animationFrame = requestAnimationFrame(updateProgress);
      }
    };

    updateProgress();
  }

  formatTime(seconds: number): string {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    const formattedSeconds = remainingSeconds < 10 ? `0${remainingSeconds}` : `${remainingSeconds}`;
    return `${minutes}:${formattedSeconds}`;
  }



  }

  




