import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AudioDownloadComponent } from './audio-download.component';

describe('AudioDownloadComponent', () => {
  let component: AudioDownloadComponent;
  let fixture: ComponentFixture<AudioDownloadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AudioDownloadComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AudioDownloadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
