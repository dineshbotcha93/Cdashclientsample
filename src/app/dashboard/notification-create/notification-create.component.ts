import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-notification-create',
  templateUrl: './notification-create.component.html',
  styleUrls: ['./notification-create.component.scss']
})
export class NotificationCreateComponent implements OnInit {

  subNotificationTypes: any = [];
  selectSubNotifyType : any = [];
  isReadingTypeAvailable : boolean = false;
  isSensorNotificationForm:boolean = false;
  isLessThanValue: any = [];
  tempTypeValue:any = [];
  selectIsLessThanValue :any = [];
  selectTempTypeValue :any = [];
  isNotificationActive : any = [];

  checkModel: any = { left: true, right: false };
  checkModelSnooze: any = { left: true, right: false };

  dailySheduleNotificationList :any = [];
  timePickerBefore : Date = new Date();
  timePickerAfter : Date = new Date();

  scheduleObj : any = [];


  templateName :string ;



  constructor() { }

  ngOnInit() {

    this.isReadingTypeAvailable = false;

        let Obj = [
          {
          id: '01',
          value: 'LessThan'
          },{
          id: '02',
          value: 'greaterThan'
        }
      ];
    

    this.selectIsLessThanValue = Obj[0];
    this.isLessThanValue = Obj;
   
    let Obj2 = [
          {
          id: '01',
          value: 'Celcius'
          },{
          id: '02',
          value: 'Fahrenheit'
        }

      ];

    this.selectTempTypeValue = Obj2[0];
    this.tempTypeValue = Obj2;

    let tempObject3 = [
          {
          id: '01',
          value: 'All Day'
          },{
          id: '02',
          value: 'Off'
        },{
          id: '03',
          value: 'Between'
        },{
          id: '04',
          value: 'Between and After'
        },{
          id: '05',
          value: 'Before'
        },{
          id: '06',
          value: 'After'
        }

      ];

     this.scheduleObj = [
          {
            day:'Monday',
                  value:'monday',
                  scheduleObj: tempObject3,
                  timePickerBefore:this.timePickerBefore,
                  timePickerAfter:this.timePickerAfter
          },
          {
            day:'Tuesday',
                  value:'tuesday',
                  scheduleObj: tempObject3,
                  timePickerBefore:this.timePickerBefore,
                  timePickerAfter:this.timePickerAfter
          },
          {
            day:'Wednesday',
                  value:'wednesday',
                  scheduleObj: tempObject3,
                  timePickerBefore:this.timePickerBefore,
                  timePickerAfter:this.timePickerAfter
          },
          {
            day:'Thursday',
                  value:'thursday',
                  scheduleObj: tempObject3,
                  timePickerBefore:this.timePickerBefore,
                  timePickerAfter:this.timePickerAfter
          },
          {
            day:'Friday',
                  value:'friday',
                  scheduleObj: tempObject3,
                  timePickerBefore:this.timePickerBefore,
                  timePickerAfter:this.timePickerAfter
          },
          {
            day:'Saturday',
                  value:'saturday',
                  scheduleObj: tempObject3,
                  timePickerBefore:this.timePickerBefore,
                  timePickerAfter:this.timePickerAfter
          },{
            day:'Sunday',
                  value:'sunday',
                  scheduleObj: tempObject3,
                  timePickerBefore:this.timePickerBefore,
                  timePickerAfter:this.timePickerAfter
          }
      ];
        
    

      this.dailySheduleNotificationList = [];
  }


  onClickSensorNotify(){
    this.isReadingTypeAvailable = true;

    this.isSensorNotificationForm = false;
    
    this.templateName = 'sensorNotification';
  
    console.log('onClickSensorNotify');
    let Obj = [
                {  id: '01',
                  value: 'Please Select One'
                },
                {
                  id: '02',
                  value: 'Temperature'
                }
               ];

    this.selectSubNotifyType = Obj[0];
    this.subNotificationTypes = Obj;
  }


  onClickAdvanceNotify(){
    this.isReadingTypeAvailable = true;
    this.isSensorNotificationForm = false;
    this.templateName = 'advancedNotification';
  
    console.log('onClickSensorNotify');
    let Obj = [
                {  id: '01',
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
                  id: '14',
                  value: 'Advanced Temperature'
                }

               ];

    this.selectSubNotifyType = Obj[0];
    this.subNotificationTypes = Obj;
  }

  onClickBatteryNotify(){

    this.isReadingTypeAvailable = false;
    
    this.isSensorNotificationForm = true;

     this.templateName = 'batteryNotification';

  }

  onClickInActivityNotify(){

    
    this.isReadingTypeAvailable = false;
    
    this.isSensorNotificationForm = true;

     this.templateName = 'inActiveNotification';
    
  }

 onChangeNotifictaion(e){
    this.isSensorNotificationForm = true;
  }

 onClickAlways(e){
     this.checkModel = { left: true, right: false };
   
    this.dailySheduleNotificationList = [];
 }

 onClickSchedule(e){
   this.checkModel = { left: false, right: true };
   this.dailySheduleNotificationList = this.scheduleObj;
 }

 onClickIndependent(e){
     this.checkModelSnooze = { left: true, right: false };
 }

 onClickJoint(e){
   this.checkModelSnooze = { left: false, right: true };
 }

 onClickCancelDetail(){
   this.isSensorNotificationForm = false;
 }

}
