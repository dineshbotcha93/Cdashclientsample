import { Component, OnInit } from '@angular/core';
import { RegisterForm } from '../shared/models/auth/register.model';
import { UserManagementService } from '../shared/services/user-management.service';
@Component({
selector: 'app-user-management',
templateUrl: './user-management.component.html',
styleUrls: ['./user-management.component.scss']
})
export class UserManagementComponent implements OnInit {

registerModel:  RegisterForm = {
email:''
};

isEmailVerified : boolean = false;

constructor(private userManagementService : UserManagementService) {}
ngOnInit() {}
onSubmit(){

console.log("email",this.registerModel.email);
this.isEmailVerified = this.userManagementService.getEmailVerification(this.registerModel);

}
}