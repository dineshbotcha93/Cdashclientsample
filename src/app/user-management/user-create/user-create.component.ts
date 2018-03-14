import {Component, OnInit} from '@angular/core';
import {UserManagementForm} from '../user-manage.model';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserManagementService} from '../user-management.service';
import {CommonSharedService} from '../../shared/services/common-shared.service';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.scss']
})
export class UserCreateComponent implements OnInit {
  userRegisterModel: UserManagementForm = {
    email: '',
    firstName: '',
    lastName: '',
    password: '',
    confirmPassword: '',
    isNewMaster: 'true',
    notifEyeUsername: '',
    notifEyePassword: ''
  };
  isNewUserRegistered: boolean = false;
  userCreateForm: FormGroup;
  selectedStep: number;
  userName: string|null = null;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private formBuilder: FormBuilder,
              private userManagementService: UserManagementService,
              private commonSharedService: CommonSharedService) {
    this.userCreateForm = this.formBuilder.group({
      isNewMaster: ['', [Validators.required]],
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/g)]]

    });
    this.selectedStep = 1;
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.userRegisterModel.email = params['email'];
    });
  }

  onSubmit() {
    console.log(this.userRegisterModel);
    this.userRegisterModel.password = this.commonSharedService.getHahedPassword(this.userRegisterModel.email, this.userRegisterModel.password);
    this.isNewUserRegistered = this.userManagementService.userRegistration(this.userRegisterModel);
    //this.router.navigate(['/login']);
    this.router.navigate(['/user-register/user-create/' + this.userRegisterModel.email + '/fill-details']);
  }

  onPrevious($event) {
    console.log($event);
    this.router.navigate(['user-register']);
  }

  onNext($event) {
    console.log('not implemented yet');
  }

  masterChange($event) {
    if (!this.userRegisterModel.isNewMaster) {

    }
  }
}
