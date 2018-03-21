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
    selectTempTypeList: any = [];
    selectOpenCloseType: any = [];



      // isComponentToCreate:string = 'addNotify';
      constructor(private sensorSummaryService: SensorSummaryService) {}
      setEditNotifyDetails() {
        if (
          this.notifyOperationType === "editNotify" ||
          this.notifyOperationType === "addNotify"
          ) {
        let tempObject: any;
      // tempObject = this.sensorList;
      // console.log("before editing ", this.sensorList[0]);
      // console.log("this.editNotifyObject",this.editNotifyObject);
      tempObject = this.notifyOperationType === "editNotify"? this.editNotifyObject: this.sensorList[0];

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
            id :user.userName,
              name : user.userName,
              userID: user.userID,
              emailNotify:user.recievesMaintenanceByEmail,
              smsNotify:user.recievesNotificaitonsBySMS
          }

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
          (tempObj.id = device.deviceID);
          (tempObj.name = device.deviceID);
          if (device.deviceCategory === "Sensor") {
            sensorObj.push(tempObj);
            sensorModel.push(device.deviceID,);
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

         this.notificationModel.compareValue= notify.threshold;
         this.notificationModel.compareType = notify.comparer;
         this.notificationModel.notificationID = notify.notificationID;
        if(notify.notificationClass === 'Inactivity'){
          this.onClickInActivityNotify();
        }else if(notify.notificationClass === 'Application'){
          this.onClickSensorNotify();

        }else if(notify.notificationClass === 'Low_Battery' || notify.notificationClass === 'Low Battery'){
          this.onClickBatteryNotify();
        }
      }else{
          this.setInitialModelValues();
          this.getNotificationScheduleDetailsForAddNotify();

          let sensorGlobalList= this.globalNotificationsList.sensors;

          let gatewayGlobalList = this.globalNotificationsList.gateways;

          let userGlobalList = this.globalNotificationsList.users;


          let userTempObj = [];
          let userSelectedObject = [];

          userGlobalList.forEach(user => {
            let tempObj: any = [];
            tempObj = {
              id :user.userName,
              name : user.userName,
              userID: user.userID,
              emailNotify:user.recievesMaintenanceByEmail,
              smsNotify:user.recievesNotificaitonsBySMS
            }

           userTempObj.push(tempObj);
           userSelectedObject.push(tempObj.id);
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
      //user setting
      // let userTempObj = [];
      // let userSelectedObject = [];
      // tempObject.users.forEach(user => {
      //   let tempObj: any = [];
      //   (tempObj.id = user.userName), (tempObj.name = user.userName);
      //   userTempObj.push(tempObj);
      //   userSelectedObject.push(tempObj.id);
      // });
      // this.myUserOptions = [];
      // this.myUserOptions = userTempObj;
      // this.userOptionsModel = userSelectedObject;
      //sensor setting
      // let sensorObj = [];
      // let sensorModel = [];
      // let gatewayModel = [];
      // let gatewayObj = [];
      // tempObject.devices.forEach(device => {
      //   let tempObj: any = [];
      //   (tempObj.id = device.deviceID), (tempObj.name = device.deviceID);
      //   if (device.deviceCategory === "Sensor") {
      //     sensorObj.push(tempObj);
      //     sensorModel.push(device.deviceID);
      //   } else {
      //     gatewayObj.push(tempObj);
      //     gatewayModel.push(device.deviceID);
      //   }
      // });
      // this.sensorOptionsModel = sensorModel;
      // this.gatewayOptionsModel = gatewayModel;
      // this.mySensorOptions = sensorObj;
      // this.myGatewayOptions = gatewayObj;
      //   this.notificationModel.sensorList = sensorModel;
      //   this.notificationModel.gatewayList = gatewayModel;
      //   this.notificationModel.userList = userSelectedObject;
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
      advancedNotificationID: "1",
      scheduleDayObjectList:[],
      gatewayList:[],
      sensorList:[],
      userList:[],
      notificationID:"0"
    };
  }
  getNotificationScheduleDetailsForAddNotify(){
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
      dayOfWeekValue: "0",
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
              Before="4",
              After="5"
      }

      enum DayWeek {
              Monday = "1",
              Tuesday = "2",
              Wednesday = "3",
              Thursday = "4",
              Friday="5",
              Saturday="6",
              Sunday="0"
      }

      result.forEach(schedule => {
        let selectedScheduleObj;


            tempObject3.forEach(dayObject => {

              if(dayObject.value === schedule.NotificationSchedule){
                selectedScheduleObj = (dayObject);
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
  ngOnInit() {
    this.setInitialModelValues();
    this.isReadingTypeAvailable = false;
    let Obj = [{
      id: "Less_Than",
      value: "Less Than"
    },{
      id: "Greater_Than",
      value: "Greater Than"
    }];
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

    let tempObject3 = [{
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
    }];

    if (this.notifyOperationType === "addNotify"){}

    this.dailySheduleNotificationList = [];

    let Obj3 = [{
      id: "01",
      value: "Closed"
    },
    {
      id: "02",
      value: "Open"
    }];

    this.notificationModel.selectNotifyMagnetList = Obj3

    this.setEditNotifyDetails();
    }

    onChangeSensorSelect(e) {

      this.notificationModel.sensorList= this.sensorOptionsModel;

    }
    onChangeGatewaySelect(e) {

      this.notificationModel.gatewayList= this.gatewayOptionsModel;

    }
    onChangeUserSelect(e,totalvalue) {

      this.notificationModel.userList= this.userOptionsModel;

    }
    onClickSensorNotify() {
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
    }
    onClickBatteryNotify() {
      this.notificationModel.notificationClassType = "Low_Battery";
      this.isReadingTypeAvailable = false;
      this.isSensorNotificationForm1 = true;
      this.isSensorNotificationForm2 = false;
      this.isButtonFooterRequired = true;
      this.notificationModel.compareType='Less_Than';
      this.notificationModel.notificationTemplate = "batteryNotification";
    }
    onClickInActivityNotify() {
      this.notificationModel.notificationClassType = "Inactivity";
      this.isReadingTypeAvailable = false;
      this.isSensorNotificationForm1 = true;
      this.isSensorNotificationForm2 = false;
      this.isButtonFooterRequired = true;
      this.notificationModel.compareType='Equal';
      this.notificationModel.notificationTemplate = "inActiveNotification";
    }
    onChangeNotifictaion(e) {
      this.isSensorNotificationForm1 = true;
      this.isButtonFooterRequired = true;

      if(e.id === "2"){
         this.notificationModel.compareType = "Less_Than";
      }

      // this.notificationModel.compareValue = "";
      if (e.id === "9") {
        this.notificationModel.compareValue = "True";
      }
      this.notificationModel.subnotificationClassType = e.id;

    }
    onChangeScheduleObject(e,scheduleObj){

      scheduleObj.selectScheduleObj = e;

    }
    onClickBeforeTimeValue(e,timevalue){

    }
    onClickAfterTimeValue(e,timevalue){

    }
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

      if (value === "page1") {
        this.isSensorNotificationForm2 = true;
        this.isSensorNotificationForm1 = false;
        this.isSensorNotificationForm3 = false;
        this.isSensorNotificationForm4 = false;
        this.isSensorNotificationForm5 = false;
        this.currentPageValue = "page2";
        this.isPreviousButtonRequired = true;
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

      let tempObj = [];
      this.notificationModel.scheduleDayObjectList.forEach(sch => {
        let scechuleFinalObj = {
          dayOfWeek:sch.dayOfWeekValue,
          scheduleDay:sch.selectScheduleObj.id,
          firstTime:sch.timePickerBefore,
          secondTime:sch.timePickerAfter
        };
        tempObj.push(scechuleFinalObj);
      });


      let userList = [];
       this.myUserOptions.forEach(user => {


          this.notificationModel.userList.forEach(selectedUser => {
            let tempObj = [];
            let notifyType = [];

            if(selectedUser === user.id){
                if(user['emailNotify']){
                  notifyType = [1,2];
                }else{
                   notifyType = [1];
                }
                let userObj = {
                  userID : user['userID'],
                  notificationType : notifyType
                };
               userList.push(userObj);
            }
      });
      });



        // backend method
        let requestObject = {
          text: this.notificationModel.strNotificationText,
          name: this.notificationModel.strNotificationName,
          scale: this.notificationModel.scale,
          notificationClass: this.notificationModel.notificationClassType,
          compareType: this.notificationModel.compareType,
           comparerValue:this.notificationModel.compareValue,
          accountID: '72',
          advancedNotificationID: this.notificationModel.advancedNotificationID,
          monnitApplicationID: this.notificationModel.subnotificationClassType,
          gatewayList: this.notificationModel.gatewayList,
          sensorList: this.notificationModel.sensorList,
          userList: userList,
          snooze: this.notificationModel.strSnoozeAlertValue,
          startTime: "",
          endTime: "",
          schedule: tempObj,
          NotificationID:this.notificationModel.notificationID,
          ApplySnoozeByTriggerDevice:1
        };
        console.log('requestObject',requestObject);
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
