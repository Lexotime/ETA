import { AdminService } from './services/admin.service';
import { CoreModule } from './../core/core.module';
import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoursesComponent } from './components/courses/courses.component';
import { TeacherComponent } from './components/teacher/teacher.component';
import { StudentComponent } from './components/student/student.component';
import { AdminRoutingModule } from './admin-routing.module';
import { AddTeacherComponent } from './components/add-teacher/add-teacher.component';
import { AddCourseComponent } from './components/add-course/add-course.component';
import { TeacherListComponent } from './components/teacher-list/teacher-list.component';
import { StudentListComponent } from './components/student-list/student-list.component';
import { CourseListComponent } from './components/course-list/course-list.component';
import { VideoListComponent } from './components/video-list/video-list.component';
import { VideoComponent } from './components/video/video.component';
import { AddVideoComponent } from './components/add-video/add-video.component';



// //angularfire imports
// import { AngularFireModule } from "@angular/fire/compat";
// import { AngularFirestoreModule } from "@angular/fire/compat/firestore/";

// //environment import
// import { environment } from "../environments/environment"; 


@NgModule({
	declarations: [
		CoursesComponent,
		TeacherComponent,
		StudentComponent,
		AddTeacherComponent,
		AddCourseComponent,
		TeacherListComponent,
		StudentListComponent,
		CourseListComponent,
		VideoListComponent,
		VideoComponent,
		AddVideoComponent

	],
	imports: [
		CommonModule,
		ReactiveFormsModule,
		AdminRoutingModule,
		CoreModule,
	],
	providers: [
		AdminService
	]
})
export class AdminModule { }
