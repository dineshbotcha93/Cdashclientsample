import { Component, OnInit, Output, EventEmitter, Input } from "@angular/core";
import { DeviceManagementModel } from "../../shared/models/device/DeviceManagementModel";
import { CreateDeviceService } from "./services/create-device.service";
import {
  FormsModule,
  FormBuilder,
  FormGroup,
  Validators
} from "@angular/forms";
import { NgbTooltipConfig } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: "app-create-device",
  templateUrl: "./create-device.component.html",
  providers: [CreateDeviceService],
  styleUrls: ["./create-device.component.scss"]
})
export class CreateDeviceComponent implements OnInit {
  isValidForm = true;
  deviceCreateForm: FormGroup;
  @Input() deviceType: string;
  @Input() inputNetworkData: Array<any> = [];

  @Input() selectedNetwork: any;
  @Input() accountID: any;

  @Output() messageEvent = new EventEmitter<boolean>();

  @Output() messageCancelEvent = new EventEmitter<boolean>();

  message: boolean = false;
  gatewayTypeObject: any = [];
  deviceModel: DeviceManagementModel = {
    name: "",
    id: "",
    gatewayID: "",
    code: "",
    networkID: "",
    gatewayTypeID: "",
    serialNumber: "",
    macAddress: "",
    accountID: "",
    minThreshold: 10,
    maxThreshold: 100,
    heartBeat: 30,
    monnitApplicationID: "1"
  };

  // this.deviceModel = {

  //  };

  setDeviceModelInitiate() {}

  constructor(
    private createDeviceService: CreateDeviceService,
    private config: NgbTooltipConfig,
    private formBuilder: FormBuilder
  ) {
    config.placement = "right";
    console.log(this.deviceType);

   
  }

  ngOnInit() {
    this.setDeviceModelInitiate();

    console.log("accountID", this.accountID);

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

    this.isValidForm = true;
    if (this.deviceType === "SENSOR") {
        this.deviceCreateForm = this.formBuilder.group({
          id: [this.deviceModel.id, [Validators.required,Validators.minLength(10),Validators.maxLength(10)]],
          name: [this.deviceModel.name, [Validators.required]],
          code: [this.deviceModel.code, [Validators.required,Validators.minLength(10),Validators.maxLength(10)]],
          heartBeat: [this.deviceModel.heartBeat, [Validators.required]],
          minThreshold: [this.deviceModel.minThreshold, [Validators.required]],
          maxThreshold: [this.deviceModel.maxThreshold, [Validators.required]],
          networkID: [this.deviceModel.networkID, [Validators.required]],
        });
    }else{
       this.deviceCreateForm = this.formBuilder.group({ 
          gatewayTypeID: [this.deviceModel.gatewayTypeID, [Validators.required]],
          networkID: [this.deviceModel.networkID, [Validators.required]],
          serialNumber: [this.deviceModel.serialNumber, [Validators.required]],
          macAddress: [this.deviceModel.macAddress, [Validators.required]]
        });
    }
  }

  onClickAddDetail() {
    this.deviceModel.networkID = this.selectedNetwork.Id;

    // this.messageEvent.emit(this.message);

    let requestObject: any = [];
    this.isValidForm = this.deviceCreateForm.valid;

    if (this.deviceType === "SENSOR") {
      if (this.isValidForm) {
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
            accountID: this.accountID,
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
      } else {
        return false;
      }
    } else if (this.deviceType === "GATEWAY") {

      if (this.isValidForm) {
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
      } else {
        return false;
      }
    }

  }

  onClickCancelDetail() {
    this.messageCancelEvent.emit(this.message);
  }

  onChangeGatewayType(e) {
    this.setDeviceModelInitiate();
    this.deviceModel.gatewayTypeID = e.typeId;
    this.deviceModel.name = e.name;
  }
}
