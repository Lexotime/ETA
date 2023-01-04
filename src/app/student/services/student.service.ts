import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore/';
import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  	constructor(
		public fireStore: AngularFirestore,
		private router: Router
		) { }

	getStudent () {
		let uid = localStorage.getItem("li");
		if (!uid || localStorage.getItem("us") === "a7sdsdn" || localStorage.getItem("us") === "te12sdz")
			this.router.navigate(["/"]);
		
		return this.fireStore.collection("Students", ref => ref.where("uid", "==", uid)).snapshotChanges()
	}

	getCoursesById (idCourse: string) {
		return this.fireStore.collection("Courses", ref => ref.where("id", "==", idCourse)).snapshotChanges();
	}

	getStudentCourses (level: string) {
		return this.fireStore.collection("Courses", ref => ref.where("level", "==", level)).snapshotChanges();
	}

	getCoursesByLevel (level: string) {
		return this.fireStore.collection("Courses", ref => ref.where("level", "==", level)).snapshotChanges()
	}

	getCourseObjectId (id: string) {
		return this.fireStore.collection("Courses", ref => ref.where("id", "==", id)).get();
	}

	getStudentObjectId (id: string) {
		return this.fireStore.collection("Students", ref => ref.where("id", "==", id)).get();
	}

	getCourseTeacher (email: string) {
		return this.fireStore.collection("Teachers", ref => ref.where("email", "==", email)).get();
	}

	getCoursesVideo (idCourse : string[]) {
		return this.fireStore.collection("Videos", ref => ref.where("course", "==", idCourse)).snapshotChanges();
	}


	registerOnCourse (id: string, courses: any) {
		return this.fireStore.collection("Students").doc(id).update({courses: courses})
	}

	getVideo (idV: string) {
		return this.fireStore.collection("Videos", ref => ref.where("id", "==", idV)).snapshotChanges();
	}

	getCourse (idC: string) {
		return this.fireStore.collection("Courses", ref => ref.where("id", "==", idC)).snapshotChanges();
	}
	

}
