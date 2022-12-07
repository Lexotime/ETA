import { CalendarComponent } from './components/calendar/calendar.component';
import { CoursesComponent } from './components/courses/courses.component';
import { ProfileComponent } from './components/profile/profile.component';
import { HomeComponent } from './components/home/home.component';
import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";


const routes: Routes = [
   {path: 'accueil', component: HomeComponent},
   {path: 'activite', component: CalendarComponent},
   {path: 'cours', component: CoursesComponent},
   {path: 'profil', component: ProfileComponent}
]



@NgModule({
    imports: [
        RouterModule.forChild(routes),
    ],
    exports: [
        RouterModule
    ]
})

export class StudentRoutingModule {

}