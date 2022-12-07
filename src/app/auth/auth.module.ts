import { AuthService } from './services/auth.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';

import {AuthRoutingModule} from './auth-routing.module';

import { FormsModule, ReactiveFormsModule} from "@angular/forms";


@NgModule({
	declarations: [
		RegisterComponent,
		LoginComponent
	],
	imports: [
		CommonModule,

		AuthRoutingModule,
		FormsModule,
		ReactiveFormsModule,
	],
	providers: [
		AuthService
	],
})


export class AuthModule {

}
