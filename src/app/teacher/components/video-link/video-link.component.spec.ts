import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoLinkComponent } from './video-link.component';

describe('VideoLinkComponent', () => {
  let component: VideoLinkComponent;
  let fixture: ComponentFixture<VideoLinkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VideoLinkComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VideoLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
