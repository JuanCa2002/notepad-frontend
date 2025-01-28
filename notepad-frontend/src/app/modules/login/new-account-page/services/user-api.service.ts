import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { UserDTO } from "../../../../dtos/users/user-dto";
import { Observable } from "rxjs";
import { UserApiConstants } from "../../../../constants/apis/user-api.constants";

@Injectable({
    providedIn: "root",
})

export class UserApiService {

    constructor(private httpClient:HttpClient){}

    public postUser$(user: UserDTO) : Observable<UserDTO>{
        return this.httpClient.post<UserDTO>(UserApiConstants.URL_USER, user);
    }

    public putUser$(user: UserDTO) : Observable<UserDTO>{
        return this.httpClient.put<UserDTO>(UserApiConstants.URL_USER, user);
    }

    public patchSetPassword$(id: number, currentPassword: string, newPassword: string) : Observable<UserDTO>{
        return this.httpClient.patch<UserDTO>(`${UserApiConstants.URL_USER}/set-password?id=${id}&currentPassword=${currentPassword}&newPassword=${newPassword}`, null);
    }

    public patchState$(id: number) : Observable<UserDTO>{
        return this.httpClient.patch<UserDTO>(`${UserApiConstants.URL_USER}/${id}`, null);
    }






}