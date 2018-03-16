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
    notifEyePassword: '',
    productName: ''
  };
  isValidForm = true;
  passwordMatch = false;
  userCreateForm: FormGroup;
  selectedStep: number;
  userCreationError: string|null = null;
  userName: string|null = null;
  registrationToken = 'neJZu1bFakP44zrpk9s3WrpbO0Y+Boeoz6pLYzQD87E=';

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
      this.registrationToken = params['token'];
    });
  }

  onSubmit() {

    this.passwordMatch = this.userCreateForm.get('password').value === this.userCreateForm.get('confirmPassword').value;
    this.isValidForm = this.userCreateForm.valid && this.passwordMatch;

    if (this.isValidForm) {
      this.userManagementService.registerExistingNotifEyeUser(this.populateRegisterExistingUserModel(), this.registrationToken)
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

  private populateRegisterExistingUserModel(): object {
    return {
      dashboardUserName: this.userRegisterModel.email,
      dashboardPassword: this.commonSharedService.getEncodedPassword(this.userCreateForm.get("password").value),
      productName: 'NotifEye',
      email: this.userRegisterModel.email,
      notifeyeUserName: this.userCreateForm.get("notifEyeUsername").value,
      notifeyePassword: this.commonSharedService.getEncodedPassword(this.userCreateForm.get("notifEyePassword").value)
    };
  }

  onNext($event) {
    console.log('not implemented yet');
  }

  masterChange($event) {
    if (!this.userRegisterModel.isNewMaster) {

    }
  }
}
