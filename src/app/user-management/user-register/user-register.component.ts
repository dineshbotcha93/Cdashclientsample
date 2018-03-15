import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { UserManagementForm } from '../user-manage.model';
import { UserManagementService } from '../user-management.service';
import { TranslateService } from '@ngx-translate/core';
import { AlertSandbox } from '../../shared/components/alerts/alerts.sandbox';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.scss'],
  providers: [AlertSandbox]
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
    private translate: TranslateService,
    private alertSandbox: AlertSandbox
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
      return this.isEmailVerified;
    }).then((r)=>{
      if(this.isEmailVerified){
        this.alertSandbox.showSuccess({data: 'Registration link is sent to your email address.  Please follow the instructions mentioned in the email. Thank you for your business!',autohide: false});
        //this.router.navigate(['user-register/user-create',this.userRegisterModel.email]);
      }
    });
  }
}
