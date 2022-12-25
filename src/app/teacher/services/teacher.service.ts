import { Router } from '@angular/router';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TeacherService {

	constructor(public fireStore: AngularFirestore, private fireAuth: AngularFireAuth,
		private router: Router,
		private readonly storage: AngularFireStorage) { 
		
	} 

	updatePassword (code: string, password: string) {
		return this.fireAuth.confirmPasswordReset(code, password)
	}


	getTeacher () {
		let uid = localStorage.getItem("login");
		if (!uid || localStorage.getItem("user") === "admin" || localStorage.getItem("user") === "student")
			this.router.navigate(["/"]);
		
		return this.fireStore.collection("Teachers", ref => ref.where("uid", "==", uid)).snapshotChanges()
	}

	getTeacherCourses (idTeacher: string) {
		return this.fireStore.collection("Courses", ref => ref.where("teacher", "==", idTeacher)).snapshotChanges();
	}

	getAllVideos () {
		return this.fireStore.collection('/Videos').snapshotChanges();
	}

	getItem (id: string, collection: string) {
		return this.fireStore.collection(`/${collection}`, ref => ref.where("id", "==", id)).get();
	}

	getTeacherObjectId (id: string) {
		return this.fireStore.collection("Teachers", ref => ref.where("id", "==", id)).get();
	}
}
