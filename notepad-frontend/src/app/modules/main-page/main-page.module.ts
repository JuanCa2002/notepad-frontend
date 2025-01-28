import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { MainPageRouterConstants } from "../../constants/routers/main-page/main-page-router-constants";

@NgModule({
    imports: [
      RouterModule.forChild([
          {
            path: MainPageRouterConstants.HOME_PAGE_ROUTER,
            loadChildren: () => import("./home-page/home-page.module").then((m) => m.HomePageModule)
          },
          {
            path: "",
            redirectTo: MainPageRouterConstants.HOME_PAGE_ROUTER,
            pathMatch: "full"
          }
      ]),
    ]
  })
  export class MainPageModule { }