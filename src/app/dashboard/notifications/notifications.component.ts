import { Component, OnInit ,Output, EventEmitter,Input } from '@angular/core';



@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements OnInit {

  
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
  }


  onClickSensorNotify(){
    this.isReadingTypeAvailable = true;
  
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

  onChangeNotifictaion(e){
    this.isSensorNotificationForm = true;
  }

 onClickAlways(e){
     this.checkModel = { left: true, right: false };
 }

 onClickSchedule(e){
   this.checkModel = { left: false, right: true };
 }

 onClickIndependent(e){
     this.checkModel = { left: true, right: false };
 }

 onClickJoint(e){
   this.checkModel = { left: false, right: true };
 }

}
