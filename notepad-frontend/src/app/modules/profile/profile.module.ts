import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { ProfileRouterConstants } from "../../constants/routers/profile/profile-router-constants";

@NgModule({
    imports: [
      RouterModule.forChild([
        {
            path: ProfileRouterConstants.PROFILE_MAIN_PAGE,
            loadChildren: () => import("./profile-page/profile-page.module").then((m) => m.ProfilePageModule)
          },
          {
            path: "",
            redirectTo: ProfileRouterConstants.PROFILE_MAIN_PAGE,
            pathMatch: "full"
          }
      ]),
    ]
  })
  export class ProfileModule { }