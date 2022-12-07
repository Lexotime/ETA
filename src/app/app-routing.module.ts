import { AuthGuard } from './core/guards/auth/auth.guard';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [

  { path: 'etud',canActivate: [AuthGuard], loadChildren: () => import('./student/student-routing.module').then(m => m.StudentRoutingModule) },
  { path: 'en',canActivate: [AuthGuard], loadChildren: () => import('./teacher/teacher-routing.module').then(m => m.TeacherRoutingModule) },
  { path: '', loadChildren: () => import('./auth/auth-routing.module').then(m => m.AuthRoutingModule) },
  
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule,
  ]
})
export class AppRoutingModule { }
