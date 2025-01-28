import { NgModule } from "@angular/core";
import { ConfirmationService } from "primeng/api";
import { LoginPageComponent } from "./login-page.component";
import { DividerModule } from "primeng/divider";
import { CommonModule } from "@angular/common";
import { DialogModule } from "primeng/dialog";
import { ToastModule } from "primeng/toast";
import { InputTextModule } from "primeng/inputtext";
import { ReactiveFormsModule } from "@angular/forms";
import { ConfirmDialogModule } from "primeng/confirmdialog";
import { DropdownModule } from "primeng/dropdown";
import { LoginPageRoutingModule } from "./login-page.routing.module";
import { ButtonModule } from "primeng/button";
import { LoginFormComponent } from "./components/login-form/login-form.component";

@NgModule({
    declarations: [
     LoginPageComponent,
     LoginFormComponent
    ],
    imports: [
        LoginPageRoutingModule,
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
  export class LoginPageModule { }