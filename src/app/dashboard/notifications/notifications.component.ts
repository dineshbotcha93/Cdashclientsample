import { Component, OnInit ,Output, EventEmitter,Input } from '@angular/core';


@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements OnInit {

  
  subNotificationTypes: any = [];
  selectSubNotifyType : any = [];
  isAvailable : boolean = false;

  constructor() { }

  ngOnInit() {
  	this.isAvailable = false;
  }


  onClickSensorNotify(){
  	this.isAvailable = true;
  
  	console.log('onClickSensorNotify');
  	let Obj = {
                  id: '01',
                  value: 'Please Select One'
               };

    this.selectSubNotifyType = Obj;
    this.subNotificationTypes.push(Obj);
      Obj = {
                  id: '02',
                  value: 'Temperature'
               };
    this.subNotificationTypes.push(Obj);
    console.log('onClickSensorNotify',this.subNotificationTypes);
  }

}