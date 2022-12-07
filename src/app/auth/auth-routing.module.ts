import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";


import {LoginComponent} from "./components/login/login.component";
import {RegisterComponent} from "./components/register/register.component";

const routes: Routes = [
    { path: '', component: LoginComponent },
    { path: 'connexion', component: LoginComponent },
    { path: 'inscription', component: RegisterComponent },
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