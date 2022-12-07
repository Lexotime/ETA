import { AddTeacherComponent } from './components/add-teacher/add-teacher.component';
import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import { CoursesComponent } from "./components/courses/courses.component";
import { StudentComponent } from "./components/student/student.component";
import { TeacherComponent } from "./components/teacher/teacher.component";



const routes: Routes = [
    { path: '', component:  CoursesComponent},
    { path: 'cours', component:  CoursesComponent},
    { path: 'enseignants', component:  TeacherComponent},
    { path: 'etudiants', component:  StudentComponent},
    { path: 'ajouter', component:  AddTeacherComponent},
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