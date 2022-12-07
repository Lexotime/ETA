import { AdminModule } from './admin/admin.module';
import { StudentModule } from './student/student.module';
import { CoreModule } from './core/core.module';
import { AuthModule } from './auth/auth.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

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
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
