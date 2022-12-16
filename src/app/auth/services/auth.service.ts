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

    login(email : string, password : string, role: string) : any {
		
        return this.fireAuth.signInWithEmailAndPassword(email,password).then( res => {

            return res.user?.getIdToken().then(token => {

				switch (role) {
					case "Student":

						this.fireStore.collection("Students", ref => ref.where("uid", "==", res.user?.uid)).get().subscribe(
							ss => {
								ss.docs.forEach((doc: any) => {
									let student = doc.data();

									if (student.uid === res.user?.uid){

										localStorage.setItem('login', res.user?.uid ? res.user?.uid : '');
										localStorage.setItem('token', token);

										return this.router.navigate(['/etud']);
									}else 
										return "Vérifiez les informations saisies"
									
								})
							}
						)						
						break;
		
					case "Teacher":
						this.fireStore.collection("Teachers", ref => ref.where("uid", "==", res.user?.uid)).get().subscribe(
							ss => {
								ss.docs.forEach((doc: any) => {
									let student = doc.data();

									if (student.uid === res.user?.uid){

										localStorage.setItem('login', res.user?.uid ? res.user?.uid : '');
										localStorage.setItem('token', token);

										return this.router.navigate(['/en']);
									}else 
										return "Vérifiez les informations saisies"
									
								})
							}
						)	
		
						break;
		
					default:
						return "Saisie incorrecte";
				}
				return "";

            }).catch (err => {
                return  'Veuillez ressayer';
            })
    
        }, err => {
			return  'Veuillez ressayer';
        })
		
    }
    
      // register method
    async register(email : string, password : string)  {
        let response;  
        await this.fireAuth.createUserWithEmailAndPassword(email, password).then( res => {

            response = {uid : res.user?.uid, message: ''};
          
        }, err => {
            if (err.message.search("auth/email-already-in-use"))
                response =  {uid: null, message : "Email déjà utilisé"}
            else
                response =  {uid: null, message :"Une erreur c'est produit veuillez ressayer"}
        })
        
        return response;
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
