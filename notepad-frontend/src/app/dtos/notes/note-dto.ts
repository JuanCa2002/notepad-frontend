import { CategoryDTO } from "../categories/category-dto";

export class NoteDTO {
    public id?: number;
    public title?: string;
    public text?: string;
    public creationDate?: string;
    public creationTime?: string;
    public state?: string;
    public userId?: number;
    public isSelect: boolean = false;
    public category?: CategoryDTO;
}