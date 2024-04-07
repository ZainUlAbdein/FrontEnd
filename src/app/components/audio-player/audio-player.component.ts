import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-audio-player',
  templateUrl: './audio-player.component.html',
  styleUrl: './audio-player.component.css'
})
export class AudioPlayerComponent {
  @Input() Flag: boolean =false;

  constructor() { }

  ngOnInit(): void {
    this.playAudioFromURL();
  }

  playAudioFromURL() {
    const videoID = 'RBumgq5yVrA'; // Replace this with the actual YouTube video ID
    const apiURL = `http://localhost:8000/api/play_audio/?video_id=${videoID}`;

    fetch(apiURL)
      .then(response => response.json())
      .then(data => {
        if (data && data.audio_url) {
          const audio = document.getElementById('audioPlayer') as HTMLAudioElement;
          audio.src = data.audio_url;
          audio.play();
        } else {
          console.error('Error: No audio URL found in response');
        }
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }

}
