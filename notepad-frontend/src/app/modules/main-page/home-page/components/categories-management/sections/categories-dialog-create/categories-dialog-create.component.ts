import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { GeneralMessagesConstants } from '../../../../../../../constants/messages/general-messages-constants';
import { CategoryApiService } from '../../services/category-api.service';
import { CategoryDTO } from '../../../../../../../dtos/categories/category-dto';
import { CategoryMessagesConstants } from '../../../../../../../constants/messages/category-messages.constants';
import { LoginApiService } from '../../../../../../login/login-page/services/login-api.service';

@Component({
  selector: 'app-categories-dialog-create',
  templateUrl: './categories-dialog-create.component.html',
  styleUrl: './categories-dialog-create.component.css'
})
export class CategoriesDialogCreateComponent implements OnInit{
  
  public showModalNew: boolean = false;
  public currentCategory: CategoryDTO | null = null;
  public selectedCategoryIdUpdate: number = 0;
  public isUpdate: boolean = false;
  public formCreateCategory!: FormGroup;
  @Output() onSave = new EventEmitter();

  constructor(private fb: FormBuilder, private confirmationService: ConfirmationService,
    private categoryApiService: CategoryApiService, private messageService: MessageService,
    private loginApiService: LoginApiService
  ){}

  ngOnInit(): void {
    this.initializeForm();
  }

  private initializeForm(){
    this.formCreateCategory = this.fb.group({
      name: [null, Validators.required],
      tagColor: ['#0000FF'],
      textColor: ['#ffffff']
    })
  }

  private createCategory(){
    const category = this.formCreateCategory.value as CategoryDTO;
    category.userId = this.loginApiService.getUser()?.id;
    category.name = category.name?.toUpperCase();
    this.categoryApiService.postCategory$(category).subscribe(data => {
      this.showModalNew = false;
      this.onSave.emit();
      this.messageService.add({ severity: 'success', summary: 'Success', detail: CategoryMessagesConstants.CATEGORY_SUCCESS_SAVE });
    }, error => {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error.message});
    })
  }

  public resetForm(){
    this.formCreateCategory.reset();
  }

  private updateCategory(){
    const category = this.formCreateCategory.value as CategoryDTO;
    category.id = this.selectedCategoryIdUpdate;
    category.userId = this.loginApiService.getUser()?.id;
    category.name = category.name?.toUpperCase();
    this.categoryApiService.putCategory$(category).subscribe(data =>{
      this.showModalNew = false;
      this.isUpdate = false;
      this.selectedCategoryIdUpdate = 0;
      this.currentCategory = null;
      this.onSave.emit();
      this.messageService.add({ severity: 'success', summary: 'Success', detail: CategoryMessagesConstants.CATEGORY_SUCCESS_UPDATE });
    }, error => {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error.message});
    });
  }

  public editCategory(category: CategoryDTO){
    this.selectedCategoryIdUpdate = category.id!;
    this.currentCategory = category;
    this.formCreateCategory.patchValue({
      name: category.name,
      tagColor: category.tagColor,
      textColor: category.textColor,
    });
    this.isUpdate = true; 
    this.showModalNew = true;
  }

  public openConfirmDelete(){
    this.confirmationService.confirm({
      message: GeneralMessagesConstants.GENERAL_CONFIRM_DELETE_MESSAGE + 'category?',
      header:  GeneralMessagesConstants.HEADER_DELETE + 'Category',
      icon: 'pi pi-exclamation-triangle',
      acceptIcon: "none",
      rejectIcon: "none",
      rejectButtonStyleClass: "p-button-text",
      accept: () => {
        this.removeCategory();
      },
    });
  }

  private removeCategory(){
    this.categoryApiService.deleteCategory$(this.selectedCategoryIdUpdate, 1).subscribe(() =>{
      this.showModalNew = false;
      this.isUpdate = false;
      this.selectedCategoryIdUpdate = 0;
      this.currentCategory = null;
      this.onSave.emit();
      this.messageService.add({ severity: 'success', summary: 'Success', detail: CategoryMessagesConstants.CATEGORY_SUCCESS_DELETE });
    }, error =>{
      this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error.message});
    })
  }

  public openConfirmSave(){
    this.confirmationService.confirm({
      message: (this.isUpdate ? GeneralMessagesConstants.GENERAL_CONFIRM_UPDATE_MESSAGE : GeneralMessagesConstants.GENERAL_CONFIRM_SAVE_MESSAGE) + 'category?',
      header: (this.isUpdate ?  GeneralMessagesConstants.HEADER_UPDATE : GeneralMessagesConstants.HEADER_SAVE) + 'Category',
      icon: 'pi pi-exclamation-triangle',
      acceptIcon: "none",
      rejectIcon: "none",
      rejectButtonStyleClass: "p-button-text",
      accept: () => {
          (this.isUpdate) ? this.updateCategory() : this.createCategory();
      },
  });
  }

}
