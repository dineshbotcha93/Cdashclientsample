import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { AlertSandbox } from '../../shared/components/alerts/alerts.sandbox';
import { UserManagementService } from '../user-management.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
  providers: [AlertSandbox, UserManagementService]
})
export class ForgotPasswordComponent implements OnInit {
  public isLoader: Boolean = false;
 // emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$';
 passwordResetForm = this.fb.group({
  Email: new FormControl('', [Validators.required, Validators.email])
});
  constructor(
    private router: Router,
    private alertSandbox: AlertSandbox,
    private userMgtService: UserManagementService,
    private fb: FormBuilder
  ) {
  }

  ngOnInit() {
  }

  resetPassword() {
    if (this.passwordResetForm.invalid) {
      return;
      }
      this.isLoader = true;
    this.userMgtService.resetPassword(this.passwordResetForm.value.Email)
    .then(response => {
      this.isLoader = false;
      this.alertSandbox.showSuccess({
        data: 'Success! An email has been sent with a new Password.', autohide: true});
        this.passwordResetForm.reset({});
    })
    .catch(error => {
      this.isLoader = false;
      this.alertSandbox.showAlert({
        data: error, autohide: true
      });
    });
  }
  cancel() {
    this.router.navigateByUrl('/login');
  }
  get Email() {
    return this.passwordResetForm.get('Email');
  }
}
