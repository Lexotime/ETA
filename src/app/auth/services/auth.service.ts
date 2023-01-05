import { filter } from 'rxjs';
import { AngularFirestore } from '@angular/fire/compat/firestore/';
import { DatabaseService } from './../../core/services/database.service';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AuthModel } from 'src/app/core/models/auth.model';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    constructor(private fireAuth: AngularFireAuth, private router : Router, private dataService: DatabaseService, private fireStore: AngularFirestore) { 


    }

    private token!: string;

    getToken (): string {
        return this.token;
    }

    getUserId (): string {
       return '';
    }

    setToken (token: string) {
        this.token = token;
        console.log(this.token)
    }
    
    adminLogin (email : string, password : string) {
        return this.fireAuth.signInWithEmailAndPassword (email, password);
    }

    searchAdmin (email: string) {
        return this.fireStore.collection("Admins", ref => ref.where("email", "==", email)).get();
    }

    getUser(uid: string, collection: string) {
        return this.fireStore.collection(collection, ref => ref.where("uid", "==", uid)).get()				
    }


    login(email : string, password : string) : any {
		
        return this.fireAuth.signInWithEmailAndPassword(email,password)
    }
    
      // register method
    // async register(email : string, password : string)  {
    //     let response;  
    //     await this.fireAuth.createUserWithEmailAndPassword(email, password).then( res => {

    //         response = {uid : res.user?.uid, message: ''};
          
    //     }, err => {
    //         if (err.message.search("auth/email-already-in-use"))
    //             response =  {uid: null, message : "Email déjà utilisé"}
    //         else
    //             response =  {uid: null, message :"Une erreur c'est produit veuillez ressayer"}
    //     })
        
    //     return response;
    // }

    register(email : string, password : string)  {
        return  this.fireAuth.createUserWithEmailAndPassword(email, password)
    }
    
	// sign out
	logout() {
		this.fireAuth.signOut().then( () => {
			localStorage.removeItem('token');
			this.router.navigate(['/connexion']);
		}, err => {
			alert(err.message);
		})
	}

	// forgot password
	forgotPassword(email : string) {
		this.fireAuth.sendPasswordResetEmail(email).then(() => {
			this.router.navigate(['/varify-email']);
			}, err => {
			alert('Something went wrong');
		})
	}
    
    //   // email varification
    //   sendEmailForVarification(user : any) {
    //     console.log(user);
    //     user.sendEmailVerification().then((res : any) => {
    //       this.router.navigate(['/varify-email']);
    //     }, (err : any) => {
    //       alert('Something went wrong. Not able to send mail to your email.')
    //     })
    //   }
    
    //   //sign in with google
    //   googleSignIn() {
    //     return this.fireAuth.signInWithPopup(new GoogleAuthProvider).then(res => {
    
    //       this.router.navigate(['/dashboard']);
    //       localStorage.setItem('token',JSON.stringify(res.user?.uid));
    
    //     }, err => {
    //       alert(err.message);
    //     })
    //   }

}
