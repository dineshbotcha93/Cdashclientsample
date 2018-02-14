import { Component, OnInit ,Output, EventEmitter,Input } from '@angular/core';
@Component({
  selector: 'app-notification-summary',
  templateUrl: './notification-summary.component.html',
  styleUrls: ['./notification-summary.component.scss']
})
export class NotificationSummaryComponent implements OnInit {
  notificationSummaryList: any = [];
  constructor() {}
  ngOnInit() {
    let Obj:Array<any> = [];
    Obj = [
    {
      ID: 1490,
      Name: "1.1 1153232004 Receiving Dock Temp",
      Text: "Gateway - Low Battery",
      Type: "BatteryNotification",
      Active: true,
      LastDateSent: "2017-12-28",
      SentVia: [
      "SMS",
      "EMAIL"
      ]
    },
    {
      ID: 1490,
      Name: "1.2 1153232008 Temp Walk in Frig #1",
      Text: "Gateway - Low Battery",
      Type: "BatteryNotification",
      Active: true,
      LastDateSent: "2017-12-28",
      SentVia: [
      "SMS",
      "EMAIL"
      ]
    },
    {
      ID: 1490,
      Name: "1.2 1153232008 Temp Walk in Frig #1",
      Text: "Gateway - Low Battery",
      Type: "BatteryNotification",
      Active: true,
      LastDateSent: "2017-12-28",
      SentVia: [
      "SMS",
      "EMAIL"
      ]
    },
    {
      ID: 1490,
      Name: "1.2 1153232008 Temp Walk in Frig #1",
      Text: "Gateway - Low Battery",
      Type: "BatteryNotification",
      Active: true,
      LastDateSent: "2017-12-28",
      SentVia: [
      "SMS",
      "EMAIL"
      ]
    },
    {
      ID: 1490,
      Name: "1.2 1153232008 Temp Walk in Frig #1",
      Text: "Gateway - Low Battery",
      Type: "BatteryNotification",
      Active: true,
      LastDateSent: "2017-12-28",
      SentVia: [
      "SMS",
      "EMAIL"
      ]
    },
    {
      ID: 1490,
      Name: "1.2 1153232008 Temp Walk in Frig #1",
      Text: "Gateway - Low Battery",
      Type: "BatteryNotification",
      Active: true,
      LastDateSent: "2017-12-28",
      SentVia: [
      "SMS",
      "EMAIL"
      ]
    }];

    this.notificationSummaryList = Obj;
    
    console.log(this.notificationSummaryList);
  }
}