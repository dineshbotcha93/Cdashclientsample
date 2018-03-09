import { Component, ViewChild, OnInit, AfterViewInit, TemplateRef, ElementRef, group} from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DataTableComponent } from '../shared/components/dataTable/dataTable.component';
import { TableColumn } from '@swimlane/ngx-datatable';
import {Angular2Csv} from 'angular2-csv/Angular2-csv';
import {Location} from '@angular/common';
import {UserProfileService} from './services/user-profile.service';
import {UserProfile} from './user-profile';
import { Url } from 'url';

export interface RenewalData {
  //sno: string;
//  expiryDate: string;
  oldRenewalDate: string;
  newRenewalDate: string;
  invoiceDownloadLink: string;
}
export interface UserData {
  name: string;
  Notification: string;
  admin: boolean;
}

export interface AccountData {
  accountID: string;
  activationDate: string;
  address: string;
  address2: string;
  city: string;
  companyName: string;
  country: string;
  emailAddress: string;
  externalSMSProvider: string;
  externalSMSProviderID: string;
  numGateways: string;
  numSensors: string;
  postalCode: string;
  resellerID: string;
  smsNumber: string;
  state: string;
  subscriptionExpiry: string;
  subscriptionID: string;
  subscriptionType: string;
  timeZone: string;
  timeZoneID: string;
  userFullName: string;
  userID: string;
  userName: string;
}



@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
  providers: [UserProfileService]
})

export class UserProfileComponent implements OnInit {
  @ViewChild('isAdminColTmpl') isAdminColTmpl: TemplateRef<any>;
  @ViewChild('notificationColTmpl') notificationColTmpl: TemplateRef<any>;
  @ViewChild('invoiceColTmpl') invoiceColTmpl: TemplateRef<any>;
  private responseData: Object = null;
  private accountData: Array<AccountData> = null;
  private userRows: Array<UserData> = null;
  private userColumns: Array<any> = [];
  private renewalRows: Array<RenewalData> = null;
  private renewalColumns: Array<any> = [];
  private loadPage: Boolean = false;
  private isShowUserTable: Boolean = true;
  private labelRenewal: string = null;
  private expiryDate: Date = null;
  private isNotifBtn: Boolean = false;
  private isNetworkBtn: Boolean = false;
  public isUserContentCollapsed: Boolean = false;
  public isNotifContentCollapsed: Boolean = true;
  public isNetworkContentCollapsed: Boolean = true;
  userForm = this.fb.group({
    userName: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    confirmPassword: new FormControl('', [Validators.required]),
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
   // notification: new FormBuilder().group({
      emailAddress: new FormControl('', Validators.required),
      admin: new FormControl(''),
      directSMS: new FormControl(''),
      smsNumber: new FormControl(''),
      recievesMaintenanceByEmail: new FormControl(''),
      recievesMaintenanceByPhone: new FormControl('')},
   // }),
 { validator: this.checkIfPasswordsMismatch('password', 'confirmPassword')}
);
  private user = new UserProfile();

  constructor(private userProfileService: UserProfileService,
  private _location: Location, private ele: ElementRef, private fb: FormBuilder) {
   // console.log(ele.nativeElement.getAttribute('section'));
  }
  ngOnInit() {
    this.getUserProfileData();
    this.prepareUserColumns();
    this.prepareRenewalColumns();
    this.getRenewalData();
  }
  private getUserProfileData() {
   this.userProfileService.getData().subscribe(response => {
     // this.customerData = response[0];
      this.userRows = response[0].users;
     // this.renewalRows = response[0].renewal;
   });

   this.userProfileService.getRealData().then(response => {
      console.log(response);
      this.responseData = response;
      this.accountData = response.account[0];
      this.expiryDate = new Date(response.account.subscriptionExpiry);
      this.updateRenewalLabel();
      //this.loadPage = true;
   });
  }
  private getRenewalData() {
    this.userProfileService.getRenewalData().then(response => {
           console.log(response);
           this.renewalRows = response;
           this.loadPage = true;
    });
  }
  private prepareUserColumns() {
    this.userColumns.push({ prop: 'name', name: 'Name' });
    this.userColumns.push({ prop: 'NotificationTypes', name: 'Notification', cellTemplate: this.notificationColTmpl});
    this.userColumns.push({ prop: 'isAdmin', name: 'Admin', cellTemplate: this.isAdminColTmpl });
  }

  private prepareRenewalColumns() {
   // this.renewalColumns.push({ prop: 'sno', name: 'Sr.No'});
   // this.renewalColumns.push({ prop: 'expiryDate', name: 'Change Date' });
    this.renewalColumns.push({ prop: 'oldRenewalDate', name: 'Previous Renewal Date'});
    this.renewalColumns.push({ prop: 'newRenewalDate', name: 'New Renewal Date'});
    this.renewalColumns.push({ prop: 'invoiceDownloadLink', name: 'Invoice', cellTemplate: this.invoiceColTmpl});
  }

  private updateRenewalLabel() {
    if (this.expiryDate.getTime() > new Date().getTime()) {
      this.labelRenewal = 'Due on';
    } else {
      this.labelRenewal = 'Overdue by';
    }
  }
  addUser() {
    this.isShowUserTable = false;
    window.scrollTo(0, document.documentElement.offsetHeight);
  }
  goToPrevPage() {
    this._location.back();
  }
  toggleContent(e) {
   let section = e.currentTarget.attributes.section.value;
    this.isUserContentCollapsed = true;
    this.isNotifContentCollapsed  = true;
    this.isNetworkContentCollapsed  = true;
    if (section === 'user-content') {
      this.isUserContentCollapsed = false;
    } else if (section === 'notif-content') {
      this.isNotifContentCollapsed  = false;
    } else {
      this.isNetworkContentCollapsed  = false;
    }
  }

  navigateToNotifSection() {
    if (this.userForm.invalid) {
     //return;
    }
    this.user = this.userForm.value;
    console.log(this.user);
    this.isUserContentCollapsed = true;
    this.isNotifContentCollapsed  = false;
    this.isNotifBtn = true;
  }

  navigateToNetworkSection() {
    this.isNotifContentCollapsed  = true;
    this.isNetworkContentCollapsed  = false;
    this.isNetworkBtn = true;
  }

  checkIfPasswordsMismatch (passwordKey: string, confirmPasswordKey: string) {
    return (userForm: FormGroup) => {
      let pwd = userForm.controls[passwordKey],
       confirmPwd = userForm.controls[confirmPasswordKey];
       if (pwd.value !== confirmPwd.value) {
          return confirmPwd.setErrors({notEquivalent: true, Validators: 'required'});
       } else {
          // return confirmPwd.setErrors(null);
       }
    }
  }
  get userName() {
    return this.userForm.get('userName');
 }

 get password() {
   return this.userForm.get('password');
 }
 get confirmPassword() {
   return this.userForm.get('confirmPassword');
 }
 get firstName() {
   return this.userForm.get('firstName');
 }
 get lastName() {
   return this.userForm.get('lastName');
 }
 get email() {
   return this.userForm.get('email');
 }
 get emailAddress() {
  return this.userForm.get('emailAddress');
}
 
}
