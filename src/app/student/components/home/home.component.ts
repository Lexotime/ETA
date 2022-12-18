import { ActivatedRoute } from '@angular/router';
import { StudentService } from './../../services/student.service';
import { Component, OnInit } from "@angular/core";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

	constructor( private studentService: StudentService, private router: ActivatedRoute) {}

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

	coursesList: string[] = [
		'Mathématique',
		'Physique Chimie',
		'Science de la vie et de la terre',
		'Philosophie',
		'Informatique',
		'Littérature',
		'Histoire',
		'Géographie',
		'Économie social',
		'Allemand',
		'Français',
		'Anglais',
		'Espagnol',
		'Arabe',
		'Espagnol',
		'Autre',
	]

	ngOnInit(): void {
		this.studentService.getStudent().subscribe(s => {
			s.forEach(ss => {
				this.student = ss.payload.doc.data();
			})
		})

		this.router.params.subscribe(s => {
			if (s['id'])
				this.currentLink = s['id']
			else
				this.currentLink = "CI";

			this.getCourses();
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
