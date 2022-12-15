import { TeacherModel } from 'src/app/core/models/teacher.model';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  	constructor(private fireStore: AngularFirestore, private fireAuth: AngularFireAuth) { }
  
	createStudent (student: any) {
		student.id = this.fireStore.createId();
		return new Promise((resolve, reject) => {
			this.fireStore
			.collection("Students")
			.add(student)
			.then(res => {resolve(res)}, err => reject(err));
		  });
	}

	

	getStudent (uid: string) : any {

		return  this.fireStore.collection('/Students', ref => ref.where("uid", "==", uid)).snapshotChanges()
	}

	getAllStudent () : any {
		return this.fireStore.collection('Students').snapshotChanges();
		
	}
}
