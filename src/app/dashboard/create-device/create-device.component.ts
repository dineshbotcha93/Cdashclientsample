import { Component, OnInit ,Output, EventEmitter,Input } from '@angular/core';
import { DeviceManagementModel } from '../../shared/models/device/DeviceManagementModel';
import { CreateDeviceService } from './services/create-device.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-create-device',
  templateUrl: './create-device.component.html',
  providers:[CreateDeviceService],
  styleUrls: ['./create-device.component.scss']
})
export class CreateDeviceComponent implements OnInit {

   @Input() deviceType: string ;
   @Input() inputNetworkData:Array<any> = [];

   @Input() selectedNetwork:Array<any> = [];


   @Output() messageEvent = new EventEmitter<boolean>();

   @Output() messageCancelEvent = new EventEmitter<boolean>();

  	message: boolean = false;

	deviceModel: DeviceManagementModel =
	{
		name:  '',
		id:    '',
		code:  '',
		network: []
	};


  constructor(private createDeviceService: CreateDeviceService) { }

  ngOnInit() {
  	this.deviceType = this.deviceType.toUpperCase();
    this.deviceModel.network=this.selectedNetwork;
  }

  onClickAddDetail(){
      console.log(this.deviceModel);
      console.log(this.createDeviceService);
      this.createDeviceService.createGateway(this.deviceModel).then((e)=>{
        console.log(e);
      })
  	 this.messageEvent.emit(this.message);
  }

  onClickCancelDetail(){
     this.messageCancelEvent.emit(this.message);
  }

}
