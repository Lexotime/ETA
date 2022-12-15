import { AdminAuthComponent } from './components/admin-auth/admin-auth.component';
import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";


import {LoginComponent} from "./components/student/login/login.component";
import {RegisterComponent} from "./components/student/register/register.component";

const routes: Routes = [
    { path: '', component: LoginComponent },
    { path: 'connexion', component: LoginComponent },
    { path: 'inscription', component: RegisterComponent },
    { path: 'admin', component: AdminAuthComponent },
]

@NgModule({
    imports: [
        RouterModule.forChild(routes),
    ],
    exports: [
        RouterModule
    ]
})

export class AuthRoutingModule {

}