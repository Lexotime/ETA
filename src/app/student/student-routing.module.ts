import { ProfileComponent } from './pages/profile/profile.component';
import { HomeComponent } from './pages/home/home.component';
import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";


const routes: Routes = [
   {path: '', component: HomeComponent},
   {path: 'cours', component: HomeComponent},
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