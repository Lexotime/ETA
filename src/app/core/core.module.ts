import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { LocalStorageService } from './services/local-storage.service';
import { CourseItemComponent } from './components/course-item/course-item.component';
import { CourseListComponent } from './components/course-list/course-list.component';
import { LevelCoursesListComponent } from './components/level-courses-list/level-courses-list.component';
import { CoursePopUpComponent } from './components/course-pop-up/course-pop-up.component';
import { MessagesComponent } from './components/messages/messages.component';



@NgModule({
  declarations: [
    HeaderComponent,
    CourseItemComponent,
    CourseListComponent,
    LevelCoursesListComponent,
    CoursePopUpComponent,
    MessagesComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    HeaderComponent,
    CourseListComponent,
    CourseItemComponent,
    LevelCoursesListComponent
  ],
  providers: [
		LocalStorageService
	]
})
export class CoreModule { }
