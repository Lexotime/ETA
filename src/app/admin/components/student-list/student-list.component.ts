import { AdminService } from './../../services/admin.service';
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})
export class StudentListComponent {

	data: any = [];
	columns: any = [
		{name: 'firstname', value: 'prénom'},
		{name: 'lastname', value: 'nom'},
		{name: 'email', value: 'email'},
		{name: 'level', value: 'niveau'},
		{name: 'status', value: 'status'},
		{name: 'provenance', value: 'provenance'},
		{name: 'recommand', value: 'recommandation'},
	];

	listFragments: any;
	saveData: any;
	sens: boolean = false;
	saveColumn: string = '';
	currentEmit: string = '1';
	message: any;

	page: number = 0;
	numberOfElement: number = 20;

	constructor (private adminService: AdminService) {}

	ngOnInit () {
		this.adminService.getAllStudents().subscribe( s => {
			this.data = [];
			s.forEach(ss => {
				this.data.push(ss.payload.doc.data());
			})
			
			this.saveData = this.data;
			this.listFragments = this.getListFragment(this.page, this.numberOfElement);
		})
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

	onBlock (id: string) {
		this.adminService.getStudentId(id).subscribe(s => {
			let uid: string = "";
			s.forEach(ss => {
				uid = ss.id;
			});
			this.adminService.userStatus(uid, 'Students', "inactif").then(res => {
				
			}).catch(err => {
				
			})
		})
	}

	onUnBlock (id: string) {
		this.adminService.getStudentId(id).subscribe(s => {
			let uid: string = "";
			s.forEach(ss => {
				uid = ss.id
			});
			this.adminService.userStatus(uid, 'Students', "actif").then(res => {
				
			}).catch(err => {
				
			})
		})
	}

}
