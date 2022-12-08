import { AdminModule } from './admin/admin.module';
import { StudentModule } from './student/student.module';
import { CoreModule } from './core/core.module';
import { AuthModule } from './auth/auth.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

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
    AdminModule,
    AuthModule,
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
