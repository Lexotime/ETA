import { Injectable } from '@angular/core';
import { AngularFirestore } from "@angular/fire/compat/firestore/"; 


@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(public firestore: AngularFirestore ) { } 


    //liste des commandes
  getTeachers() {
    let data =  this.firestore.collection("teachers").snapshotChanges();
    return data;
    
  } 

  createTeacher(data: any) {
    return new Promise((resolve, reject) => {
      this.firestore
      .collection("teachers")
      .add(data)
      .then(res => {resolve(res)}, err => reject(err));
    });
  } 


  updateTeacher(data: any) {
    return this.firestore
     .collection("teachers")
     .doc(data.payload.doc.id)
     .set({ livree: true }, { merge: true });
   } 
  
}
