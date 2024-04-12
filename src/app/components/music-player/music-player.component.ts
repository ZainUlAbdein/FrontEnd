// import { Component, Input } from '@angular/core';

// @Component({
//   selector: 'app-music-player',
//   templateUrl: './music-player.component.html',
//   styleUrl: './music-player.component.css'
// })
// export class MusicPlayerComponent {

//   @Input() SongData: any = {};
//   showPlayer: boolean = false;


//   toggleReceiver() {
//     this.showPlayer = !this.showPlayer;
//   }
    

//   extractSubstring(url: string): string {
//     return url.split('=')[0];
//   }
// }


// import { Component, Input } from '@angular/core';

// @Component({
//   selector: 'app-music-player',
//   templateUrl: './music-player.component.html',
//   styleUrls: ['./music-player.component.css']
// })
// export class MusicPlayerComponent {
//   showPlayer: boolean = false;
//   @Input() SongData: any = {};
//   VideoID!: string


//   getVideoID(videoId: any) {
//     this.VideoID = videoId;
//   }


//   playAudioFromURL() {
//     const apiURL = `http://localhost:8000/api/play_audio/?video_id=${this.VideoID}`;

//     fetch(apiURL)
//       .then(response => response.json())
//       .then(data => {
//         if (data && data.audio_url) {
//           const audio = document.getElementById('audioPlayer') as HTMLAudioElement;
//           audio.src = data.audio_url;
//           audio.play();
//         } else {
//           console.error('Error: No audio URL found in response');
//         }
//       })
//       .catch(error => {
//         console.error('Error:', error);
//       });
//   }

//   pauseAudio() {
//     const audio = document.getElementById('audioPlayer') as HTMLAudioElement;
//     audio.pause();
//   }

//   forwardAudio(seconds: number) {
//     const audio = document.getElementById('audioPlayer') as HTMLAudioElement;
//     audio.currentTime += seconds;
//   }

//   rewindAudio(seconds: number) {
//     const audio = document.getElementById('audioPlayer') as HTMLAudioElement;
//     audio.currentTime -= seconds;
//   }

//   toggleReceiver() {
//     this.showPlayer = !this.showPlayer;
//   }

//   extractSubstring(url: string): string {
//     return url.split('=')[0];
//   }
// }

import { Component, Input, ViewChild, ElementRef, AfterViewInit } from '@angular/core';

// interface Song {
//   videoId: string;
//   title: string;
//   artist: string;
// }

@Component({
  selector: 'app-music-player',
  templateUrl: './music-player.component.html',
  styleUrls: ['./music-player.component.css']
})
export class MusicPlayerComponent {
  @Input() SongData: any = {};
  showPlayer: boolean = false;
  isPlaying = false;
  currentTime = 0;
  totalTime = 0;
  intervalId: number | undefined; // explicitly typing intervalId as number or undefined
  @ViewChild('audioPlayer') audioPlayer!: ElementRef<HTMLAudioElement>; // Define audioPlayer as ElementRef
  @Input() recVid: any;
  @Input() Searched : boolean = false;
  @Input() NotSongData: any = {};
  @Input() recNotVid: any;

  finalVid : any;
  songName: any;

  // Define progressValue property
  progressValue: number = 0;

  ngOnInit() {
    // Call playAudioFromURL() in ngOnInit()
    this.playAudioFromURL();
  }

  getVideoID(videoId: string) {
    if (this.Searched == false) {
     this.SongData.videoId = videoId;
    } else if (this.Searched == true) {
      this.NotSongData.videoId = videoId;
      
    }

  }




  playAudioFromURL() {
    // Assuming this.finalVid is already set correctly based on your logic
    if (this.Searched == false) {
      this.finalVid = this.recVid;
    } else if (this.Searched == true) {
      this.finalVid = this.recNotVid;
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
          const audio = this.audioPlayer.nativeElement;
          audio.src = data.audio_url;
          audio.play();
          this.isPlaying = true;
          this.totalTime = audio.duration;
          this.intervalId = setInterval(() => this.updateProgressBar(), 100) as any; // explicitly cast as any
        } else {
          console.error('Error: No audio URL found in response');
        }
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }
  

  togglePlayPause() {
    if (this.isPlaying) {
        this.pauseAudio();
        this.isPlaying = false;
    } else {
      this.playAudio();
      this.isPlaying = true;
    }
  }


  pauseAudio() {
    const audio = this.audioPlayer.nativeElement;
    audio.pause();
    this.isPlaying = false;
    if (this.intervalId) {
      clearInterval(this.intervalId); // check if intervalId is defined before clearing
    }
  }
  playAudio() {
    const audio = this.audioPlayer.nativeElement;
    audio.play();
    this.isPlaying = true;
    if (this.intervalId) {
      clearInterval(this.intervalId); // check if intervalId is defined before clearing
    }
  }




  forwardAudio(seconds: number) {
    const audio = this.audioPlayer.nativeElement;
    audio.currentTime = Math.min(audio.currentTime + seconds, audio.duration);
  }

  rewindAudio(seconds: number) {
    const audio = this.audioPlayer.nativeElement;
    audio.currentTime = Math.max(audio.currentTime - seconds, 0);
  }

  toggleReceiver() {
    this.showPlayer = !this.showPlayer;
  }

  updateProgressBar() {
    if (this.audioPlayer && this.isPlaying) {
      const audio = this.audioPlayer.nativeElement;
      this.currentTime = audio.currentTime;
      this.totalTime = audio.duration;
      this.progressValue = (this.currentTime / this.totalTime) * 100;
    }
  }

  extractSubstring(url: string): string {
    return url.split('=')[0];
  }


  downloadAudioFromURL() {
    if (this.Searched == false) {
      this.finalVid = this.recVid;
      this.songName = this.SongData.title;
     } else if (this.Searched == true) {
       this.finalVid = this.recNotVid;
       this.songName = this.SongData.title;
     }
  
    const apiURL = `http://localhost:8000/api/play_audio/?video_id=${this.finalVid}`;
  
    fetch(apiURL)
      .then(response => response.json())
      .then(data => {
        if (data && data.audio_url) {
          // Create a temporary link element
          const link = document.createElement('a');
          link.href = data.audio_url;
          link.download =  `${this.songName}.mp3`; // Set the download filename
          link.click();
        } else {
          console.error('Error: No audio URL found in response');
        }
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }


}

