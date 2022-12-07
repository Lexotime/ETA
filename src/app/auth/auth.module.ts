import { AuthService } from './services/auth.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegisterComponent } from './components/student/register/register.component';
import { LoginComponent } from './components/student/login/login.component';

import {AuthRoutingModule} from './auth-routing.module';

import { FormsModule, ReactiveFormsModule} from "@angular/forms";
import { AdminAuthComponent } from './components/admin-auth/admin-auth.component';
import { TeacherAuthComponent } from './components/teacher-auth/teacher-auth.component';


@NgModule({
	declarations: [
		RegisterComponent,
		LoginComponent,
  AdminAuthComponent,
  TeacherAuthComponent
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
