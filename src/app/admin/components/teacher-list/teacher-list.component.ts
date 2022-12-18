import { Observable, filter } from 'rxjs';
import { AdminService } from './../../services/admin.service';
import { Component, Input, Output, EventEmitter } from '@angular/core';
//@ts-ignore
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-teacher-list',
  templateUrl: './teacher-list.component.html',
  styleUrls: ['./teacher-list.component.css']
})
export class TeacherListComponent {

	data: any= [];
	message: any;

	alertVisible: boolean = false;

	@Input() columns: any;
	@Input() extra: any;
	@Input() canSelect: boolean = true;
	@Output() itemEmitter = new EventEmitter<number>();


	listFragments: any;
	saveData: any;
	sens: boolean = false;
	saveColumn: string = '';
	currentEmit: string = '1';

	loadData: boolean = true;

	page: number = 0;
	numberOfElement: number = 20;

	constructor (private adminService: AdminService) {

	}

	async ngOnInit () {
		this.initTable();		
	}

	initTable () {
		this.data = [];
		this.adminService.getAllTeachers().subscribe( s => {
			s.docs.forEach(ss => {
				this.data.push(ss.data());
			})
			console.log(this.data);
			
			this.saveData = this.data;
			this.listFragments = this.getListFragment(this.page, this.numberOfElement);
		})
	}
	

	emitItem (item: any) {
		this.currentEmit = item;
		this.itemEmitter.emit(item);
	}

	getListFragment (page: number, numberOfElement: number) : {}[] {

		let newList = [];
		for (let index = page * numberOfElement, i = 0; index < numberOfElement * (page +1); index++, i++)
			if (this.saveData.length > index)
			newList.push(this.saveData[index]);
			else
			break;
			
		return newList;
	}

	getPages () : number[] {

	let pages = [];
		for (let index = 0; index < this.data.length / this.numberOfElement; index++)
			pages.push(index)
			
		return pages;
	}

	setNumberOfElement(num: string) {
		this.page = 0;
		this.numberOfElement = +num;
		this.listFragments = this.getListFragment(this.page, this.numberOfElement);
	}

	goToPage (page: number) {
		this.page = page;
		this.listFragments = this.getListFragment(page, this.numberOfElement);
	}

	nextPage () {
		if (this.page  < this.getPages()[this.getPages().length - 1])
			this.listFragments = this.getListFragment (++this.page, this.numberOfElement)
	}

	previousPage () {
		if (this.page > this.getPages()[0])
			this.listFragments = this.getListFragment (--this.page, this.numberOfElement)
	}

	filter (search: string) {

	this.page = 0;

	if (search) {

		this.saveData = this.data.filter((data: any) => {
		for (const column of this.columns) {
			if (search.toUpperCase().search(data[`${column.name}`].toString().toUpperCase()) != -1){
			
			return true;
			}
		}
		return false;
		});
	} else {
		this.saveData = this.data;
	}


	if (!this.saveData)
		this.saveData = this.data;

		console.log(this.saveData);
		

		this.listFragments = this.getListFragment(this.page, this.numberOfElement);

	}

	sort (column: string) {

		if (this.saveColumn === column)
			this.sens = !this.sens
		else{
			this.sens = true;
			this.saveColumn = column;
		}

		this.page = 0;
		this.saveData = this.data.sort((a: any, b:any) => {
			if (a[`${column}`] > b[`${column}`])

				if (this.sens)
				return 1;
				
				else
				return -1;
			else

				if (!this.sens)
				return 1;
				
				else
				return -1;
			
		});

		this.listFragments = this.getListFragment(this.page, this.numberOfElement);

	}

	refreshList(): void {
		this.listFragments = undefined;
		this.page = 0
	}


	addCourse (id: string) {

	}

	goToCourses (id: string) {
		
	}

	onBlock (id: string) {
		
		this.adminService.blockUser(id, 'Teachers');
		this.data.filter((e: any) => (e.id === id))[0].status = 'inactif';
		
		
	}

	onUnBlock (id: string) {
		if(this.adminService.unBlockUser(id, 'Teachers'))
		this.data.filter((e: any) => (e.id === id))[0].status = 'actif';
		
	}

	getNotifyResponse (event: any) {
		console.log(event);
		this.alertVisible = false;
		return event;
	}

	showNotification (action: string, id: string) {
	}
}
