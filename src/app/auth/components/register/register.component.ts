import { environment } from './../../../environments/environment';
import { DatabaseService } from './../../../core/services/database.service';
import { AuthService } from './../../services/auth.service';
import { Component } from '@angular/core';
import {EmailValidator, FormBuilder, FormGroup, Validators} from "@angular/forms";
//import {AuthModel} from "../../../core/models/auth.model";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

    level: {name: string, value: string, option: any[]}[] = environment.level
	

    // @ts-ignore
    registerForm: FormGroup;
    
    errorMessage: any;
    // @ts-ignore
    isAuth: boolean = false;
    isLoading: boolean = false;
    message!: string;

    isSign: boolean = false;

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
                firstname: ['', Validators.required],
                lastname: ['', Validators.required],
                level: ['CI', Validators.required],
                option: [, Validators.required],
                password: ['', [Validators.required, Validators.pattern(/(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/)]],
                confirmPassword: ['', [Validators.required, Validators.pattern(/(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/)]],
                provenance: ['', Validators.required],
                recommand: ['', Validators.required],
            }
        );
    }

    getOption () {
        return this.level.filter((l) => (l.value == this.registerForm.get('level')?.value))[0].option;
    }

    onSubmit() {
        this.isLoading = true;
        // @ts-ignore
        const firstname = this.registerForm.get('firstname').value;
        // @ts-ignore
        const lastname = this.registerForm.get('lastname').value;
        // @ts-ignore
        const login = this.registerForm.get('login').value;
        // @ts-ignore
        const password = this.registerForm.get('password').value;
         // @ts-ignore
        const confirmPassword = this.registerForm.get('confirmPassword').value;

        if (password !== confirmPassword) {
            this.errorMessage = "Mot de passe incorrecte"
        } else{
            this.authService.register(login, password).then(res => {
                const student = {
                    id: '',
                    uid: res.user?.uid,
                    courses: [],
                    firstname: firstname,
                    lastname: lastname,
                    email: login,
                    status: 'inactif',
                    provenance: this.registerForm.get('provenance')?.value,
                    recommand: this.registerForm.get('recommand')?.value
                }
                this.dataService.createStudent(student).then((res: any) => {
                    this.message = "Inscription réussi";
                    this.isSign = true;
                    this.isLoading = false;

                }).catch((err: any) => {

                    this.errorMessage = "Une erreur c'est produit veuillez ressayer plutard";
                    this.isLoading = false;
                });

            }, err => {
                    
                this.isLoading = false;
                this.errorMessage = "Une erreur c'est produit veuillez ressayer plutard";

            })
        }
    }
}
