import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { UserManagementForm } from '../user-manage.model';
import { UserManagementService } from '../user-management.service';
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
  };
  isEmailVerified : boolean = false;
  constructor(
    private userManagementService : UserManagementService,
    private router:Router
  ) {}

  ngOnInit() {}

  onSubmit(){
    this.isEmailVerified = this.userManagementService.getEmailVerification(this.userRegisterModel);
    if(this.isEmailVerified){
      this.router.navigate(['user-register/user-create',this.userRegisterModel.email]);
    }
  }
}
