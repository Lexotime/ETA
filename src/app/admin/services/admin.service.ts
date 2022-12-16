import { Observable, from } from 'rxjs';
import { TeacherModel } from 'src/app/core/models/teacher.model';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Injectable } from '@angular/core';
import { AngularFirestore } from "@angular/fire/compat/firestore/"; 
import {
	AngularFireStorage,
	AngularFireUploadTask,
  } from '@angular/fire/compat/storage';
  import { switchMap } from 'rxjs/operators';


  export interface FilesUploadMetadata {
	uploadProgress$: Observable<number> | any;
	downloadUrl$: Observable<string>;
  }
@Injectable({
  providedIn: 'root'
})
export class AdminService {

  	constructor(public fireStore: AngularFirestore, private fireAuth: AngularFireAuth, private readonly storage: AngularFireStorage) { 
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
			password += chars.substring(randomNumber, randomNumber +1) + '';
		}
		
		return password;
	}

    //liste des commandes
    createTeacher (teacher: TeacherModel, email: string) : any {
		teacher.id = this.fireStore.createId();
		teacher.courses = [];
		console.log(teacher);

		const password = this.generatePassword(this.CHARS, 1) + this.generatePassword(this.chars, 4) + "@" + this.generatePassword(this.num, 2)
		console.log(password);
		
		return this.fireAuth.createUserWithEmailAndPassword(email, password).then( res => {
			if (res.user?.uid) {
			teacher.uid = res.user?.uid;
			return new Promise((resolve, reject) => {
				this.fireStore
				.collection("Teachers")
				.add({...teacher, status: 'actif'})
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
		let i = 0;
		return this.fireStore.collection("Teachers", ref => ref.where("email", '==', course.teacher)).snapshotChanges().subscribe(s => {
			i ++;
			if (i == 1) {
				//@ts-ignore
				let courses:any = s[0].payload.doc.data().courses;
				courses.push(course.id)
				console.log(courses);
				
				this.fireStore.collection("Teachers").doc(s[0].payload.doc['id']).update({courses: courses}).then(res => {
					return;
				}, err => {return;});
				
				new Promise  ((resolve, reject) => {
					this.fireStore.collection("Courses").add({...course, link: '', videos: []}).then(res => {
						resolve("Cours créée vec succès")
					}, err =>{ reject ("Une erreur est survenue impossible de continuer l'opération")})
				})
			}
		})
	}

	createVideo (video: any, course: string) {
		video.id = this.fireStore.createId();
		let i = 0;
		return this.fireStore.collection("Courses", ref => ref.where("id", '==', course)).snapshotChanges().subscribe(s => {
			i ++;
			if (i == 1) {
				//@ts-ignore
				let videos:any = s[0].payload.doc.data().videos;
				videos.push(video.id)
				console.log(videos);
				
				this.fireStore.collection("Courses").doc(s[0].payload.doc['id']).update({videos: videos}).then(res => {
					return;
				}, err => {return;});
				
				new Promise  ((resolve, reject) => {
					this.fireStore.collection("Videos").add({...video, link: ''}).then(res => {
						resolve("Vidéo créée vec succès")
					}, err =>{ reject ("Une erreur est survenue impossible de continuer l'opération")})
				})
			}
		})
	}

  
    deleteStudent (student: string) {
      this.fireStore.collection('/Students').doc(student).delete()
    }
  
    blockUser (uid: string, collection: string) {
		return this.fireStore.collection(`${collection}`, ref => ref.where("id","==", uid )).snapshotChanges().subscribe(e => {
			
			this.fireStore.collection(`${collection}`).doc(e[0].payload.doc['id']).update({'status' : 'inactif'}).then(res => {
				return "Utilisateur bloquer";
			}).catch(err => {
				return "Une erreur c'est produite veuillez ressager";
			});
		})
    }

	unBlockUser (uid: string, collection: string) {
		return this.fireStore.collection(`${collection}`, ref => ref.where("id","==", uid )).snapshotChanges().subscribe(e => {
			
			return this.fireStore.collection(`${collection}`).doc(e[0].payload.doc['id']).update({'status' : 'actif'}).then(res => {
				return "Utilisateur débloquer";
			}).catch(err => {
				return "Une erreur c'est produite veuillez ressager";
			});
		})
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

	uploadFileAndGetMetadata(
		mediaFolderPath: string,
		fileToUpload: File,
	): FilesUploadMetadata {
			const { name } = fileToUpload;
			const filePath = `${mediaFolderPath}/${new Date().getTime()}_${name}`;
			const uploadTask: AngularFireUploadTask = this.storage.upload(
			filePath,
			fileToUpload,
		);
		return {
			uploadProgress$: uploadTask.percentageChanges() ? uploadTask.percentageChanges() : 0 ,
			downloadUrl$: this.getDownloadUrl$(uploadTask, filePath),
		};
	}
	
	private getDownloadUrl$(
		uploadTask: AngularFireUploadTask,
		path: string,
	): Observable<string> {
		return from(uploadTask).pipe(
			switchMap((_) => this.storage.ref(path).getDownloadURL()),
		);
	}

	addCourseVideos () {
		
	}


	deleteVideo () {

	}

	deleteCourse () {

	}

}
