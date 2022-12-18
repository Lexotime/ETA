import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CoreModule } from './../core/core.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './components/profile/profile.component';
import { HomeComponent } from './components/home/home.component';
import { VideoComponent } from './components/video/video.component';
import { VideoListComponent } from './components/video-list/video-list.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { CoursesListComponent } from './components/courses-list/courses-list.component';



@NgModule({
  declarations: [
    ProfileComponent,
    HomeComponent,
    VideoComponent,
    VideoListComponent,
    CalendarComponent,
    CoursesListComponent,
  ],
  imports: [
    CommonModule,
    CoreModule,
    RouterModule,
    ReactiveFormsModule

  ]
})
export class TeacherModule { }
