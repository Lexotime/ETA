import { CoreModule } from './../core/core.module';
import { StudentRoutingModule } from './student-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './pages/home/home.component';
import { ProfileComponent } from './pages/profile/profile.component';



@NgModule({
  declarations: [
    HomeComponent,
    ProfileComponent
  ],
  imports: [
    StudentRoutingModule,
    CommonModule,

    CoreModule,
  ]
})
export class StudentModule { }
