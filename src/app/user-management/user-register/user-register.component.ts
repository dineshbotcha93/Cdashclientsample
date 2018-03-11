import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { UserManagementForm } from '../user-manage.model';
import { UserManagementService } from '../user-management.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.scss']
})
export class UserRegisterComponent implements OnInit {
  userRegisterModel:  UserManagementForm = {
    email:'',
    firstName:'',
    lastName:'',
    password:'',
    confirmPassword:'',
    isNewMaster: "false",
  	notifEyeUsername: '',
  	notifEyePassword: ''
  };
  showPopup = false;

  isEmailVerified : boolean = false;
  constructor(
    private userManagementService : UserManagementService,
    private router:Router,
    private translate: TranslateService
  ) {
    this.translate.use('en');
  }

  modalClosed(event) {
    console.log(event);
    this.showPopup = false;
  }

  modalOpen(event) {
    console.log(event);
    this.showPopup = true;
  }

  ngOnInit() {}

  onSubmit(){
    this.isEmailVerified = null;
    this.userManagementService.getEmailVerification(this.userRegisterModel).then((e)=>{
      if(e!=null){
        this.isEmailVerified = true;
      }
    }).then((r)=>{
      if(this.isEmailVerified){
        this.router.navigate(['user-register/user-create',this.userRegisterModel.email]);
      }
    });
  }
}
