import { Component, OnInit ,Output, EventEmitter } from '@angular/core';
import { DeviceManagementModel } from '../../shared/models/device/DeviceManagementModel';

@Component({
  selector: 'app-create-device',
  templateUrl: './create-device.component.html',
  styleUrls: ['./create-device.component.scss']
})
export class CreateDeviceComponent implements OnInit {
	

   @Output() messageEvent = new EventEmitter<boolean>();
 
  	message: boolean = false;
	deviceModel: DeviceManagementModel = 
	{
		name:  '',
		id:    '',
		code:  '',
		netWorkList: []
	};


  constructor() { }

  ngOnInit() {
  }

  onClickAddDetail(){
  	console.log('returning',this.message);
  	 this.messageEvent.emit(this.message);
  }

}
