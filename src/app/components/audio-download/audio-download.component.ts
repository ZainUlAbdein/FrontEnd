import { HttpClient } from '@angular/common/http';
import { Component, ViewChild, ElementRef } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-audio-download',
  templateUrl: './audio-download.component.html',
  styleUrls: ['./audio-download.component.css']
})
export class AudioDownloadComponent {



  constructor(private http: HttpClient) {}

  audioUrl: string = "https://rr2---sn-4pcxgpni-3ipe.googlevideo.com/videoplayback?expire=1712427878&ei=Bj8RZt23DcLD_9EP2tK4qAo&ip=100.24.7.196&id=o-APksmB35H5PRMANhkuMGLbIbN7CVQ4XDA3Wj4qGYWN52&itag=251&source=youtube&requiressl=yes&xpc=EgVo2aDSNQ%3D%3D&bui=AaUN6a0lyPRx8uyMEVBKRYxPxbhDnqEgyBOzj4eARls0gj-JQ-Sdjp8LR2TwLmfFpH6rFrPuLgP7Vuvj&spc=UWF9f9LI71z-pShaigFSUqIjObrGr3dZQ4IzL2XZBDvFcO8enlyWwaOB1w&vprv=1&svpuc=1&mime=audio%2Fwebm&ns=Vg3rxF8WCgqldM4ijd6LxFEQ&gir=yes&clen=4339702&dur=254.201&lmt=1706131245155373&keepalive=yes&fexp=51141542&c=WEB&sefc=1&txp=4532434&n=onsd8MTbymjVGA&sparams=expire%2Cei%2Cip%2Cid%2Citag%2Csource%2Crequiressl%2Cxpc%2Cbui%2Cspc%2Cvprv%2Csvpuc%2Cmime%2Cns%2Cgir%2Cclen%2Cdur%2Clmt&sig=AJfQdSswRAIgUJXxApxy-GvIEXEsgndB8P52Uph_l_T5x7szMcQNYd4CIEQHby9O9MeIR_giHcli3BSz2n-OYrXTVLslCwNbTao6&redirect_counter=1&rm=sn-ab5eer7e&req_id=8f5f38c16e6a3ee&cms_redirect=yes&ipbypass=yes&mh=DR&mip=125.62.90.74&mm=31&mn=sn-4pcxgpni-3ipe&ms=au&mt=1712405332&mv=m&mvi=2&pcm2cms=yes&pl=24&lsparams=ipbypass,mh,mip,mm,mn,ms,mv,mvi,pcm2cms,pl&lsig=ALClDIEwRQIgOeAEstVmFHzUwXbb23YN50KIb_1mGU6yrYS1OPt_CbICIQC9-eFCwsXQhdKgxctRnZXFFBksVwfsG1S5biBKmzzDNg%3D%3D"


  @ViewChild('myAudio') myAudio!: ElementRef;

  // Function to modify the audio element
  modifyAudio() {
    // Access the native audio element
    let audioElement: HTMLAudioElement = this.myAudio.nativeElement;

    // Example modifications
    audioElement.volume = 0.5; // Sets volume to 50%
    audioElement.src = this.audioUrl; // Change the source of the audio
    audioElement.pause(); // Pauses the audio
    audioElement.play(); // Plays the audio

    // You can add more modifications as needed
  }

  downloadAudio(videoId: string): void {
    const apiUrl = `https://drfapi-production.up.railway.app/api/songs/audio/${videoId}/`; // Replace with your API URL
    this.http.get(apiUrl, { responseType: 'blob' }).subscribe(
      (blob: Blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${videoId}_audio.mp3`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
      },
      (error) => {
        console.error('Failed to fetch audio:', error);
      }
    );
  }

}
