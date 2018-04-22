import { Component, ViewChild, OnInit, TemplateRef } from '@angular/core';
import { Http } from '@angular/http';
import {Location} from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerDetailsService } from './services/customer-details.service';

export interface NetworkData {
  csNetID: string;
  name: string;
  address: string;
  gateways: string;
  sensors: string;
}
export interface SensorsData {
  sensorID: string;
  sensorName: string;
  csNetID: string;
}
export interface GatewaysData {
  gatewayID: string;
  name: string;
  csNetID: string;
}
export interface UsersData {
  name: string;
  Notification: string;
  admin: boolean;
}
@Component({
  selector: 'app-customer-details',
  templateUrl: './customer-details.component.html',
  styleUrls: ['./customer-details.component.scss'],
  providers: [CustomerDetailsService]
})
export class CustomerDetailsComponent implements OnInit {
  @ViewChild('isAdminColTmpl') isAdminColTmpl: TemplateRef<any>;
  @ViewChild('notificationColTmpl') notificationColTmpl: TemplateRef<any>;
  private responseData: Object = null;
  private customerData: Object = null;
  private networkRows: Array<NetworkData> = null;
  private networkColumns: Array<any> = [];
  private tempSensorsRows: Array<SensorsData> = null;
  public sensorsRows: Array<SensorsData> = null;
  private sensorsColumns: Array<any> = [];
  private gatewaysRows: Array<GatewaysData> = null;
  private tempGatewaysRows: Array<GatewaysData> = null;
  private gatewaysColumns: Array<any> = [];
  private usersRows: Array<UsersData> = null;
  private usersColumns: Array<any> = [];
  private AccountIdParam: number = null;
  private doFilterByNetwork: string = 'select';
  private doFilterByGateway: string = 'select';
  private loadedStatuses = false;
  private labelRenewal: string = null;
  private isSubscriptionExpired: Boolean = false;
  private expiryDate: Date = null;


  constructor(private customerDetailsService: CustomerDetailsService,
    private route: ActivatedRoute, private router: Router, private _location: Location) {
    this.route.params.subscribe((params) => {
      this.AccountIdParam = params.id.trim();
    });
  }

  ngOnInit() {
    this.getCustomerData();
    this.prepareNetworkColumns();
    this.prepareSensorsColumns();
    this.prepareGatewaysColumns();
    this.prepareUsersColumns();
    this.doFilterByGateway = 'select';
    this.doFilterByNetwork = 'select';
  }

  goToPrevPage() {
    this._location.back();
  }
  private getCustomerData() {
    this.customerDetailsService.getRealData(this.AccountIdParam).then((result) => {
      this.customerData = result.customer;
      this.expiryDate = new Date(result.customer.expiryDate);
      this.networkRows = result.networks;
      this.sensorsRows = result.sensors;
      this.tempSensorsRows = result.sensors;
      this.gatewaysRows = result.gateways;
      this.tempGatewaysRows = result.gateways;
      this.usersRows = result.users;
      this.responseData = result;
      this.updateRenewalLabel();
      this.loadedStatuses = true;
    });
  }

  private prepareNetworkColumns() {
    this.networkColumns.push({ prop: 'csNetID', name: 'Network Id' });
    this.networkColumns.push({ prop: 'name', name: 'Name' });
    this.networkColumns.push({ prop: 'Address', name: 'Address' });
    this.networkColumns.push({ prop: 'CountofGateways', name: 'Gateways' });
    this.networkColumns.push({ prop: 'CountOfSensors', name: 'Sensors' });
  }

  private prepareSensorsColumns() {
    this.sensorsColumns.push({ prop: 'sensorID', name: 'Sensor Id' });
    this.sensorsColumns.push({ prop: 'sensorName', name: 'Sensor Name' });
  }

  private prepareGatewaysColumns() {
    this.gatewaysColumns.push({ prop: 'gatewayID', name: 'Gateway ID' });
    this.gatewaysColumns.push({ prop: 'name', name: 'Gateway Name' });
  }

  private prepareUsersColumns() {
    this.usersColumns.push({ prop: 'name', name: 'Name' });
    // this.usersColumns.push({prop: 'Email', name: 'Notification'});
    this.usersColumns.push({ prop: 'NotificationTypes', name: 'Notification', cellTemplate: this.notificationColTmpl });
    this.usersColumns.push({ prop: 'admin', name: 'Admin', cellTemplate: this.isAdminColTmpl });
  }

  filterByNertwork() {
    const criteria = this.doFilterByNetwork ? this.doFilterByNetwork.toLowerCase() : 'select';
    if (criteria !== 'all') {
      this.sensorsRows = this.tempSensorsRows.filter((item) => item.csNetID.toString() === criteria);
    } else {
      this.sensorsRows = this.tempSensorsRows;
    }
  }

  filterByGateway() {
    const criteria = this.doFilterByGateway ? this.doFilterByGateway.toLowerCase() : 'select';
    if (criteria !== 'all') {
      this.gatewaysRows = this.tempGatewaysRows.filter((item) => item.csNetID.toString() === criteria);
    } else {
      this.gatewaysRows = this.tempGatewaysRows;
    }
  }

  private updateRenewalLabel() {
    if (this.expiryDate.getTime() > new Date().getTime()) {
      this.labelRenewal = 'Due on';
      this.isSubscriptionExpired = false;
    } else {
      this.labelRenewal = 'Overdue by';
      this.isSubscriptionExpired = true;
    }
  }
  
}
