import { Observable } from 'rxjs';
import { CourseModel } from './../../core/models/course.model';
import { TeacherModel } from 'src/app/core/models/teacher.model';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Injectable } from '@angular/core';
import { AngularFirestore } from "@angular/fire/compat/firestore/"; 
@Injectable({
  providedIn: 'root'
})
export class AdminService {

  	constructor(public fireStore: AngularFirestore, private fireAuth: AngularFireAuth ) { 
		// this.teachers = this.getAllTeachers();
		// this.courses = this.getAllCourses();
		// this.students = this.getAllStudents();
		// this.videos = this.getAllVideos();
	} 

	chars = "abcdefghijklmnopqrstuvwxyz";
	CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
	num = "123456789";

	teachers!: Observable<any[]>;
	courses!: Observable<any[]>;
	students!: Observable<any[]>;
	videos!: Observable<any[]>;

	passwordLength = 3;

	generatePassword (chars: string, passwordLength: number) : string {
		let password: string = "";

		for (let i = 0; i <= passwordLength; i++) {
			let randomNumber = Math.floor(Math.random() * this.chars.length);
			password += chars.substring(randomNumber, randomNumber +1);
		}
		
		return password;
	}

    //liste des commandes
    createTeacher (teacher: TeacherModel, email: string) : any {
		teacher.id = this.fireStore.createId();
		teacher.courses = [];
		console.log(teacher);

		const password = this.generatePassword(this.CHARS, 1) + this.generatePassword(this.chars, 4) + "@" + this.generatePassword("123456789", 2)
		console.log(password);
		
		return this.fireAuth.createUserWithEmailAndPassword(email, password).then( res => {
			if (res.user?.uid) {
			teacher.uid = res.user?.uid;
			return new Promise((resolve, reject) => {
				this.fireStore
				.collection("Teachers")
				.add(teacher)
				.then(res => {
				resolve(res)
				}, err => reject(err))
			})
			}
			else
			return "Une erreur c'est produite";
		})
    }

	createCourse (course: any)  {
		course.id = this.fireStore.createId();

		return this.fireStore.collection("Teachers", ref => ref.where("email", '==', course.teacher)).get().subscribe(s => {
			//@ts-ignore
			let courses:any = s.docs[0].data().courses;
			
			this.fireStore.collection("Teachers", ref => ref.where("email", '==', course.teacher)).doc().set({courses: courses});
			this.fireStore.collection("Courses").add(course).then(res => {
				return "Cours créée vec succès"
			}, err =>{ return "Une erreur est survenue impossible de continuer l'opération"})
		})
		
	}

	createVideo (video: any, course: string) {

	}

  
    deleteStudent (student: string) {
      this.fireStore.collection('/Students').doc(student).delete()
    }
  
    blockUser (uid: string, collection: string) {
		console.log("hey");
		this.fireStore.collection(`${collection}`).valueChanges({ id: uid}).forEach(e => {
			console.log(e);
			
		})
      	// this.fireStore.collection(`${collection}`).doc().set({'status' : 'inactif'}).then(res => {
		// 	console.log(res+"humm");
		// }).catch(err => {
		// 	console.log(err);
		// });
    }
  
  
	getAllTeachers () {
		// let teachers: any = [];
		// this.fireStore.collection('/Teachers').get().subscribe( s => {
		// 	s.docs.forEach(ss => {
		// 		teachers.push(ss.data());
		// 	})
		// })
		return this.fireStore.collection('/Teachers').get()
	
	}

	getAllStudents () {
		// let videos: any = [];
		//  this.fireStore.collection('/Students').get().subscribe( s => {
		// 	s.docs.forEach(ss => {
		// 		videos.push(ss.data());
		// 	})
		// })
		return this.fireStore.collection('/Students').get();
	}
	
	getAllCourses () {
		// let videos: any = [];
		//  this.fireStore.collection('/Courses').get().subscribe( s => {
		// 	s.docs.forEach(ss => {
		// 		videos.push(ss.data());
		// 	})
		// })
		return this.fireStore.collection('/Courses').get();
	}

	getAllVideos () {
		// let videos: any = [];
		//  this.fireStore.collection('/Videos').get().subscribe( s => {
		// 	s.docs.forEach(ss => {
		// 		videos.push(ss.data());
		// 	})
		// })
		return this.fireStore.collection('/Videos').get();
	}

	getItem (id: string, collection: string) {
		return this.fireStore.collection(`/${collection}`, ref => ref.where("id", "==", id)).get();
	}

	addCourseVideos () {
		
	}


	deleteVideo () {

	}

	deleteCourse () {

	}

}
