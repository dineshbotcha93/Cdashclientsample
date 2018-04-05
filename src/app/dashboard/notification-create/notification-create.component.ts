import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { NotificationModel } from "../../shared/models/NotificationModel";
import { SensorSummaryService } from "../sensor-summary/services/sensor-summary.service";
import {
  IMultiSelectOption,
  IMultiSelectSettings
} from "angular-2-dropdown-multiselect";
import {
  FormsModule,
  FormBuilder,
  FormGroup,
  Validators
} from "@angular/forms";


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
  @Input() globalNotificationsList: any;
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
  selectedTempCompareList: any = [];
  selectTempTypeList: any = [];
  selectOpenCloseType: any = [];
  selectedOpenCloseType: any = [];
  selectSensorHumidityType: any = [];
  selectedSensorHumidityType: any = [];

  isValidForm = true;
  notificationForm1: FormGroup;
  notificationForm2: FormGroup;
  notificationForm3: FormGroup;
  notificationForm4: FormGroup;
  notificationForm5: FormGroup;


  notificationOperationError: string | null = null;

  advancedParameterObject: any = [];
  accountID: string = null;
  // isComponentToCreate:string = 'addNotify';
  constructor(
    private sensorSummaryService: SensorSummaryService,
    private formBuilder: FormBuilder
  ) {
    this.notificationOperationError = "Please until loading done....";
  }
  setEditNotifyDetails() {
    if (
      this.notifyOperationType === "editNotify" ||
      this.notifyOperationType === "addNotify"
    ) {
      let tempObject: any;
      tempObject =
        this.notifyOperationType === "editNotify" ? this.editNotifyObject : [];
      if (this.notifyOperationType === "editNotify") {
        let notify = tempObject.notification;
        this.notificationModel.strNotificationName = notify.name;
        this.notificationModel.strNotificationText = notify.text;
        this.notificationModel.strSnoozeAlertValue = notify.snooze;
        this.notificationModel.isNotificationActive = notify.active;
        this.getNotificationScheduleDetails(notify.notificationID);
        this.isSensorNotificationForm1 = true;
        this.isButtonFooterRequired = true;
        //user setting
        let userTempObj = [];
        let userSelectedObject = [];
        tempObject.users.forEach(user => {
          let tempObj: any = [];
          tempObj = {
            id: user.userName,
            name: user.userName,
            userID: user.userID,
            emailNotify: user.recievesMaintenanceByEmail,
            smsNotify: user.recievesNotificaitonsBySMS
          };
          userTempObj.push(tempObj);
          userSelectedObject.push(tempObj.id);
        });
        this.myUserOptions = [];
        this.myUserOptions = userTempObj;
        this.userOptionsModel = userSelectedObject;
        // sensor setting
        let sensorObj = [];
        let sensorModel = [];
        let gatewayModel = [];
        let gatewayObj = [];
        tempObject.devices.forEach(device => {
          let tempObj: any = [];
          tempObj.id = device.deviceID;
          tempObj.name = device.deviceID;
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
        this.mySensorOptions = sensorObj;
        this.myGatewayOptions = gatewayObj;
        this.notificationModel.sensorList = sensorModel;
        this.notificationModel.gatewayList = gatewayModel;
        this.notificationModel.userList = userSelectedObject;
        //mapping of edit to update
        this.notificationModel.compareValue = notify.threshold;
        this.notificationModel.compareType = notify.comparer;
        this.notificationModel.notificationID = notify.notificationID;

        if (notify.notificationClass === "Inactivity") {
          this.onClickInActivityNotify();
        } else if (notify.notificationClass === "Application") {
          this.onClickSensorNotify();
        } else if (
          notify.notificationClass === "Low_Battery" ||
          notify.notificationClass === "Low Battery"
        ) {
          this.onClickBatteryNotify();
        }

      } else {
        this.setInitialModelValues();
        this.getNotificationScheduleDetailsForAddNotify();
        let sensorGlobalList = this.globalNotificationsList.sensors;
        let gatewayGlobalList = this.globalNotificationsList.gateways;
        let userGlobalList = this.globalNotificationsList.users;
        let userTempObj = [];
        let userSelectedObject = [];

        userGlobalList.forEach(user => {
          let tempObj: any = [];
          tempObj = {
            id: user.userName,
            name: user.userName,
            userID: user.userID,
            emailNotify: user.recievesMaintenanceByEmail,
            smsNotify: user.recievesNotificaitonsBySMS
          };
          userTempObj.push(tempObj);
          // userSelectedObject.push(tempObj.id);
        });

        this.myUserOptions = [];
        this.myUserOptions = userTempObj;
        this.userOptionsModel = userSelectedObject;
        this.notificationModel.userList = userSelectedObject;
        //sensor setting
        let sensorObj = [];
        let sensorModel = [];
        let gatewayModel = [];
        let gatewayObj = [];
        //gateway
        gatewayGlobalList.forEach(device => {
          let tempObj: any = [];
          (tempObj.id = device.gatewayID), (tempObj.name = device.gatewayID);
          // gatewayModel.push(device.gatewayID);
          gatewayObj.push(tempObj);
        });
        this.myGatewayOptions = gatewayObj;
        this.gatewayOptionsModel = gatewayModel;
        sensorGlobalList.forEach(device => {
          let tempObj: any = [];
          (tempObj.id = device.sensorID), (tempObj.name = device.sensorID);
          // sensorModel.push(device.sensorID);
          sensorObj.push(tempObj);
        });
        this.sensorOptionsModel = sensorModel;
        this.mySensorOptions = sensorObj;
        this.notificationModel.sensorList = sensorModel;
        this.notificationModel.gatewayList = gatewayModel;
      }
    }
  }
  setInitialModelValues() {
    this.notificationModel = {
      notificationClassType: "",
      subnotificationClassType: "2",
      strNotificationName: "",
      strNotificationText: "",
      compareType: "Less_Than",
      compareValue: "",
      scale: "F",
      scheduleNotificationCheck: { left: false, right: true },
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
      advancedNotificationID: "1",
      scheduleDayObjectList: [],
      gatewayList: [],
      sensorList: [],
      userList: [],
      notificationID: "0",
      advancedNotification: []
    };

  }
  getNotificationScheduleDetailsForAddNotify() {
    this.scheduleObj = [];
    let tempObject3 = [
      {
        id: "0",
        value: "All Day"
      },
      {
        id: "1",
        value: "Off"
      },
      {
        id: "2",
        value: "Between"
      },
      {
        id: "3",
        value: "Between and After"
      },
      {
        id: "4",
        value: "Before"
      },
      {
        id: "5",
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
        id: "0",
        value: "Sunday"
      }
    ];
    let selectedObj = [];
    selectedObj.push(tempObject3[0]);

    // let d = new Date();
    //   d.setHours(17);
    //   d.setMinutes(2);



    this.scheduleObj = [
      {
        dayOfWeek: "Monday",
        dayOfWeekValue: "1",
        scheduleDayObject: tempObject3,
        timePickerBefore: this.timePickerBefore,
        timePickerAfter: this.timePickerAfter,
        selectScheduleObj: tempObject3[0]
      },
      {
        dayOfWeek: "Tuesday",
        dayOfWeekValue: "2",
        scheduleDayObject: tempObject3,
        timePickerBefore: this.timePickerBefore,
        timePickerAfter: this.timePickerAfter,
        selectScheduleObj: tempObject3[0]
      },
      {
        dayOfWeek: "Wednesday",
        dayOfWeekValue: "3",
        scheduleDayObject: tempObject3,
        timePickerBefore: this.timePickerBefore,
        timePickerAfter: this.timePickerAfter,
        selectScheduleObj: tempObject3[0]
      },
      {
        dayOfWeek: "Thursday",
        dayOfWeekValue: "4",
        scheduleDayObject: tempObject3,
        timePickerBefore: this.timePickerBefore,
        timePickerAfter: this.timePickerAfter,
        selectScheduleObj: tempObject3[0]
      },
      {
        dayOfWeek: "Friday",
        dayOfWeekValue: "5",
        scheduleDayObject: tempObject3,
        timePickerBefore: this.timePickerBefore,
        timePickerAfter: this.timePickerAfter,
        selectScheduleObj: tempObject3[0]
      },
      {
        dayOfWeek: "Saturday",
        dayOfWeekValue: "6",
        scheduleDayObject: tempObject3,
        timePickerBefore: this.timePickerBefore,
        timePickerAfter: this.timePickerAfter,
        selectScheduleObj: tempObject3[0]
      },
      {
        dayOfWeek: "Sunday",
        dayOfWeekValue: "0",
        scheduleDayObject: tempObject3,
        timePickerBefore: this.timePickerBefore,
        timePickerAfter: this.timePickerAfter,
        selectScheduleObj: tempObject3[0]
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
        console.log('result-->',result);
        this.scheduleObj = [];
        let tempObject3 = [
          {
            id: "0",
            value: "All_Day"
          },
          {
            id: "1",
            value: "Off"
          },
          {
            id: "2",
            value: "Between"
          },
          {
            id: "3",
            value: "Before_and_After"
          },
          {
            id: "4",
            value: "Before"
          },
          {
            id: "5",
            value: "After"
          }
        ];
        enum DayType {
          All_Day = "0",
          Off = "1",
          Between = "2",
          Before_and_After = "3",
          Before = "4",
          After = "5"
        }
        enum DayWeek {
          Monday = "1",
          Tuesday = "2",
          Wednesday = "3",
          Thursday = "4",
          Friday = "5",
          Saturday = "6",
          Sunday = "0"
        }
        result.forEach(schedule => {
          let selectedScheduleObj;
          tempObject3.forEach(dayObject => {
            let date1 = new Date();
            let date2 = new Date();
            if (dayObject.value === schedule.NotificationSchedule) {
              selectedScheduleObj = dayObject;

                 date1.setHours(schedule.FirstEnteredTime.Hours);
                 date1.setMinutes(schedule.FirstEnteredTime.Minutes);

                 date2.setHours(schedule.SecondEnteredTime.Hours);
                 date2.setMinutes(schedule.SecondEnteredTime.Minutes);
              
                 this.timePickerBefore = date1;
                 this.timePickerAfter = date2;
               
            }
          });
          let tempObj = {
            dayOfWeek: schedule.DayOfWeek,
            dayOfWeekValue: DayWeek[schedule.DayOfWeek],
            scheduleDayObject: tempObject3,
            timePickerBefore: this.timePickerBefore,
            timePickerAfter: this.timePickerAfter,
            selectScheduleObj: selectedScheduleObj
          };
          this.scheduleObj.push(tempObj);
        });
        // ];
        this.dailySheduleNotificationList = this.scheduleObj;
        this.notificationModel.scheduleDayObjectList = this.scheduleObj;
      });
  }
  setNotificationFormDetails() {


    this.notificationForm1 = this.formBuilder.group({
       name: [this.notificationModel.strNotificationName, [Validators.required]],
       text: [this.notificationModel.strNotificationText, [Validators.required]],
       compareValue: [this.notificationModel.compareValue, [Validators.minLength(1),Validators.maxLength(3),Validators.required,Validators.pattern(/^([0-9])+$/)]],
       compareType: [this.notificationModel.compareType, [Validators.required]],
       scale: [this.notificationModel.scale, [Validators.required]],
       parameterValue: [this.notificationModel.advancedNotification],
       parameterObject: [this.notificationModel.advancedNotification],
       strSnoozeAlertValue: [this.notificationModel.strSnoozeAlertValue, [Validators.minLength(1),Validators.maxLength(3),Validators.required,Validators.pattern(/^([0-9])+$/)]],
       isNotificationActive:[this.notificationModel.isNotificationActive, [Validators.required]],
       scheduleSnoozeCheckLeft:[this.notificationModel.scheduleSnoozeCheck.left, [Validators.required]],
       scheduleSnoozeCheckRight:[this.notificationModel.scheduleSnoozeCheck.right, [Validators.required]],
    });
    this.isValidForm = true;
  }
  ngOnInit() {
    this.isValidForm = false;
    let accountID;
    let userInfoObject = JSON.parse(
      localStorage.getItem("com.cdashboard.userInfoObject")
    );
    userInfoObject["account"].forEach(loc => {
      this.accountID = loc.accountID;
    });
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
    this.selectedTempCompareList = Obj[0];
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
    if (this.notifyOperationType === "addNotify") {
    }
    this.dailySheduleNotificationList = [];
    let Obj3 = [
      {
        id: "1",
        value: "Closed"
      },
      {
        id: "0",
        value: "Open"
      }
    ];
    this.notificationModel.selectNotifyMagnetList = Obj3;
    this.setEditNotifyDetails();
    // this.setNotificationFormDetails();
  }
  onChangeSensorSelect(e) {
    this.notificationModel.sensorList = this.sensorOptionsModel;
  }
  onChangeGatewaySelect(e) {
    this.notificationModel.gatewayList = this.gatewayOptionsModel;
  }
  onChangeUserSelect(e, totalvalue) {
    this.notificationModel.userList = this.userOptionsModel;
  }
  onClickSensorNotify() {
    if( this.notifyOperationType === "addNotify"){
         this.setInitialModelValues();
         this.getNotificationScheduleDetailsForAddNotify();
    }
   
       
    this.isValidForm = true;
    this.notificationModel.notificationClassType = "Application";
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
    let openCloseObj = [
      {
        id: "1",
        value: "Closed"
      },
      {
        id: "0",
        value: "Open"
      }
    ];
    this.selectOpenCloseType = openCloseObj;
    this.selectedOpenCloseType = openCloseObj[0];
    let humidityObjects = [
      {
        id: "Less_Than",
        value: "Less Than"
      },
      {
        id: "Greater_Than",
        value: "Greater Than"
      },
      {
        id: "Equal",
        value: "Equal"
      },
      {
        id: "Not_Equal",
        value: "Not Equal"
      },
      {
        id: "Greater_Than_or_Equal",
        value: "Greater Than or Equal"
      },
      {
        id: "Less_Than_or_Equal",
        value: "Less Than or Equal"
      }
    ];
    this.selectSensorHumidityType = humidityObjects;

    if (this.notifyOperationType === "editNotify") {
      humidityObjects.forEach(humid => {
        if (humid.value === this.notificationModel.compareType) {
          this.selectedSensorHumidityType = humid;
          this.notificationModel.compareType = humid.id;
        }
      });
      // open/close edit
      this.selectOpenCloseType.forEach(humid => {
        if (humid.id === this.notificationModel.compareValue.toString()) {
          this.selectedOpenCloseType = [];
          this.selectedOpenCloseType = humid;
          this.notificationModel.compareValue = humid.id;
        }
      });
    } else {
      this.selectedSensorHumidityType = humidityObjects[0];
    }
    this.isSensorNotificationForm3
    this.setNotificationFormDetails();
    this.currentPageValue='page1';
  }
  onClickAdvanceNotify() {

   if( this.notifyOperationType === "addNotify"){
         this.setInitialModelValues();
         this.getNotificationScheduleDetailsForAddNotify();
    }
    this.isValidForm = true;
    this.notificationModel.notificationClassType = "5";
    this.isReadingTypeAvailable = true;
    this.isSensorNotificationForm1 = false;
    this.isButtonFooterRequired = false;
    this.notificationModel.notificationTemplate = "advancedNotification";
    let Obj = [
      {
        id: "0",
        value: "Please Select One"
      },
      // {
      //   id: "1",
      //   value: "Notify after aware period"
      // },
      {
        id: "2",
        value: "Back Online"
      },
      {
        id: "3",
        value: "Battery Below 10"
      },
      {
        id: "4",
        value: "Gateway On Battery"
      },
      // {
      //   id: "5",
      //   value: "Frequent Aware Messages"
      // },
      // {
      //   id: "6",
      //   value: "First Aware Message"
      // },
      // {
      //   id: "7",
      //   value: "First Non-Aware Message"
      // },
      // {
      //   id: "8",
      //   value: "Aware State Changed"
      // },
      {
        id: "9",
        value: "Gateway Switched to Line Power"
      },
      // {
      //   id: "10",
      //   value: "Notify after not aware period"
      // },
      {
        id: "11",
        value: "Advanced Temperature Range"
      },
      {
        id: "12",
        value: "Advanced Humidity"
      },
      {
        id: "13",
        value: "Advanced Open / Closed"
      },
      {
        id: "14",
        value: "Advanced Temperature"
      }
    ];
    this.notificationModel.compareValue= "0";
    this.selectSubNotificationList = Obj;
    this.setNotificationFormDetails();
    this.currentPageValue='page1';
  }
  onClickBatteryNotify() {
    if( this.notifyOperationType === "addNotify"){
         this.setInitialModelValues();
         this.getNotificationScheduleDetailsForAddNotify();
    }
    this.isValidForm = true;
    this.notificationModel.notificationClassType = "Low_Battery";
    this.isReadingTypeAvailable = false;
    this.isSensorNotificationForm1 = true;
    this.isSensorNotificationForm2 = false;
    this.isButtonFooterRequired = true;
    this.notificationModel.compareType = "Less_Than";
    this.notificationModel.notificationTemplate = "batteryNotification";
    this.setNotificationFormDetails();
    this.currentPageValue='page1';
  }
  onClickInActivityNotify() {
    if( this.notifyOperationType === "addNotify"){
         this.setInitialModelValues();
         this.getNotificationScheduleDetailsForAddNotify();
    }
    this.isValidForm = true;
    this.notificationModel.notificationClassType = "Inactivity";
    this.isReadingTypeAvailable = false;
    this.isSensorNotificationForm1 = true;
    this.isSensorNotificationForm2 = false;
    this.isButtonFooterRequired = true;
    this.notificationModel.compareType = "Equal";
    this.notificationModel.notificationTemplate = "inActiveNotification";
    this.setNotificationFormDetails();
    this.currentPageValue='page1';
  }
  onChangeNotifictaion(e) {
    this.isSensorNotificationForm1 = true;
    this.isButtonFooterRequired = true;
    if (e.id === "2") {
      this.notificationModel.compareType = "Less_Than";
    }
    // this.notificationModel.compareValue = "";
    if (e.id === "9") {
      this.notificationModel.compareValue = "1";
      this.notificationModel.compareType = "Equal";
    }
    this.notificationModel.subnotificationClassType = e.id;
    if (this.notificationModel.notificationClassType) {
      this.notificationModel.advancedNotificationID = this.notificationModel.subnotificationClassType;
    }
    
    if(this.notificationModel.notificationClassType === "5" ){
        this.setAdvancedNotificationParameterList(
        this.notificationModel.subnotificationClassType
    );
    }
  }
  setAdvancedNotificationParameterList(subNotifyTyoe) {
    this.advancedParameterObject = [];
    switch (subNotifyTyoe) {
      case "1": {
        this.advancedParameterObject.push(
          this.setAdvancedParameterDetails("Alert After", "1", "")
        );
        break;
      }
      case "2": {
        this.advancedParameterObject.push(
          this.setAdvancedParameterDetails("Alert After", "2", "")
        );
        break;
      }
      case "5": {
        this.advancedParameterObject.push(
          this.setAdvancedParameterDetails("Time Frame", "6", "")
        );
        this.advancedParameterObject.push(
          this.setAdvancedParameterDetails("Message Count", "7", "")
        );
        break;
      }
      case "5": {
        this.advancedParameterObject.push(
          this.setAdvancedParameterDetails("Alert After", "8", "")
        );
        break;
      }
      case "11": {
        this.advancedParameterObject.push(
          this.setAdvancedParameterDetails("Notify After  Minutes", "9", "")
        );
        this.advancedParameterObject.push(
          this.setAdvancedParameterDetails("Less than Temperature", "10", "")
        );
        this.advancedParameterObject.push(
          this.setAdvancedParameterDetails("Greater than Temperature", "11", "")
        );
        this.advancedParameterObject.push(
          this.setAdvancedParameterDetails("", "12", "")
        );
        break;
      }
      case "12": {
        this.advancedParameterObject.push(
          this.setAdvancedParameterDetails("Notify After Minutes", "13", "")
        );
        this.advancedParameterObject.push(
          this.setAdvancedParameterDetails("Less than Humidity", "14", "")
        );
        this.advancedParameterObject.push(
          this.setAdvancedParameterDetails("Greater than Humidity", "15", "")
        );
        break;
      }
      case "13": {
        this.advancedParameterObject.push(
          this.setAdvancedParameterDetails("Notify After Minutes", "16", "")
        );
        this.advancedParameterObject.push(
          this.setAdvancedParameterDetails("Notify when magnet is", "17", "")
        );
        break;
      }
      case "14": {
        this.advancedParameterObject.push(
          this.setAdvancedParameterDetails("Notify After Minutes", "18", "")
        );
        this.advancedParameterObject.push(
          this.setAdvancedParameterDetails(
            "Notify when sensor temperature reading is",
            "19",
            ""
          )
        );
        this.advancedParameterObject.push(
          this.setAdvancedParameterDetails("", "20", "")
        );
        this.advancedParameterObject.push(
          this.setAdvancedParameterDetails("", "21", "")
        );
        break;
      }
    }
  }
  setAdvancedParameterDetails(label, id, Value) {
    let temp = this.getAdvancedSelectList(id);
    let selectedTempObject;
    if (temp !== undefined) {
      selectedTempObject = temp[0];
    }
    return {
      labelValue: label,
      parameterID: id,
      parameterValue: Value,
      parameterObject: temp,
      parameterSelectedObject: selectedTempObject
    };
  }
  getAdvancedSelectList(type) {
    let retunObject;
    switch (type) {
      case "12": {
        retunObject = this.setTempList();
        break;
      }
      case "17": {
        retunObject = this.setMagnetList();
        break;
      }
      case "19": {
        retunObject = this.setTempReadingList();
        break;
      }
      case "21": {
        retunObject = this.setTempList();
        break;
      }
    }
    return retunObject;
  }
  setTempList() {
    return [
      {
        id: "1",
        value: "Fahrenheit"
      },
      {
        id: "0",
        value: "Celsius"
      }
    ];
  }
  setMagnetList() {
    return [
      {
        id: "0",
        value: "Closed"
      },
      {
        id: "1",
        value: "Open"
      }
    ];
  }
  setTempReadingList() {
    return [
      {
        id: "1",
        value: "Greater Than"
      },
      {
        id: "0",
        value: "Less Than"
      }
    ];
  }
  onChangeScheduleObject(e, scheduleObj) {
    scheduleObj.selectScheduleObj = e;
  }
  onClickBeforeTimeValue(e, timevalue) {}
  onClickAfterTimeValue(e, timevalue) {}
  onChangeSelectOpenCloseType(e) {
    this.notificationModel.compareValue = e.id;
  }
  onChangeLessThanValue(e) {
    this.notificationModel.compareType = e.id;
  }
  onChangeTempTypeValue(e) {
    this.notificationModel.scale = e.id;
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
    this.isValidForm = this.notificationForm1.valid;
    
    if (value === "page1") {

      if(this.isValidForm){
      this.isSensorNotificationForm2 = true;
      this.isSensorNotificationForm1 = false;
      this.isSensorNotificationForm3 = false;
      this.isSensorNotificationForm4 = false;
      this.isSensorNotificationForm5 = false;
      this.currentPageValue = "page2";
      this.isPreviousButtonRequired = true;
      }else{
        this.notificationOperationError = "Please fill the valid fields";
      }


    } else if (value === "page2") {
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
    // debugger;
    console.log(this.notificationModel.scheduleSnoozeCheck);
    if (this.advancedParameterObject.length > 0) {
      this.advancedParameterObject.forEach(obj => {
        // debugger;
        let tempvalue = obj.parameterValue
          ? obj.parameterValue
          : obj.parameterSelectedObject.id;
        let tempObj = {
          parameterID: obj.parameterID,
          parameterValue: tempvalue
        };
        this.notificationModel.advancedNotification.push(tempObj);
      });
    }

    let tempObj = [];

    if(!this.notificationModel.scheduleNotificationCheck.left){
      this.notificationModel.scheduleDayObjectList.forEach(sch => {
      let scechuleFinalObj = {
        dayOfWeek: sch.dayOfWeekValue,
        scheduleDay: sch.selectScheduleObj.id,
        firstTime: sch.timePickerBefore,
        secondTime: sch.timePickerAfter
      };
      tempObj.push(scechuleFinalObj);
    });
    }
   

    let userList = [];
    this.myUserOptions.forEach(user => {
      this.notificationModel.userList.forEach(selectedUser => {
        let tempObj = [];
        let notifyType = [];
        if (selectedUser === user.id) {
          if (user["emailNotify"]) {
            notifyType = [1, 2];
          } else {
            notifyType = [1];
          }
          let userObj = {
            userID: user["userID"],
            notificationType: notifyType
          };
          userList.push(userObj);
        }
      });
    });

    let snoozeTrigger = this.notificationModel.scheduleSnoozeCheck.left? 1 : 0;

    // backend method
    let requestObject = {
      text: this.notificationModel.strNotificationText,
      name: this.notificationModel.strNotificationName,
      scale: this.notificationModel.scale,
      notificationClass: this.notificationModel.notificationClassType,
      compareType: this.notificationModel.compareType,
      // comparerValue:this.notificationModel.compareValue,
      comparerValue: this.notificationModel.compareValue
        ? this.notificationModel.compareValue
        : "0",
      accountID: this.accountID,
      advancedNotificationID: this.notificationModel.advancedNotificationID,
      monnitApplicationID: this.notificationModel.subnotificationClassType,
      gatewayList: this.notificationModel.gatewayList,
      sensorList: this.notificationModel.sensorList,
      userList: userList,
      snooze: this.notificationModel.strSnoozeAlertValue,
      // startTime: "",
      // endTime: "",
      schedule: [],
      NotificationID: this.notificationModel.notificationID,
      ApplySnoozeByTriggerDevice:snoozeTrigger,
      advancedNotification: this.notificationModel.advancedNotification
    };
    
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
