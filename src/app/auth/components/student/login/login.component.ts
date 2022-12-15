import { AuthService } from './../../../services/auth.service';
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
        

        this.authService.login(login, password, role).then((res: any) => {
            this.errorMessage = res.toString();
            console.log(this.errorMessage);
            
        })
    }
}
