import { Component, ViewChild, OnInit, AfterViewInit, TemplateRef, ElementRef, group, ViewContainerRef } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DataTableComponent } from '../shared/components/dataTable/dataTable.component';
import { TableColumn } from '@swimlane/ngx-datatable';
import {Angular2Csv} from 'angular2-csv/Angular2-csv';
import {Location, AsyncPipe} from '@angular/common';
import {UserProfileService} from './services/user-profile.service';
import { FillDetailsService } from '../user-management/user-create/fill-details/fill-details.service';
import { UserProfile } from './user.module';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { CommonSharedService } from '../shared/services/common-shared.service';
declare var $: any;

export interface NetworkData {
  networkID: number;
  networkName: string;
  canAccess: boolean;
}
export interface PaymentHistoryData {
  //sno: string;
  //  expiryDate: string;
  newRenewalDate: string;
  invoiceDownloadLink: string;
  historyDate: string;
  totalAmount: string;
  customerName: string;
  //StripeChargeID:
}
export interface UserData {
  name: string;
  Notification: string;
  admin: boolean;
  userName: string;
  password: string;
  firstName: string;
  lastName: string;
  userID: number;
}

export interface AccountData {
  accountID: number;
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
  resellerID: number;
  smsNumber: string;
  state: string;
  subscriptionExpiry: string;
  subscriptionID: string;
  subscriptionType: string;
  timeZone: string;
  timeZoneID: number;
  userFullName: string;
  userID: string;
  userName: string;
}

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
  providers: [UserProfileService, FillDetailsService]
})

export class UserProfileComponent implements OnInit, AfterViewInit {
  @ViewChild('isAdminColTmpl') isAdminColTmpl: TemplateRef<any>;
  @ViewChild('notificationColTmpl') notificationColTmpl: TemplateRef<any>;
  @ViewChild('invoiceColTmpl') invoiceColTmpl: TemplateRef<any>;
  @ViewChild('prevRenewalDateColTmpl') prevRenewalDateColTmpl: TemplateRef<any>;
  @ViewChild('newRenewalDateColTmpl') newRenewalDateColTmpl: TemplateRef<any>;
  @ViewChild('amountColTmpl') amountColTmpl: TemplateRef<any>;
  @ViewChild('actionsColTmpl') actionsColTmpl: TemplateRef<any>;
  private responseData: Object = null;
  private accountData: Array<AccountData> = [];
  private UpdateAccountData: Array<AccountData> = [];
  private networkData: Array<NetworkData> = [];
  private userRows: Array<UserData> = null;
  private userColumns: Array<any> = [];
  private renewalRows: Array<PaymentHistoryData> = null;
  private renewalColumns: Array<any> = [];
  private loggedInUserId: number;
  private editRecordUserId: number;
  private newRecordUserId: number;
  private myNetworks: Array<any> = [];
  private loadPage: Boolean = false;
  private isShowUserTable: Boolean = true;
  private labelRenewal: string = null;
  private expiryDate: Date = null;
  private isNotifBtn: Boolean = false;
  private isNetworkBtn: Boolean = false;
  private isUserContentCollapsed: Boolean = false;
  private isNotifContentCollapsed: Boolean = true;
  private isNetworkContentCollapsed: Boolean = true;
  private isProfileContentCollapsed: Boolean = false;
  private isNetworksContentCollapsed: Boolean = true;
  private isUserFormValid: Boolean = false;
  private isDirectSMS: Boolean = false;
  private isCountryCode: Boolean = false;
  private isAdmin: Boolean = true;
  private limit = 10;
  private timeZones: Array<object> = [];
  private accId: number;
  private isEditForm: Boolean = false;
  // private pwdPattern = '^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$';

  userForm = this.fb.group({
    dashboardUserName: new FormControl('', [Validators.required, Validators.email]),
    dashboardPassword: new FormControl('', [Validators.required, Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/g)]),
    confirmPassword: new FormControl('', [Validators.required, Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/g)]),
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    isAdmin: new FormControl('')
  },
    { validator: this.checkIfPasswordsMismatch('dashboardPassword', 'confirmPassword') }
  );
  notificationForm = this.fb.group({
    directSMS: new FormControl(''),
    smsCarrierID: new FormControl(''),
    countryCode: new FormControl(''),
    smsNumber: new FormControl(''),
    recievesSensorNotificationByText: new FormControl(''),
    recievesMaintenanceByEmail: new FormControl(''),
    recievesMaintenanceByPhone: new FormControl(''),
  }); 
  networkForm = this.fb.group({});
  editAccountForm = this.fb.group({
    accountID: new FormControl(''),
    companyName: new FormControl(''),
    resellerID: new FormControl(''),
    timeZoneID: new FormControl(''),
  });


  private user = new UserProfile.User();
  private notification = new UserProfile.Notification();
  private addressObj = new UserProfile.Address();
  private editAccount = new UserProfile.RealEditAccount();

  constructor(private userProfileService: UserProfileService, private fillDetailsService: FillDetailsService,
    private _location: Location, private ele: ElementRef, private fb: FormBuilder, private commonSharedService: CommonSharedService,
    private toastr: ToastsManager, vcr: ViewContainerRef) {
    this.toastr.setRootViewContainerRef(vcr);
  }
  ngOnInit() {
    this.updateNotifFormControls();
    this.populateTimeZones();
    this.prepareUserColumns();
    this.prepareRenewalColumns();
    this.getPaymentHistory();
  }

  ngAfterViewInit() {
    this.getUserProfileData();
   // this.updateNotifFormControls();
  }

  private populateTimeZones() {
    this.fillDetailsService.getTimeZones().subscribe((e) => {
      e[0].forEach((tZ) => {
        this.timeZones.push({ id: tZ.TimeZoneID, name: tZ.DisplayName });
      });
    });
  }
  private getUserProfileData() {
    this.userProfileService.getRealData().then(response => {
      this.responseData = response.user;
      this.loggedInUserId = response.user.userID;
      this.userRows = response.users;
      this.accountData = response.user.account[0];
      this.accId = response.user.account[0].accountID;
      this.UpdateAccountData = response.user.account;
      this.isAdmin = response.user.admin;
      this.expiryDate = new Date(response.user.account[0].subscriptionExpiry);
      this.updateRenewalLabel();
      this.loadPage = true;
    });
  }
  // private getNetworkData() {
  //   this.userProfileService.getNetworkData().then(response => {
  //     this.networkData = response;
  //   });
  // }
  saveUserData() {
    let postData = JSON.stringify(this.prepareSaveData());
    this.userProfileService.saveUserData(postData).then(response => {
      this.newRecordUserId = response;
      this.userForm.reset({});
      this.notificationForm.reset({});
      this.toastr.success('User created successfully');
      this.navigateToNetworkSection();
    })
    .catch(e => {
      this.toastr.error(e.message);
    });
  }
  private prepareSaveData() {
    let encodedPWD = this.commonSharedService
      .getEncodedPassword(this.userForm.get('dashboardPassword').value);
    this.userForm.get('dashboardPassword').setValue(encodedPWD);
    let userObj = Object.assign({}, this.userForm.value, this.notificationForm.value);
    userObj.email = this.userForm.get('dashboardUserName').value;
    delete userObj['confirmPassword'];
    userObj.account = { 'accountID': this.accId };
    userObj.recievesSensorNotificationByVoice = 0;
    userObj.productName = 'Notifeye';
    userObj.voiceNumber = '';
    if (this.notificationForm.get('directSMS').value === '1') {
      userObj.smsCarrierID = 0;
      userObj.smsNumber = this.notificationForm.get('countryCode').value + this.notificationForm.get('smsNumber').value;
    }
    delete userObj['countryCode'];
    userObj.isAdmin = (this.userForm.get('isAdmin').value === null) ? 0 : Number(this.userForm.get('isAdmin').value);
    userObj.recievesSensorNotificationByText = Number(this.notificationForm.get('recievesSensorNotificationByText').value);
    userObj.recievesMaintenanceByEmail = Number(this.notificationForm.get('recievesMaintenanceByEmail').value);
    userObj.recievesMaintenanceByPhone = Number(this.notificationForm.get('recievesMaintenanceByPhone').value);
    userObj.recievesSensorNotificationByVoice = 0;
    return userObj;
  }
  private prepareUserColumns() {
    this.userColumns.push({ prop: 'name', name: 'Name' });
    this.userColumns.push({ prop: 'NotificationTypes', name: 'Notification', cellTemplate: this.notificationColTmpl });
    this.userColumns.push({ prop: 'admin', name: 'Admin', cellTemplate: this.isAdminColTmpl });
    this.userColumns.push({ name: 'Actions', cellTemplate: this.actionsColTmpl });
  }

  private prepareRenewalColumns() {
    this.renewalColumns.push({ prop: 'historyDate', name: 'Payment Date', cellTemplate: this.prevRenewalDateColTmpl });
    this.renewalColumns.push({ prop: 'newRenewalDate', name: 'Renewed Till', cellTemplate: this.newRenewalDateColTmpl });
    this.renewalColumns.push({ prop: 'totalAmount', name: 'Amount Paid', cellTemplate: this.amountColTmpl });
    this.renewalColumns.push({ prop: 'customerName', name: 'Paid By' });
    this.renewalColumns.push({ prop: 'invoiceDownloadLink', name: 'Receipts', cellTemplate: this.invoiceColTmpl });
  }

  private updateRenewalLabel() {
    if (this.expiryDate.getTime() > new Date().getTime()) {
      this.labelRenewal = 'Due on';
    } else {
      this.labelRenewal = 'Overdue by';
    }
  }
  addUser() {
    this.userForm.reset({});
    this.notificationForm.reset({});
    this.isShowUserTable = false;
    this.isEditForm = false;
    this.updateNotifFormControls();
    window.scrollTo(0, document.documentElement.offsetHeight);
  }
  showEditUserForm(userId) {
    this.isShowUserTable = false;
    let row: Array<UserData> = null;
    row = this.userRows.filter(item => item.userID === userId);
    this.populateUserEditForm(row);
    this.populateNotifEditForm(row);
    this.isEditForm = true;
    this.editRecordUserId = userId;
  }
  private populateUserEditForm(row) {
    let userObj = new UserProfile.User();
    userObj.dashboardUserName = row[0].emailAddress;
    userObj.dashboardPassword = '123456A@';
    userObj.confirmPassword = '123456A@';
    userObj.firstName = row[0].firstName;
    userObj.lastName = row[0].lastName;
    userObj.isAdmin = row[0].admin;
    this.userForm.setValue(userObj);
  }
  private populateNotifEditForm(row) {
    let notifObj = new UserProfile.Notification;
    notifObj.directSMS = Number(row[0].directSMS);
    notifObj.smsCarrierID = row[0].smsCarrierID;
    notifObj.smsNumber = row[0].smsNumber;
    notifObj.countryCode = '91';//---Remove HardCODE---
    notifObj.recievesSensorNotificationByText = row[0].recievesNotificaitonsBySMS;
    notifObj.recievesMaintenanceByEmail = row[0].recievesMaintenanceByEmail;
    notifObj.recievesMaintenanceByPhone = row[0].recievesMaintenanceBySMS;
    this.notificationForm.setValue(notifObj);
    if (row[0].directSMS === false) {
      this.isDirectSMS = false;
      this.isCountryCode = false;
      this.notificationForm.controls['smsCarrierID'].setValue(notifObj.smsCarrierID, { onlySelf: true });
    } else {
      this.isDirectSMS = true;
      this.isCountryCode = true;
    }
  }
  updateUserData() {
   let postData = JSON.stringify(this.prepareUpdateData());
    console.log(postData);
    this.userProfileService.updateUserData(postData).then(response => {
      this.userForm.reset({});
      this.notificationForm.reset({});
      this.toastr.success('User updated successfully');
      this.showUsersTab();
    });
  }
  private prepareUpdateData() {
    let pwd = this.userForm.get('dashboardPassword').value;
    if (pwd !== '123456A@') {
    let encodedPWD = this.commonSharedService
      .getEncodedPassword(pwd);
      this.userForm.get('dashboardPassword').setValue(encodedPWD);
    }
    else {
      this.userForm.get('dashboardPassword').setValue('');
    }
    
    let userObj = Object.assign({}, this.userForm.value, this.notificationForm.value);
    userObj.email = this.userForm.get('dashboardUserName').value;
    delete userObj['confirmPassword'];
    userObj.account = { 'accountID': this.accId };
    if (this.notificationForm.get('directSMS').value === '1') {
      userObj.smsCarrierID = 0;
      userObj.smsNumber = this.notificationForm.get('countryCode').value + this.notificationForm.get('smsNumber').value;
    }
    delete userObj['countryCode'];
    userObj.isAdmin = (this.userForm.get('isAdmin').value === null) ? 0 : Number(this.userForm.get('isAdmin').value);
    userObj.recievesSensorNotificationByText = Number(this.notificationForm.get('recievesSensorNotificationByText').value);
    userObj.recievesMaintenanceByEmail = Number(this.notificationForm.get('recievesMaintenanceByEmail').value);
    userObj.recievesMaintenanceByPhone = Number(this.notificationForm.get('recievesMaintenanceByPhone').value);
    userObj.userID = this.editRecordUserId;
    userObj.networkPermissions = [];
    return userObj;
  }
  showUsersTab() {
    this.isShowUserTable = true;
  }
  scrollPageDown() {
    window.scrollTo(0, document.documentElement.offsetHeight);
  }
  goToPrevPage() {
    this._location.back();
  }
  toggleContent(e) {
    let section = e.currentTarget.attributes.section.value;
    this.isUserContentCollapsed = true;
    this.isNotifContentCollapsed = true;
    this.isNetworkContentCollapsed = true;
    if (section === 'user-content') {
      this.isUserContentCollapsed = false;
    } else if (section === 'notif-content') {
      this.isNotifContentCollapsed = false;
    } else if (section === 'network-content') {
      this.getNetworksByUser(this.loggedInUserId);
      this.isNetworkContentCollapsed = false;
    }
  }

  toggleProfileContent(e) {
    let section = e.currentTarget.attributes.section.value;
    this.isProfileContentCollapsed = true;
    this.isNetworksContentCollapsed = true;
    if (section === 'profile-content') {
      this.isProfileContentCollapsed = false;
    } else if (section === 'networks-content') {
      this.isNetworksContentCollapsed = false;
      this.getNetworksByUser(this.loggedInUserId);
    }

  }

  navigateToNotifSection() {
    if (this.userForm.invalid) {
      return;
    }
    this.isUserFormValid = true;
    this.user = this.userForm.value;
    //console.log(this.user);
    this.isUserContentCollapsed = true;
    this.isNotifContentCollapsed = false;
    this.isNotifBtn = true;
  }

  navigateToNetworkSection() {
    this.getNetworksByUser(this.loggedInUserId);
    this.isNotifContentCollapsed = true;
    this.isNetworkContentCollapsed = false;
    this.isNetworkBtn = true;
  }

  checkIfPasswordsMismatch(passwordKey: string, confirmPasswordKey: string) {
    return (userForm: FormGroup) => {
      let pwd = userForm.controls[passwordKey],
        confirmPwd = userForm.controls[confirmPasswordKey];
      if (pwd.value !== confirmPwd.value) {
        return confirmPwd.setErrors({ notEquivalent: true, Validators: 'required' });
      } else {
        // return confirmPwd.setErrors(null);
      }
    }
  }

  private updateNotifFormControls() {
    this.notificationForm.controls['directSMS'].setValue('0', { onlySelf: true });
    this.notificationForm.controls['directSMS'].valueChanges.subscribe((value) => {
      console.log(value);
      if (value === '0') {
        this.isDirectSMS = false;
        this.isCountryCode = false;
        this.notificationForm.controls['smsCarrierID'].setValue('', { onlySelf: true });
      } else {
        this.isDirectSMS = true;
        this.isCountryCode = true;
      }
    });
  }

  populateAccountEditModal() {
    console.log(this.editAccountForm);
    let editAccountObj = new UserProfile.UpdateAccount();
    editAccountObj.accountID = this.UpdateAccountData[0].accountID;
    this.addressObj.street = this.UpdateAccountData[0].address;
    this.addressObj.housenumber = this.UpdateAccountData[0].address2;
    this.addressObj.city = this.UpdateAccountData[0].city;
    this.addressObj.zipcode = this.UpdateAccountData[0].postalCode;
    this.addressObj.state = this.UpdateAccountData[0].state;
    this.addressObj.country = this.UpdateAccountData[0].country;
    editAccountObj.companyName = this.UpdateAccountData[0].companyName,
      editAccountObj.resellerID = this.UpdateAccountData[0].resellerID,
      editAccountObj.timeZoneID = this.UpdateAccountData[0].timeZoneID,
      editAccountObj.address = this.addressObj;
    this.editAccountForm.setValue(editAccountObj);
  }
  updateAccount(accountData) {
    console.log(this.editAccountForm.value);
    let accountRecord: Array<Object> = [];
    // if (this.accountData.length > 0) {
    accountRecord.push({
      accountID: this.editAccountForm.value.accountID,
      address: this.editAccountForm.value.address.street,
      address2: this.editAccountForm.value.address.housenumber,
      city: this.editAccountForm.value.address.city,
      companyName: this.editAccountForm.value.companyName,
      country: this.editAccountForm.value.address.country,
      postalCode: this.editAccountForm.value.address.zipcode,
      resellerID: this.editAccountForm.value.resellerID,
      state: this.editAccountForm.value.address.state,
      timeZone: this.editAccountForm.value.timeZoneID
    });
    console.log(accountRecord[0]);
    // }
    this.userProfileService.updateAccountAPI(JSON.stringify(accountRecord[0])).then(response => {
      this.toastr.success('Account updated successfully');
    });
  }

  getNetworksByUser(id) {
    this.myNetworks = [];
    let userId = this.isEditForm? this.editRecordUserId : id;
    this.userProfileService.getUserNetworks(userId).then(response => {
      this.networkData = response;
      response.forEach(item => {
        this.networkForm.addControl(item.networkID, new FormControl(false));              
      });
      return response;
    }
  )
    .then((response) => {
    response.forEach(item => {
        if(item.canAccess === true) {
          let id = item.networkID;
          this.networkForm.patchValue({ id : true, tc:true});
        }
      });  
    })
    .catch(error => {
      console.log(error);
    });
  }

  getPaymentHistory() { 
    this.userProfileService.getPaymentHistoryData().then(response => {
      this.renewalRows = response;
    });
  }

  saveUserNetworkPermssions() {
    let data = this.networkForm.value;
    let selectedNetworks =  [];
    let customerId = this.isEditForm? this.editRecordUserId : this.newRecordUserId;
    Object.keys(data).forEach(function(key) {
      if(data[key] === true) {
        selectedNetworks.push(key);
      }
    });
    let postData = {
      'customerID': customerId,
      'permissionList': [],
      'networkList': selectedNetworks
    }
   this.userProfileService.postUserNetworkPermissions(postData).then(response => {
      this.showUsersTab();
      this.toastr.success('User permissions saved successfully');
      this.getUserProfileData();
    });
  }
  deleteUser(userId) {
     this.userProfileService.deleteUser(userId).then(response => {
      this.toastr.success('User removed successfully');
      this.getUserProfileData();
     });
  }
  private addFormControl(name: string, formGroup: FormGroup): void {
    this.editAccountForm.addControl(name, formGroup);
  }

  get dashboardUserName() {
    return this.userForm.get('dashboardUserName');
  }

  get dashboardPassword() {
    return this.userForm.get('dashboardPassword');
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
  get directSMS() {
    return this.notificationForm.get('directSMS');
  }
  get smsCarrierID() {
    return this.notificationForm.get('smsCarrierID');
  }
  get recievesSensorNotificationByText() {
    return this.notificationForm.get('recievesSensorNotificationByText');
  }
  get accountID() {
    return this.editAccountForm.get('accountID');
  }
  get companyName() {
    return this.editAccountForm.get('companyName');
  }
  get resellerID() {
    return this.editAccountForm.get('resellerID');
  }
  get timeZoneID() {
    return this.editAccountForm.get('timeZoneID');
  }
  get countryCode() {
    return this.notificationForm.get('countryCode');
  }
}
