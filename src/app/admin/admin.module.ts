import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser'
import { CommonModule } from '@angular/common';
import { HomeComponent } from './components/home/home.component';
import { CoursesComponent } from './components/courses/courses.component';
import { TeacherComponent } from './components/teacher/teacher.component';
import { StudentComponent } from './components/student/student.component';
import { AdminRoutingModule } from './admin-routing.module';
import { AddTeacherComponent } from './components/add-teacher/add-teacher.component';



@NgModule({
  declarations: [
    HomeComponent,
    CoursesComponent,
    TeacherComponent,
    StudentComponent,
    AddTeacherComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule
  ]
})
export class AdminModule { }
