import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LoginSandbox } from './login.sandbox';
import * as store             from '../../shared/store';
import { Store }              from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { AlertSandbox } from '../../shared/components/alerts/alerts.sandbox';


@Component({
  selector: 'app-login',
  styleUrls: ['./login.component.scss'],
  templateUrl: './login.component.html',
  providers: [LoginSandbox, AlertSandbox],
})
export class LoginComponent implements OnInit {
  private myform: FormGroup;
  anonymousPayments: FormGroup;
  invalidInvoice = false;
  constructor(
    public loginSandbox$: LoginSandbox,
    private translate: TranslateService,
    private alertSandbox: AlertSandbox
  ) {
    this.translate.use('en');
  }

  ngOnInit(){
    this.myform = new FormGroup({
      username: new FormControl('', [Validators.required, Validators.minLength(3),Validators.maxLength(50)]),
      password: new FormControl('', [Validators.required]),
    });

    this.anonymousPayments = new FormGroup( {
      invoiceId: new FormControl('', [Validators.required])
    });
  }

  onSubmit() {
    if (this.myform.valid) {
      console.log("form is valid");
      console.log(this.loginSandbox$.doLogin(this.myform));
    } else {
      console.log(this.myform);
      this.alertSandbox.showAlert({data: "Invalid Login", autohide: false});
    }
  }

  submitAnonymousPayment() {
    if (this.anonymousPayments.valid) {
      alert('valid invoice id');
    } else {
      this.invalidInvoice = true;
    }
  }

  catchLanguage(lang) {
    this.translate.setDefaultLang(lang);
    this.translate.use(lang);
  }
}
