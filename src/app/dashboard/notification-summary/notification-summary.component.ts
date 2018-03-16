import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { SensorSummaryService } from '../sensor-summary/services/sensor-summary.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { NgSwitch } from '@angular/common';

@Component({
  selector: 'app-notification-summary',
  templateUrl: './notification-summary.component.html',
  styleUrls: ['./notification-summary.component.scss'],
  providers: [SensorSummaryService]
})
export class NotificationSummaryComponent implements OnInit {
  notificationSummaryList: any = [];
  modalObject:any = [];
  modalRef: BsModalRef;
  modalType : string ='';

  isEditNotify : boolean = false;

  @Input() sensorList: Array<any>;

  @Output() editNotifyModeEvent = new EventEmitter<any>();

  constructor(private sensorSummaryService: SensorSummaryService,private modalService: BsModalService) { }
  ngOnInit() {
  
     this.getNotificationDetails();

   
  }

   getNotificationDetails(){
     let respoonseObject = this.sensorSummaryService.getNotificationSettingsDetails('222').then((result) => {

     console.log('sensorList-------',this.sensorList);
     // let result = this.sensorList;
     //  let object = [  
     //    {  
     //       "notification":{  
     //          "notificationID":1569,
     //          "name":"Temp out of Range - delete",
     //          "text":"Temp out of range",
     //          "notificationClass":"Advanced",
     //          "active":false,
     //          "lastDateSent":"2018-01-10T18:45:14",
     //          "threshold":0,
     //          "comparer":"",
     //          "snooze":60.0,
     //          "advancedNotificationID":11,
     //          "advanceNotificationName":"Advanced Temperature Range",
     //          "advancedNotificationType":null
     //       },
     //       "devices":[  
     //          {  
     //             "deviceID":1153235073,
     //             "deviceName":"test sensor",
     //             "deviceType":"Commercial",
     //             "deviceCategory":"Sensor"
     //          }
     //       ],
     //       "users":[  
     //          {  
     //             "userID":3,
     //             "userName":"Bill LastName",
     //             "smsNumber":"555-555-1234",
     //             "email":"Reclamationbin@gmail.com",
     //             "notifyThroughEmail":false,
     //             "notifyThroughPhone":false
     //          },
     //          {  
     //             "userID":8,
     //             "userName":"Harry LastName",
     //             "smsNumber":"555-555-1234",
     //             "email":"Reclamationbin@gmail.com",
     //             "notifyThroughEmail":false,
     //             "notifyThroughPhone":false
     //          }
     //       ]
     //    }
     // ];
     // result = object;
      result.forEach((notify) => {
        let checkModelNotify = { active: false, inActive: true };
        if (notify.notification.active) {
          checkModelNotify = { active: true, inActive: false };
        }
        notify.notification.checkModelNotify = checkModelNotify;
        this.notificationSummaryList.push(notify);
      });
     });
  }

  onClickNotifyOn(e, notify) {

    console.log('selected element-->',notify);

    let requestObject = {
      NotificationID:notify.notification.notificationID,
      On:true
    };

    this.sensorSummaryService.updateNotificationActiveState(requestObject).then((result) => {
      console.log(result);
      this.notificationSummaryList.forEach(x => {
        if(x === notify){
          console.log('enered');
          x.notification.checkModelNotify = { active: true, inActive: false };
        }
      });
    });
  }

  onClickNotifyOff(e, notify) {
    console.log('selected element-->',notify);

    let requestObject = {
      NotificationID:notify.notification.notificationID,
      On:false
    };

    this.sensorSummaryService.updateNotificationActiveState(requestObject).then((result) => {
      console.log(result);
      this.notificationSummaryList.forEach(x => {
        if(x === notify){
          console.log('enered');
          x.notification.checkModelNotify = { active: false, inActive: true };
        }
      });
    });
  }

  openModal(notifiy,template,type) {
    this.modalObject = [];
    this.modalType = type;

    if(type === 'text'){
      this.modalObject = {
        text:notifiy.notification.text
      };
    }else if(type === 'device'){
      this.modalObject = notifiy.devices;
    } else if(type === 'user'){
      this.modalObject = notifiy.users;
    }
    console.log('-------',this.modalObject);
    this.modalRef = this.modalService.show(template);

 }

 onClickEditNotifyDetails(notify){
   console.log(notify);
    this.isEditNotify = true;
    this.editNotifyModeEvent.emit(notify);

 }
}