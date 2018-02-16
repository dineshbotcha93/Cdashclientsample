import { Component, OnInit ,Output, EventEmitter,Input } from '@angular/core';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements OnInit {


  notificationOverviewObject: any = [];

  constructor() { }

  ngOnInit() {

    this.notificationOverviewObject = [
                  {
                    "NotificationID": 1017,
                    "Name": "outoftemprange107coolers",
                    "DeviceID": 1274,
                    "DeviceName": "105Tucson",
                    "DeviceType": "Tempreture",
                    "Reading": "Duration: 191minutes<br/>CurrentReading: 32.5°F",
                    "NotificationDate": "2018-01-05T23: 48: 35",
                    "Text": '<tableborder="0"cellpadding="0"cellspacing="0"width="100%"><tbody><tr><tdalign="middle"><tableborder="0"cellpadding="0"cellspacing="0"style="border-bottom: #3331pxsolid;border-left: #3331pxsolid;background-color: #ffffff;border-top: #3331pxsolid;border-right: #3331pxsolid"width="620"><tbody><tr><tdstyle="text-align: center;padding-bottom: 0px;margin: 0px;padding-left: 0px;padding-right: 0px;padding-top: 0px"valign="top"><imgalt="NotifEye"border="0"src="http: //monitoring.notifeyewireless.com/Content/images/logo.png"/></td></tr><tr><td><tableborder="0"cellpadding="0"cellspacing="0"width="100%"><tbody><tr><tdalign="left"style="padding-bottom: 10px;padding-left: 0px;padding-right: 20px;padding-top: 10px"valign="top"width="370"><pstyle="padding-bottom: 0px;margin: 10px0px0px20px;padding-left: 0px;padding-right: 0px;font-family: arial;color: ##334873;font-size: 18px;padding-top: 0px"><strong>NotifEye</strong></p><pstyle="margin: 0px">&nbsp;</p><pstyle="font-family: arial;color: #333;margin-left: 20px;font-size: 12px">kitchenmanager107<br/><br/>Sensor: 1168112093ProductionCooler107<br/>SensorType: Temperature<br/>Network: 107MyrtleBeach<br/>Date: 1/5/20184: 48PM<br/>Reading: Duration: 191minutes<br/>CurrentReading: 32.5°F<br/>outoftemprange107<br/></p><pstyle="font-family: arial;color: #333;margin-left: 20px;font-size: 12px">&nbsp;</p><pstyle="font-family: arial;color: #333;margin-left: 20px;font-size: 12px">Thisemailaddressisnotmonitored.&nbsp;Pleasedonotrespondtothismessage.</p><divstyle="margin-top: -40px;margin-left: 250px">&nbsp;</div></td></tr></tbody></table></td></tr></tbody></table></td></tr></tbody></table>',
                    "SentNotificationID": 592990,
                    "UserID": 399,
                    "UserName": "kitchenLastName",
                    "SMSNumber": null,
                    "Email": "Reclamationbin@gmail.com",
                    "Type": "Email",
                    "Status": "EmailSent"
                  },
                   {
                  "NotificationID": 1161,
                  "Name": "Thamm",
                  "DeviceID": 1160073136,
                  "DeviceName": "Beer Cooler",
                  "DeviceType": "Commercial",
                  "Reading": "Inactivity Alert.",
                  "NotificationDate": "2018-01-05T23:59:53.84",
                  "Text": '<table border="0" cellpadding="0" cellspacing="0" width="100%"> <tbody> <tr> <td align="middle"> <table border="0" cellpadding="0" cellspacing="0" style="border-bottom: #333 1px solid; border-left: #333 1px solid; background-color: #ffffff; border-top: #333 1px solid; border-right: #333 1px solid" width="620"> <tbody> <tr> <td style="text-align: center; padding-bottom: 0px; margin: 0px; padding-left: 0px; padding-right: 0px; padding-top: 0px" valign="top"> <img alt="NotifEye" border="0" src="http://monitoring.notifeyewireless.com/Content/images/logo.png" /></td> </tr> <tr> <td> <table border="0" cellpadding="0" cellspacing="0" width="100%"> <tbody> <tr> <td align="left" style="padding-bottom: 10px; padding-left: 0px; padding-right: 20px; padding-top: 10px" valign="top" width="370"> <p style="padding-bottom: 0px; margin: 10px 0px 0px 20px; padding-left: 0px; padding-right: 0px; font-family: arial; color: ##334873; font-size: 18px; padding-top: 0px"> <strong>NotifEye</strong></p> <p style="margin: 0px"> &nbsp;</p> <p style="font-family: arial; color: #333; margin-left: 20px; font-size: 12px"> Tyrone Hamm<br /><br />Sensor: Beer Cooler<br />Sensor Type: Temperature<br />Network: San Antonio<br />Date: 1/5/2018 6:59 PM<br />Reading: Inactivity Alert.<br />1-773-940-6693<br /></p> <p style="font-family: arial; color: #333; margin-left: 20px; font-size: 12px"> &nbsp;</p> <p style="font-family: arial; color: #333; margin-left: 20px; font-size: 12px"> This email address is not monitored.&nbsp; Please do not respond to this message.</p> <div style="margin-top: -40px; margin-left: 250px"> &nbsp;</div> </td> </tr> </tbody> </table> </td> </tr> </tbody> </table> </td> </tr> </tbody> </table> ',
                  "SentNotificationID": 593019,
                  "UserID": 682,
                  "UserName": "Tyrone LastName",
                  "SMSNumber": "555-555-1234",
                  "Email": "Reclamationbin@gmail.com",
                  "Type": "Email",
                  "Status": "Email Sent"
                  },
                  {
                  "NotificationID": 177,
                  "Name": "Base Station - Lost Internet Connection",
                  "DeviceID": 1607990267,
                  "DeviceName": "Base Station - 1607990267",
                  "DeviceType": "Base Station",
                  "Reading": "Inactivity Alert.",
                  "NotificationDate": "2018-01-05T23:36:53.567",
                  "Text": '<table border="0" cellpadding="0" cellspacing="0" width="100%"> <tbody> <tr> <td align="middle"> <table border="0" cellpadding="0" cellspacing="0" style="border-bottom: #333 1px solid; border-left: #333 1px solid; background-color: #ffffff; border-top: #333 1px solid; border-right: #333 1px solid" width="620"> <tbody> <tr> <td style="text-align: center; padding-bottom: 0px; margin: 0px; padding-left: 0px; padding-right: 0px; padding-top: 0px" valign="top"> <img alt="NotifEye" border="0" src="http://monitoring.notifeyewireless.com/Content/images/logo.png" /></td> </tr> <tr> <td> <table border="0" cellpadding="0" cellspacing="0" width="100%"> <tbody> <tr> <td align="left" style="padding-bottom: 10px; padding-left: 0px; padding-right: 20px; padding-top: 10px" valign="top" width="370"> <p style="padding-bottom: 0px; margin: 10px 0px 0px 20px; padding-left: 0px; padding-right: 0px; font-family: arial; color: ##334873; font-size: 18px; padding-top: 0px"> <strong>NotifEye</strong></p> <p style="margin: 0px"> &nbsp;</p> <p style="font-family: arial; color: #333; margin-left: 20px; font-size: 12px"> Hiro Adachi<br /><br />Gateway: Base Station - 1607990267<br />Gateway Type: Base Station<br />Network: Temp Sensor<br />Date: 1/5/2018 7:36 PM<br />Reading: Inactivity Alert.<br />WARNING! INTERNET CONNECTION LOST- POSSIBLE POWER FAILURE<br /></p> <p style="font-family: arial; color: #333; margin-left: 20px; font-size: 12px"> &nbsp;</p> <p style="font-family: arial; color: #333; margin-left: 20px; font-size: 12px"> This email address is not monitored.&nbsp; Please do not respond to this message.</p> <div style="margin-top: -40px; margin-left: 250px"> &nbsp;</div> </td> </tr> </tbody> </table> </td> </tr> </tbody> </table> </td> </tr> </tbody> </table> ',
                  "SentNotificationID": 592970,
                  "UserID": 116,
                  "UserName": "Hiro LastName",
                  "SMSNumber": "555-555-1234",
                  "Email": "Reclamationbin@gmail.com",
                  "Type": "Email",
                  "Status": "Email Sent"
                  }
                  ];
    }
}
