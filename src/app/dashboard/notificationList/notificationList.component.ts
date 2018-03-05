import { Component, OnInit,Input, Output,ViewChild ,EventEmitter} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataTableComponent } from '../../shared/components/dataTable/dataTable.component';
import { TableColumn } from '@swimlane/ngx-datatable';
import {Location} from "@angular/common";

@Component({
  selector: 'app-notificationList',
  templateUrl: './notificationList.component.html',
  styleUrls: ['./notificationList.component.scss']
})
export class NotificationListComponent implements OnInit {



  private columns: Array<any> = [];
  private limit: number = 10;
  public items: Array<any> = null;
  private statusParam: string = null;


  constructor(private route: ActivatedRoute, private router: Router, private _location: Location) {

    /*this.route.params.subscribe((params) => {
      this.statusParam = params.status.replace(/-/g, ' ').trim();
    });*/

  }

  ngOnInit() {

    this.columns.push({ prop: 'name', name: 'name'});
    this.columns.push({ prop: 'notificationType', name: 'notificationType' });
    /*this.columns.push({ prop: 'subscription', name: 'Subscription' });
    this.columns.push({ prop: 'expiryDate', name: 'Renewal Date', cellTemplate: this.renewalColTmpl });
    this.columns.push({ prop: 'contactName', name: 'Contact Name' });
    this.columns.push({ prop: 'contactNumber', name: 'Contact Number', cellTemplate: this.phoneColTmpl });
    this.columns.push({ prop: 'contactEmail', name: 'Contact Email', cellTemplate: this.emailColTmpl });
    this.columns.push({ prop: 'numberOfSensors', name: 'Sensors', cellTemplate: this.sensorsColTmpl });
    this.columns.push({ prop: 'amount', name: 'Amount', cellTemplate: this.amountColTmpl });*/
  }

  rows = [
    {
      "notificationID": 1,
      "name": "1.2 1153232008 Temp Walk in Frig #1",
      "notificationType": "Advanced",
      "deviceID": 3,
      "deviceName": "Sensor",
      "deviceType": "Application",
      "reading": "435.6° F",
      "notificationDate": "2018-02-17T12:53:49.1382867-05:00",
      "text": "sample string 8",
      "sentNotificationID": 9,
      "userID": 10,
      "userName": "Cooper One",
      "smsNumber": "+1 123 456 7890",
      "email": "cooper@cooper.com",
      "type": "alert",
      "status": "EMAIL Sent"
    },{
      "notificationID": 1,
      "name": "1.2 1153232008 Temp Walk in Frig #1",
      "notificationType": "Advanced",
      "deviceID": 3,
      "deviceName": "Sensor",
      "deviceType": "Application",
      "reading": "435.6° F",
      "notificationDate": "2018-02-17T12:53:49.1382867-05:00",
      "text": "sample string 8",
      "sentNotificationID": 9,
      "userID": 10,
      "userName": "Cooper One",
      "smsNumber": "+1 123 456 7890",
      "email": "cooper@cooper.com",
      "type": "battery",
      "status": "SMS Sent"
    },{
      "notificationID": 1,
      "name": "1.2 1153232008 Temp Walk in Frig #1",
      "notificationType": "Advanced",
      "deviceID": 3,
      "deviceName": "Gateway",
      "deviceType": "Application",
      "reading": "435.6° F",
      "notificationDate": "2018-02-17T12:53:49.1382867-05:00",
      "text": "sample string 8",
      "sentNotificationID": 9,
      "userID": 10,
      "userName": "Cooper One",
      "smsNumber": "+1 123 456 7890",
      "email": "cooper@cooper.com",
      "type": "advanced",
      "status": "SMS Sent"
    },{
      "notificationID": 1,
      "name": "1.2 1153232008 Temp Walk in Frig #1",
      "notificationType": "Advanced",
      "deviceID": 3,
      "deviceName": "Gateway",
      "deviceType": "Application",
      "reading": "435.6° F",
      "notificationDate": "2018-02-17T12:53:49.1382867-05:00",
      "text": "sample string 8",
      "sentNotificationID": 9,
      "userID": 10,
      "userName": "Cooper One",
      "smsNumber": "+1 123 456 7890",
      "email": "cooper@cooper.com",
      "type": "alert",
      "status": "EMAIL Sent"
    }
  ];


}
