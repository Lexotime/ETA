import { AdminGuard } from './core/guards/admin/admin.guard';
import { AuthGuard } from './core/guards/auth/auth.guard';
import { NgModule } from '@angular/core';
import { RouterModule, Routes, CanActivate } from '@angular/router';
import { HomeComponent } from './landing-page/home/home.component';

const routes: Routes = [

  { path: 'auth', loadChildren: () => import('./auth/auth-routing.module').then(m => m.AuthRoutingModule) },
  { path: 'etud',canActivate: [AuthGuard], loadChildren: () => import('./student/student-routing.module').then(m => m.StudentRoutingModule) },
  { path: 'en',canActivate: [AuthGuard], loadChildren: () => import('./teacher/teacher-routing.module').then(m => m.TeacherRoutingModule) },
  { path: 'admin', canActivate: [AdminGuard], loadChildren: () => import('./admin/admin-routing.module').then(m => m.AdminRoutingModule) },
  { path: '', component: HomeComponent }
  
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
