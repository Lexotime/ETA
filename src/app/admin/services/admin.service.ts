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
  import emailjs, { EmailJSResponseStatus } from '@emailjs/browser'


  export interface FilesUploadMetadata {
	uploadProgress$: Observable<number> | any;
	downloadUrl$: Observable<string>;
  }
@Injectable({
  providedIn: 'root'
})
export class AdminService {

  	constructor(public fireStore: AngularFirestore, private fireAuth: AngularFireAuth, private readonly storage: AngularFireStorage) { 
		
	} 

	chars = "abcdefghijklmnopqrstuvwxyz";
	CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
	num = "123456789";

	

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
					this.sendEmail({password: password,email: email, name: teacher.firstname+" "+teacher.lastname })
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
		console.log("hey");
		
		return new Promise  ((resolve, reject) => {
			this.fireStore.collection("Courses").add({...course, link: '', videos: [], teacherName: ""}).then(res => {
				resolve("Cours créée vec succès")
			}, err =>{ reject ("Une erreur est survenue impossible de continuer l'opération")})
		})
	}

	updateCourseTeacher (idTeacher: string, idCourses: string, teacher: string) {
		return this.fireStore.collection("Courses").doc(idCourses).update({teacher: idTeacher, teacherName: teacher});
	}

	createVideo (video: any, course: string, file: any) {
		video.id = this.fireStore.createId();
		let i = 0;
		return this.fireStore.collection("Courses", ref => ref.where("id", '==', course)).snapshotChanges().subscribe(s => {
			i ++;
			if (i == 1) {
				//@ts-ignore
				let videos:any = s[0].payload.doc.data().videos;
				videos.push(video.id)
				
				this.fireStore.collection("Courses").doc(s[0].payload.doc['id']).update({videos: videos}).then(res => {
					return;
				}, err => {return;});


				this.uploadFileAndGetMetadata('videos', file).downloadUrl$.subscribe(s => {
					new Promise  ((resolve, reject) => {
						
						return this.fireStore.collection("Videos").add({...video, link: s}).then(res => {
							resolve("Vidéo créée vec succès");
						}, err =>{ reject ("Une erreur est survenue impossible de continuer l'opération")})
					})
				});
			}
		})
	}

  
    deleteStudent (student: string) {
      this.fireStore.collection('/Students').doc(student).delete()
    }
  
    blockUser (uid: string, collection: string) {
		let i = 0;
		return this.fireStore.collection(`${collection}`, ref => ref.where("id","==", uid )).snapshotChanges().subscribe(e => {
			i ++;
			if (i === 1)
				this.fireStore.collection(`${collection}`).doc(e[0].payload.doc['id']).update({'status' : 'inactif'}).then(res => {
					return "Utilisateur bloquer";
				}).catch(err => {
					return "Une erreur c'est produite veuillez ressager";
				});
		})
    }

	userStatus (uid: string, collection: string, status: string) {
		return this.fireStore.collection(collection).doc().update({status: status})
	}

	getTeacherId (id: string) {
		return this.fireStore.collection("Teachers", ref => ref.where("id", '==', id)).snapshotChanges()
	}
  
	getStudentId (id: string) {
		return this.fireStore.collection("Students", ref => ref.where("id", '==', id)).snapshotChanges()
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
		return this.fireStore.collection('/Courses').snapshotChanges();
	}

	getCourseId (course: String) {
		return this.fireStore.collection('/Courses', ref => ref.where("id", "==", course)).snapshotChanges();
	}

	addLink(course: string, link: string) {
		return this.fireStore.collection("Courses").doc(course).update({link: link});
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

	getVideoLink (idVideo: string) {
		return this.fireStore.collection("Videos", ref => ref.where("id", "==", idVideo)).snapshotChanges();
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

	public sendEmail(data: any) {
		emailjs.send('etoile-d-afrique-web-app',
					'etoile-afrique-send-pass',
					data,
					'BCidLL6hrWDmpzwyN'
					)
		  .then((result: EmailJSResponseStatus) => {
			console.log(result.text);
		  }, (error: any) => {
			console.log(error.text);
		  });
	  }

}
