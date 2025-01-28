import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { UserDTO } from "../../../../dtos/users/user-dto";
import { UserApiConstants } from "../../../../constants/apis/user-api.constants";
import { LoginRouterConstants } from "../../../../constants/routers/login/login-router-constants";
import { Router } from "@angular/router";

@Injectable({
    providedIn: "root",
})

export class LoginApiService {

    constructor(private httpClient:HttpClient, private router: Router){}

    public getUserByCredentials$(email: string, password: string) : Observable<UserDTO>{
        return this.httpClient.get<UserDTO>(`${UserApiConstants.URL_USER}/authentication?email=${email}&password=${password}`);
    }

    public getUser(): UserDTO | null {
        const userData = localStorage.getItem('user');
        if (userData) {
          return JSON.parse(userData) as UserDTO; 
        }
        return null;
    }

    public signOut(){
        localStorage.removeItem('user'); 
        this.router.navigate(['/'+LoginRouterConstants.LOGIN_ROUTER]);
    }

}