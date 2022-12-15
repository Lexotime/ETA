import { TeacherModule } from './teacher/teacher.module';
import { AdminModule } from './admin/admin.module';
import { StudentModule } from './student/student.module';
import { CoreModule } from './core/core.module';
import { AuthModule } from './auth/auth.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AngularFireModule } from '@angular/fire/compat';
import {environment} from './environments/environment'


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    // external module
    BrowserModule,
    AppRoutingModule,

    //local module
    CoreModule,
    StudentModule,
    TeacherModule,
    AdminModule,
    
    AngularFireModule.initializeApp(environment.firebaseConfig),

    AuthModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
