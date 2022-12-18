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
import { FooterComponent } from './components/footer/footer.component';
import { ListItemsComponent } from './components/list-items/list-items.component';
import { ForumComponent } from './components/forum/forum.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { AlertComponent } from './components/alert/alert.component';



@NgModule({
declarations: [
	HeaderComponent,
	CourseItemComponent,
	CourseListComponent,
	LevelCoursesListComponent,
	CoursePopUpComponent,
	MessagesComponent,
	FooterComponent,
	ListItemsComponent,
	ForumComponent,
	SidebarComponent,
 AlertComponent
],
imports: [
	CommonModule,
	RouterModule,

	
],
exports: [
	HeaderComponent,
	CourseListComponent,
	CourseItemComponent,
	LevelCoursesListComponent,
	FooterComponent,
	ListItemsComponent,
	ForumComponent,
	SidebarComponent,
	AlertComponent
],
providers: [
		LocalStorageService
	]
})
export class CoreModule { }
