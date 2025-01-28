import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NotesApiService } from '../../services/note-api.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { CategoryApiService } from '../../../categories-management/services/category-api.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoryDTO } from '../../../../../../../dtos/categories/category-dto';
import { NoteMessagesConstants } from '../../../../../../../constants/messages/note-messages.constants';
import { NoteStateConstants } from '../../../../../../../constants/enums/note-state-constants';
import { UserDTO } from '../../../../../../../dtos/users/user-dto';
import { LoginApiService } from '../../../../../../login/login-page/services/login-api.service';

@Component({
  selector: 'app-notes-dialog-change-category',
  templateUrl: './notes-dialog-change-category.component.html',
  styleUrl: './notes-dialog-change-category.component.css'
})
export class NotesDialogChangeCategoryComponent implements OnInit{
  public nonCategory: CategoryDTO = new CategoryDTO;
  public categories: CategoryDTO[] = [];
  public states: any[] = [];
  public user!: UserDTO;
  public isUpdateCategory: boolean = false;
  public showModal: boolean = false;
  public formUpdateCategory!: FormGroup;
  public selectedIds: number[] = [];
  @Output() onReset = new EventEmitter();

  constructor(private fb: FormBuilder, private confirmationService: ConfirmationService,
        private noteApiService: NotesApiService, private messageService: MessageService,
        private categoryApiService: CategoryApiService, private loginApiService: LoginApiService
      ){}

  ngOnInit(): void {
    this.user = this.loginApiService.getUser()!;
    this.nonCategory.id = 0;
    this.nonCategory.name = 'WITHOUT CATEGORY';
    this.nonCategory.tagColor = '#ffffff';
    this.nonCategory.textColor = '#000000'
    this.states = [
      {value: NoteStateConstants.ACTIVE, label: 'Active'},
      {value: NoteStateConstants.ARCHIVED, label: 'Archived'},
    ]
    this.initializeFormUpdate();
    this.loadCategories();
  }

  public editCategory(ids: number[]){
    this.isUpdateCategory = true;
    this.setConditionalValidators();
    this.selectedIds = ids;
    this.formUpdateCategory.get('ids')?.setValue(this.selectedIds);
    this.showModal =true;
  }

  public editState(ids: number[]){
    this.isUpdateCategory = false;
    this.setConditionalValidators();
    this.selectedIds = ids;
    this.formUpdateCategory.get('ids')?.setValue(this.selectedIds);
    this.showModal =true;
  }

  private initializeFormUpdate(){
    this.formUpdateCategory = this.fb.group({
      userId: [this.user.id, Validators.required],
      ids: [null, Validators.required],
      categoryId: [null],
      state: [null]
    });
  }

  private setConditionalValidators() {
    if (this.isUpdateCategory) {
      this.formUpdateCategory.get('categoryId')?.setValidators(Validators.required);
      this.formUpdateCategory.get('state')?.clearValidators();
    } else {
      this.formUpdateCategory.get('state')?.setValidators(Validators.required);
      this.formUpdateCategory.get('categoryId')?.clearValidators();
    }
    this.formUpdateCategory.get('categoryId')?.updateValueAndValidity();
    this.formUpdateCategory.get('state')?.updateValueAndValidity();
  }

  public resetForm(){
    this.formUpdateCategory.reset();
    this.formUpdateCategory.get('userId')?.setValue(this.user.id);
  }

  private updateCategory(){
    const ids = this.formUpdateCategory.get('ids')?.value as number[];
    const idsString = ids ? ids.join(',') : '';
    const categoryId = this.formUpdateCategory.get('categoryId')?.value;
    const userId = this.formUpdateCategory.get('userId')?.value;
    this.noteApiService.patchNotesCategory$(idsString, userId, categoryId).subscribe(data =>{
      this.onReset.emit();
      this.showModal = false;
      this.isUpdateCategory = false;
      this.messageService.add({ severity: 'success', summary: 'Success', detail: NoteMessagesConstants.NOTE_SUCCESS_UPDATE_CATEGORY });
    }, error =>{
      this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error.message});
    })
  }

  private updateState(){
    const ids = this.formUpdateCategory.get('ids')?.value as number[];
    const idsString = ids ? ids.join(',') : '';
    const state = this.formUpdateCategory.get('state')?.value;
    const userId = this.formUpdateCategory.get('userId')?.value;
    this.noteApiService.patchNotesState$(idsString, userId, state).subscribe(data =>{
      this.onReset.emit();
      this.showModal = false;
      this.isUpdateCategory = false;
      this.messageService.add({ severity: 'success', summary: 'Success', detail: NoteMessagesConstants.NOTE_SUCCESS_UPDATE_STATE });
    }, error =>{
      this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error.message});
    })
  }

  public openConfirmChangeCategoryState(){
    this.confirmationService.confirm({
      message: (this.isUpdateCategory ? NoteMessagesConstants.CONFIRM_UPDATE_CATEGORY_NOTES: NoteMessagesConstants.CONFIRM_UPDATE_STATE_NOTES) ,
      header: (this.isUpdateCategory ? NoteMessagesConstants.HEADER_UPDATE_CATEGORY_NOTES: NoteMessagesConstants.CONFIRM_UPDATE_STATE_NOTES),
      icon: 'pi pi-exclamation-triangle',
      acceptIcon: "none",
      rejectIcon: "none",
      rejectButtonStyleClass: "p-button-text",
      accept: () => {
         (this.isUpdateCategory) ? this.updateCategory(): this.updateState();
      },
    });
  }


  private loadCategories(){
    this.categoryApiService.getCategoriesByUser$(this.user.id!).subscribe(data =>{
      this.categories = data;
      this.categories.push(this.nonCategory)
    }, error =>{
      this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error.message});
    })
  }

}
