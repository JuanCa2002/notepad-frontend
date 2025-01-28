import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { NoteDTO } from "../../../../../../dtos/notes/note-dto";
import { NoteApiConstants } from "../../../../../../constants/apis/note-api-constants";

@Injectable({
    providedIn: "root",
})

export class NotesApiService {

    constructor(private httpClient:HttpClient){}

    public getAllNotesByUserAndCategory$(userId: number, categoryId?: number): Observable<NoteDTO[]>{
        let params = new HttpParams()
        .set('userId', userId.toString());
      
        if (categoryId && categoryId!=null) {
            params = params.set('categoryId', categoryId.toString());
          }
        return this.httpClient.get<NoteDTO[]>(NoteApiConstants.URL_NOTE, {params})
    }

    public postNote$(note: NoteDTO): Observable<NoteDTO>{
        return this.httpClient.post<NoteDTO>(NoteApiConstants.URL_NOTE, note);
    }

    public putNote$(note: NoteDTO): Observable<NoteDTO>{
        return this.httpClient.put<NoteDTO>(NoteApiConstants.URL_NOTE, note);
    }

    public patchNotesCategory$(ids:string, userId: number, categoryId: number): Observable<NoteDTO[]>{
        return this.httpClient.patch<NoteDTO[]>(`${NoteApiConstants.URL_NOTE}/category?userId=${userId}&categoryId=${categoryId}&ids=${ids}`, null);
    }

    public patchNotesState$(ids:string, userId: number, state: string): Observable<NoteDTO[]>{
        return this.httpClient.patch<NoteDTO[]>(`${NoteApiConstants.URL_NOTE}/state?userId=${userId}&state=${state}&ids=${ids}`, null);
    }

    public deleteNotes$(ids:string, userId: number): Observable<void>{
        return this.httpClient.delete<void>(`${NoteApiConstants.URL_NOTE}?userId=${userId}&ids=${ids}`);
    }
    
}