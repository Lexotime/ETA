import { ProfileComponent } from './components/profile/profile.component';
import { VideoComponent } from './components/video/video.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { CoursesComponent } from './components/courses/courses.component';
import { HomeComponent } from './components/home/home.component';
import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";


const routes: Routes = [
   {path: 'accueil', component: HomeComponent},
   {path: 'accueil/:id', component: HomeComponent},
   {path: 'activite', component: CalendarComponent},
   {path: 'cours', component: CoursesComponent},
   {path: 'profil', component: ProfileComponent},
   {path: 'rediffusion', component: VideoComponent}
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