import { NgModule } from "@angular/core";
import { ConfirmationService } from "primeng/api";
import { DividerModule } from "primeng/divider";
import { CommonModule } from "@angular/common";
import { DialogModule } from "primeng/dialog";
import { ToastModule } from "primeng/toast";
import { InputTextModule } from "primeng/inputtext";
import { ReactiveFormsModule } from "@angular/forms";
import { ConfirmDialogModule } from "primeng/confirmdialog";
import { DropdownModule } from "primeng/dropdown";
import { ButtonModule } from "primeng/button";
import { NewAccountPageComponent } from "./new-account-page.component";
import { NewAccountPageRoutingModule } from "./new-account-page.routing.module";
import { NewAccountFormComponent } from "./components/new-account-form/new-account-form.component";

@NgModule({
    declarations: [
        NewAccountPageComponent,
        NewAccountFormComponent
    ],
    imports: [
        NewAccountPageRoutingModule,
        DividerModule,
        CommonModule,
        ToastModule,
        DialogModule,
        InputTextModule,
        ReactiveFormsModule,
        ConfirmDialogModule,
        DropdownModule,
        ButtonModule
    ],
    providers:[ConfirmationService]
  })
  export class NewAccountPageModule { }