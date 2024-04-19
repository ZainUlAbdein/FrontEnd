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
import { ThemeService } from '../../service/theme.service';



@Component({
  selector: 'app-music-player',
  templateUrl: './music-player.component.html',
  styleUrls: ['./music-player.component.css']
})
export class MusicPlayerComponent {
  @Input() SongData: any = {};
  // showPlayer: boolean = false;
  isPlaying = false;
  currentTime = 0;
  totalTime = 0;
  intervalId: number | undefined; // explicitly typing intervalId as number or undefined
  @ViewChild('audioPlayer') audioPlayer!: ElementRef<HTMLAudioElement>; // Define audioPlayer as ElementRef
  @Input() recVid: any;
  @Input() Searched : boolean = false;
  @Input() NotSongData: any = {};
  @Input() recNotVid: any;
  @Input() showPlayer: any;
  @Input() showSearched: any;


  theme!: string;
  Dark = 'dark';
  Light = 'light';

  finalVid : any;
  songName: any;

  // Define progressValue property
  progressValue: number = 0;


  imgEl!: HTMLImageElement;
  imgCoverEl!: HTMLImageElement;
  musicTitleEl!: HTMLElement;
  musicArtistEl!: HTMLElement;
  playerProgressEl!: HTMLElement;
  progressEl!: HTMLElement;
  currentTimeEl!: HTMLElement;
  durationEl!: HTMLElement;
  prevBtnEl!: HTMLElement;
  playvBtnEl!: HTMLElement;
  nextvBtnEl!: HTMLElement;
  music!: HTMLAudioElement;
  song_url!: any;
  song_is!: boolean;
  subscription: any;




  constructor(private themeService: ThemeService) {
    this.subscription = this.themeService.theme$.subscribe(theme => {
      this.theme = theme;
    });
  }


  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }





  ngOnInit() {
    




    this.playAudioFromURL();


    setTimeout(() => {
    this.imgEl = document.getElementById("bg_img") as HTMLImageElement;
    this.imgCoverEl = document.getElementById("cover") as HTMLImageElement;
    this.musicTitleEl = document.getElementById("music_title")!;
    this.musicArtistEl = document.getElementById("musric_artist")!;
    this.playerProgressEl = document.getElementById("player_progress")!;
    this.progressEl = document.getElementById("progress")!;
    this.currentTimeEl = document.getElementById("current_time")!;
    this.durationEl = document.getElementById("duration")!;
    this.prevBtnEl = document.getElementById("prev")!;
    this.playvBtnEl = document.getElementById("play")!;
    this.nextvBtnEl = document.getElementById("next")!;
      this.music = new Audio();
      this.loadMusic(this.song_url)
      this.btnEvents()
      this.playMusic()
    }, 10000); // Call myFunction after 5 seconds (5000 milliseconds)

    

  }

  getVideoID(videoId: string) {
    if (this.Searched == false) {
     this.SongData.videoId = videoId;
    } else if (this.Searched == true) {
      this.NotSongData.videoId = videoId;
      
    }

  }



  // myFunction() {
  //   this.btnEvents();
  //   this.playMusic()
  // }




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
          this.song_url = data.audio_url
          console.log(this.song_url)

          this.song_is = true;

        } else {
          console.error('Error: No audio URL found in response');
        }
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }
  

  
  togglePlay() {
    if (this.isPlaying == true) {
      this.pauseMusic()
    } else {
      this.playMusic();
    }
  }

  playMusic() {
    this.isPlaying = !this.isPlaying;
    this.playvBtnEl.classList.replace("fa-play", "fa-pause");
    this.playvBtnEl.setAttribute("title", "pause");
    this.music.play();
  }

  pauseMusic() {
    this.isPlaying = !this.isPlaying;
    this.playvBtnEl.classList.replace("fa-pause", "fa-play");
    this.playvBtnEl.setAttribute("pause", "title");
    this.music.pause();
  }

  loadMusic(song: any) {
    this.music.src = song;

  }



  setProgressBar(e: MouseEvent) {
    const width = this.playerProgressEl.clientWidth;
    const xValue = e.offsetX;
    this.music.currentTime = (xValue / width) * this.music.duration;
  }

  updateProgressBar() {
    const { duration, currentTime } = this.music;
    const ProgressPercent = (currentTime / duration) * 100;
    this.progressEl.style.width = `${ProgressPercent}%`;
    const formattime = (timeRanges: number) =>
      String(Math.floor(timeRanges)).padStart(2, "0");
    this.durationEl.textContent = `${formattime(duration / 60)} : ${formattime(duration % 60)}`;
    this.currentTimeEl.textContent = `${formattime(currentTime / 60)} : ${formattime(currentTime % 60)}`;
  }

  btnEvents() {
    // this.playvBtnEl.addEventListener("click", this.togglePlay.bind(this));
    // this.nextvBtnEl.addEventListener("click", () => this.changeMusic(1));
    // this.prevBtnEl.addEventListener("click", () => this.changeMusic(-1));
    // this.music.addEventListener("ended", () => this.changeMusic(1));
    this.music.addEventListener("timeupdate", this.updateProgressBar.bind(this));
    this.playerProgressEl.addEventListener("click", this.setProgressBar.bind(this));
  }


  forward() {
    const currentTime = this.music.currentTime;
    this.music.currentTime = currentTime + 10; // Forward 10 seconds
  }

  rewind() {
    const currentTime = this.music.currentTime;
    this.music.currentTime = currentTime - 10; // Rewind 10 seconds
  }



  extractSubstring(url: string): string {
    return url.split('=')[0];
  }


}

