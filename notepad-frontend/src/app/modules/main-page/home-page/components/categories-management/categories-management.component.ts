import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { CategoriesDialogCreateComponent } from './sections/categories-dialog-create/categories-dialog-create.component';
import { CategoriesDataViewComponent } from './sections/categories-data-view/categories-data-view.component';

@Component({
  selector: 'app-categories-management',
  templateUrl: './categories-management.component.html',
  styleUrl: './categories-management.component.css'
})
export class CategoriesManagementComponent{
  
  @ViewChild('createDialog') createDialog!: CategoriesDialogCreateComponent;
  @ViewChild('dataView') dataView!: CategoriesDataViewComponent;
  @Output() onChange = new EventEmitter();

  public showDialog(){
    this.createDialog.showModalNew = true;
    this.createDialog.formCreateCategory.reset();
    this.createDialog.formCreateCategory.get('tagColor')?.setValue('#0000FF');
    this.createDialog.formCreateCategory.get('textColor')?.setValue('#ffffff');
  }

  public showEditDialog(category: any){
    this.createDialog.editCategory(category);
  }

  public resetData(){
    this.onChange.emit();
    this.dataView.getCategories();
  }
}
