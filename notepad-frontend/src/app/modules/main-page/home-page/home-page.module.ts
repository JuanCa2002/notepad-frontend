import { NgModule } from "@angular/core";
import { HomePageComponent } from "./home-page.component";
import { HomePageRoutingModule } from "./home-page.routing.module";
import { DividerModule } from 'primeng/divider';
import { DataViewModule } from 'primeng/dataview';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { TagModule } from 'primeng/tag';
import { DialogModule } from 'primeng/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { InputTextModule } from 'primeng/inputtext';
import { ColorPickerModule } from 'primeng/colorpicker';
import { DropdownModule } from 'primeng/dropdown';
import { CategoriesManagementComponent } from "./components/categories-management/categories-management.component";
import { CategoriesDataViewComponent } from "./components/categories-management/sections/categories-data-view/categories-data-view.component";
import { CommonModule } from "@angular/common";
import { TabMenuModule } from 'primeng/tabmenu';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { CategoriesDialogCreateComponent } from "./components/categories-management/sections/categories-dialog-create/categories-dialog-create.component";
import { ConfirmationService } from "primeng/api";
import { NotesManagementComponent } from "./components/notes-management/notes-management.component";
import { NotesDataViewComponent } from "./components/notes-management/sections/notes-data-view/notes-data-view.component";
import { NotesDialogCreateComponent } from "./components/notes-management/sections/notes-dialog-create/notes-dialog-create.component";
import { NotesDialogChangeCategoryComponent } from "./components/notes-management/sections/notes-dialog-change-category/notes-dialog-change-category.component";

@NgModule({
    declarations: [
      HomePageComponent,
      CategoriesManagementComponent,
      CategoriesDataViewComponent,
      CategoriesDialogCreateComponent,
      NotesManagementComponent,
      NotesDataViewComponent,
      NotesDialogCreateComponent,
      NotesDialogChangeCategoryComponent
    ],
    imports: [
        HomePageRoutingModule,
        DividerModule,
        DataViewModule,
        ButtonModule,
        TagModule,
        CommonModule,
        ToastModule,
        DialogModule,
        InputTextModule,
        ReactiveFormsModule,
        ColorPickerModule,
        ConfirmDialogModule,
        TabMenuModule,
        InputTextareaModule,
        DropdownModule
    ],
    providers:[ConfirmationService]
  })
  export class HomePageModule { }