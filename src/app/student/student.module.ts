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



@NgModule({
  declarations: [
    HomeComponent,
    ProfileComponent,
    CoursesComponent,
    CalendarComponent
  ],
  imports: [
    StudentRoutingModule,
    CommonModule,

    CoreModule,
  ]
})
export class StudentModule { }
