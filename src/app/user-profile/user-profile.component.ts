import { Component, ViewChild, OnInit, AfterViewInit, TemplateRef } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { ActivatedRoute, Router } from '@angular/router';
import { DataTableComponent } from '../shared/components/dataTable/dataTable.component';
import { TableColumn } from '@swimlane/ngx-datatable';
import {Angular2Csv} from 'angular2-csv/Angular2-csv';
import {Location} from '@angular/common';
import {UserProfileService} from './services/user-profile.service';

export interface RenewalData {
  sno: string;
  expiryDate: string;
  previousRenewalDate: string;
  newRenewalDate: string;
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
  private renewalData: Object = null;
  private userRows: Array<UserData> = null;
  private userColumns: Array<any> = [];
  private renewalRows: Array<RenewalData> = null;
  private renewalColumns: Array<any> = [];
  private loadPage: Boolean = false;
  private isShowUserTable: Boolean = true;
  private labelRenewal: string = null;
  private expiryDate: Date = null;
  constructor(private userProfileService: UserProfileService,
  private _location: Location) {
  }
  ngOnInit() {
    this.getUserProfileData();
    this.prepareUserColumns();
    this.prepareRenewalColumns();
  }
  private getUserProfileData() {
   this.userProfileService.getData().subscribe(response => {
     // this.customerData = response[0];
      this.userRows = response[0].users;
      this.renewalRows = response[0].renewal;
   });

   this.userProfileService.getRealData().then(response => {
      console.log(response);
      this.responseData = response;
      this.accountData = response.account;
      this.expiryDate = new Date(response.account.subscriptionExpiry);
      this.updateRenewalLabel();
      this.loadPage = true;
   });
  }
  private prepareUserColumns() {
    this.userColumns.push({ prop: 'name', name: 'Name' });
    this.userColumns.push({ prop: 'NotificationTypes', name: 'Notification', cellTemplate: this.notificationColTmpl});
    this.userColumns.push({ prop: 'isAdmin', name: 'Admin', cellTemplate: this.isAdminColTmpl });
  }

  private prepareRenewalColumns() {
    this.renewalColumns.push({ prop: 'sno', name: 'Sr.No'});
    this.renewalColumns.push({ prop: 'expiryDate', name: 'Change Date' });
    this.renewalColumns.push({ prop: 'previousRenewalDate', name: 'Previous Renewal Date'});
    this.renewalColumns.push({ prop: 'newRenewalDate', name: 'New Renewal Date'});
    this.renewalColumns.push({ prop: 'sno', name: 'Invoice', cellTemplate: this.invoiceColTmpl});
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
  }
  goToPrevPage() {
    this._location.back();
  }
}
