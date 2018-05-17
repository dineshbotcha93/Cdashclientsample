import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { SensorSummaryService } from '../sensor-summary/services/sensor-summary.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { NgSwitch } from '@angular/common';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-notification-summary',
  templateUrl: './notification-summary.component.html',
  styleUrls: ['./notification-summary.component.scss'],
  providers: [SensorSummaryService, BsModalService]
})
export class NotificationSummaryComponent implements OnInit {
  notificationSummaryList: any = [];
  modalObject:any = [];
  modalRef: BsModalRef;
  modalType : string ='';
  accountID:string;

  isEditNotify : boolean = false;
  deviceCreationError: string | null = null;

  @Input() sensorList: Array<any>;
  @Input() accountData: any;

  @Output() editNotifyModeEvent = new EventEmitter<any>();

  constructor(private sensorSummaryService: SensorSummaryService,private modalService: BsModalService) { }
  ngOnInit() {

     this.getNotificationDetails();
     this.deviceCreationError = "Notitfications to be loaded";

  }

   getNotificationDetails(){

        let userInfoObject = JSON.parse(localStorage.getItem('com.cdashboard.userInfoObject'));
          userInfoObject['account'].forEach(loc => {
         this.accountID = loc.accountID;
       });

     // let respoonseObject = this.sensorSummaryService.getNotificationSettingsDetails(this.accountID).then((result) => {


       let result = this.sensorList;

     if(this.sensorList.length > 0){
          result.forEach((notify) => {
          let checkModelNotify = { active: false, inActive: true };
          if (notify.notification.active) {
            checkModelNotify = { active: true, inActive: false };
          }
          notify.notification.checkModelNotify = checkModelNotify;
          notify.notification.isNotifyMode = false;
          this.notificationSummaryList.push(notify);
        });
     }
  }

    onClickNotifyOffOn(e, notify){

     let notValue = true;
     if(notify.notification.isNotifyMode){
        notValue = false;
      }

     let requestObject = {
       NotificationID:notify.notification.notificationID,
       On:notValue
      };

      this.sensorSummaryService.updateNotificationActiveState(requestObject).then((result) => {
      this.notificationSummaryList.forEach(x => {
        if(x === notify){
          x.notification.checkModelNotify = { active: false, inActive: true };
          x.notification.isNotifyMode = notValue;
        }
      });
    });
  }

  onClickNotifyOn(e, notify) {
    let requestObject = {
      NotificationID:notify.notification.notificationID,
      On:true
    };

    this.sensorSummaryService.updateNotificationActiveState(requestObject).then((result) => {
      this.notificationSummaryList.forEach(x => {
        if(x === notify){
          x.notification.checkModelNotify = { active: true, inActive: false };
        }
      });
    });
  }

  onClickNotifyOff(e, notify) {
    let requestObject = {
      NotificationID:notify.notification.notificationID,
      On:false
    };

    this.sensorSummaryService.updateNotificationActiveState(requestObject).then((result) => {
      this.notificationSummaryList.forEach(x => {
        if(x === notify){
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
    this.modalRef = this.modalService.show(template);

 }

 onClickEditNotifyDetails(notify){
    this.isEditNotify = true;
    this.editNotifyModeEvent.emit(notify);

 }
}
