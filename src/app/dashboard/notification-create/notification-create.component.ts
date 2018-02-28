import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NotificationModel } from '../../shared/models/NotificationModel';

import { IMultiSelectOption,IMultiSelectSettings } from 'angular-2-dropdown-multiselect';

@Component({
  selector: 'app-notification-create',
  templateUrl: './notification-create.component.html',
  styleUrls: ['./notification-create.component.scss']
})
export class NotificationCreateComponent implements OnInit {

  subNotificationTypes: any = [];
  isReadingTypeAvailable: boolean = false;
  
  
  isSensorNotificationForm1: boolean = false;
  isSensorNotificationForm2: boolean = false;
  isSensorNotificationForm3: boolean = false;
  isSensorNotificationForm4: boolean = false;
  isSensorNotificationForm5: boolean = false;
  
  isButtonFooterRequired: boolean = false;
  isPreviousButtonRequired: boolean = false;
  isNextButtonRequired: boolean = true;


  currentPageValue: string = 'page1';
  isLessThanValue: any = [];
  tempTypeValue: any = [];
  selectIsLessThanValue: any = [];
  selectTempTypeValue: any = [];
  isNotificationActive: any = [];

  checkModel: any = { left: true, right: false };
  checkModelSnooze: any = { left: true, right: false };

  dailySheduleNotificationList: any = [];
  timePickerBefore: Date = new Date();
  timePickerAfter: Date = new Date();

  scheduleObj: any = [];

  @Input() allSensors: Array<any>;
  @Input() gateWayData: Array<any>;

  @Output() createMessageEvent = new EventEmitter<boolean>();


  notificationModel: NotificationModel;
  sensorOptionsModel: number[];
  gatewayOptionsModel: number[];
  userOptionsModel: number[];
  mySensorOptions: IMultiSelectOption[];
  myGatewayOptions: IMultiSelectOption[];
  myUserOptions: IMultiSelectOption[];

  mySettings: IMultiSelectSettings = {
    enableSearch: false,
    checkedStyle: 'fontawesome',
    buttonClasses: 'btn btn-default btn-block',
    dynamicTitleMaxItems: 2,
    displayAllSelectedText: true
  };
  
  selectSubNotificationList: any = [];
  selectTempCompareList:any = [];
  selectTempTypeList:any = [];

  constructor() { }



  setInitialModelValues() {

    this.notificationModel = {

      selectSubNotificationList: '',
      strNotificationName: '',
      strNotificationText: '',
      selectTempCompareList: [],
      selectTempTypeList: [],
      scheduleNotificationCheck: { left: true, right: false },
      strSnoozeAlertValue: '',
      scheduleSnoozeCheck: { left: true, right: false },
      isNotificationActive: true,

      strLowBatteryNotifyValue: '',
      strInactivePeriodValue: '',

      strAfterAlertValue: '',
      strTimeFrameValue: '',
      strMessageCountValue: '',
      strAfterNotifyValue: '',
      strLowerTempHumidiftyValue: '',
      strHigherTempHumidiftyValue: '',
      selectNotifyMagnetList: [],

      scheduleInlineNotifyCheck: { left: true, right: false },
      notificationTemplate:''
    };

    

  }

  ngOnInit() {

    this.setInitialModelValues();

    this.isReadingTypeAvailable = false;

    let Obj = [
      {
        id: '01',
        value: 'LessThan'
      }, {
        id: '02',
        value: 'greaterThan'
      }
    ];


    this.selectTempCompareList = Obj;

    let Obj2 = [
      {
        id: '01',
        value: 'Celcius'
      }, {
        id: '02',
        value: 'Fahrenheit'
      }

    ];

    this.selectTempTypeList = Obj2;

    let tempObject3 = [
      {
        id: '01',
        value: 'All Day'
      }, {
        id: '02',
        value: 'Off'
      }, {
        id: '03',
        value: 'Between'
      }, {
        id: '04',
        value: 'Between and After'
      }, {
        id: '05',
        value: 'Before'
      }, {
        id: '06',
        value: 'After'
      }

    ];

    this.scheduleObj = [
      {
        day: 'Monday',
        value: 'monday',
        scheduleObj: tempObject3,
        timePickerBefore: this.timePickerBefore,
        timePickerAfter: this.timePickerAfter
      },
      {
        day: 'Tuesday',
        value: 'tuesday',
        scheduleObj: tempObject3,
        timePickerBefore: this.timePickerBefore,
        timePickerAfter: this.timePickerAfter
      },
      {
        day: 'Wednesday',
        value: 'wednesday',
        scheduleObj: tempObject3,
        timePickerBefore: this.timePickerBefore,
        timePickerAfter: this.timePickerAfter
      },
      {
        day: 'Thursday',
        value: 'thursday',
        scheduleObj: tempObject3,
        timePickerBefore: this.timePickerBefore,
        timePickerAfter: this.timePickerAfter
      },
      {
        day: 'Friday',
        value: 'friday',
        scheduleObj: tempObject3,
        timePickerBefore: this.timePickerBefore,
        timePickerAfter: this.timePickerAfter
      },
      {
        day: 'Saturday',
        value: 'saturday',
        scheduleObj: tempObject3,
        timePickerBefore: this.timePickerBefore,
        timePickerAfter: this.timePickerAfter
      }, {
        day: 'Sunday',
        value: 'sunday',
        scheduleObj: tempObject3,
        timePickerBefore: this.timePickerBefore,
        timePickerAfter: this.timePickerAfter
      }
    ];



    this.dailySheduleNotificationList = [];


    let Obj3 = [
      {
        id: '01',
        value: 'Closed'
      }, {
        id: '02',
        value: 'Open'
      }
    ];

    this.notificationModel.selectNotifyMagnetList = Obj3;

    let sensorObj = [];

    this.allSensors.forEach((sensor) => {
      let tempObj: any = [];
      tempObj.id = sensor.sensorID,
        tempObj.name = sensor.sensorName

      sensorObj.push(tempObj);

    });

    this.mySensorOptions = sensorObj;

    sensorObj = [];

    this.gateWayData.forEach((gateway) => {
      let tempObj: any = [];
      tempObj.id = gateway.gatewayID,
      tempObj.name = gateway.name

      sensorObj.push(tempObj);

    });

    this.myGatewayOptions = sensorObj;


    // userList

    let userObj: Array<any>;

    let userTempObj = [];

    let userResponseObj = {
      AccountUserList: [
        {
          UserID: 2,
          Name: "Bill LastName",
          EmailAddress: "Reclamationbin@gmail.com",
          SMSNumber: "555-555-1234",
          VoiceNumber: "",
          DirectSMS: false,
          RecievesNotificaitonsBySMS: true,
          RecievesNotificaitonsByVoice: false,
          Active: true,
          Admin: true,
          RecievesMaintenanceByEmail: true,
          RecievesMaintenanceBySMS: false,
          ExternalSMSProviderID: 5,
          UserName: "User2"
        },
        {
          UserID: 3,
          Name: "User3 LastName",
          EmailAddress: "Reclamationbin@gmail.com",
          SMSNumber: "555-555-1234",
          VoiceNumber: "",
          DirectSMS: false,
          RecievesNotificaitonsBySMS: false,
          RecievesNotificaitonsByVoice: false,
          Active: true,
          Admin: false,
          RecievesMaintenanceByEmail: false,
          RecievesMaintenanceBySMS: false,
          ExternalSMSProviderID: -9223372036854776000,
          UserName: "User3"
        },
        {
          UserID: 8,
          Name: "Harry LastName",
          EmailAddress: "Reclamationbin@gmail.com",
          SMSNumber: "555-555-1234",
          VoiceNumber: "",
          DirectSMS: false,
          RecievesNotificaitonsBySMS: false,
          RecievesNotificaitonsByVoice: false,
          Active: true,
          Admin: true,
          RecievesMaintenanceByEmail: false,
          RecievesMaintenanceBySMS: false,
          ExternalSMSProviderID: -9223372036854776000,
          UserName: "User8"
        },
        {
          UserID: 9,
          Name: "Rebbeca LastName",
          EmailAddress: "Reclamationbin@gmail.com",
          SMSNumber: "555-555-1234",
          VoiceNumber: "",
          DirectSMS: false,
          RecievesNotificaitonsBySMS: false,
          RecievesNotificaitonsByVoice: false,
          Active: true,
          Admin: true,
          RecievesMaintenanceByEmail: false,
          RecievesMaintenanceBySMS: false,
          ExternalSMSProviderID: -9223372036854776000,
          UserName: "User9"
        },
        {
          UserID: 30,
          Name: "Bill LastName",
          EmailAddress: "Reclamationbin@gmail.com",
          SMSNumber: "555-555-1234",
          VoiceNumber: "",
          DirectSMS: false,
          RecievesNotificaitonsBySMS: false,
          RecievesNotificaitonsByVoice: false,
          Active: true,
          Admin: true,
          RecievesMaintenanceByEmail: false,
          RecievesMaintenanceBySMS: false,
          ExternalSMSProviderID: -9223372036854776000,
          UserName: "User30"
        },
        {
          UserID: 38,
          Name: "Geoff LastName",
          EmailAddress: "Reclamationbin@gmail.com",
          SMSNumber: "555-555-1234",
          VoiceNumber: "",
          DirectSMS: false,
          RecievesNotificaitonsBySMS: false,
          RecievesNotificaitonsByVoice: false,
          Active: true,
          Admin: true,
          RecievesMaintenanceByEmail: true,
          RecievesMaintenanceBySMS: false,
          ExternalSMSProviderID: 5,
          UserName: "User38"
        },
        {
          UserID: 39,
          Name: "Jeff LastName",
          EmailAddress: "Reclamationbin@gmail.com",
          SMSNumber: "555-555-1234",
          VoiceNumber: "",
          DirectSMS: false,
          RecievesNotificaitonsBySMS: false,
          RecievesNotificaitonsByVoice: false,
          Active: true,
          Admin: true,
          RecievesMaintenanceByEmail: false,
          RecievesMaintenanceBySMS: false,
          ExternalSMSProviderID: -9223372036854776000,
          UserName: "User39"
        },
        {
          UserID: 91,
          Name: "Carol LastName",
          EmailAddress: "Reclamationbin@gmail.com",
          SMSNumber: "555-555-1234",
          VoiceNumber: "",
          DirectSMS: false,
          RecievesNotificaitonsBySMS: false,
          RecievesNotificaitonsByVoice: false,
          Active: true,
          Admin: true,
          RecievesMaintenanceByEmail: false,
          RecievesMaintenanceBySMS: false,
          ExternalSMSProviderID: -9223372036854776000,
          UserName: "User91"
        },
        {
          UserID: 386,
          Name: "Clarence LastName",
          EmailAddress: "Reclamationbin@gmail.com",
          SMSNumber: "555-555-1234",
          VoiceNumber: "",
          DirectSMS: false,
          RecievesNotificaitonsBySMS: false,
          RecievesNotificaitonsByVoice: false,
          Active: true,
          Admin: true,
          RecievesMaintenanceByEmail: false,
          RecievesMaintenanceBySMS: false,
          ExternalSMSProviderID: -9223372036854776000,
          UserName: "User386"
        },
        {
          UserID: 458,
          Name: "Tiang-Aik LastName",
          EmailAddress: "Reclamationbin@gmail.com",
          SMSNumber: "555-555-1234",
          VoiceNumber: "",
          DirectSMS: false,
          RecievesNotificaitonsBySMS: false,
          RecievesNotificaitonsByVoice: false,
          Active: true,
          Admin: false,
          RecievesMaintenanceByEmail: false,
          RecievesMaintenanceBySMS: false,
          ExternalSMSProviderID: -9223372036854776000,
          UserName: "User458"
        },
        {
          UserID: 588,
          Name: "Eric LastName",
          EmailAddress: "Reclamationbin@gmail.com",
          SMSNumber: "555-555-1234",
          VoiceNumber: "",
          DirectSMS: false,
          RecievesNotificaitonsBySMS: true,
          RecievesNotificaitonsByVoice: false,
          Active: true,
          Admin: false,
          RecievesMaintenanceByEmail: false,
          RecievesMaintenanceBySMS: false,
          ExternalSMSProviderID: 5,
          UserName: "User588"
        },
        {
          UserID: 711,
          Name: "Gary LastName",
          EmailAddress: "Reclamationbin@gmail.com",
          SMSNumber: "555-555-1234",
          VoiceNumber: "",
          DirectSMS: false,
          RecievesNotificaitonsBySMS: false,
          RecievesNotificaitonsByVoice: false,
          Active: true,
          Admin: true,
          RecievesMaintenanceByEmail: false,
          RecievesMaintenanceBySMS: false,
          ExternalSMSProviderID: -9223372036854776000,
          UserName: "User711"
        },
        {
          UserID: 770,
          Name: "John LastName",
          EmailAddress: "Reclamationbin@gmail.com",
          SMSNumber: "555-555-1234",
          VoiceNumber: "",
          DirectSMS: false,
          RecievesNotificaitonsBySMS: false,
          RecievesNotificaitonsByVoice: false,
          Active: true,
          Admin: false,
          RecievesMaintenanceByEmail: false,
          RecievesMaintenanceBySMS: false,
          ExternalSMSProviderID: -9223372036854776000,
          UserName: "User770"
        },
        {
          UserID: 891,
          Name: "Test LastName",
          EmailAddress: "Reclamationbin@gmail.com",
          SMSNumber: "555-555-1234",
          VoiceNumber: "",
          DirectSMS: false,
          RecievesNotificaitonsBySMS: false,
          RecievesNotificaitonsByVoice: false,
          Active: true,
          Admin: false,
          RecievesMaintenanceByEmail: false,
          RecievesMaintenanceBySMS: false,
          ExternalSMSProviderID: -9223372036854776000,
          UserName: "User891"
        },
        {
          UserID: 896,
          Name: "New Test User2",
          EmailAddress: "new.user2@temp.com",
          SMSNumber: "",
          VoiceNumber: "",
          DirectSMS: false,
          RecievesNotificaitonsBySMS: false,
          RecievesNotificaitonsByVoice: false,
          Active: true,
          Admin: true,
          RecievesMaintenanceByEmail: false,
          RecievesMaintenanceBySMS: false,
          ExternalSMSProviderID: -9223372036854776000,
          UserName: "NewTestUser2"
        }
      ]
    };

    userObj = userResponseObj.AccountUserList;

    userObj.forEach((user) => {
      let tempObj: any = [];

        tempObj.id = user.Name,
        tempObj.name = user.Name

      userTempObj.push(tempObj);

    });

    this.myUserOptions = userTempObj;

  }

  onChangeSensorSelect(e) { }
  onChangeGatewaySelect(e) { }
  onChangeUserSelect(e) { }
  onClickSensorNotify() {
    this.isReadingTypeAvailable = true;

    this.isSensorNotificationForm1 = false;
    this.isSensorNotificationForm2 = false;

    this.isButtonFooterRequired = false;

    this.notificationModel.notificationTemplate = 'sensorNotification';
    
    let Obj = [
      {
        id: '01',
        value: 'Please Select One'
      },
      {
        id: '02',
        value: 'Temperature'
      }
    ];

    this.selectSubNotificationList = Obj;
    console.log(this.selectSubNotificationList);
  }
  onClickAdvanceNotify() {
    this.isReadingTypeAvailable = true;
    this.isSensorNotificationForm1 = false;
    this.isButtonFooterRequired = false;
    this.notificationModel.notificationTemplate = 'advancedNotification';

    console.log('onClickSensorNotify');
    let Obj = [
      {
        id: '01',
        value: 'Please Select One'
      },
      {
        id: '02',
        value: 'Notify after aware period'
      },
      {
        id: '03',
        value: 'Back Online'
      },
      {
        id: '04',
        value: 'Battery Below 10'
      },
      {
        id: '05',
        value: 'Gateway On Battery'
      },
      {
        id: '06',
        value: 'Frequent Aware Messages'
      },
      {
        id: '07',
        value: 'First Aware Message'
      },
      {
        id: '08',
        value: 'First Non-Aware Message'
      },
      {
        id: '09',
        value: 'Aware State Changed'
      },
      {
        id: '10',
        value: 'Gateway Switched to Line Power'
      },
      {
        id: '11',
        value: 'Notify after not aware period'
      },
      {
        id: '12',
        value: 'Advanced Temperature Range'
      },
      {
        id: '13',
        value: 'Advanced Humidity'
      },
      {
        id: '14',
        value: 'Advanced Open / Closed'
      },
      {
        id: '15',
        value: 'Advanced Temperature'
      }
    ];
    this.selectSubNotificationList = Obj;


    console.log(this.subNotificationTypes);
  }

  onClickBatteryNotify() {

    this.isReadingTypeAvailable = false;

    this.isSensorNotificationForm1 = true;

    this.isSensorNotificationForm2 = false;

    this.isButtonFooterRequired = true;

    this.notificationModel.notificationTemplate = 'batteryNotification';

  }

  onClickInActivityNotify() {


    this.isReadingTypeAvailable = false;

    this.isSensorNotificationForm1 = true;

    this.isSensorNotificationForm2 = false;
    this.isButtonFooterRequired = true;

    this.notificationModel.notificationTemplate = 'inActiveNotification';

  }

  onChangeNotifictaion(e) {
    this.isSensorNotificationForm1 = true;
    this.isButtonFooterRequired = true;
    console.log('selected Notification type-->',e);
    this.notificationModel.selectSubNotificationList = e;
    console.log(this.notificationModel);

  }

  onChangeLessThanValue(e){
    console.log('selected less/greater than value-->',e);
    this.notificationModel.selectTempCompareList = e;
    console.log(this.notificationModel);
  }

  onChangeTempTypeValue(e){
    console.log('selected celcius/foreighht than value-->',e);
    this.notificationModel.selectTempTypeList = e;
    console.log(this.notificationModel);
  }

  onClickAlways(e) {
    this.notificationModel.scheduleNotificationCheck = { left: true, right: false };

    this.dailySheduleNotificationList = [];
  }

  onClickSchedule(e) {
    this.notificationModel.scheduleNotificationCheck = { left: false, right: true };
    this.dailySheduleNotificationList = this.scheduleObj;
  }

  onClickIndependent(e) {
    this.notificationModel.scheduleSnoozeCheck = { left: true, right: false };
  }

  onClickJoint(e) {
    this.notificationModel.scheduleSnoozeCheck = { left: false, right: true };
  }

  onClickCancelDetail() {
    this.isSensorNotificationForm1 = false;
  }

  onClickNext(value) {
    console.log('next-->', value);
    if (value === 'page1') {
      this.isSensorNotificationForm2 = true;
      this.isSensorNotificationForm1 = false;
      this.isSensorNotificationForm3 = false;
      this.isSensorNotificationForm4 = false;
      this.isSensorNotificationForm5 = false;
      this.currentPageValue = 'page2';
      this.isPreviousButtonRequired = true;
    } else if (value === 'page2') {
      this.isSensorNotificationForm2 = false;
      this.isSensorNotificationForm1 = false;
      this.isSensorNotificationForm5 = false;
      this.isSensorNotificationForm4 = false;
      this.isSensorNotificationForm3 = true;
      this.currentPageValue = 'page3';
    }
    else if (value === 'page3') {
      this.isSensorNotificationForm4 = true;
      this.isSensorNotificationForm1 = false;
      this.isSensorNotificationForm2 = false;
      this.isSensorNotificationForm3 = false;
      this.isSensorNotificationForm5 = false;
      this.currentPageValue = 'page4';
    }
    else if (value === 'page4') {
      this.isSensorNotificationForm5 = true;
      this.isSensorNotificationForm4 = false;
      this.isSensorNotificationForm1 = false;
      this.isSensorNotificationForm2 = false;
      this.isSensorNotificationForm3 = false;
      this.currentPageValue = 'page5';
      this.isNextButtonRequired = false;
    }

  }

  onClickPrevious(value) {

    console.log('prev-->', value);
    if (value === 'page2') {
      this.isSensorNotificationForm2 = false;
      this.isSensorNotificationForm1 = true;
      this.isSensorNotificationForm3 = false;
      this.isSensorNotificationForm4 = false;
      this.isSensorNotificationForm5 = false;
      this.currentPageValue = 'page1';
      this.isPreviousButtonRequired = false;
    } else if (value === 'page3') {
      this.isSensorNotificationForm2 = true;
      this.isSensorNotificationForm1 = false;
      this.isSensorNotificationForm5 = false;
      this.isSensorNotificationForm4 = false;
      this.isSensorNotificationForm3 = false;
      this.currentPageValue = 'page2';
    } else if (value === 'page4') {
      this.isSensorNotificationForm4 = false;
      this.isSensorNotificationForm1 = false;
      this.isSensorNotificationForm2 = false;
      this.isSensorNotificationForm3 = true;
      this.isSensorNotificationForm5 = false;
      this.currentPageValue = 'page3';
    } else if (value === 'page5') {
      this.isSensorNotificationForm5 = false;
      this.isSensorNotificationForm4 = true;
      this.isSensorNotificationForm1 = false;
      this.isSensorNotificationForm2 = false;
      this.isSensorNotificationForm3 = false;
      this.currentPageValue = 'page4';
      this.isNextButtonRequired = true;

    }

  }

  onClickCreateNotification(value) {

    console.log(this.notificationModel);
    this.createMessageEvent.emit(true);
  }

}
