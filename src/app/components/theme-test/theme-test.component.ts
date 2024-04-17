import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ThemeService } from '../../service/theme.service';

@Component({
  selector: 'app-theme-test',
  templateUrl: './theme-test.component.html',
  styleUrl: './theme-test.component.css'
})
export class ThemeTestComponent implements OnDestroy {
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
  songs = [
    {
      path: "assets/Images/Passenger _ Let Her Go (Official Video).mp3",
      displayName: "Sugar & Brownies",
      cover: "imgs_audio/img-1.jpg",
      artist: "DHARIA",
    },
    {
      path: "imgs_audio/2.mp3",
      displayName: "Alone, Pt. II",
      cover: "imgs_audio/img-2.jpg",
      artist: "Alan Walker & Ava Max",
    },
    {
      path: "imgs_audio/3.mp3",
      displayName: "Let Me Love You ft",
      cover: "imgs_audio/img-3.jpg",
      artist: "Justin Bieber",
    },
    {
      path: "imgs_audio/4.mp3",
      displayName: "On The Floor ft",
      cover: "imgs_audio/img-4.jpg",
      artist: "Jennifer Lopez",
    },
  ];
  musicIndex = 0;
  isPlaying = false;

  constructor() { }
  ngOnDestroy(): void {
    throw new Error('Method not implemented.');
  }

  ngOnInit(): void {
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
    this.loadMusic("https://rr3---sn-ab5l6nkd.googlevideo.com/videoplayback?expire=1713388384&ei=AOcfZs-8JO-gkucPsuqdIA&ip=3.238.57.13&id=o-ABlCc-GD_pvOI1ekj8PsnKIbgp9BzWHQORy-F_3BHyzR&itag=139&source=youtube&requiressl=yes&xpc=EgVo2aDSNQ%3D%3D&mh=4H&mm=31%2C29&mn=sn-ab5l6nkd%2Csn-ab5sznzs&ms=au%2Crdu&mv=m&mvi=3&pl=21&initcwndbps=671250&vprv=1&mime=audio%2Fmp4&gir=yes&clen=1082726&dur=177.446&lmt=1705534884147922&mt=1713366303&fvip=2&keepalive=yes&c=ANDROID_MUSIC&txp=4532434&sparams=expire%2Cei%2Cip%2Cid%2Citag%2Csource%2Crequiressl%2Cxpc%2Cvprv%2Cmime%2Cgir%2Cclen%2Cdur%2Clmt&sig=AJfQdSswRAIgHLUZaOwoRSBmZvS1BobyNJMT7EuURoRVjR-KqInDxn0CIBSllzEuUQR4PD6xIjUrPIox1KCq-r0yYysDAKrEFWgd&lsparams=mh%2Cmm%2Cmn%2Cms%2Cmv%2Cmvi%2Cpl%2Cinitcwndbps&lsig=ALClDIEwRAIgMRPZPN4ZET8RwRYfEXauPP2L4jiMLHKfa2fyawMaTw8CICIW_40emPakDTTk82enS_ipFF8-FIqd2hPCmIh7Z59I");
    this.btnEvents();
    this.playMusic()

    this.isPlaying = true;
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

  changeMusic(direction: number) {
    this.musicIndex = this.musicIndex + direction + (this.songs.length % this.songs.length);
    this.loadMusic(this.songs[this.musicIndex]);
    this.playMusic();
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


}
