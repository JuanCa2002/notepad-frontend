import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NoteDTO } from '../../../../../../../dtos/notes/note-dto';
import { NotesApiService } from '../../services/note-api.service';
import { MenuItem, MessageService } from 'primeng/api';
import { CategoryApiService } from '../../../categories-management/services/category-api.service';
import { CategoryDTO } from '../../../../../../../dtos/categories/category-dto';
import { FormBuilder, FormGroup } from '@angular/forms';
import { LoginApiService } from '../../../../../../login/login-page/services/login-api.service';
import { UserDTO } from '../../../../../../../dtos/users/user-dto';

@Component({
  selector: 'app-notes-data-view',
  templateUrl: './notes-data-view.component.html',
  styleUrl: './notes-data-view.component.css'
})
export class NotesDataViewComponent implements OnInit{

  public notes: NoteDTO[] = [];
  public user!: UserDTO;
  public items: MenuItem[] | undefined;
  public activeItem: MenuItem | undefined;
  public selectedNotes: NoteDTO[] = [];
  public categories: CategoryDTO[] = [];
  public formCategoryFilter!: FormGroup;
  @Output() onAction = new EventEmitter<NoteDTO[]>();

  constructor(private noteApiService: NotesApiService, private messageService: MessageService, 
    private categoryApiService: CategoryApiService, private fb: FormBuilder, 
    private loginApiService: LoginApiService
  ){}

  ngOnInit(): void {
    this.items = [
      { label: 'Active Notes', icon: 'pi pi-eye' },
      { label: 'Archived Notes', icon: 'pi pi-shield' }
    ];
    this.activeItem = this.items[0];
    this.user = this.loginApiService.getUser()!;
    this.initializeForm();
    this.getAllNotes();
    this.loadCategories();
  }

  private initializeForm(){
    this.formCategoryFilter = this.fb.group({
      categoryId: [null]
    });
  }

  public getAllNotes(){
    const categoryId = this.formCategoryFilter.get('categoryId')?.value;
    this.noteApiService.getAllNotesByUserAndCategory$(this.user.id!, categoryId).subscribe(data =>{
      this.notes = data;
      this.notes = this.activeItem!.label == 'Active Notes' ? this.notes.filter(n => n.state == 'ACTIVE') : this.notes.filter(n => n.state == 'ARCHIVED');
      this.loadCategories();
    }, error =>{
      this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error.message});
    })
  }

  public onActiveItemChange(event: MenuItem) {
    this.activeItem = event;
    this.getAllNotes();
  }

  private loadCategories(){
    this.categoryApiService.getCategoriesByUser$(this.user.id!).subscribe(data =>{
      this.categories = data;
    }, error =>{
      this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error.message});
    })
  }

  public selectNote(id: number){
    const note = this.notes.find(n => n.id === id);
    note!.isSelect = !note?.isSelect;
    const notesCopy = [...this.notes];
    const selectedNotes = notesCopy.filter(n => n.isSelect == true)
    this.selectedNotes = selectedNotes;
  }
}
