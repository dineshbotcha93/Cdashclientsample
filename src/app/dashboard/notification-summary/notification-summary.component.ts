import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { SensorSummaryService } from '../sensor-summary/services/sensor-summary.service';


@Component({
  selector: 'app-notification-summary',
  templateUrl: './notification-summary.component.html',
  styleUrls: ['./notification-summary.component.scss'],
  providers: [SensorSummaryService]
})
export class NotificationSummaryComponent implements OnInit {
  notificationSummaryList: any = [];

  constructor(private sensorSummaryService: SensorSummaryService) { }
  ngOnInit() {
    let Obj: Array<any> = [];
    let respoonseObject = this.sensorSummaryService.getNotificationSettingsDetails().then((result) => {
      console.log('result-->', result);
      result.forEach((notify) => {
        let checkModelNotify = { active: false, inActive: true };
        if (notify.notification.active) {
          checkModelNotify = { active: true, inActive: false };
        }
        notify.notification.checkModelNotify = checkModelNotify;
        this.notificationSummaryList.push(notify);
      });
    });

    console.log('---->', this.notificationSummaryList);




    // Obj = [
    // {
    //   ID: 1490,
    //   Name: "1.1 1153232004 Receiving Dock Temp",
    //   Text: "Gateway - Low Battery",
    //   Type: "BatteryNotification",
    //   Active: true,
    //   LastDateSent: "2017-12-28",
    //   SentVia: [
    //   "SMS",
    //   "EMAIL"
    //   ],
    //   checkModelNotify:checkModelNotify
    // },
    // {
    //   ID: 1491,
    //   Name: "1.2 1153232008 Temp Walk in Frig #1",
    //   Text: "Gateway - Low Battery",
    //   Type: "BatteryNotification",
    //   Active: true,
    //   LastDateSent: "2017-12-28",
    //   SentVia: [
    //   "SMS",
    //   "EMAIL"
    //   ],
    //   checkModelNotify:checkModelNotify
    // }
    // ,
    // {
    //   ID: 1492,
    //   Name: "1.2 1153232008 Temp Walk in Frig #1",
    //   Text: "Gateway - Low Battery",
    //   Type: "BatteryNotification",
    //   Active: true,
    //   LastDateSent: "2017-12-28",
    //   SentVia: [
    //   "SMS",
    //   "EMAIL"
    //   ],
    //   checkModelNotify:checkModelNotify
    // },
    // {
    //   ID: 1493,
    //   Name: "1.2 1153232008 Temp Walk in Frig #1",
    //   Text: "Gateway - Low Battery",
    //   Type: "BatteryNotification",
    //   Active: true,
    //   LastDateSent: "2017-12-28",
    //   SentVia: [
    //   "SMS",
    //   "EMAIL"
    //   ],
    //   checkModelNotify:checkModelNotify
    // },
    // {
    //   ID: 1494,
    //   Name: "1.2 1153232008 Temp Walk in Frig #1",
    //   Text: "Gateway - Low Battery",
    //   Type: "BatteryNotification",
    //   Active: true,
    //   LastDateSent: "2017-12-28",
    //   SentVia: [
    //   "SMS",
    //   "EMAIL"
    //   ],
    //   checkModelNotify:checkModelNotify
    // },
    // {
    //   ID: 1495,
    //   Name: "1.2 1153232008 Temp Walk in Frig #1",
    //   Text: "Gateway - Low Battery",
    //   Type: "BatteryNotification",
    //   Active: true,
    //   LastDateSent: "2017-12-28",
    //   SentVia: [
    //   "SMS",
    //   "EMAIL"
    //   ],
    //   checkModelNotify:checkModelNotify
    // }
    // ];

    //this.notificationSummaryList = Obj;

    console.log(this.notificationSummaryList);
  }
  onClickNotifyOn(e, notify) {

    this.notificationSummaryList.forEach(x => {

      if (x === notify) {
        x.checkModelNotify = { left: true, right: false };
      }

    });
  }

  onClickNotifyOff(e, notify) {
    this.notificationSummaryList.forEach(x => {
      if (x === notify) {
        x.checkModelNotify = { left: false, right: true };
      }
    });
  }
}