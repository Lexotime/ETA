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

    level: {name: string, value: string, option: any[]}[] = [
		{name: 'CI', value: 'CI', option: ['néan']},
		{name: 'CP', value: 'CP', option: ['néan']},
		{name: 'CE1', value: 'CE1', option: ['néan']},
		{name: 'CE1', value: 'CE1', option: ['néan']},
		{name: 'CM1', value: 'CM1', option: ['néan']},
		{name: 'CM2', value: 'CM2', option: ['néan']},
		{name: '6e', value: '6éme', option: ['néan']},
		{name: '5e', value: '5éme', option: ['néan']},
		{name: '4e', value: '4éme', option: ['néan']},
		{name: '3e', value: '3éme', option: ['néan']},
		{name: 'Second', value: 'Second', option: ['L', 'S']},
		{name: 'Première', value: 'Première', option: ['L', 'S']},
		{name: 'Terminale', value: 'Terminale', option: ['L', 'S']},
	]
	
	option = [
		{name: 'néan', value: 'none'},
		{name: 'L', value: 'L'},
		{name: 'S', value: 'S'},
	]

    // @ts-ignore
    registerForm: FormGroup;
    
    errorMessage: any;
    // @ts-ignore
    isAuth: boolean = false;

    message!: string;

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
                            courses: [],
                            name: name,
                            email: login,
                            status: 'actif',
                            provenance: this.registerForm.get('provenance')?.value,
                            recommand: this.registerForm.get('recommand')?.value
                        }
                        this.dataService.createStudent(student).then((res: any) => {
                            this.message = ""
                        }).catch((err: any) => {
                            
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
