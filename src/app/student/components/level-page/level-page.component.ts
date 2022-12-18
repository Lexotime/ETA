import { StudentService } from './../../services/student.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-level-page',
  templateUrl: './level-page.component.html',
  styleUrls: ['./level-page.component.css']
})
export class LevelPageComponent implements OnInit {

	currentLink: string = "CI";
	courses: any = [];
	student: any;
	message: string = "";

	levelLink: {name: string, value: string}[] = [
		{name: 'CI', value: 'CI'},
		{name: 'CP', value: 'CP'},
		{name: 'CE1', value: 'CE1'},
		{name: 'CE2', value: 'CE2'},
		{name: 'CM1', value: 'CM1'},
		{name: 'CM2', value: 'CM2'},
		{name: '6e', value: '6e'},
		{name: '5e', value: '5e'},
		{name: '4e', value: '4e'},
		{name: '3e', value: '3e'},
		{name: 'Second', value: 'Second'},
		{name: 'Première', value: 'Première'},
		{name: 'Terminale', value: 'Terminale'},
	]

	constructor( private studentService: StudentService) {}

	ngOnInit(): void {
		this.currentLink = "CI";
		this.getCourses();

		this.studentService.getStudent().subscribe(s => {
			s.forEach(ss => {
				this.student = ss.payload.doc.data();
			})
			console.log(this.student);
			
		})
	}

	getCourses () {
		this.studentService.getCoursesByLevel(this.currentLink).subscribe( s => {
			this.courses = []
			s.forEach(ss => {
				this.courses.push(ss.payload.doc.data());
			})
			
			let tmp = this.courses.reduce((r: any, o: any) => {
				r[o.name] = r[o.name] || []
				r[o.name].push(o)
				return r;
			},
				Object.create(null)			
			);
			let result: any = [];
            Object.keys(tmp).forEach(k => {
                result.push(
                    tmp[k].map((v: any) => ({name: k, data: v}))
                );
            })
			this.courses = result;	
			console.log(this.courses);

		})
	}

	register (id: string) {
		let studentCourses = this.student.courses;
		studentCourses.push(id);
		let objectId: string;
		console.log(studentCourses);
		
		this.studentService.getStudentObjectId(this.student.id).forEach(e => {
			e.forEach( ee => {
				objectId = ee.id;
			})
			
		}).then(res => {
			this.studentService.registerOnCourse(objectId, studentCourses).then(res => {
				this.message = "";

			}, err => {
				this.message = "";

			})
		}, err => {
			this.message = "";
			console.log("errrr");

		})
	}


	onChangeLink (link: string) {
		if (this.levelLink.filter((l: any) => (l.name === link))[0])
			this.currentLink = this.levelLink.filter((l: any) => (l.name === link))[0].value;

		this.getCourses();
	}

	getEvent(event: any) {
		this.register(event);
	}
}
