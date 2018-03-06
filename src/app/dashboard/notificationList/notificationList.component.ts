import { Component, OnInit,Input, Output,ViewChild ,EventEmitter, TemplateRef } from '@angular/core';
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
  private doFilterByStatus: string = '';
  @ViewChild('nDateColTmpl') nDateColTmpl: TemplateRef<any>;
  @ViewChild('sTypeColTmpl') sTypeColTmpl: TemplateRef<any>;

  showPopup = false;
  modalMessage ='';



  constructor(private route: ActivatedRoute, private router: Router, private _location: Location) {

    this.route.params.subscribe((params) => {
      this.statusParam = params.status.replace(/-/g, ' ').trim();

      console.log('::::routeparam::', this.statusParam);
    });

    this.items = this.rows;

  }

  ngOnInit() {

    this.doFilterByStatus = this.statusParam;
    this.filterByStatus();
    this.columns.push({ prop: 'name', name: 'Name'});
    this.columns.push({ prop: 'notificationType', name: 'Notification Type' });
    this.columns.push({ prop: 'deviceType', name: 'Device Type' });
    this.columns.push({ prop: 'reading', name: 'Reading' });
    this.columns.push({ prop: 'notificationDate', name: 'Notification Date', cellTemplate: this.nDateColTmpl });
    this.columns.push({ prop: 'type', name: 'Sent Type', cellTemplate: this.sTypeColTmpl });
    this.columns.push({ prop: 'status', name: 'Status' });
  }

  filterByStatus() {
    const criteria = this.doFilterByStatus.toLowerCase();
    this.rows = this.items;
    if (criteria !== '') {
      this.rows = this.rows.filter((item) => {
        switch (criteria) {
          case 'alerts':
            return (item.type.toLowerCase() === 'alerts') ? item : "";
          case 'lowbattery':
            return (item.type.toLowerCase() === 'lowbattery') ? item : "";
          case 'advanced':
            return (item.type.toLowerCase() === 'advanced') ? item : "";
          case 'missedCommunication':
            return (item.type.toLowerCase() === 'missedCommunication') ? item : "";
          default: return item;
        }
      });
    }
  }


  goToPrevPage() {
    this.router.navigate(['dashboard']);

  }

  showNotification(row) {
    console.log('::::::::::::', row);
    this.showPopup = true;
    this.modalMessage = row.email;
  }

  modalClosed(event) {
    console.log(event);
    this.showPopup = false;
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
      "type": "alerts",
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
      "type": "lowbattery",
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
      "type": "missedCommunication",
      "status": "EMAIL Sent"
    },
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
      "type": "alerts",
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
      "type": "lowbattery",
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
      "type": "missedCommunication",
      "status": "EMAIL Sent"
    },
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
      "type": "alerts",
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
      "type": "lowbattery",
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
      "type": "missedCommunication",
      "status": "EMAIL Sent"
    }
  ];


}
