import { Routes } from '@angular/router';
import { MainPageRouterConstants } from './constants/routers/main-page/main-page-router-constants';
import { LoginRouterConstants } from './constants/routers/login/login-router-constants';
import { AuthGuard } from './guards/auth-guard.guard';
import { ProfileRouterConstants } from './constants/routers/profile/profile-router-constants';

export const routes: Routes = [
    {
        path: MainPageRouterConstants.MAIN_PAGE_ROUTER,
        loadChildren: () => import('./modules/main-page/main-page.module').then(m => m.MainPageModule),
        canActivate: [AuthGuard],
    },
    {
        path: LoginRouterConstants.LOGIN_ROUTER,
        loadChildren: () => import('./modules/login/login.module').then(m => m.LoginModule)
    },
    {
        path: ProfileRouterConstants.PROFILE_ROUTER,
        loadChildren: () => import('./modules/profile/profile.module').then(m => m.ProfileModule),
        canActivate: [AuthGuard],
    },
    {
        path: "",
        redirectTo: LoginRouterConstants.LOGIN_ROUTER,
        pathMatch: "full"
    }
];
