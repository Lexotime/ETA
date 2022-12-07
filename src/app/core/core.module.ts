import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { LocalStorageService } from './services/local-storage.service';
import { CourseItemComponent } from './components/course-item/course-item.component';
import { CourseListComponent } from './components/course-list/course-list.component';
import { LevelCoursesListComponent } from './components/level-courses-list/level-courses-list.component';



@NgModule({
  declarations: [
    HeaderComponent,
    CourseItemComponent,
    CourseListComponent,
    LevelCoursesListComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    HeaderComponent,
    CourseListComponent,
    LevelCoursesListComponent
  ],
  providers: [
		LocalStorageService
	]
})
export class CoreModule { }
