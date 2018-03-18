import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { NotificationModel } from "../../shared/models/NotificationModel";
import { SensorSummaryService } from "../sensor-summary/services/sensor-summary.service";
import {
  IMultiSelectOption,
  IMultiSelectSettings
} from "angular-2-dropdown-multiselect";
@Component({
  selector: "app-notification-create",
  templateUrl: "./notification-create.component.html",
  styleUrls: ["./notification-create.component.scss"],
  providers: [SensorSummaryService]
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
  currentPageValue: string = "page1";
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
  @Input() sensorList: Array<any>;
  @Input() gatewayList: Array<any>;
  @Input() notifyOperationType: string;
  @Input() editNotifyObject: any;
  @Input() accountData: any;
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
    checkedStyle: "fontawesome",
    buttonClasses: "btn btn-default btn-block",
    dynamicTitleMaxItems: 2,
    displayAllSelectedText: true
  };
  selectSubNotificationList: any = [];
  selectTempCompareList: any = [];
  selectTempTypeList: any = [];
  selectOpenCloseType: any = [];
  // isComponentToCreate:string = 'addNotify';
  constructor(private sensorSummaryService: SensorSummaryService) {}
  setEditNotifyDetails() {
    if (
      this.notifyOperationType === "editNotify" ||
      this.notifyOperationType === "addNotify"
    ) {
      console.log("before editing ", this.editNotifyObject);
      let tempObject: any;
      // tempObject = this.sensorList;
      console.log("before editing ", this.sensorList[0]);
      tempObject = this.notifyOperationType === "editNotify"? this.editNotifyObject: this.sensorList[0];
      console.log("after editing ", tempObject);


      console.log('this.notifyOperationType',this.notifyOperationType);
      if (this.notifyOperationType === "editNotify") {
        let notify = tempObject.notification;
        this.notificationModel.strNotificationName = notify.name;
        this.notificationModel.strNotificationText = notify.text;
        this.notificationModel.strSnoozeAlertValue = notify.snooze;
        this.notificationModel.isNotificationActive = notify.active;
        console.log("notify--->", notify.notificationID);
        this.getNotificationScheduleDetails(notify.notificationID);
        this.isSensorNotificationForm1 = true;
        this.isButtonFooterRequired = true;
      }else{
           this.setInitialModelValues();
            this.getNotificationScheduleDetailsForAddNotify();
      }

      //user setting
      let userTempObj = [];
      let userSelectedObject = [];
      tempObject.users.forEach(user => {
        let tempObj: any = [];
        (tempObj.id = user.userName), (tempObj.name = user.userName);
        userTempObj.push(tempObj);
        userSelectedObject.push(tempObj.id);
      });
      this.myUserOptions = [];
      this.myUserOptions = userTempObj;
      this.userOptionsModel = userSelectedObject;
      //sensor setting
      let sensorObj = [];
      let sensorModel = [];
      let gatewayModel = [];
      let gatewayObj = [];
      tempObject.devices.forEach(device => {
        let tempObj: any = [];
        (tempObj.id = device.deviceID), (tempObj.name = device.deviceID);
        if (device.deviceCategory === "Sensor") {
          sensorObj.push(tempObj);
          sensorModel.push(device.deviceID);
        } else {
          gatewayObj.push(tempObj);
          gatewayModel.push(device.deviceID);
        }
      });
      this.sensorOptionsModel = sensorModel;
      this.gatewayOptionsModel = gatewayModel;
      // this.mySensorOptions = [];
      // this.myGatewayOptions = [];
      this.mySensorOptions = sensorObj;
      this.myGatewayOptions = gatewayObj;

        this.notificationModel.sensorList = sensorModel;
        this.notificationModel.gatewayList = gatewayModel;
        this.notificationModel.userList = userSelectedObject;

    }
  }
  setInitialModelValues() {
    this.notificationModel = {
      notificationClassType: "",
      subnotificationClassType: "",
      strNotificationName: "",
      strNotificationText: "",
      compareType: "Less_Than",
      compareValue: "",
      scale: "F",
      scheduleNotificationCheck: { left: true, right: false },
      strSnoozeAlertValue: "",
      scheduleSnoozeCheck: { left: true, right: false },
      isNotificationActive: true,
      strLowBatteryNotifyValue: "",
      strInactivePeriodValue: "",
      strAfterAlertValue: "",
      strTimeFrameValue: "",
      strMessageCountValue: "",
      strAfterNotifyValue: "",
      strLowerTempHumidiftyValue: "",
      strHigherTempHumidiftyValue: "",
      selectNotifyMagnetList: [],
      scheduleInlineNotifyCheck: { left: true, right: false },
      notificationTemplate: "",
      advancedNotificationID: "",
      scheduleDayObjectList:[],
      gatewayList:[],
      sensorList:[],
      userList:[]
    };
  }
  getNotificationScheduleDetailsForAddNotify(){

      this.scheduleObj = [];
        let tempObject3 = [
          {
            id: "All_Day",
            value: "All Day"
          },
          {
            id: "Off",
            value: "Off"
          },
          {
            id: "Between",
            value: "Between"
          },
          {
            id: "Before_and_After",
            value: "Between and After"
          },
          {
            id: "Before",
            value: "Before"
          },
          {
            id: "After",
            value: "After"
          }
        ];

        let dayOfWeekObject = [
          {
            id: "1",
            value: "Monday"
          },
          {
            id: "2",
            value: "Tuesday"
          },
          {
            id: "3",
            value: "Wednesday"
          },
          {
            id: "4",
            value: "Thursday"
          },
          {
            id: "5",
            value: "Friday"
          },
          {
            id: "6",
            value: "Saturday"
          },
          {
            id: "7",
            value: "Sunday"
          }
        ];

   
         let selectedObj = [];

         selectedObj.push(tempObject3[0]);
         this.scheduleObj = [
          {
            dayOfWeek: "Monday",
            dayOfWeekValue: "1",
            scheduleDayObject: tempObject3,
            timePickerBefore: this.timePickerBefore,
            timePickerAfter: this.timePickerAfter,
            selectScheduleObj:tempObject3[0]
          },
          {
            dayOfWeek: "Tuesday",
            dayOfWeekValue: "2",
            scheduleDayObject: tempObject3,
            timePickerBefore: this.timePickerBefore,
            timePickerAfter: this.timePickerAfter,
             selectScheduleObj:tempObject3[0]
          },
          {
            dayOfWeek: "Wednesday",
            dayOfWeekValue: "3",
            scheduleDayObject: tempObject3,
            timePickerBefore: this.timePickerBefore,
            timePickerAfter: this.timePickerAfter,
             selectScheduleObj:tempObject3[0]
          },
          {
            dayOfWeek: "Thursday",
            dayOfWeekValue: "4",
            scheduleDayObject: tempObject3,
            timePickerBefore: this.timePickerBefore,
            timePickerAfter: this.timePickerAfter,
             selectScheduleObj:tempObject3[0]
          },
          {
            dayOfWeek: "Friday",
            dayOfWeekValue: "5",
            scheduleDayObject: tempObject3,
            timePickerBefore: this.timePickerBefore,
            timePickerAfter: this.timePickerAfter,
             selectScheduleObj:tempObject3[0]
          },
          {
            dayOfWeek: "Saturday",
            dayOfWeekValue: "6",
            scheduleDayObject: tempObject3,
            timePickerBefore: this.timePickerBefore,
            timePickerAfter: this.timePickerAfter,
             selectScheduleObj:tempObject3[0]
          },
          {
            dayOfWeek: "Sunday",
            dayOfWeekValue: "7",
            scheduleDayObject: tempObject3,
            timePickerBefore: this.timePickerBefore,
            timePickerAfter: this.timePickerAfter,
             selectScheduleObj:tempObject3[0]
          }
        ];
        this.dailySheduleNotificationList = this.scheduleObj;

        this.notificationModel.scheduleDayObjectList = this.scheduleObj;

        // result.forEach(schedule => {
      
          // let tempObj = {
          //   day: schedule.DayOfWeek,
          //   value: schedule.DayOfWeek,
          //   scheduleObj: tempObject3,
          //   timePickerBefore: this.timePickerBefore,
          //   timePickerAfter: this.timePickerAfter,
          //   selectScheduleObj: selectedObj
          // };
          // this.scheduleObj.push(tempObj);
        // });


  }
  getNotificationScheduleDetails(networkID: string) {



    this.sensorSummaryService
      .getNotificationScheduleList(networkID)
      .then(result => {
        console.log("schedule Result-->", result);
        this.scheduleObj = [];
        let tempObject3 = [
          {
            id: "All_Day",
            value: "All Day"
          },
          {
            id: "Off",
            value: "Off"
          },
          {
            id: "Between",
            value: "Between"
          },
          {
            id: "Before_and_After",
            value: "Between and After"
          },
          {
            id: "Before",
            value: "Before"
          },
          {
            id: "After",
            value: "After"
          }
        ];
        // let selectedObj = [];

        // selectedObj.push(tempObject3[0]);

        result.forEach(schedule => {
          console.log(schedule);
          let tempObj = {
            dayOfWeek: schedule.DayOfWeek,
            dayOfWeekValue: schedule.DayOfWeek,
            scheduleDayObject: tempObject3,
            timePickerBefore: this.timePickerBefore,
            timePickerAfter: this.timePickerAfter,
            selectScheduleObj: tempObject3[0]
          };
          this.scheduleObj.push(tempObj);
        });

         // ];
        this.dailySheduleNotificationList = this.scheduleObj;

        this.notificationModel.scheduleDayObjectList = this.scheduleObj;

        // ];
        // let scheduleObject = [
        //   {
        //     DayOfWeek: "Monday",
        //     FirstEnteredTime: {
        //       Ticks: 0,
        //       Days: 0,
        //       Hours: 0,
        //       Milliseconds: 0,
        //       Minutes: 0,
        //       Seconds: 0,
        //       TotalDays: 0,
        //       TotalHours: 0,
        //       TotalMilliseconds: 0,
        //       TotalMinutes: 0,
        //       TotalSeconds: 0
        //     },
        //     SecondEnteredTime: {
        //       Ticks: 0,
        //       Days: 0,
        //       Hours: 0,
        //       Milliseconds: 0,
        //       Minutes: 0,
        //       Seconds: 0,
        //       TotalDays: 0,
        //       TotalHours: 0,
        //       TotalMilliseconds: 0,
        //       TotalMinutes: 0,
        //       TotalSeconds: 0
        //     },
        //     NotificationSchedule: "All_Day"
        //   },
        //   {
        //     DayOfWeek: "Tuesday",
        //     FirstEnteredTime: {
        //       Ticks: 0,
        //       Days: 0,
        //       Hours: 0,
        //       Milliseconds: 0,
        //       Minutes: 0,
        //       Seconds: 0,
        //       TotalDays: 0,
        //       TotalHours: 0,
        //       TotalMilliseconds: 0,
        //       TotalMinutes: 0,
        //       TotalSeconds: 0
        //     },
        //     SecondEnteredTime: {
        //       Ticks: 0,
        //       Days: 0,
        //       Hours: 0,
        //       Milliseconds: 0,
        //       Minutes: 0,
        //       Seconds: 0,
        //       TotalDays: 0,
        //       TotalHours: 0,
        //       TotalMilliseconds: 0,
        //       TotalMinutes: 0,
        //       TotalSeconds: 0
        //     },
        //     NotificationSchedule: "All_Day"
        //   },
        //   {
        //     DayOfWeek: "Wednesday",
        //     FirstEnteredTime: {
        //       Ticks: 0,
        //       Days: 0,
        //       Hours: 0,
        //       Milliseconds: 0,
        //       Minutes: 0,
        //       Seconds: 0,
        //       TotalDays: 0,
        //       TotalHours: 0,
        //       TotalMilliseconds: 0,
        //       TotalMinutes: 0,
        //       TotalSeconds: 0
        //     },
        //     SecondEnteredTime: {
        //       Ticks: 0,
        //       Days: 0,
        //       Hours: 0,
        //       Milliseconds: 0,
        //       Minutes: 0,
        //       Seconds: 0,
        //       TotalDays: 0,
        //       TotalHours: 0,
        //       TotalMilliseconds: 0,
        //       TotalMinutes: 0,
        //       TotalSeconds: 0
        //     },
        //     NotificationSchedule: "All_Day"
        //   },
        //   {
        //     DayOfWeek: "Thursday",
        //     FirstEnteredTime: {
        //       Ticks: 0,
        //       Days: 0,
        //       Hours: 0,
        //       Milliseconds: 0,
        //       Minutes: 0,
        //       Seconds: 0,
        //       TotalDays: 0,
        //       TotalHours: 0,
        //       TotalMilliseconds: 0,
        //       TotalMinutes: 0,
        //       TotalSeconds: 0
        //     },
        //     SecondEnteredTime: {
        //       Ticks: 0,
        //       Days: 0,
        //       Hours: 0,
        //       Milliseconds: 0,
        //       Minutes: 0,
        //       Seconds: 0,
        //       TotalDays: 0,
        //       TotalHours: 0,
        //       TotalMilliseconds: 0,
        //       TotalMinutes: 0,
        //       TotalSeconds: 0
        //     },
        //     NotificationSchedule: "All_Day"
        //   },
        //   {
        //     DayOfWeek: "Friday",
        //     FirstEnteredTime: {
        //       Ticks: 0,
        //       Days: 0,
        //       Hours: 0,
        //       Milliseconds: 0,
        //       Minutes: 0,
        //       Seconds: 0,
        //       TotalDays: 0,
        //       TotalHours: 0,
        //       TotalMilliseconds: 0,
        //       TotalMinutes: 0,
        //       TotalSeconds: 0
        //     },
        //     SecondEnteredTime: {
        //       Ticks: 0,
        //       Days: 0,
        //       Hours: 0,
        //       Milliseconds: 0,
        //       Minutes: 0,
        //       Seconds: 0,
        //       TotalDays: 0,
        //       TotalHours: 0,
        //       TotalMilliseconds: 0,
        //       TotalMinutes: 0,
        //       TotalSeconds: 0
        //     },
        //     NotificationSchedule: "All_Day"
        //   },
        //   {
        //     DayOfWeek: "Saturday",
        //     FirstEnteredTime: {
        //       Ticks: 0,
        //       Days: 0,
        //       Hours: 0,
        //       Milliseconds: 0,
        //       Minutes: 0,
        //       Seconds: 0,
        //       TotalDays: 0,
        //       TotalHours: 0,
        //       TotalMilliseconds: 0,
        //       TotalMinutes: 0,
        //       TotalSeconds: 0
        //     },
        //     SecondEnteredTime: {
        //       Ticks: 0,
        //       Days: 0,
        //       Hours: 0,
        //       Milliseconds: 0,
        //       Minutes: 0,
        //       Seconds: 0,
        //       TotalDays: 0,
        //       TotalHours: 0,
        //       TotalMilliseconds: 0,
        //       TotalMinutes: 0,
        //       TotalSeconds: 0
        //     },
        //     NotificationSchedule: "All_Day"
        //   },
        //   {
        //     DayOfWeek: "Sunday",
        //     FirstEnteredTime: {
        //       Ticks: 0,
        //       Days: 0,
        //       Hours: 0,
        //       Milliseconds: 0,
        //       Minutes: 0,
        //       Seconds: 0,
        //       TotalDays: 0,
        //       TotalHours: 0,
        //       TotalMilliseconds: 0,
        //       TotalMinutes: 0,
        //       TotalSeconds: 0
        //     },
        //     SecondEnteredTime: {
        //       Ticks: 0,
        //       Days: 0,
        //       Hours: 0,
        //       Milliseconds: 0,
        //       Minutes: 0,
        //       Seconds: 0,
        //       TotalDays: 0,
        //       TotalHours: 0,
        //       TotalMilliseconds: 0,
        //       TotalMinutes: 0,
        //       TotalSeconds: 0
        //     },
        //     NotificationSchedule: "All_Day"
        //   }
        // ];
      });
  }
  ngOnInit() {
    this.setInitialModelValues();
    this.isReadingTypeAvailable = false;
    let Obj = [
      {
        id: "Less_Than",
        value: "Less Than"
      },
      {
        id: "Greater_Than",
        value: "Greater Than"
      }
    ];
    this.selectTempCompareList = Obj;
    let Obj2 = [
      {
        id: "C",
        value: "Celcius"
      },
      {
        id: "F",
        value: "Fahrenheit"
      }
    ];
    this.selectTempTypeList = Obj2;
    let tempObject3 = [
      {
        id: "01",
        value: "All Day"
      },
      {
        id: "02",
        value: "Off"
      },
      {
        id: "03",
        value: "Between"
      },
      {
        id: "04",
        value: "Between and After"
      },
      {
        id: "05",
        value: "Before"
      },
      {
        id: "06",
        value: "After"
      }
    ];

     if (this.notifyOperationType === "addNotify"){

     }
   
    this.dailySheduleNotificationList = [];
    let Obj3 = [
      {
        id: "01",
        value: "Closed"
      },
      {
        id: "02",
        value: "Open"
      }
    ];
    this.notificationModel.selectNotifyMagnetList = Obj3;
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
    userObj.forEach(user => {
      let tempObj: any = [];
      (tempObj.id = user.Name), (tempObj.name = user.Name);
      userTempObj.push(tempObj);
    });
    this.myUserOptions = userTempObj;
    this.setEditNotifyDetails();
  }
  onChangeSensorSelect(e) {
     console.log('selected sensor',e);
     this.notificationModel.sensorList= this.sensorOptionsModel;
      console.log('selected user', this.notificationModel);
  }
  onChangeGatewaySelect(e) {
    console.log('selected gateway',e);
     this.notificationModel.gatewayList= this.gatewayOptionsModel;
      console.log('selected user', this.notificationModel);
  }
  onChangeUserSelect(e) {
     console.log('selected user',e);
     this.notificationModel.userList= this.userOptionsModel;
     console.log('selected user', this.notificationModel);
  }
  onClickSensorNotify() {
    this.notificationModel.notificationClassType = "1";
    this.isReadingTypeAvailable = true;
    this.isSensorNotificationForm1 = false;
    this.isSensorNotificationForm2 = false;
    this.isButtonFooterRequired = false;
    this.notificationModel.notificationTemplate = "sensorNotification";
    let Obj = [
      {
        id: "1",
        value: "Please Select One"
      },
      {
        id: "2",
        value: "Temperature"
      },
      {
        id: "43",
        value: "Humidity"
      },
      {
        id: "9",
        value: "Open/Closed"
      }
    ];
    this.selectSubNotificationList = Obj;
    console.log(this.selectSubNotificationList);
    let openCloseObj = [
      {
        id: "True",
        value: "Closed"
      },
      {
        id: "False",
        value: "Open"
      }
    ];
    this.selectOpenCloseType = openCloseObj;
  }
  onClickAdvanceNotify() {
    this.notificationModel.notificationClassType = "5";
    this.isReadingTypeAvailable = true;
    this.isSensorNotificationForm1 = false;
    this.isButtonFooterRequired = false;
    this.notificationModel.notificationTemplate = "advancedNotification";
    console.log("onClickSensorNotify");
    let Obj = [
      {
        id: "01",
        value: "Please Select One"
      },
      {
        id: "02",
        value: "Notify after aware period"
      },
      {
        id: "03",
        value: "Back Online"
      },
      {
        id: "04",
        value: "Battery Below 10"
      },
      {
        id: "05",
        value: "Gateway On Battery"
      },
      {
        id: "06",
        value: "Frequent Aware Messages"
      },
      {
        id: "07",
        value: "First Aware Message"
      },
      {
        id: "08",
        value: "First Non-Aware Message"
      },
      {
        id: "09",
        value: "Aware State Changed"
      },
      {
        id: "10",
        value: "Gateway Switched to Line Power"
      },
      {
        id: "11",
        value: "Notify after not aware period"
      },
      {
        id: "12",
        value: "Advanced Temperature Range"
      },
      {
        id: "13",
        value: "Advanced Humidity"
      },
      {
        id: "14",
        value: "Advanced Open / Closed"
      },
      {
        id: "15",
        value: "Advanced Temperature"
      }
    ];
    this.selectSubNotificationList = Obj;
    console.log(this.subNotificationTypes);
  }
  onClickBatteryNotify() {
    this.notificationModel.notificationClassType = "3";
    this.isReadingTypeAvailable = false;
    this.isSensorNotificationForm1 = true;
    this.isSensorNotificationForm2 = false;
    this.isButtonFooterRequired = true;
    this.notificationModel.notificationTemplate = "batteryNotification";
  }
  onClickInActivityNotify() {
    this.notificationModel.notificationClassType = "2";
    this.isReadingTypeAvailable = false;
    this.isSensorNotificationForm1 = true;
    this.isSensorNotificationForm2 = false;
    this.isButtonFooterRequired = true;
    this.notificationModel.notificationTemplate = "inActiveNotification";
  }
  onChangeNotifictaion(e) {
    this.isSensorNotificationForm1 = true;
    this.isButtonFooterRequired = true;
    console.log("selected Notification type-->", e);
    this.notificationModel.compareValue = "";
    if (e.id === "9") {
      this.notificationModel.compareValue = "True";
    }
    this.notificationModel.subnotificationClassType = e.id;
    console.log(this.notificationModel);
  }

  onChangeScheduleObject(e,scheduleObj){
    console.log('selected schedule obj',e);
    console.log('scheduleObj',scheduleObj.selectScheduleObj);
    scheduleObj.selectScheduleObj = e;
    console.log('scheduleObj',this.notificationModel.scheduleDayObjectList);

  }
  onClickBeforeTimeValue(e,timevalue){
     console.log('selected schedule obj',timevalue);
  }
  onClickAfterTimeValue(e,timevalue){
     console.log('selected schedule obj',timevalue);
      console.log('scheduleObj',this.notificationModel.scheduleDayObjectList);
  }
  onChangeSelectOpenCloseType(e) {
    console.log("selected Notification open?closetype-->", e);
    this.notificationModel.compareValue = e.id;
    console.log(" this.notificationModel->", this.notificationModel);
  }
  onChangeLessThanValue(e) {
    console.log("selected less/greater than value-->", e);
    this.notificationModel.compareType = e.id;
    console.log(this.notificationModel);
  }
  onChangeTempTypeValue(e) {
    console.log("selected celcius/foreighht than value-->", e);
    this.notificationModel.scale = e.id;
    console.log(this.notificationModel);
  }
  onClickAlways(e) {
    this.notificationModel.scheduleNotificationCheck = {
      left: true,
      right: false
    };
    this.dailySheduleNotificationList = [];
  }
  onClickSchedule(e) {
    this.notificationModel.scheduleNotificationCheck = {
      left: false,
      right: true
    };


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
    console.log("next-->", value);
    if (value === "page1") {
      this.isSensorNotificationForm2 = true;
      this.isSensorNotificationForm1 = false;
      this.isSensorNotificationForm3 = false;
      this.isSensorNotificationForm4 = false;
      this.isSensorNotificationForm5 = false;
      this.currentPageValue = "page2";
      this.isPreviousButtonRequired = true;
    } else if (value === "page2") {


      console.log('scheduleobj',this.scheduleObj);



      this.isSensorNotificationForm2 = false;
      this.isSensorNotificationForm1 = false;
      this.isSensorNotificationForm5 = false;
      this.isSensorNotificationForm4 = false;
      this.isSensorNotificationForm3 = true;
      this.currentPageValue = "page3";
    } else if (value === "page3") {
      this.isSensorNotificationForm4 = true;
      this.isSensorNotificationForm1 = false;
      this.isSensorNotificationForm2 = false;
      this.isSensorNotificationForm3 = false;
      this.isSensorNotificationForm5 = false;
      this.currentPageValue = "page4";
    } else if (value === "page4") {
      this.isSensorNotificationForm5 = true;
      this.isSensorNotificationForm4 = false;
      this.isSensorNotificationForm1 = false;
      this.isSensorNotificationForm2 = false;
      this.isSensorNotificationForm3 = false;
      this.currentPageValue = "page5";
      this.isNextButtonRequired = false;
    }
  }
  onClickPrevious(value) {
    console.log("prev-->", value);
    if (value === "page2") {
      this.isSensorNotificationForm2 = false;
      this.isSensorNotificationForm1 = true;
      this.isSensorNotificationForm3 = false;
      this.isSensorNotificationForm4 = false;
      this.isSensorNotificationForm5 = false;
      this.currentPageValue = "page1";
      this.isPreviousButtonRequired = false;
    } else if (value === "page3") {
      this.isSensorNotificationForm2 = true;
      this.isSensorNotificationForm1 = false;
      this.isSensorNotificationForm5 = false;
      this.isSensorNotificationForm4 = false;
      this.isSensorNotificationForm3 = false;
      this.currentPageValue = "page2";
    } else if (value === "page4") {
      this.isSensorNotificationForm4 = false;
      this.isSensorNotificationForm1 = false;
      this.isSensorNotificationForm2 = false;
      this.isSensorNotificationForm3 = true;
      this.isSensorNotificationForm5 = false;
      this.currentPageValue = "page3";
    } else if (value === "page5") {
      this.isSensorNotificationForm5 = false;
      this.isSensorNotificationForm4 = true;
      this.isSensorNotificationForm1 = false;
      this.isSensorNotificationForm2 = false;
      this.isSensorNotificationForm3 = false;
      this.currentPageValue = "page4";
      this.isNextButtonRequired = true;
    }
  }
  onClickCreateNotification(value) {
    console.log("this.notificationModel------>", this.notificationModel);
    // backend method
    let requestObject = {
      text: this.notificationModel.strNotificationText,
      name: this.notificationModel.strNotificationName,
      scale: "",
      notificationClass: "Advanced",
      compareType: "sample string 5",
      comparerValue: 6.1,
      accountID: 7,
      advancedNotificationID: 8,
      monnitApplicationID: 9,
      gatewayID: 10,
      sensorID: 11,
      snooze: 12.1,
      startTime: "sample string 13",
      endTime: "sample string 14",
      schedule: {
        sundayDayOfWeek: "sample string 1",
        mondayDayOfWeek: "sample string 2",
        tuesdayDayOfWeek: "sample string 3",
        wednesdayDayOfWeek: "sample string 4",
        thursdayDayOfWeek: "sample string 5",
        fridayDayOfWeek: "sample string 6",
        saturdayDayOfWeek: "sample string 7"
      }
    };
    // console.log('this.notifyOperationType',this.notifyOperationType);
    if (this.notifyOperationType === "addNotify") {
      this.sensorSummaryService
        .createNotificationDetails(requestObject)
        .then(result => {
          //Emit true if 1
          this.createMessageEvent.emit(true);
        });
    } else if (this.notifyOperationType === "editNotify") {
      this.sensorSummaryService
        .UpdateNotificationDetails(requestObject)
        .then(result => {
          //Emit true if 1
          this.createMessageEvent.emit(true);
        });
    }
  }
}
