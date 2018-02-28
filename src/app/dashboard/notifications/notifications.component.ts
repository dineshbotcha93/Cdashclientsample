import { Component, OnInit, Output, EventEmitter, Input ,TemplateRef} from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { SensorSummaryService } from '../sensor-summary/services/sensor-summary.service';


@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss'],
  providers: [SensorSummaryService]
})
export class NotificationsComponent implements OnInit {


  notificationOverviewObject: any = [];
  modalObject: any = [];

  modalRef: BsModalRef;
  constructor(private modalService: BsModalService,
    private sensorSummaryService: SensorSummaryService) { }

   openModal(notifiy,template: TemplateRef<any>) {

     console.log(notifiy);
     this.modalObject = [];

     this.modalObject = {
       email:notifiy.email,
       smsNumber:notifiy.smsNumber,
       text:'<table border="0" cellpadding="0" cellspacing="0" width="100%"> <tbody> <tr> <td align="middle"> <table border="0" cellpadding="0" cellspacing="0" style="border-bottom: #333 1px solid; border-left: #333 1px solid; background-color: #ffffff; border-top: #333 1px solid; border-right: #333 1px solid" width="620"> <tbody> <tr> <td style="text-align: center; padding-bottom: 0px; margin: 0px; padding-left: 0px; padding-right: 0px; padding-top: 0px" valign="top"> <img alt="NotifEye" border="0" src="http://monitoring.notifeyewireless.com/Content/images/logo.png" /></td> </tr> <tr> <td> <table border="0" cellpadding="0" cellspacing="0" width="100%"> <tbody> <tr> <td align="left" style="padding-bottom: 10px; padding-left: 0px; padding-right: 20px; padding-top: 10px" valign="top" width="370"> <p style="padding-bottom: 0px; margin: 10px 0px 0px 20px; padding-left: 0px; padding-right: 0px; font-family: arial; color: ##334873; font-size: 18px; padding-top: 0px"> <strong>NotifEye</strong></p> <p style="margin: 0px"> &nbsp;</p> <p style="font-family: arial; color: #333; margin-left: 20px; font-size: 12px"> Hiro Adachi<br /><br />Gateway: Base Station - 1607990267<br />Gateway Type: Base Station<br />Network: Temp Sensor<br />Date: 1/5/2018 7:36 PM<br />Reading: Inactivity Alert.<br />WARNING! INTERNET CONNECTION LOST- POSSIBLE POWER FAILURE<br /></p> <p style="font-family: arial; color: #333; margin-left: 20px; font-size: 12px"> &nbsp;</p> <p style="font-family: arial; color: #333; margin-left: 20px; font-size: 12px"> This email address is not monitored.&nbsp; Please do not respond to this message.</p> <div style="margin-top: -40px; margin-left: 250px"> &nbsp;</div> </td> </tr> </tbody> </table> </td> </tr> </tbody> </table> </td> </tr> </tbody> </table>',
       userName:notifiy.userName,
     };
   //  console.log(this.modalObject);
    this.modalRef = this.modalService.show(template);

  }

  ngOnInit() {

    console.log('hitting senty notofication');
     console.log(this.sensorSummaryService.getSentNotificationsDetails());

    this.notificationOverviewObject = [
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
        "type": "EMAIL",
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
        "type": "SMS",
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
        "type": "SMS",
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
        "type": "EMAIL",
        "status": "EMAIL Sent"
      }
    ];

    console.log('after sample json');
  }
}
