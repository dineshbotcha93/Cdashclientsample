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
      id: "",
      gatewayID: "",
      code: "",
      networkID: "",
      gatewayTypeID: "",
      serialNumber: "",
      macAddress: "",
      accountID: "71",
      minThreshold: 10,
      maxThreshold: 100,
      heartBeat: 30,
      monnitApplicationID: "1"
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
      }
      // {
      //   typeId: "2",
      //   name: "USB Service"
      // },
      // {
      //   typeId: "7",
      //   name: "Ethernet Gateway 3.0"
      // }
    ];

    console.log(this.gatewayTypeObject);
    this.deviceModel.gatewayTypeID = this.gatewayTypeObject[0].typeId;
    console.log(this.deviceModel);
  }

  onClickAddDetail() {
    console.log(this.deviceModel);
    console.log(this.deviceType);
    this.deviceModel.networkID = this.selectedNetwork.Id;

    // this.messageEvent.emit(this.message);

    let requestObject: any = [];

    if (this.deviceType === "SENSOR") {
      let monnitId = this.deviceModel.id.substring(0, 2);

      this.deviceModel.monnitApplicationID = "2";
      if (monnitId === "21") {
        this.deviceModel.monnitApplicationID = "43";
      } else if (monnitId === "21") {
        this.deviceModel.monnitApplicationID = "9";
      }

      requestObject = {
        sensorID: this.deviceModel.id,
        networkID: this.deviceModel.networkID,
        accountID: this.deviceModel.accountID,
        monnitApplicationID: this.deviceModel.monnitApplicationID,
        name: this.deviceModel.name,
        sensorCode: this.deviceModel.code,
        minimumThreshold: this.deviceModel.minThreshold,
        maximumThreshold: this.deviceModel.maxThreshold,
        heartBeat: this.deviceModel.heartBeat
      };
      console.log("requestObject", requestObject);
      this.createDeviceService.createSensor(requestObject).then(e => {
        this.messageEvent.emit(this.message);
      });
    }
    if (this.deviceType === "GATEWAY") {
      //for basestation
      requestObject = {
        gatewayID: this.deviceModel.serialNumber,
        networkID: this.deviceModel.networkID,
        name:
          this.gatewayTypeObject[0].name +
          " - " +
          this.deviceModel.serialNumber,
        gatewayTypeID: this.deviceModel.gatewayTypeID,
        serialNumber: this.deviceModel.serialNumber,
        macAddress: this.deviceModel.macAddress
      };

      console.log("requestObject", requestObject);
      this.createDeviceService.createGateway(requestObject).then(e => {
        this.messageEvent.emit(this.message);
      });
    }
  }

  onClickCancelDetail() {
    this.messageCancelEvent.emit(this.message);
  }

  onChangeGatewayType(e) {
    debugger;
    this.setDeviceModelInitiate();
    this.deviceModel.gatewayTypeID = e.typeId;
    this.deviceModel.name = e.name;
    console.log(this.deviceModel);
    console.log(this.selectedNetwork);
  }
}
