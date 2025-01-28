import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingService } from './services/loading.service';
import { LoginApiService } from './modules/login/login-page/services/login-api.service';
import { MenuItem } from 'primeng/api';
import { UserApiConstants } from './constants/apis/user-api.constants';
import { UserMessagesConstants } from './constants/messages/user-messages.constants';
import { ProfileRouterConstants } from './constants/routers/profile/profile-router-constants';
import { MainPageRouterConstants } from './constants/routers/main-page/main-page-router-constants';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  title = 'notepad-frontend';
  items: MenuItem[] | undefined;
  isLogged: boolean = false;
  isLoading = this.loadingService.loading$;

  constructor(private router: Router, private loadingService: LoadingService, private loginApiService: LoginApiService){}

  ngOnInit(): void {
    this.items = [
      { label: 'Home', icon: 'pi pi-home',  command: (click) => {this.goHome();}},
      { label: 'My profile', icon: 'pi pi-user-edit', command: (click) => {this.goToProfile();}},
      { label: 'Sign Out', icon: 'pi pi-sign-out',  command: (click) => {this.loginApiService.signOut();} }
  ];
    this.verifyLogging();
  }

  private goToProfile(){
    this.router.navigate(['/'+ProfileRouterConstants.PROFILE_ROUTER]);
  }

  public goHome(){
    this.router.navigate(['/'+MainPageRouterConstants.MAIN_PAGE_ROUTER]);
  }


  private verifyLogging(){
    const user = localStorage.getItem('user');
    if (user) {
          this.isLogged = true;
        } else {
         this.isLogged = false;
        }
  }

  
}
