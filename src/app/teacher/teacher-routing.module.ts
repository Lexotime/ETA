import { VideoViewComponent } from './../student/components/video-view/video-view.component';
import { VideoLinkComponent } from './components/video-link/video-link.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { ProfileComponent } from './components/profile/profile.component';
import { HomeComponent } from './components/home/home.component';
import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import { VideoComponent } from './components/video/video.component';


const routes: Routes = [
   {path: 'accueil', component: HomeComponent},
   {path: 'activite', component: CalendarComponent},
   {path: 'videos/:id', component: VideoComponent},
   {path: 'videos', component: VideoComponent},
   {path: 'videos/ajouter/:id', component: VideoComponent},
   {path: 'videos/voir/:id', component: VideoViewComponent},
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

export class TeacherRoutingModule {

}