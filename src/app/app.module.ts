import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ExamplePdfViewerComponent } from './components/example-pdf-viewer/example-pdf-viewer.component';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { BookComponent } from './components/book/book.component';
import { BookDetailsComponent } from './components/book-details/book-details.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LibraryComponent } from './components/library/library.component';
import { FormsModule } from '@angular/forms';
import { FileUploadComponent } from './components/file-upload/file-upload.component';
import { LibDetailsComponent } from './components/lib-details/lib-details.component';
import { MusicComponent } from './components/music/music.component';
import { AudioPlayerComponent } from './components/audio-player/audio-player.component'; 
import { HttpClientModule } from '@angular/common/http';
import { MatPaginatorModule } from '@angular/material/paginator';
import { SenderComponent } from './components/sender/sender.component';
import { ReceiverComponent } from './components/receiver/receiver.component';
import { MusicPlayerComponent } from './components/music-player/music-player.component';
import { ThemeTestComponent } from './components/theme-test/theme-test.component';
import { ParentComponent } from './components/parent/parent.component';
import { ChildComponent } from './components/child/child.component';
import { AudioDownloadComponent } from './components/audio-download/audio-download.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { AuthComponent } from './components/auth/auth.component';

import { MatFormFieldModule } from '@angular/material/form-field'; // Add this import
import { MatInputModule } from '@angular/material/input'; // Add this import
import { MatButtonModule } from '@angular/material/button'; // Add this import
import { MatCardModule } from '@angular/material/card';

import { ReactiveFormsModule } from '@angular/forms';
import { TokenInterceptor } from './shared/token.interceptor';

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthService } from './service/auth.service';
import { LoginComponent } from './components/login/login.component';


@NgModule({
  declarations: [
    AppComponent,
    ExamplePdfViewerComponent,
    HomeComponent,
    NavbarComponent,
    BookComponent,
    BookDetailsComponent,
    LibraryComponent,
    FileUploadComponent,
    LibDetailsComponent,
    MusicComponent,
    AudioPlayerComponent,
    SenderComponent,
    ReceiverComponent,
    MusicPlayerComponent,
    ThemeTestComponent,
    ParentComponent,
    ChildComponent,
    AudioDownloadComponent,
    AuthComponent,
    LoginComponent,
  


    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxExtendedPdfViewerModule,
    NgbModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    ReactiveFormsModule,
 

    
  ],
  providers: [

    AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
