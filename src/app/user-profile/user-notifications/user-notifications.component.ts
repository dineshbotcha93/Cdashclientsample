import { Component, OnInit,Output,EventEmitter,Input } from '@angular/core';
import { SensorSummaryService } from '../../dashboard/sensor-summary/services/sensor-summary.service';

@Component({
  selector: 'app-user-notifications',
  templateUrl: './user-notifications.component.html',
  styleUrls: ['./user-notifications.component.scss'],

  providers: [ SensorSummaryService]
})
export class UserNotificationsComponent implements OnInit {

  notificationRadio: any = 'summary';
  isAddButtonRequired:boolean = true;
  isResetButtonRequired:boolean = false;
  EditNotifyMode : boolean = false;


  @Output() editNotifyModeEvent = new EventEmitter<boolean>();
  @Output() createMessageEvent = new EventEmitter<boolean>();
  

  // @Input() sensorList: any;
   @Input() sensorList: any;
  @Input() gatewayList: Array<any>;
  @Input() editNotifyObject: any;
  @Input() notifyOperationType: string = "addNotify";


  constructor(private sensorSummaryService: SensorSummaryService) { }

  ngOnInit() {
  	
  	this.sensorSummaryService.getNotificationSettingsDetails('1485').then((result) => {
    	console.log('result----->',result);
       this.sensorList = result;
    });
  }

   onClickAddNotification() {
    this.notificationRadio = 'addNotify';
    this.isAddButtonRequired = false;
    this.isResetButtonRequired = true;
    
  }
  onClickResetNotification() {
    this.isAddButtonRequired = true;
    this.isResetButtonRequired = false;
    this.notificationRadio = 'summary';
  }

 recieveEditNotifyValue($event) {
    console.log($event);
    this.notificationRadio = 'addNotify';
    this.notifyOperationType = 'editNotify';
    this.isAddButtonRequired = false;
    this.isResetButtonRequired = true;
    this.editNotifyObject = $event;

  }
   receiveAddNotificationMessage($event) {
    console.log($event);
    this.notificationRadio = 'summary';
     this.isAddButtonRequired = true;
    this.isResetButtonRequired = false;
  }

}
