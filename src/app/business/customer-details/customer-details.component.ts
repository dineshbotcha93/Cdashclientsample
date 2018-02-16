import { Component, ViewChild, OnInit, TemplateRef } from '@angular/core';
import { Http } from '@angular/http';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerDetailsService } from './services/customer-details.service';

export interface NetworkData {
  NetworkId: string;
  Name: string;
  Address: string;
  Gateways: string;
  Sensors: string;
}
export interface SensorsData {
  SensorID: string;
  SensorName: string;
  NetworkID: string;
}
export interface GatewaysData {
  GatewayID: string;
  GatewayName: string;
  NetworkID: string;
}
export interface UsersData {
  Name: string;
  Notification: string;
  IsAdmin: boolean;
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
  private idParam: string = null;
  private doFilterByNetwork: string = 'select';
  private doFilterByGateway: string = 'select';


  constructor(private customerDetailsService: CustomerDetailsService,
    private route: ActivatedRoute, private router: Router) {
    this.route.params.subscribe((params) => {
      this.idParam = params.id.trim();
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

  private getCustomerData() {
    this.customerDetailsService.getData().subscribe((result) => {
      this.customerData = result[0];
      this.networkRows = result[0].Networks;
      this.sensorsRows = result[0].Sensor;
      this.tempSensorsRows = result[0].Sensor;
      this.gatewaysRows = result[0].Gateway;
      this.tempGatewaysRows = result[0].Gateway;
      this.usersRows = result[0].Users;
    });
  }

  private prepareNetworkColumns() {
    this.networkColumns.push({ prop: 'Id', name: 'Network Id' });
    this.networkColumns.push({ prop: 'Name', name: 'Name' });
    this.networkColumns.push({ prop: 'Address', name: 'Address' });
    this.networkColumns.push({ prop: 'CountofGateways', name: 'Gateways' });
    this.networkColumns.push({ prop: 'CountOfSensors', name: 'Sensors' });
  }

  private prepareSensorsColumns() {
    this.sensorsColumns.push({ prop: 'SensorID', name: 'Sensor Id' });
    this.sensorsColumns.push({ prop: 'SensorName', name: 'Sensor Name' });
  }

  private prepareGatewaysColumns() {
    this.gatewaysColumns.push({ prop: 'GatewayID', name: 'Gateway ID' });
    this.gatewaysColumns.push({ prop: 'Name', name: 'Gateway Name' });
  }

  private prepareUsersColumns() {
    this.usersColumns.push({ prop: 'Name', name: 'Name' });
    // this.usersColumns.push({prop: 'Email', name: 'Notification'});
    this.usersColumns.push({ prop: 'NotificationTypes', name: 'Notification', cellTemplate: this.notificationColTmpl });
    this.usersColumns.push({ prop: 'IsAdmin', name: 'Admin', cellTemplate: this.isAdminColTmpl });
  }

  filterByNertwork() {
    const criteria = this.doFilterByNetwork ? this.doFilterByNetwork.toLowerCase() : 'select';
    this.sensorsRows = this.tempSensorsRows.filter((item) => item.NetworkID.toLowerCase() == criteria);
  }

  filterByGateway() {
    const criteria = this.doFilterByGateway ? this.doFilterByGateway.toLowerCase() : 'select';
    this.gatewaysRows = this.tempGatewaysRows.filter((item) => item.NetworkID.toLowerCase() == criteria);
  }
}
