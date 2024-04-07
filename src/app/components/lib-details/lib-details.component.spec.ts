import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LibDetailsComponent } from './lib-details.component';

describe('LibDetailsComponent', () => {
  let component: LibDetailsComponent;
  let fixture: ComponentFixture<LibDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LibDetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LibDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
