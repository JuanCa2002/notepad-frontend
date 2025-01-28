import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NoteDTO } from '../../../../../../../dtos/notes/note-dto';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { NotesApiService } from '../../services/note-api.service';
import { CategoryDTO } from '../../../../../../../dtos/categories/category-dto';
import { CategoryApiService } from '../../../categories-management/services/category-api.service';
import { NoteStateConstants } from '../../../../../../../constants/enums/note-state-constants';
import { GeneralMessagesConstants } from '../../../../../../../constants/messages/general-messages-constants';
import { NoteMessagesConstants } from '../../../../../../../constants/messages/note-messages.constants';
import { UserDTO } from '../../../../../../../dtos/users/user-dto';
import { LoginApiService } from '../../../../../../login/login-page/services/login-api.service';

@Component({
  selector: 'app-notes-dialog-create',
  templateUrl: './notes-dialog-create.component.html',
  styleUrl: './notes-dialog-create.component.css'
})
export class NotesDialogCreateComponent implements OnInit{
    public showModalNew: boolean = false;
    public justRead: boolean = false;
    public states: any[] = [];
    public categories: CategoryDTO[] = [];
    public currentNote: NoteDTO | null = null;
    public selectedNoteIdUpdate: number = 0;
    public isUpdate: boolean = false;
    public user!: UserDTO;
    public formCreateNote!: FormGroup;
    @Output() onReset = new EventEmitter();

    constructor(private fb: FormBuilder, private confirmationService: ConfirmationService,
      private noteApiService: NotesApiService, private messageService: MessageService,
      private categoryApiService: CategoryApiService, private loginApiService: LoginApiService
    ){}
  
    ngOnInit(): void {
      this.user = this.loginApiService.getUser()!;
      this.initializeForm();
      this.loadCategories();
      this.states = [
        {value: NoteStateConstants.ACTIVE, label: 'Active'},
        {value: NoteStateConstants.ARCHIVED, label: 'Archived'},
      ]
    }

    private loadCategories(){
      this.categoryApiService.getCategoriesByUser$(this.user.id!).subscribe(data =>{
        this.categories = data;
      }, error =>{
        this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error.message});
      })
    }
  
    private initializeForm(){
      this.formCreateNote = this.fb.group({
        title: [{value: null, disabled: this.justRead}, Validators.required],
        text: [{value: null, disabled: this.justRead}, Validators.required],
        categoryId: [{value: null, disabled: this.justRead}],
        state: [{value: null, disabled: this.justRead}]
      })
    }

    public resetForm(){
      this.formCreateNote.reset();
    }

    private updateNote(){
      const note = this.formCreateNote.value as NoteDTO;
        note.id = this.selectedNoteIdUpdate;
        this.noteApiService.putNote$(note).subscribe(data =>{
            this.showModalNew = false;
            this.isUpdate = false;
            this.selectedNoteIdUpdate = 0;
            this.currentNote = null;
            this.onReset.emit();
            this.messageService.add({ severity: 'success', summary: 'Success', detail: NoteMessagesConstants.NOTE_SUCCESS_UPDATE });
        }, error => {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error.message});
        });
    }

    private createNote(){
      const note = this.formCreateNote.value as NoteDTO;
      note.userId = this.user.id!;
      this.noteApiService.postNote$(note).subscribe(data => {
        this.onReset.emit();
        this.resetForm();
        this.showModalNew = false;
        this.messageService.add({ severity: 'success', summary: 'Success', detail: NoteMessagesConstants.NOTE_SUCCESS_SAVE });
      }, error => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error.message});
      });
    }

    public editNote(note: NoteDTO){
      this.selectedNoteIdUpdate = note.id!;
      this.currentNote = note;
      this.formCreateNote.patchValue({
        title: note.title,
        text: note.text,
        categoryId: note.category ? note.category.id: null,
        state: note.state 
      });
      this.isUpdate = true; 
      this.showModalNew = true;
    }

    public openConfirmSave(){
        this.confirmationService.confirm({
          message: (this.isUpdate ? GeneralMessagesConstants.GENERAL_CONFIRM_UPDATE_MESSAGE : GeneralMessagesConstants.GENERAL_CONFIRM_SAVE_MESSAGE) + 'note?',
          header: (this.isUpdate ?  GeneralMessagesConstants.HEADER_UPDATE : GeneralMessagesConstants.HEADER_SAVE) + 'Note',
          icon: 'pi pi-exclamation-triangle',
          acceptIcon: "none",
          rejectIcon: "none",
          rejectButtonStyleClass: "p-button-text",
          accept: () => {
              (this.isUpdate) ? this.updateNote() : this.createNote();
          },
      });
    }
}
