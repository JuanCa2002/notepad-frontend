import { Component, ViewChild } from '@angular/core';
import { NotesDataViewComponent } from './sections/notes-data-view/notes-data-view.component';
import { NotesDialogCreateComponent } from './sections/notes-dialog-create/notes-dialog-create.component';
import { NoteDTO } from '../../../../../dtos/notes/note-dto';
import { NotesDialogChangeCategoryComponent } from './sections/notes-dialog-change-category/notes-dialog-change-category.component';
import { ConfirmationService, MessageService } from 'primeng/api';
import { NotesApiService } from './services/note-api.service';
import { NoteMessagesConstants } from '../../../../../constants/messages/note-messages.constants';
import { LoginApiService } from '../../../../login/login-page/services/login-api.service';

@Component({
  selector: 'app-notes-management',
  templateUrl: './notes-management.component.html',
  styleUrl: './notes-management.component.css'
})
export class NotesManagementComponent {
  public selectedIds: number[] = [];
  @ViewChild('createDialog') createDialog!: NotesDialogCreateComponent;
  @ViewChild('changeCategoryDialog') changeCategoryDialog!: NotesDialogChangeCategoryComponent;
  @ViewChild('dataView') dataView!: NotesDataViewComponent;

  constructor(private confirmationService: ConfirmationService,
          private noteApiService: NotesApiService, private messageService: MessageService,
          private loginApiService: LoginApiService
        ){}

  public showDialog(){
    this.createDialog.showModalNew = true;
  }

  public getSelectedNotes(): NoteDTO[] {
    return this.dataView.selectedNotes;
  }

  public resetData(){
    this.dataView.getAllNotes();
  }

  public showEditDialog(){
    const length = this.getSelectedNotes().length;
    if(length == 0) return;
    if(length != 1){
      this.messageService.add({ severity: 'error', summary: 'Error', detail: NoteMessagesConstants.NOTE_ERROR_MORE_THAN_ONE});
    }else{
      const selectedNote = this.getSelectedNotes()[0];
      this.createDialog.editNote(selectedNote);
    }
  }

  public showDetailDialog(){
    const length = this.getSelectedNotes().length;
    if(length == 0) return;
    if(length != 1){
      this.messageService.add({ severity: 'error', summary: 'Error', detail: NoteMessagesConstants.NOTE_ERROR_MORE_THAN_ONE_DETAIL});
    }else{
      const selectedNote = this.getSelectedNotes()[0];
      this.createDialog.justRead = true;
      this.createDialog.editNote(selectedNote);
    }
  }

  public changeCategory(){
    this.selectedIds = this.getSelectedNotes().map(n => n.id!);
    if(this.selectedIds.length > 0){
      this.changeCategoryDialog.editCategory(this.selectedIds);
    } 
  }

  public changeState(){
    this.selectedIds = this.getSelectedNotes().map(n => n.id!);
    if(this.selectedIds.length > 0){
      this.changeCategoryDialog.editState(this.selectedIds);
    } 
  }

  private deleteNotes(){
    const idsString = this.selectedIds ? this.selectedIds.join(',') : '';
    this.noteApiService.deleteNotes$(idsString, this.loginApiService.getUser()!.id!).subscribe(() =>{
      this.resetData();
      this.messageService.add({ severity: 'success', summary: 'Success', detail: NoteMessagesConstants.NOTE_SUCCESS_DELETE });
    }, error =>{
      this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error.message});
    })
  }

  public openConfirmDeleteNotes(){
    this.selectedIds = this.getSelectedNotes().map(n => n.id!);
    if(this.selectedIds.length > 0){
      this.confirmationService.confirm({
        message: NoteMessagesConstants.CONFIRM_DELETE_NOTES ,
        header:  NoteMessagesConstants.HEADER_DELETE_NOTES,
        icon: 'pi pi-exclamation-triangle',
        acceptIcon: "none",
        rejectIcon: "none",
        rejectButtonStyleClass: "p-button-text",
        accept: () => {
          this.deleteNotes();
        },
      }); 
    }
  }



}
