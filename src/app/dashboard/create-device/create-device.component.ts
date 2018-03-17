import { Component, OnInit, Output, EventEmitter, Input } from "@angular/core";
import { DeviceManagementModel } from "../../shared/models/device/DeviceManagementModel";
import { CreateDeviceService } from "./services/create-device.service";
import { FormsModule } from "@angular/forms";

@Component({
  selector: "app-create-device",
  templateUrl: "./create-device.component.html",
  providers: [CreateDeviceService],
  styleUrls: ["./create-device.component.scss"]
})
export class CreateDeviceComponent implements OnInit {
  @Input() deviceType: string;
  @Input() inputNetworkData: Array<any> = [];

  @Input() selectedNetwork: any;

  @Output() messageEvent = new EventEmitter<boolean>();

  @Output() messageCancelEvent = new EventEmitter<boolean>();

  message: boolean = false;
  gatewayTypeObject: any = [];
  deviceModel: DeviceManagementModel;

  setDeviceModelInitiate() {
    this.deviceModel = {
      name: "",
      gatewayID: "",
      code: "",
      networkID: "",
      gatewayTypeID: "",
      serialNumber: "",
      macAddress: "",
      radioBand: "",
      apnFirmwareVersion: "",
      gatewayFirmwareVersion: "",
      powerSourceID: "11",
      customerID: "85"
    };
  }

  constructor(private createDeviceService: CreateDeviceService) {}

  ngOnInit() {
    this.setDeviceModelInitiate();

    this.deviceType = this.deviceType.toUpperCase();

    this.gatewayTypeObject = [
      {
        typeId: "-99",
        name: "Base Station"
      },
      {
        typeId: "2",
        name: "USB Service"
      },
      {
        typeId: "7",
        name: "Ethernet Gateway 3.0"
      }
    ];

    console.log(this.gatewayTypeObject);
    this.deviceModel.gatewayTypeID = this.gatewayTypeObject[0].typeId;
    console.log(this.deviceModel);
  }

  onClickAddDetail() {
    console.log(this.deviceModel);
    this.deviceModel.networkID = this.selectedNetwork.Id;
    this.createDeviceService.createGateway(this.deviceModel).then(e => {});
    this.messageEvent.emit(this.message);
  }

  onClickCancelDetail() {
    this.messageCancelEvent.emit(this.message);
  }

  onChangeGatewayType(e) {
    this.setDeviceModelInitiate();
    this.deviceModel.gatewayTypeID = e.typeId;
    console.log(this.deviceModel);
    console.log(this.selectedNetwork);
  }
}
