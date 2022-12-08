import { CoreModule } from './../core/core.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './pages/profile/profile.component';
import { HomeComponent } from './pages/home/home.component';



@NgModule({
  declarations: [
    ProfileComponent,
    HomeComponent,
  ],
  imports: [
    CommonModule,
    CoreModule

  ]
})
export class TeacherModule { }
