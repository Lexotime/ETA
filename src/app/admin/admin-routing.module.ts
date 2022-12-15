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
    { path: 'cours/:id', component:  CoursesComponent},
    { path: 'enseignants', component:  TeacherComponent},
    { path: 'etudiants', component:  StudentComponent},
    { path: 'videos', component: VideoComponent},
    { path: 'videos/:id', component: VideoComponent},
    { path: 'ajouter/cours/:id', component:  AddCourseComponent},
    { path: 'ajouter/enseignant', component: AddTeacherComponent},
    { path: 'ajouter/video/:id', component: AddVideoComponent},
    
    
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