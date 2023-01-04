import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';


@Injectable({
  providedIn: 'root'
})
export class ForumService {

    constructor(private fireStore: AngularFirestore, private router: Router) { }


	getUser () {
		let uid = localStorage.getItem("li");
		if (!uid || (localStorage.getItem("us") !== "st7865mt" && localStorage.getItem("us") !== "te12sdz"))
			this.router.navigate(["/"]);

		if (localStorage.getItem("us") === "st7865mt")
			return this.fireStore.collection("Students", ref => ref.where("uid", "==", uid), ).snapshotChanges();
		else if (localStorage.getItem("us") === "te12sdz")
			return this.fireStore.collection("Teachers", ref => ref.where("uid", "==", uid), ).snapshotChanges();
		else 
			this.router.navigate(["/"]);
		return ;
	}

    getMessages (id: string) {
		return this.fireStore.collection("Messages", ref => ref.where("course", "==", id)).snapshotChanges();
    }

	getStudentCourses (level: string) {
		return this.fireStore.collection("Courses", ref => ref.where("level", "==", level)).snapshotChanges();
	}

	getTeacherCourses (idTeacher: string) {
		return this.fireStore.collection("Courses", ref => ref.where("teacher", "==", idTeacher)).snapshotChanges();
	}

	addMessage (message: any) {
		return new Promise ((resolve, reject) => {
			message.id = this.fireStore.createId();
			this.fireStore.collection("Messages").add(message).then(res => {
				resolve(res)
			}, err => {
				reject(err)
			})
		})
	}
}
