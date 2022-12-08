import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatTabsModule} from '@angular/material/tabs';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatTableModule} from '@angular/material/table';
import {MatSortModule} from '@angular/material/sort';


import { HeaderComponent } from './components/header/header.component';
import { LocalStorageService } from './services/local-storage.service';
import { CourseItemComponent } from './components/course-item/course-item.component';
import { CourseListComponent } from './components/course-list/course-list.component';
import { LevelCoursesListComponent } from './components/level-courses-list/level-courses-list.component';
import { CoursePopUpComponent } from './components/course-pop-up/course-pop-up.component';
import { MessagesComponent } from './components/messages/messages.component';
import { FooterComponent } from './components/footer/footer.component';
import { ListItemsComponent } from './components/list-items/list-items.component';



@NgModule({
declarations: [
	HeaderComponent,
	CourseItemComponent,
	CourseListComponent,
	LevelCoursesListComponent,
	CoursePopUpComponent,
	MessagesComponent,
	FooterComponent,
	ListItemsComponent
],
imports: [
	CommonModule,
	RouterModule,

	MatTabsModule,
	MatSortModule,
	MatTableModule,
	MatPaginatorModule
],
exports: [
	HeaderComponent,
	CourseListComponent,
	CourseItemComponent,
	LevelCoursesListComponent,
	FooterComponent,
	ListItemsComponent
],
providers: [
		LocalStorageService
	]
})
export class CoreModule { }
