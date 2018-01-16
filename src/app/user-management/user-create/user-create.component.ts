import { Component, OnInit } from '@angular/core';
import { UserManagementForm } from '../user-manage.model';
import { ActivatedRoute,Router } from '@angular/router';

import { UserManagementService } from '../user-management.service';
import { CommonSharedService } from '../../shared/services/common-shared.service';

@Component({
selector: 'app-user-create',
templateUrl: './user-create.component.html',
styleUrls: ['./user-create.component.scss']
})
export class UserCreateComponent implements OnInit {
userRegisterModel:  UserManagementForm = {
email:'',
firstName:'',
lastName:'',
password:'',
confirmPassword:'',
};
isNewUserRegistered : boolean = false;
constructor(private route:ActivatedRoute,
			private router:Router,
			private userManagementService: UserManagementService,
			private commonSharedService : CommonSharedService) { }

ngOnInit() {
	this.route.params.subscribe(params => {
	this.userRegisterModel.email = params['id'];
});
}

onSubmit(){

	this.userRegisterModel.password = this.commonSharedService.getHahedPassword(this.userRegisterModel.email,this.userRegisterModel.password);
	this.isNewUserRegistered = this.userManagementService.userRegistration(this.userRegisterModel);
	//this.router.navigate(['/login']);
	this.router.navigate(['/user-update',this.userRegisterModel.email]);
}
}