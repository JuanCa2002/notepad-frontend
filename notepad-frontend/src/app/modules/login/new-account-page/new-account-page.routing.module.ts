import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { NewAccountPageComponent } from "./new-account-page.component";

const routes: Routes = [
  {
    path:'',
    component: NewAccountPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NewAccountPageRoutingModule { }