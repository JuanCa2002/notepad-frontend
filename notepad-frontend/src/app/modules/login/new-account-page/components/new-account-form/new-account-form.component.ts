import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { UserApiService } from '../../services/user-api.service';
import { UserMessagesConstants } from '../../../../../constants/messages/user-messages.constants';
import { UserDTO } from '../../../../../dtos/users/user-dto';
import { Router } from '@angular/router';
import { LoginRouterConstants } from '../../../../../constants/routers/login/login-router-constants';

@Component({
  selector: 'app-new-account-form',
  templateUrl: './new-account-form.component.html',
  styleUrl: './new-account-form.component.css'
})
export class NewAccountFormComponent implements OnInit{

  public formRegister!: FormGroup;

  constructor(private fb: FormBuilder, private messageService: MessageService, private confirmationService: ConfirmationService,
    private userApiService: UserApiService, private router: Router
  ){}


  ngOnInit(): void {
    this.initializeForm();
  }

  private initializeForm(){
    this.formRegister = this.fb.group({
      name: [null, Validators.required],
      firstLastName: [null, Validators.required],
      secondName: [null],
      secondLastName: [null],
      identificationNumber: [null, Validators.required],
      email: [null, Validators.required],
      password: [null, Validators.required],
      confirmPassword: [null, Validators.required],
      age: [null, Validators.required]
    })
  }


  private createNewAccount(){
    const user = this.formRegister.value as UserDTO;
    user.name = user.name?.toLocaleUpperCase();
    user.secondName = user.secondName ? user.secondName.toLocaleUpperCase(): user.secondName;
    user.firstLastName = user.firstLastName?.toLocaleUpperCase();
    user.secondLastName = user.secondLastName ? user.secondLastName.toLocaleUpperCase(): user.secondLastName;
    this.userApiService.postUser$(user).subscribe(data =>{
      this.messageService.add({ severity: 'success', summary: 'Success', detail: UserMessagesConstants.USER_REGISTER_SUCCESS });
      this.router.navigate(['/'+LoginRouterConstants.LOGIN_ROUTER]);
    }, error =>{
      this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error.message});
    })
  }

  private validatePasswords(){
    return this.formRegister.get('password')?.value === this.formRegister.get('confirmPassword')?.value;
  }

  public openConfirmNewAccount(){
      if(!this.validatePasswords()){
        this.messageService.add({ severity: 'error', summary: 'Error', detail: UserMessagesConstants.ERROR_PASSWORDS_DOES_NOT_MATCH});
        return;
      }
      this.confirmationService.confirm({
        message: UserMessagesConstants.CONFIRMATION_MESSAGE_CREATE_NEW_ACCOUNT,
        header:  UserMessagesConstants.HEADER_NEW_ACCOUNT,
        icon: 'pi pi-exclamation-triangle',
        acceptIcon: "none",
        rejectIcon: "none",
        rejectButtonStyleClass: "p-button-text",
        accept: () => {
          this.createNewAccount();
        },
      });
    }

    public cancelCreateAccount(){
      this.router.navigate(['/'+LoginRouterConstants.LOGIN_ROUTER]);
    }

  

}
