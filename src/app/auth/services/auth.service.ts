import { Injectable } from '@angular/core';
import { AuthModel } from 'src/app/core/models/auth.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  private token!: string;
    private userId!: string;

    getToken (): string {
        return this.token;
    }

    getUserId (): string {
        return this.userId;
    }

    setToken (token: string) {
        this.token = token;
        console.log(this.token)
    }


	onLogin (auth: AuthModel) {
        console.log(auth);
		
    }
}
