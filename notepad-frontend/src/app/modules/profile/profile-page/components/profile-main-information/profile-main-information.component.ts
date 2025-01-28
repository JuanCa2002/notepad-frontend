import { Component, OnInit } from '@angular/core';
import { UserDTO } from '../../../../../dtos/users/user-dto';
import { LoginApiService } from '../../../../login/login-page/services/login-api.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserApiService } from '../../../../login/new-account-page/services/user-api.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { UserMessagesConstants } from '../../../../../constants/messages/user-messages.constants';
import { Router } from '@angular/router';
import { MainPageRouterConstants } from '../../../../../constants/routers/main-page/main-page-router-constants';
import { LoginRouterConstants } from '../../../../../constants/routers/login/login-router-constants';

@Component({
  selector: 'app-profile-main-information',
  templateUrl: './profile-main-information.component.html',
  styleUrl: './profile-main-information.component.css'
})
export class ProfileMainInformationComponent implements OnInit{

  public user!: UserDTO;
  public formProfile!: FormGroup;
  public formSetPassword!: FormGroup;
  public jusRead: boolean = true;

  constructor(private loginApiService: LoginApiService, private fb: FormBuilder, private userApiService: UserApiService,
    private confirmationService: ConfirmationService, private messageService: MessageService, private router: Router
  ){}

  ngOnInit(): void {
    this.user = this.loginApiService.getUser()!;
    this.initializeForm();
  }

  public getFullName(): string{
    let fullName = this.user.name + ' ';
    if(this.user.secondName && this.user.secondName!= null){
      fullName+= this.user.secondName + ' ';
    }
    fullName+= this.user.firstLastName + ' ';
    if(this.user.secondLastName && this.user.secondLastName!= null){
      fullName+= this.user.secondLastName;
    }
    return fullName;
  }

  public enableAllFormControls(): void {
    this.jusRead = false;
    Object.keys(this.formProfile.controls).forEach(key => {
      this.formProfile.get(key)?.enable();
    });
  }

  
  private setPassword(){
    const currentPassword = this.formSetPassword.get('currentPassword')?.value;
    const newPassword = this.formSetPassword.get('newPassword')?.value;
    this.userApiService.patchSetPassword$(this.user.id!, currentPassword, newPassword).subscribe(data =>{
      this.messageService.add({ severity: 'success', summary: 'Success', detail: UserMessagesConstants.USER_SET_PASSWORD_SUCCESS });
      this.router.navigate(['/'+MainPageRouterConstants.MAIN_PAGE_ROUTER]);
    }, error =>{
      this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error.message});
    })
  }

  private updateInformationUser(){
    const user = this.formProfile.value as UserDTO;
    user.id = this.user.id;
    user.name = user.name?.toLocaleUpperCase();
    user.secondName = user.secondName ? user.secondName.toLocaleUpperCase(): user.secondName;
    user.firstLastName = user.firstLastName?.toLocaleUpperCase();
    user.secondLastName = user.secondLastName ? user.secondLastName.toLocaleUpperCase(): user.secondLastName;
    user.email = user.email === this.user.email ? undefined : user.email;
    user.identificationNumber = user.identificationNumber === this.user.identificationNumber ? undefined : user.identificationNumber;
    this.userApiService.putUser$(user).subscribe(data =>{
      this.messageService.add({ severity: 'success', summary: 'Success', detail: UserMessagesConstants.USER_INFORMATION_UPDATE_SUCCESS });
      localStorage.setItem('user', JSON.stringify(data));
      this.router.navigate(['/'+MainPageRouterConstants.MAIN_PAGE_ROUTER]);
    }, error =>{
      this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error.message});
    })
  }

  private inactiveAccount(){
    this.userApiService.patchState$(this.user.id!).subscribe(data =>{
      this.messageService.add({ severity: 'success', summary: 'Success', detail: UserMessagesConstants.USER_ACCOUNT_STATE_CHANGE_SUCCESS });
      this.loginApiService.signOut();
      this.router.navigate(['/'+LoginRouterConstants.LOGIN_ROUTER]);
    }, error =>{
      this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error.message});
    })
  }

   public openConfirmSetPassword(){
        this.confirmationService.confirm({
          message: UserMessagesConstants.CONFIRMATION_MESSAGE_SET_PASSWORD,
          header:  UserMessagesConstants.HEADER_SET_PASSWORD,
          icon: 'pi pi-exclamation-triangle',
          acceptIcon: "none",
          rejectIcon: "none",
          rejectButtonStyleClass: "p-button-text",
          accept: () => {
            this.setPassword();
          },
        });
      }
  
  public openConfirmSetState(){
        this.confirmationService.confirm({
          message: UserMessagesConstants.CONFIRMATION_MESSAGE_INACTIVE_YOUR_ACCOUNT,
          header:  UserMessagesConstants.HEADER_INACTIVE_ACCOUNT,
          icon: 'pi pi-exclamation-triangle',
          acceptIcon: "none",
          rejectIcon: "none",
          rejectButtonStyleClass: "p-button-text",
          accept: () => {
            this.inactiveAccount();
          },
        });
      }

  public openConfirmationUpdateUser(){
        this.confirmationService.confirm({
          message: UserMessagesConstants.CONFIRMATION_MESSAGE_UPDATE,
          header:  UserMessagesConstants.HEADER_UPDATE,
          icon: 'pi pi-exclamation-triangle',
          acceptIcon: "none",
          rejectIcon: "none",
          rejectButtonStyleClass: "p-button-text",
          accept: () => {
            this.updateInformationUser();
          },
        });
      }


  private initializeForm(){
      this.formProfile = this.fb.group({
        name: [{value: this.user.name, disabled:this.jusRead}, Validators.required],
        firstLastName: [{value: this.user.firstLastName, disabled:this.jusRead}, Validators.required],
        secondName: [{value:this.user.secondName ? this.user.secondName: null, disabled:this.jusRead}],
        secondLastName: [{value:this.user.secondLastName ? this.user.secondLastName: null, disabled:this.jusRead}],
        identificationNumber: [{value:this.user.identificationNumber, disabled:this.jusRead}, Validators.required],
        email: [{value:this.user.email, disabled:this.jusRead}, Validators.required]
      });
      this.formSetPassword = this.fb.group({
        currentPassword: [null, Validators.required],
        newPassword: [null, Validators.required]
      })
    }

}
