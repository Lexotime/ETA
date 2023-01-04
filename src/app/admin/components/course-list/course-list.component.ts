import { ActivatedRoute } from '@angular/router';
import { AdminService } from './../../services/admin.service';
import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-course-list-admin',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.css']
})
export class CourseListComponent {

	data: any = [];
	columns: any = [
		{name: 'name', value: 'Libellé'},
		{name: 'day', value: 'Jour'},
		{name: 'hours', value: 'Heure'},
		{name: 'level', value: 'Niveau'},
		{name: 'link', value: 'lien'},
	];

	@ViewChild("lien") link!: ElementRef;


	listFragments: any;
	message!: string;
	saveData: any;
	sens: boolean = false;
	saveColumn: string = '';
	currentEmit: string = '1';

	page: number = 0;
	numberOfElement: number = 20;

	idParams !: string;
	teacher!: string;

	currentData!: string ;

	constructor (private adminService: AdminService, private route: ActivatedRoute) {
		
	}

	ngOnInit () {

		this.adminService.getAllCourses().subscribe( s => {
			this.data = []
			s.forEach(ss => {
				this.data.push(ss.payload.doc.data());
			});
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

	addingLink!: boolean;

	addLink(link: string) {
		if (link === "") {
			this.message = "Veuillez saisir le lien";
			return;
		}

		this.adminService.addLink(this.currentData, link).then( res => {
			
		}).catch(err => {

		})
		this.addingLink = false;
	}

	generateLink (data: string) {
		this.adminService.getCourseId(data).subscribe(s => {
			s.forEach(ss => {
				this.currentData = ss.payload.doc['id'];
			})
		})
		this.addingLink = true;
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
}
