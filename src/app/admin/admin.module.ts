import { AdminService } from './services/admin.service';
import { CoreModule } from './../core/core.module';
import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './components/home/home.component';
import { CoursesComponent } from './components/courses/courses.component';
import { TeacherComponent } from './components/teacher/teacher.component';
import { StudentComponent } from './components/student/student.component';
import { AdminRoutingModule } from './admin-routing.module';
import { AddTeacherComponent } from './components/add-teacher/add-teacher.component';


// //angularfire imports
// import { AngularFireModule } from "@angular/fire/compat";
// import { AngularFirestoreModule } from "@angular/fire/compat/firestore/";

// //environment import
// import { environment } from "../environments/environment"; 


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
    ReactiveFormsModule,
    AdminRoutingModule,
    CoreModule,

    // AngularFireModule.initializeApp(environment.firebaseConfig),
    // AngularFirestoreModule
  ],
  providers: [
    AdminService
  ]
})
export class AdminModule { }
