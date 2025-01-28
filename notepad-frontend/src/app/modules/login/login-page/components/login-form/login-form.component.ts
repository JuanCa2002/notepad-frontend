import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginApiService } from '../../services/login-api.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { UserMessagesConstants } from '../../../../../constants/messages/user-messages.constants';
import { Router } from '@angular/router';
import { MainPageRouterConstants } from '../../../../../constants/routers/main-page/main-page-router-constants';
import { LoginRouterConstants } from '../../../../../constants/routers/login/login-router-constants';
import { UserApiService } from '../../../new-account-page/services/user-api.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.css'
})
export class LoginFormComponent implements OnInit{

  public formLogin!: FormGroup;

  constructor(private fb: FormBuilder, private loginApiService: LoginApiService,
    private userApiService: UserApiService,
    private messageService: MessageService, private router: Router, private confirmationService: ConfirmationService
  ){}

  ngOnInit(): void {
    this.initializeForm();
  }

  private initializeForm(){
    this.formLogin = this.fb.group({
      email: [null, Validators.required],
      password: [null, Validators.required]
    })
  }

  public login(){
    const email = this.formLogin.get('email')?.value;
    const password = this.formLogin.get('password')?.value;
    this.loginApiService.getUserByCredentials$(email, password).subscribe(data =>{
      if(data.state == 'INACTIVE'){
        this.openConfirmSetState(data.id!);
        return;
      }
      localStorage.setItem('user', JSON.stringify(data));
      this.messageService.add({ severity: 'success', summary: 'Success', detail: UserMessagesConstants.USER_LOGIN_SUCCESS });
      this.router.navigate(['/'+MainPageRouterConstants.MAIN_PAGE_ROUTER+'/'+ MainPageRouterConstants.HOME_PAGE_ROUTER]);
    }, error =>{
      this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error.message});
    })
  }

  public redirectCreateAccount(){
    this.router.navigate(['/'+LoginRouterConstants.LOGIN_ROUTER+'/'+ LoginRouterConstants.NEW_ACCOUNT_ROUTER]);
  }

  private activeAccount(userId: number){
    this.userApiService.patchState$(userId).subscribe(data => {
      this.login();
    }, error =>{
      this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error.message});
    })
  }

  public openConfirmSetState(userId: number){
    this.confirmationService.confirm({
      message: UserMessagesConstants.CONFIRMATION_ACTIVE_ACCOUNT,
      header:  UserMessagesConstants.HEADER_INACTIVE_ACCOUNT,
      icon: 'pi pi-exclamation-triangle',
      acceptIcon: "none",
      rejectIcon: "none",
      rejectButtonStyleClass: "p-button-text",
      accept: () => {
        this.activeAccount(userId);
      },
    });
  }

}
