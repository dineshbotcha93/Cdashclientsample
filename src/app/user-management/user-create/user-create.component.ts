import {Component, OnInit} from '@angular/core';
import {UserManagementForm} from '../user-manage.model';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserManagementService} from '../user-management.service';
import {CommonSharedService} from '../../shared/services/common-shared.service';
import { NgbTooltipConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.scss'],
  providers: [NgbTooltipConfig],
})
export class UserCreateComponent implements OnInit {
  userRegisterModel: UserManagementForm = {
    email: '',
    firstName: '',
    lastName: '',
    password: '',
    confirmPassword: '',
    isNewMaster: 'false',
    notifEyeUsername: '',
    notifEyePassword: ''
  };
  isValidForm = true;
  passwordMatch = false;
  userCreateForm: FormGroup;
  selectedStep: number;
  userCreationError: string|null = null;
  userName: string|null = null;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private formBuilder: FormBuilder,
              private config: NgbTooltipConfig,
              private userManagementService: UserManagementService,
              private commonSharedService: CommonSharedService) {
    this.userCreateForm = this.formBuilder.group({
      isNewMaster: [this.userRegisterModel.isNewMaster, [Validators.required]],
      firstName: [this.userRegisterModel.firstName, null],
      lastName: [this.userRegisterModel.lastName, null],
      email: [this.userRegisterModel.email, [Validators.required]],
      password: [this.userRegisterModel.password, [Validators.required, Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/g)]],
      confirmPassword: [this.userRegisterModel.confirmPassword, [Validators.required, Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/g)]],
      notifEyeUsername: [this.userRegisterModel.notifEyeUsername, [Validators.required]],
      notifEyePassword: [this.userRegisterModel.notifEyePassword, [Validators.required]],
    });

    config.placement = 'right';
    /*config.triggers = 'focus';*/
    this.selectedStep = 1;
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.userRegisterModel.email = params['email'];
      this.userCreateForm.patchValue({'email': params['email']});
    });
  }

  onSubmit() {

    this.passwordMatch = this.userCreateForm.get('password').value === this.userCreateForm.get('confirmPassword').value;
    this.isValidForm = this.userCreateForm.valid && this.passwordMatch;

    if (this.isValidForm) {
      this.populateUserRegisterModel();
      this.userManagementService.registerNotifEyeUser(this.userRegisterModel)
        .then(() => {
          this.router.navigate(['/user-register/user-create/' + this.userRegisterModel.email + '/fill-details']);
        })
        .catch((error: Error) => {
          this.isValidForm = false;
          this.userCreationError = error.message;
        });
    }
  }

  onPrevious($event) {
    console.log($event);
    this.router.navigate(['user-register']);
  }

  private populateUserRegisterModel() {
    this.userRegisterModel.email = this.userCreateForm.get('email').value;
    this.userRegisterModel.password = this.commonSharedService
      .getHahedPassword(this.userRegisterModel.email, this.userCreateForm.get('password').value);
    this.userRegisterModel.confirmPassword = this.userRegisterModel.password;
    this.userRegisterModel.notifEyeUsername = this.userCreateForm.get('notifEyeUsername').value;
    this.userRegisterModel.notifEyePassword = this.userCreateForm.get('notifEyePassword').value;
  }

  onNext($event) {
    console.log('not implemented yet');
  }

  masterChange($event) {
    if (!this.userRegisterModel.isNewMaster) {

    }
  }
}
