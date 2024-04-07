import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { BookComponent } from './components/book/book.component';
import { LibraryComponent } from './components/library/library.component';
import { FileUploadComponent } from './components/file-upload/file-upload.component';
import { MusicComponent } from './components/music/music.component';
import { AudioPlayerComponent } from './components/audio-player/audio-player.component';
import { ReceiverComponent } from './components/receiver/receiver.component';
import { MusicPlayerComponent } from './components/music-player/music-player.component';

import { LoginComponent } from './components/login/login.component';


const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'home', component: HomeComponent},
  { path: 'books', component: BookComponent},
  { path: 'library', component: LibraryComponent },
  { path: 'upload', component: FileUploadComponent},
  { path: 'music', component: MusicComponent },
  { path: 'audio', component: AudioPlayerComponent},
  { path: 'receiver', component: ReceiverComponent},
  { path: 'player', component: MusicPlayerComponent},
  { path: 'authentication', component: LoginComponent },



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
