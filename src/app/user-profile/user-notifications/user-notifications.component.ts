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

  accountID:string;

  isValidForm = true;
  deviceCreationError: string | null = null;


  @Output() editNotifyModeEvent = new EventEmitter<boolean>();
  @Output() createMessageEvent = new EventEmitter<boolean>();


  // @Input() sensorList: any;
  @Input() sensorList: any;
  @Input() gatewayList: Array<any>;
  @Input() editNotifyObject: any;
  @Input() notifyOperationType: string = "addNotify";
  @Input() accountData: any;
  @Input() globalNotificationsList: any;


  constructor(private sensorSummaryService: SensorSummaryService) {
   this.deviceCreationError = "Please wait until notifications are loaded ..... ";
 }

  ngOnInit() {

    this.isValidForm = false;
     let userInfoObject = JSON.parse(localStorage.getItem('com.cdashboard.userInfoObject'));
    userInfoObject['account'].forEach(loc => {
       this.accountID = loc.accountID;
     });

    this.sensorSummaryService.getGlobalNotificationsList(this.accountID).then((result) => {
       this.globalNotificationsList = result;

      this.getNotificationsList();

    });
  }

  getNotificationsList(){
    this.isValidForm = false;
       this.sensorSummaryService.getNotificationSettingsDetails(this.accountID).then((result) => {
          this.sensorList = result;

           if(this.sensorList.length < 1 ){
               this.deviceCreationError = "There are no notifications configured ";
           }

            this.isValidForm = true;
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
    this.notificationRadio = 'summary';
     this.isAddButtonRequired = true;
    this.isResetButtonRequired = false;

     this.getNotificationsList();


  }

}
