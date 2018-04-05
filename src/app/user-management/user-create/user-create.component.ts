import {Component, OnInit} from '@angular/core';
import {UserManagementForm} from '../user-manage.model';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserManagementService} from '../user-management.service';
import {CommonSharedService} from '../../shared/services/common-shared.service';
import {NgbTooltipConfig} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.scss'],
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
    notifEyePassword: '',
    productName: ''
  };
  isValidForm = true;
  passwordMatch = false;
  userCreateForm: FormGroup;
  selectedStep: number;
  userCreationError: string | null = null;
  userName: string | null = null;
  registrationToken = '';

  constructor(private route: ActivatedRoute,
              private router: Router,
              private formBuilder: FormBuilder,
              private config: NgbTooltipConfig,
              private userManagementService: UserManagementService,
              private commonSharedService: CommonSharedService) {
    this.userCreateForm = this.formBuilder.group({
      isNewMaster: [this.userRegisterModel.isNewMaster, [Validators.required]],
      firstName: [this.userRegisterModel.firstName, [Validators.required]],
      lastName: [this.userRegisterModel.lastName, [Validators.required]],
      email: [this.userRegisterModel.email, [Validators.required]],
      password: [this.userRegisterModel.password, [Validators.required,
         Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/g)]],
      confirmPassword: [this.userRegisterModel.confirmPassword, [Validators.required,
         Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/g)]],
      notifEyeUsername: [this.userRegisterModel.notifEyeUsername, null],
      notifEyePassword: [this.userRegisterModel.notifEyePassword, null],
    },
    { validator: this.checkIfPasswordsMismatch('password', 'confirmPassword') }
  );

    config.placement = 'right';
    /*config.triggers = 'focus';*/
    this.selectedStep = 1;
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.userRegisterModel.email = params['email'];
      this.userCreateForm.patchValue({'email': params['email']});
      this.registrationToken = params['token'];

      if (this.userRegisterModel.email === undefined || this.registrationToken === undefined) {
        this.isValidForm = false;
        this.userCreationError = `The link you've provided is invalid. Please check your email for the link again`;
      }
    });
  }

  onSubmit() {

    this.passwordMatch = this.userCreateForm.get('password').value === this.userCreateForm.get('confirmPassword').value;
    if (!this.passwordMatch) {
      this.userCreationError = `Entered passwords do not match`;
    }
    this.isValidForm = this.userCreateForm.valid && this.passwordMatch;

    console.log('form validity', this.userCreateForm);

    if (this.isValidForm) {
      if (this.userCreateForm.get('isNewMaster').value === 'true') {
        const userData = this.populateRegisterNewUserModel();
        this.userManagementService.saveRegistrationData(userData);
        this.router.navigate(['/user-register/user-create/' + this.userRegisterModel.email + '/fill-details']);
      } else {
        this.userManagementService.registerExistingNotifEyeUser(this.populateRegisterExistingUserModel(), this.registrationToken)
          .then((data) => {
            localStorage.setItem('com.cdashboard.token', data);
            this.userManagementService.saveRegistrationData(this.populateRegisterExistingUserModel());
            this.router.navigate(['/user-register/user-create/' + this.userRegisterModel.email + '/fill-details']);
          })
          .catch((error: Error) => {
            this.isValidForm = false;
            this.userCreationError = error.message;
          });
      }

    }
  }

  onPrevious($event) {
    console.log($event);
    this.router.navigate(['user-register']);
  }

  private populateRegisterNewUserModel(): object {
    return {
      dashboardUserName: this.userRegisterModel.email,
      dashboardPassword: this.commonSharedService.getEncodedPassword(this.userCreateForm.get('password').value),
      email: this.userRegisterModel.email,
      productName: 'NotifEye',
      firstName: this.userCreateForm.get('firstName').value,
      lastName: this.userCreateForm.get('lastName').value,
      isNewMaster: true,
      registrationToken: this.registrationToken
    };
  }

  private populateRegisterExistingUserModel(): object {
    return {
      dashboardUserName: this.userRegisterModel.email,
      dashboardPassword: this.commonSharedService.getEncodedPassword(this.userCreateForm.get('password').value),
      productName: 'NotifEye',
      email: this.userRegisterModel.email,
      notifeyeUserName: this.userCreateForm.get('notifEyeUsername').value,
      notifeyePassword: this.commonSharedService.getEncodedPassword(this.userCreateForm.get('notifEyePassword').value),
      isNewMaster: false,
    };
  }

  onNext($event) {
    console.log('not implemented yet');
  }

  masterChange() {
    if (this.userCreateForm.get('isNewMaster').value === 'true') {
      this.userCreateForm.get('firstName').setValidators([Validators.required]);
      this.userCreateForm.get('lastName').setValidators([Validators.required]);
      this.userCreateForm.get('notifEyeUsername').clearValidators();
      this.userCreateForm.get('notifEyePassword').clearValidators();
      this.userCreateForm.updateValueAndValidity();
    } else {
      this.userCreateForm.get('firstName').clearValidators();
      this.userCreateForm.get('firstName').updateValueAndValidity();
      this.userCreateForm.get('lastName').clearValidators();
      this.userCreateForm.get('lastName').updateValueAndValidity();
      this.userCreateForm.get('notifEyeUsername').setValidators([Validators.required]);
      this.userCreateForm.get('notifEyeUsername').updateValueAndValidity();
      this.userCreateForm.get('notifEyePassword').setValidators([Validators.required]);
      this.userCreateForm.get('notifEyePassword').updateValueAndValidity();
    }
  }
  checkIfPasswordsMismatch(passwordKey: string, confirmPasswordKey: string) {
    return(userCreateForm: FormGroup) => {
      let pwd = userCreateForm.controls[passwordKey],
        confirmPwd = userCreateForm.controls[confirmPasswordKey];
        if (pwd.value !== confirmPwd.value) {
          return confirmPwd.setErrors({ notEquivalent: true, Validators: 'required'});
        }
    }
  }
}
