import { NgModule } from "@angular/core";
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
import { CommonModule } from "@angular/common";
import { TabMenuModule } from 'primeng/tabmenu';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ConfirmationService } from "primeng/api";
import { ProfilePageComponent } from "./profile-page.component";
import { ProfilePageRoutingModule } from "./profile-page.routing.module";
import { ProfileMainInformationComponent } from "./components/profile-main-information/profile-main-information.component";

@NgModule({
    declarations: [
      ProfilePageComponent,
      ProfileMainInformationComponent
    ],
    imports: [
        ProfilePageRoutingModule,
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
  export class ProfilePageModule { }