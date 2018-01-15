import { Component, OnInit } from '@angular/core';

import { UserManagementForm } from '../user-manage.model';
import { UserManagementService } from '../user-management.service';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.scss']
})
export class UserRegisterComponent implements OnInit {

userRegisterModel:  UserManagementForm = {
email:''
};

isEmailVerified : boolean = false;

constructor(private userManagementService : UserManagementService) {}
ngOnInit() {}
onSubmit(){

console.log("email",this.userRegisterModel.email);
this.isEmailVerified = this.userManagementService.getEmailVerification(this.userRegisterModel);

}
}