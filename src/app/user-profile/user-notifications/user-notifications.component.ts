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
  @Input() accountData: any;
  @Input() globalNotificationsList: any;


  constructor(private sensorSummaryService: SensorSummaryService) { }

  ngOnInit() {
  	
    console.log('accountData-----',this.accountData);
  	this.sensorSummaryService.getNotificationSettingsDetails(this.accountData.accountID).then((result) => {
    	console.log('result----->',result);
       this.sensorList = result;
    });

    this.sensorSummaryService.getGlobalNotificationsList(this.accountData.accountID).then((result) => {
      console.log('globalNotificationsList----->',result);
       this.globalNotificationsList = result;
    });
  }

   onClickAddNotification() {
    this.notificationRadio = 'addNotify';
    this.isAddButtonRequired = false;
    this.isResetButtonRequired = true;
    this.notifyOperationType = 'addNotify';
    
  }
  onClickResetNotification() {
    this.isAddButtonRequired = true;
    this.isResetButtonRequired = false;
    this.notificationRadio = 'summary';
  }

 recieveEditNotifyValue($event) {
   
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
