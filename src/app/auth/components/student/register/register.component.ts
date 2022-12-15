import { DatabaseService } from './../../../../core/services/database.service';
import { AuthService } from './../../../services/auth.service';
import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
//import {AuthModel} from "../../../core/models/auth.model";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {


    // @ts-ignore
    registerForm: FormGroup;
    
    errorMessage: any;
    // @ts-ignore
    isAuth: boolean = false;

    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private authService: AuthService,
        private dataService : DatabaseService,
        ) 
    {  localStorage.clear()
}

    ngOnInit(): void {
        this.initForm();
    }

    initForm() {
        this.registerForm = this.formBuilder.group(
            {
                login: ['', Validators.required],
                name: ['', Validators.required],
                password: ['', [Validators.required, Validators.pattern(/(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/)]],
                confirmPassword: ['', [Validators.required, Validators.pattern(/(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/)]],
            }
        );
    }

    onSubmit() {
        // @ts-ignore
        const name = this.registerForm.get('name').value;
        // @ts-ignore
        const login = this.registerForm.get('login').value;
        // @ts-ignore
        const password = this.registerForm.get('password').value;
         // @ts-ignore
        const confirmPassword = this.registerForm.get('confirmPassword').value;

        if (password !== confirmPassword) {
            this.errorMessage = "Mot de passe incorrecte"
        } else{
            let response = this.authService.register(login, password);
            response.then((res: any) => {
                if (res){
                    if ( res.uid) {
                        const student = {
                            id: '',
                            uid: res.uid,
                            course: [],
                            name: name,
                            status: 'actif'
                        }
                        this.dataService.createStudent(student).then(res => {
                            
                        }).catch(err => {
                            
                        });
                        console.log(this.dataService.getStudent(res.uid));
                        this.router.navigate(['/connexion']);
                    } else 
                        this.errorMessage = res.message;
                } else 
                    this.errorMessage = "Une erreur c'est produit veuillez ressayer plutard";
            })
        }
    }
}
