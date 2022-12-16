import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LookVideoComponent } from './look-video.component';

describe('LookVideoComponent', () => {
  let component: LookVideoComponent;
  let fixture: ComponentFixture<LookVideoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LookVideoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LookVideoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
