import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
//import {AuthModel} from "../../../core/models/auth.model";
import {Router} from "@angular/router";
import { LocalStorageService } from 'src/app/core/services/local-storage.service';


@Component({
  selector: 'app-teacher-auth',
  templateUrl: './teacher-auth.component.html',
  styleUrls: ['./teacher-auth.component.css']
})
export class TeacherAuthComponent {


    // @ts-ignore
    loginForm: FormGroup;
    
    errorMessage: any;
    // @ts-ignore
    isAuth: boolean = false;

    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private storage: LocalStorageService ) 
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
            }
        );
    }

    onSubmit() {
        // @ts-ignore
        const login = this.loginForm.get('login').value;
        // @ts-ignore
        const password = this.loginForm.get('password').value;

        this.storage.setLocalData('login', login);
        this.storage.setLocalData('user', 'teacher');
        
        this.router.navigateByUrl('/en/cours');
        //const auth: AuthModel = {
        //    login: login,
        //    password: password
        //}
        // @ts-ignore
        
    }
}
