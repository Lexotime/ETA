import { Router } from '@angular/router';
import { AngularFireStorage,AngularFireUploadTask } from '@angular/fire/compat/storage';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';

  import { switchMap } from 'rxjs/operators';
  import emailjs, { EmailJSResponseStatus } from '@emailjs/browser'


  export interface FilesUploadMetadata {
	uploadProgress$: Observable<number> | any;
	downloadUrl$: Observable<string>;
  }
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

	getCoursesVideo (idCourse : string[]) {
		return this.fireStore.collection("Videos", ref => ref.where("course", "==", idCourse)).snapshotChanges();
	}

	getVideo (idV: string) {
		return this.fireStore.collection("Videos", ref => ref.where("id", "==", idV)).snapshotChanges();
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
}
