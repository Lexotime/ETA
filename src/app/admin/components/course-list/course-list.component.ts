import { filter } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { AdminService } from './../../services/admin.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-course-list-admin',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.css']
})
export class CourseListComponent {

	data: any = [];
	columns: any = [
		{name: 'name', value: 'Libelé'},
		{name: 'teacher', value: 'Enseignant'},
		{name: 'day', value: 'Jour'},
		{name: 'hours', value: 'Heure'},
		{name: 'level', value: 'Niveau'},
		{name: 'language', value: 'Langue'},
		{name: 'link', value: 'lien'},
	];


	listFragments: any;
	saveData: any;
	sens: boolean = false;
	saveColumn: string = '';
	currentEmit: string = '1';

	page: number = 0;
	numberOfElement: number = 20;

	idParams !: string;
	teacher!: string;

	constructor (private adminService: AdminService, private route: ActivatedRoute) {
		
	}

	ngOnInit () {

		this.adminService.getAllCourses().subscribe( s => {
			s.docs.forEach(ss => {
				this.data.push(ss.data());
			})
			let id = this.route.snapshot.params['id'];
			if (!id) {
				this.saveData = this.data;
				this.listFragments = this.getListFragment(this.page, this.numberOfElement);
			} else {
				this.adminService.getItem(id, 'Teachers').subscribe((s: any) => {

					this.teacher = s.docs[0].data().email;
					this.saveData = this.data.filter((d: any) => (d.teacher === this.teacher));
					this.listFragments = this.getListFragment(this.page, this.numberOfElement);
				})
				
			}
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
}
