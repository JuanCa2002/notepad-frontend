import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { CategoryDTO } from "../../../../../../dtos/categories/category-dto";
import { CategoryApiConstant } from "../../../../../../constants/apis/category-api-constants";

@Injectable({
    providedIn: "root",
})

export class CategoryApiService {

    constructor(private httpClient:HttpClient){}

    public getCategoriesByUser$(userId: number): Observable<CategoryDTO[]>{
        return this.httpClient.get<CategoryDTO[]>(`${CategoryApiConstant.URL_CATEGORY}/user/${userId}`);
    }

    public postCategory$(category: CategoryDTO): Observable<CategoryDTO>{
        return this.httpClient.post<CategoryDTO>(CategoryApiConstant.URL_CATEGORY, category);
    }

    public putCategory$(category: CategoryDTO): Observable<CategoryDTO>{
        return this.httpClient.put<CategoryDTO>(CategoryApiConstant.URL_CATEGORY, category);
    }

    public deleteCategory$(id: number, userId: number): Observable<void>{
        return this.httpClient.delete<void>(`${CategoryApiConstant.URL_CATEGORY}/${id}?userId=${userId}`);
    }
    
}