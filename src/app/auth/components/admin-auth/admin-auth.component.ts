import { AuthService } from './../../services/auth.service';
import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
//import {AuthModel} from "../../../core/models/auth.model";
import {Router} from "@angular/router";
import { LocalStorageService } from 'src/app/core/services/local-storage.service';

@Component({
  selector: 'app-admin-auth',
  templateUrl: './admin-auth.component.html',
  styleUrls: ['./admin-auth.component.css']
})
export class AdminAuthComponent {

   // @ts-ignore
   loginForm: FormGroup;
    
   errorMessage: any;
   // @ts-ignore
   isAuth: boolean = false;

   isLoading: boolean = false;

   constructor(
       private formBuilder: FormBuilder,
       private router: Router,
       private authService: AuthService
       ) 
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
        this.isLoading = true;
       // @ts-ignore
       const login = this.loginForm.get('login').value;
       // @ts-ignore
       const password = this.loginForm.get('password').value;

       this.authService.searchAdmin(login).subscribe(e => {
            let search: any = null;
            e.forEach(ee => {
                search = ee.data();
            })
            if (search)
                this.authService.adminLogin(login, password).then(res => {
                    
                    localStorage.setItem('li', res.user?.uid ? res.user?.uid : '');
                    localStorage.setItem('us', 'a7sdsdn');
                    
                    this.isLoading = false;
                    this.router.navigateByUrl('/admin/cours');

                }, err => {
                    this.isLoading = false;
                    this.errorMessage = "Login ou mot de passe incorrect"
                })
            else {
                this.errorMessage = "Login ou mot de passe incorrect"
                this.isLoading = false;
            }
       })       
   }
}
