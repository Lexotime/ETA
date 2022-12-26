import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CoreModule } from './../core/core.module';
import { StudentRoutingModule } from './student-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './components/home/home.component';
import { ProfileComponent } from './components/profile/profile.component';
import { CoursesComponent } from './components/courses/courses.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { BrowserModule } from '@angular/platform-browser';
import { CoursesListItemComponent } from './components/courses-list-item/courses-list-item.component';
import { LevelPageComponent } from './components/level-page/level-page.component';
import { VideoComponent } from './components/video/video.component';
import { VideoListItemComponent } from './components/video-list-item/video-list-item.component';
import { VideoListComponent } from './components/video-list/video-list.component';
import { VideoViewComponent } from './components/video-view/video-view.component';



@NgModule({
  declarations: [
    HomeComponent,
    ProfileComponent,
    CoursesComponent,
    CalendarComponent,
    CoursesListItemComponent,
    LevelPageComponent,
    VideoComponent,
    VideoListItemComponent,
    VideoListComponent,
    VideoViewComponent
  ],
  imports: [
    StudentRoutingModule,
    CommonModule,
    ReactiveFormsModule,
    CoreModule,
  ]
})
export class StudentModule { }
