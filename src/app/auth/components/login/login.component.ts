import { AuthService } from '../../services/auth.service';
import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
//import {AuthModel} from "../../../core/models/auth.model";
import {Router} from "@angular/router";
import { LocalStorageService } from 'src/app/core/services/local-storage.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})


export class LoginComponent {


    loginForm!: FormGroup;
    
    errorMessage: any;
    isAuth: boolean = false;
    

    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private authService: AuthService) 
    {  localStorage.clear()
}

    ngOnInit(): void {
        this.initForm();
    }

    initForm() {
        this.loginForm = this.formBuilder.group(
            {
                login: ['', Validators.required],
                password: ['', [Validators.required, Validators.pattern(/(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/)]],
                role: ['Student', Validators.required]
            }
        );
    }

    onSubmit() {
        // @ts-ignore
        const login = this.loginForm.get('login').value;
        // @ts-ignore
        const password = this.loginForm.get('password').value;

        // @ts-ignore
        const role = this.loginForm.get('role').value;
        

        this.authService.login(login, password).then((res : any)=> {

            
           if (role === "Student"){
                this.authService.getUser(res.user?.uid,  "Students").subscribe(s => {
                    let user = null
                    s.docs.forEach(ss => {
                        user = ss.data();
                    })
                    if (user) {
                        localStorage.setItem('li', res.user?.uid ? res.user?.uid : '');
                        localStorage.setItem('us', 'st7865mt')

                        this.router.navigate(["/etud/accueil"]);
                    } else {
                        this.errorMessage = "Email ou mot de passe incorrect"
                    }
                })
                

            } else if (role === "Teacher") {
                this.authService.getUser(res.user?.uid,  "Teachers").subscribe(s => {
                    let user = null
                    s.docs.forEach(ss => {
                        user = ss.data();
                    })
                    if (user) {
                        localStorage.setItem('li', res.user?.uid ? res.user?.uid : '');
                        localStorage.setItem('us', 'te12sdz')
                        this.router.navigate(["/en/accueil"]);
                    } else {
                        this.errorMessage = "Email ou mot de passe incorrect"
                    }
                })
            } else {
                this.errorMessage = "Email ou mot de passe incorrect"
            }
        }).catch((err: any) => {
            this.errorMessage = "Email ou mot de passe incorrect"
        });
    }
}
