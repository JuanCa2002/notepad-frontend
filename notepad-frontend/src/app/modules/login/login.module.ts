import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { LoginRouterConstants } from "../../constants/routers/login/login-router-constants";

@NgModule({
    imports: [
      RouterModule.forChild([
          {
            path: LoginRouterConstants.LOGIN_PAGE_ROUTER,
            loadChildren: () => import("./login-page/login-page.module").then((m) => m.LoginPageModule)
          },
          {
            path: LoginRouterConstants.NEW_ACCOUNT_ROUTER,
            loadChildren: () => import("./new-account-page/new-account-page.module").then((m) => m.NewAccountPageModule)
          },
          {
            path: "",
            redirectTo: LoginRouterConstants.LOGIN_PAGE_ROUTER,
            pathMatch: "full"
          }
      ]),
    ]
  })
  export class LoginModule { }