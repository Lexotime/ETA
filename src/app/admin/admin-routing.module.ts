import { NewCourseComponent } from './components/new-course/new-course.component';
import { LookVideoComponent } from './components/look-video/look-video.component';
import { AddVideoComponent } from './components/add-video/add-video.component';
import { VideoComponent } from './components/video/video.component';
import { AddCourseComponent } from './components/add-course/add-course.component';
import { AddTeacherComponent } from './components/add-teacher/add-teacher.component';
import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import { CoursesComponent } from "./components/courses/courses.component";
import { StudentComponent } from "./components/student/student.component";
import { TeacherComponent } from "./components/teacher/teacher.component";



const routes: Routes = [


    { path: 'cours', component:  CoursesComponent},
    { path: 'cours/ajouter', component:  NewCourseComponent},
    { path: 'cours/:id', component:  CoursesComponent},
    { path: 'enseignants', component:  TeacherComponent},
    { path: 'etudiants', component:  StudentComponent},
    { path: 'videos', component: VideoComponent},
    { path: 'videos/:id', component: VideoComponent},
    { path: 'enseignants/ajouter/cours/:id', component:  AddCourseComponent},
    { path: 'enseignants/ajouter', component: AddTeacherComponent},
    { path: 'videos/ajouter/:id', component: AddVideoComponent},
    { path: 'videos/visionner/:id', component: LookVideoComponent}
    
]

@NgModule({
    imports: [
        RouterModule.forChild(routes),
    ],
    exports: [
        RouterModule
    ]
})

export class AdminRoutingModule {

}