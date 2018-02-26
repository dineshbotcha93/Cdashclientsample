import { Component, OnInit } from '@angular/core';
import { User } from '../../shared/models/auth/user.model';

import { UserManagementForm } from '../user-manage.model';
import { ActivatedRoute,Router } from '@angular/router';

import { UserManagementService } from '../user-management.service';
import { CommonSharedService } from '../../shared/services/common-shared.service';

@Component({
  selector: 'app-user-update',
  templateUrl: './user-update.component.html',
  styleUrls: ['./user-update.component.scss']
})
export class UserUpdateComponent implements OnInit {

userEmail: string;
isUserDetailsUpdated : boolean = false;

userRegisterModel:  UserManagementForm = {
email:'',
firstName:'',
lastName:'',
password:'',
confirmPassword:'',
  isNewMaster: true // Rami : PLz check this later
};

constructor(private route:ActivatedRoute,
			private router:Router,
			private userManagementService: UserManagementService,
			private commonSharedService : CommonSharedService) { }

ngOnInit() {
	this.route.params.subscribe(params => {
	this.userEmail= params['id'];
});
}

onSubmit(){
	this.isUserDetailsUpdated = this.userManagementService.userRegistration(this.userRegisterModel);
	this.router.navigate(['/login']);
}

}
