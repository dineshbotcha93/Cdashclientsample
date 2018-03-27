import { Component, OnInit, ViewChild } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
  ReactiveFormsModule
} from "@angular/forms";
import { MapService } from "../../shared/components/map/services/map.service";
import { MapConstants } from "../../shared/components/map/constants/map.constants";
import { SensorSummaryService } from "./services/sensor-summary.service";
import { environment } from "../../../environments/environment";
import { CommonSharedService } from "../../shared/services/common-shared.service";
import { AlertSandbox } from "../../shared/components/alerts/alerts.sandbox";
import { DatePipe } from "@angular/common";
import { TranslateService } from "@ngx-translate/core";
import { NetworkModel } from "../../shared/models/network/networkModel";
import {AbstractDashboardBase} from "../abstractDashboard.component";

//import { CreateDeviceComponent } from '../create-device/create-device.component';
@Component({
  selector: "app-sensor-summary",
  templateUrl: "./sensor-summary.component.html",
  styleUrls: ["./sensor-summary.component.scss"],
  providers: [
    MapService,
    SensorSummaryService,
    CommonSharedService,
    AlertSandbox,
    DatePipe
  ]
})
export class SensorSummaryComponent extends AbstractDashboardBase implements OnInit {
  mapData: Object = null;
  allSensors: Array<any> = [];
  displayTiles: Object = null;
  orderBy: any = "asc";
  gateway: any = "all";
  originalSensor: Array<any> = [];
  originalMapSensor: Object = null;
  locationData: any = [];
  selectLocation: any = [];
  locationId: any = null;
  netWorkId: string = null;
  selectedGateway: any = null;
  gateWayEditOption: string = "display";
  gateWayData: any = [];

  selectedSensor: any = null;

  radioModel: any = "sensor";
  editSaveModel: string = "Edit";
  selectAllValue: Object = {
    checked: false
  };
  sensorSliderValue: string = "30";
  /*Model to update*/
  locationDataForMoveNetwork: any = [];
  selectedUserDataForOperation: any = [];
  editNetworkData: any = {
    name: "",
    sendNotifications: true,
    holdNetwork: false,
    address: "",
    address2: "",
    city: "",
    state: "",
    postalCode: "",
    country: "",
    latitude: 0,
    longitude: 0
  };
  enable: boolean = false;

  counterToCheckSelected: number = 0;

  disable: Object = {
    edit: false,
    remove: false,
    move: false,
    add: false,
    reset: true
  };

  isSelectedAll: boolean = false;
  isSelectedToAddDevice: boolean = false;
  isDeviceAddedSucceess: boolean = false;

  netWorkIdToMove: string = null;

  selectDetailsToEditOrSave: any = [];
  disableSubmitButton: boolean = true;

  // notificationRadio: any = 'overview';

  private mapStatus = MapConstants.STATUS;
  private doFilterByName: string = null;
  private doFilterByStatus: string = "select";
  private doFilterByType: string = "select";
  private networkModel: NetworkModel = new NetworkModel();

  // minDate: Date;
  // maxDate: Date;
  // daterangepickerModel: Date[];
  // requestDateObject :any = [];
  selectTempTypeList: any = [];
  showPopup: boolean = false;
  showEditPopup: boolean = false;
  private networkFormSetup: FormGroup;
  private networkEditForm: FormGroup;
  accountID:string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private mapService: MapService,
    private sensorSummaryService: SensorSummaryService,
    private commonSharedService: CommonSharedService,
    private alertSandbox: AlertSandbox,
    private translate: TranslateService,
    public datepipe: DatePipe,
    private fb: FormBuilder
  ) {

    super();

    this.networkFormSetup = this.fb.group({});
    this.networkEditForm = this.fb.group({});
    this.route.params.subscribe(params => {
      this.netWorkId = params.id.toString();
      localStorage.setItem("com.cdashboard.networkId", this.netWorkId);
      this.getNetworkData();
      this.getDropdownDetails();

      // this.minDate = new Date();
      // this.maxDate = new Date();
      // this.minDate.setDate(this.minDate.getDate() - 7);
      // this.maxDate.setDate(this.maxDate.getDate());

      // this.daterangepickerModel = [this.minDate, this.maxDate];

      // this.requestDateObject = {
      //   fromDate :this.datepipe.transform(this.minDate, 'mm/dd/yyyy'),
      //   toDate :this.datepipe.transform(this.maxDate, 'mm/dd/yyyy')
      // };
    });
    this.translate.use("en");
  }

  ngOnInit() {

    let userInfoObject = JSON.parse(localStorage.getItem('com.cdashboard.userInfoObject'));
    // console.log(userInfoObject);
    userInfoObject['account'].forEach(loc => {
       // console.log('loc', loc);
       this.accountID = loc.accountID;
     });
  }

  private getDropdownDetails() {
    this.sensorSummaryService.getNetworkLocations().then(result => {
      result.forEach(loc => {
        let Obj = {
          Title: null,
          Id: null
        };
        Obj.Id = loc.networkID;
        Obj.Title = loc.networkName;
        if (loc.networkID == this.netWorkId) {
          this.selectLocation = Obj;
        }
        this.locationData.push(Obj);
      });
    });
  }

  /*Get sensor data from service by selecting the network Id*/
  private getNetworkData() {
    this.allSensors = [];
    //this.mapData = null;
    this.sensorSummaryService
      .getSingleUserLocation(this.netWorkId)
      .then(result => {
        this.mapData = result;
        this.getSensorData(result.sensors);
        this.getGatewayData(result.gateways, "");
        if (this.mapData["noOfSensors"] > 0) {
          this.onSelectSensorRadio();
        } else {
        }
      });
    //this.mapData = e;
  }

  /*Get the gateway data from the Backend*/
  private getGatewayData(gateway, id: string) {
    this.gateWayData = [];
    gateway.forEach(gate => {
      let Obj: Object = null;
      gate.gateWayEditOption = "display";
      gate.checked = false;
      Obj = gate;
      // this.gateWayData.push(Obj);
      if (id !== gate.GatewayID) {
        this.gateWayData.push(Obj);
      }
    });
  }

  /*Get the Sensor data from backend */
  private getSensorData(sensor) {
    this.allSensors = [];
    this.originalMapSensor = sensor;


    let checkModelNotify = { active: false, inActive: true };

    sensor.forEach(sens => {
      // Default values
      sens.checked = false;
      sens.gateWayEditOption = "display";
      sens.heartBeat =
        sens.heartbeat === (null || undefined) ? 30 : sens.heartbeat;
      // hardcoded for now
      sens.sensorType = sens.type;


      if (sens.scale == 'C') {
          checkModelNotify = { active: true, inActive: false };
       }else{
            checkModelNotify = { active: false, inActive: true };

       }
       sens.checkModelNotify = checkModelNotify;

      this.allSensors.push(sens);



    });
    this.originalSensor = this.allSensors.map(x => Object.assign({}, x));
    // console.log('allSensors----->',this.allSensors);
  }

  /*Onchange event for selection of network ID*/
  private onChangeLocation(e) {
    this.netWorkId = e.Id.toString();
    this.getNetworkData();
    this.isSelectedToAddDevice = false;
  }

  onChangeSwicth(e) {
    if (e) {
      this.onSelectGatewayRadio();
    } else {
      this.onSelectSensorRadio();
    }
  }

  /*Selection Of Sensor radion*/
  private onSelectSensorRadio() {
    this.radioModel = "sensor";
    this.isSelectedToAddDevice = false;
    this.onCheckSetRestValues(false);
    this.isSelectedAll = false;
    this.editSaveModel = "Edit";

    this.disable = {
      edit: false,
      remove: false,
      move: false,
      add: false,
      reset: true
    };
  }
  /*Selection Of Gateway radion*/
  private onSelectGatewayRadio() {
    this.radioModel = "gateway";
    this.isSelectedToAddDevice = false;

    this.onCheckSetRestValues(false);
    this.isSelectedAll = false;
    this.editSaveModel = "Edit";

    this.disable = {
      edit: false,
      remove: false,
      move: false,
      add: false,
      reset: true
    };
  }

  /*Selection Of Gateway radion*/
  private onSelectNetworkRadio() {
    this.radioModel = "network";
  }
  /* */
  onCheckAll(e) {
    this.onCheckSetRestValues(e.target.checked);

    if (!this.isSelectedAll) {
      this.editSaveModel = "Edit";
      this.disable = {
        edit: false,
        remove: false,
        move: false,
        add: false,
        reset: true
      };
    }

    // e.target.checked = true;
  }

  onCheckSetRestValues(value) {
    if (this.radioModel === "sensor") {
      this.allSensors.forEach(x => {
        x.checked = value === true ? true : false;
        x.gateWayEditOption =
          x.gateWayEditOption === "edit" ? "display" : "display";
      });
    } else {
      this.gateWayData.forEach(x => {
        x.checked = value === true ? true : false;
        x.gateWayEditOption =
          x.gateWayEditOption === "edit" ? "display" : "display";
      });
    }
  }
  private plainValueChanged(event, sensor) {
    sensor.heartBeat = event.startValue;
  }
  // getElement(data){
  // if (typeof(data)=='string') {
  //     return document.getElementById(data);
  // }
  // if (typeof(data)=='object' && data instanceof Element) {
  //     return data;
  // }
  // return null;
  // }
  private onClickInlineCheckBox(e, gateway) {
    if (!e.target.checked) {
      gateway.gateWayEditOption = "display";
      this.counterToCheckSelected--;
    } else {
      this.counterToCheckSelected++;
    }

    if (this.counterToCheckSelected === 0 && this.editSaveModel === "Save") {
      this.editSaveModel = "Edit";
    }

    // console.log("Sensors after inline", this.allSensors);
  }

  private onClickButtonReset() {
    // buttons to initial state
    this.disable = {
      edit: false,
      remove: false,
      move: false,
      add: false,
      reset: true
    };

    this.onCheckSetRestValues(false);
    this.isSelectedAll = false;
    this.editSaveModel = "Edit";
  }

  /*Edit the selected ,update and get refresh data drom network*/
  private onClickEditDetails() {
    // this.selectedUserDataForOperation = [];
    this.radioModel === "gateway"
      ? this.setEdiyGatewayDetails()
      : this.setEditSensorDetails();
    this.isSelectedToAddDevice = false;
  }

  private onClickAddNetwork() {
    this.disableSubmitButton = true;
    this.showPopup = true;
  }

  private modalClosed(event) {
    this.showPopup = false;
    this.showEditPopup = false;
  }

  private onSubmit(action) {
    //console.log(this.networkFormSetup.get('createNetworkForm').get("address").get("street"));
    if (action == "editNetwork") {
       const editNetworkForm = this.networkEditForm.get("editNetworkForm");
      this.editNetworkData.networkID = this.netWorkId;
      this.editNetworkData.name = editNetworkForm.get("name").value;
      this.editNetworkData.address = editNetworkForm.get(
        "address"
      ).value.street;
      this.editNetworkData.address2 = editNetworkForm.get(
        "address"
      ).value.housenumber;
      this.editNetworkData.city = editNetworkForm.get("address").value.city;
      this.editNetworkData.postalCode = editNetworkForm.get(
        "address"
      ).value.zipcode;
      this.editNetworkData.state = editNetworkForm.get("address").value.state;
      this.editNetworkData.country = editNetworkForm.get(
        "address"
      ).value.country;
      this.onClickSaveNetworkDetail();
    } else {
      this.preparePostData();
    }
  }

  preparePostData() {
    const createNetworkForm = this.networkFormSetup.get("createNetworkForm");
    this.networkModel.address = createNetworkForm.get("address").value.street;
    this.networkModel.address2 = createNetworkForm.get(
      "address"
    ).value.housenumber;
    this.networkModel.city = createNetworkForm.get("address").value.city;
    this.networkModel.postalCode = createNetworkForm.get(
      "address"
    ).value.zipcode;
    this.networkModel.state = createNetworkForm.get("address").value.state;
    this.networkModel.country = createNetworkForm.get("address").value.country;
    this.networkModel.name = createNetworkForm.get("name").value;
    this.networkModel.isActive = true;

    this.mapService
      .geoCode(
        this.networkModel.address +
          this.networkModel.city +
          this.networkModel.country
      )
      .then(geoCoded => {
        if (geoCoded.results[0]) {
          this.networkModel.latitude =
            geoCoded.results[0].geometry.location.lat;
          this.networkModel.longitude =
            geoCoded.results[0].geometry.location.lng;
        }
      });
    this.sensorSummaryService.createNetwork(this.networkModel).then(e => {
      //show success message,close pop up
      console.log(this);
      this.showPopup = false;
    });
  }

  private addFormControl(name: string, formGroup: FormGroup): void {
    // console.log(":::::: network setup form:::", name);
    this.networkFormSetup.addControl(name, formGroup);
  }

  private addEditFormControl(name: string, formGroup: FormGroup): void {
    // console.log(":::::: network edit form::::::", name);
    this.networkEditForm.addControl(name, formGroup);
  }

  /*Move the selected ,update and get refresh data drom network*/
  private onClickMoveDetails() {
    this.selectedUserDataForOperation = [];
    this.selectedUserDataForOperation = this.getSelectedRowDetailsToMove();
    this.locationDataForMoveNetwork = this.locationData;
    this.isSelectedToAddDevice = false;
    this.isSelectedAll = false;

    //after success call from backend
    this.disable = {
      edit: false,
      remove: false,
      move: false,
      add: false,
      reset: true
    };
  }

  private onClickEditNetwork() {
    this.showEditPopup = true;
    this.disableSubmitButton = true;
    console.log(this.mapData);
    this.editNetworkData = {
      name: this.selectLocation.Title,
      address: {
        street: this.mapData["address"],
        housenumber: this.mapData["address2"],
        city: this.mapData["city"],
        state: this.mapData["state"],
        zipcode: this.mapData["postalCode"],
        country: this.mapData["country"]
      },
      isActive: true
      //holdNetwork: false
    };
    // console.log(this.networkEditForm);
    this.networkEditForm.setValue({ editNetworkForm: this.editNetworkData });
    this.locationDataForMoveNetwork = this.locationData;
  }
  /*Remove the selected ,update and get refresh data drom network*/
  private onClickRemoveDetails() {
    if (this.radioModel === "gateway") {
      //backend function to be replaced with
      this.selectedGateway = Object.assign({}, this.gateWayData);
      let selectedRemoveData = this.getSelectedRowDetailsToRemove();
      if (selectedRemoveData) {
        selectedRemoveData.forEach(gateway => {
          /*Backend call to remove and get latest details*/
          // this.sensorSummaryService.removeGatewayDetails(selectedRemoveData).
          //   subscribe(
          //     res => { this.getNetworkData(); },
          //     err => { }
          //   );
          this.sensorSummaryService.deleteGateway(gateway.gatewayID).then(e => {
            if (e == true) {
              this.getNetworkData();
            }
          });
        });
      }
    } else if (this.radioModel === "sensor") {
      this.selectedSensor = Object.assign({}, this.allSensors);
      let selectedRemoveData = this.getSelectedRowDetailsToRemove();

      if (selectedRemoveData) {
        /*Backend call to remove and get latest details*/
        selectedRemoveData.forEach(sensor => {
          // console.log('sensor to remove ',sensor);
          this.sensorSummaryService.deleteSensor(sensor.sensorID).then(e => {
            if (e == true) {
              this.getNetworkData();
            }
          });
        });
        // this.sensorSummaryService.removeSensorDetails(selectedRemoveData).
        //   subscribe(
        //     res => { this.getNetworkData(); },
        //     err => { }
        //   );
      }
    }

    this.isSelectedToAddDevice = false;

    this.isSelectedAll = false;
    this.disable = {
      edit: false,
      remove: false,
      move: false,
      add: false,
      reset: true
    };
    this.onCheckSetRestValues(false);
  }

  onClickAddDetail() {

    // console.log('accountID',this.accountID);
    this.isSelectedToAddDevice = true;
    //on success
    this.disable = {
      edit: false,
      remove: false,
      move: false,
      add: false,
      reset: true
    };
    // console.log(this);
    this.onCheckSetRestValues(false);
    this.isSelectedAll = false;
  }

  private setEdiyGatewayDetails() {
    this.selectedGateway = Object.assign({}, this.gateWayData);

    // console.log("this.gateWayData", this.gateWayData);
    let isRecordSelected: boolean = false;
    this.disable = {
      edit: false,
      remove: true,
      move: true,
      add: true,
      reset: false
    };

    if (this.editSaveModel === "Edit") {
      this.selectedUserDataForOperation = [];
      this.gateWayData.forEach(x => {
        if (x.checked) {
          x.gateWayEditOption = "edit";
          isRecordSelected = true;
          this.selectedUserDataForOperation.push(x.gatewayID);
        }
      });
      if (isRecordSelected) {
        this.editSaveModel = "Save";
      } else return false;
    } else {

      let gateWayDataToUpdate: Array<any> = [];

      this.selectedUserDataForOperation.forEach(eidtObject => {

        this.gateWayData.forEach(x => {
          let tempObj: any = [];
          if (x.gatewayID === eidtObject) {
            tempObj = {
              gatewayID: x.gatewayID,
              name: x.name,
              networkID: x.networkID
            };
            gateWayDataToUpdate.push(tempObj);
          }

          tempObj = [];
        });
      });

      // console.log("---------->", gateWayDataToUpdate);

      /*BACKEND call to update gateway details*/

      this.sensorSummaryService
        .updateGatewayDetails(gateWayDataToUpdate)
        .then(result => {
          // console.log("--->result", result);
          result.forEach(resp => {
            // console.log("resp", resp.result);

            this.gateWayData.forEach(x => {
              if (x.checked) {
                x.gateWayEditOption = "display";
                x.checked = false;
              }
            });

            this.editSaveModel = "Edit";
            this.selectAllValue = false;
            this.isSelectedAll = false;
            this.disable = {
              edit: false,
              remove: false,
              move: false,
              add: false,
              reset: true
            };
          });
        });
      // this.sensorSummaryService.updateGatewayDetails(gateWayDataToUpdate).
      // subscribe(
      //   res => {
      //     this.editSaveModel = 'Edit';
      //     this.isSelectedAll = false;
      //     this.disable = {
      //       edit: false,
      //       remove: false,
      //       move: false,
      //       add: false,
      //       reset: true
      //     };
      //     //after backend call
      //     this.gateWayData.forEach(x => {
      //       if (x.checked) {
      //         x.gateWayEditOption = 'display';
      //         x.checked = false;
      //       }
      //     });
      //   },
      //   err => { }
      // );
    }
  }

  onChangeTempTypeValue(e) {
    console.log("selected celcius/foreighht than value-->", e);
  }

  private setEditSensorDetails() {
    // this.selectedSensor = Object.assign({}, this.allSensors);
    // console.log("this.allSensors- before edit or save-->", this.allSensors);
    let isRecordSelected: boolean = false;
    this.disable = {
      edit: false,
      remove: true,
      move: true,
      add: true,
      reset: false
    };

    if (this.editSaveModel === "Edit") {
      this.selectedUserDataForOperation = [];
      this.allSensors.forEach(x => {
        if (x.checked) {
          x.gateWayEditOption = "edit";
          isRecordSelected = true;
          this.selectedUserDataForOperation.push(x.sensorID);
        }
      });
      //  console.log(
      //   "after edit selectedUserDataForOperation",
      //   this.selectedUserDataForOperation
      // );

      if (isRecordSelected) {
        this.editSaveModel = "Save";
      }
    } else {
      let sensorDataToUpdate: Array<any> = [];

      // console.log("Before Save Detailss to Update ", this.allSensors);

      // console.log(
      //   "Before selectedUserDataForOperation",
      //   this.selectedUserDataForOperation
      // );

      this.selectedUserDataForOperation.forEach(eidtObject => {
        this.allSensors.forEach(x => {
          // console.log(eidtObject);

          let tempObj: any = [];
          if (x.sensorID === eidtObject) {

            tempObj = {
              sensorID: x.sensorID,
              sensorName: x.sensorName,
              heartBeat: x.heartBeat,
              minimumThreshold:x.minimumThreshold,
              maximumThreshold:x.maximumThreshold
            };

            sensorDataToUpdate.push(tempObj);
          }
        });
      });

      /*BACKEND call to update gateway details*/
      this.sensorSummaryService
        .updateSensorDetails(sensorDataToUpdate)
        .then(result => {
          // console.log("--->result", result);
          result.forEach(resp => {
            // console.log("resp", resp.result);

            this.allSensors.forEach(x => {
              if (x.checked) {
                x.gateWayEditOption = "display";
                x.checked = false;
              }
            });

            this.editSaveModel = "Edit";
            this.selectAllValue = false;
            this.isSelectedAll = false;
            this.disable = {
              edit: false,
              remove: false,
              move: false,
              add: false,
              reset: true
            };
          });
        });
    }
  }

  private onChangeNetworkMove(e) {
    this.netWorkIdToMove = e.Id.toString();
  }

  /*Update the network assigned details*/
  private onClickSaveMoveNetwork(gatewaydata) {
    let tempObj: any = [];
    let selectedCheckedData: any = [];
    const deviceType = this.radioModel === "gateway" ? "Gateway" : "Sensor";

    if (
      this.netWorkIdToMove !== null &&
      this.netWorkIdToMove !== this.selectLocation.Id
    ) {
      gatewaydata.forEach(x => {
        let tempObj: any = [];
        if (x.checked) {
          x.id = this.radioModel === "gateway" ? x.gatewayID : x.sensorID;
          selectedCheckedData.push(x.id);
        }
      });

      // console.log("deviceType", deviceType);
      let requestObject: any = [];
      if (deviceType === "Sensor") {
        // console.log(selectedCheckedData);
        requestObject = {
          sensorIDs: selectedCheckedData,
          networkID: this.netWorkIdToMove
        };
        this.sensorSummaryService
          .moveSensorDetails(requestObject)
          .then(e => {});

        this.getNetworkData();
      }else if (deviceType === "Gateway") {

        requestObject = {
          gatewayIDs: selectedCheckedData,
          networkID: this.netWorkIdToMove
        };
        this.sensorSummaryService
          .moveGatewayDetails(requestObject)
          .then(e => {});

        this.getNetworkData();
       this.radioModel = "gateway";
      }
    } else {
      return false;
    }
  }

  private getSelectedRowDetailsToRemove() {
    let selectedCheckedData: any = [];
    let selectedDetails =
      this.radioModel === "gateway" ? this.gateWayData : this.allSensors;
    selectedDetails.forEach(x => {
      let tempObj: any = [];
      if (x.checked) {
        x.id = this.radioModel === "gateway" ? x.GatewayID : x.sensorId;
        selectedCheckedData.push(x);
      }
    });
    if (selectedCheckedData.length < 1) {
      return false;
    } else {
      return selectedCheckedData;
    }
  }

  private getSelectedRowDetailsToMove() {
    let selectedCheckedData: any = [];
    let selectedDetails =
      this.radioModel === "gateway" ? this.gateWayData : this.allSensors;
    selectedDetails.forEach(x => {
      let tempObj: any = [];
      if (x.checked) {
        selectedCheckedData.push(x);
      }
    });
    if (selectedCheckedData.length < 1) {
      return false;
    } else {
      return selectedCheckedData;
    }
  }

  onClickCancel(gateway) {
    gateway.gateWayEditOption = "display";
    gateway.checked = false;
  }

  onClickSaveNetworkDetail() {
    console.log(this.editNetworkData);
    this.sensorSummaryService.updateNetwork(this.editNetworkData).then(g => {
      //this.mapData = this.editNetworkData;
      console.log(this.mapData);
      this.mapData['address'] = this.editNetworkData.address;
      this.mapData['city'] = this.editNetworkData.city;
      this.mapData['country'] = this.editNetworkData.country;
      this.mapData['state'] = this.editNetworkData.state;
      this.mapData['postalCode'] = this.editNetworkData.postalCode;
      this.mapData['address2'] = this.editNetworkData.address2;

      this.showEditPopup = false;
    });
  }

  receiveMessage($event) {
    // console.log('received addition');
    this.isDeviceAddedSucceess = $event;
    this.isSelectedToAddDevice = false;
    this.getNetworkData();
  }

  receiveCancelMessage($event) {
    // console.log('received cancelation');
    this.isDeviceAddedSucceess = $event;
    this.isSelectedToAddDevice = false;
  }

  gotoSummary(sensor) {
    localStorage.setItem(
      "com.cdashboard.selectedNetworkId",
      this.selectLocation.Id
    );
    this.router.navigate(["dashboard/sensor-details", sensor.sensorID]);
  }

  filterName() {
    if (this.doFilterByName !== null) {
      this.allSensors = this.originalSensor.filter(
        sens =>
          sens.sensorName
            .toLowerCase()
            .indexOf(this.doFilterByName.toLowerCase()) > -1
            ? sens
            : "",
        this
      );
    } else if (this.doFilterByName == "" || this.doFilterByName == null) {
      this.allSensors = this.originalSensor;
    }
  }
  filterStatus() {
    const criteria = this.doFilterByStatus
      ? this.doFilterByStatus.toLowerCase()
      : "select";
    const criteriaOther = this.doFilterByType
      ? this.doFilterByType.toLowerCase()
      : "select";

    this.allSensors = this.originalSensor.filter(sens => {
      return this.commonSharedService.evaluateSensorStatus(
        criteria,
        sens,
        sens
      );
    });

    this.allSensors = this.allSensors.filter(sens => {
      return this.commonSharedService.evaluateSensorType(
        criteriaOther,
        sens,
        sens
      );
    });

    if (this.allSensors.length == 0) {
      this.alertSandbox.showAlert({ data: "No Content" });
    }
  }

  filterByType() {
    const criteria = this.doFilterByType
      ? this.doFilterByType.toLowerCase()
      : "select";
    const criteriaOther = this.doFilterByStatus
      ? this.doFilterByStatus.toLowerCase()
      : "select";

    this.allSensors = this.originalSensor.filter(sens => {
      return this.commonSharedService.evaluateSensorType(criteria, sens, sens);
    });

    this.allSensors = this.allSensors.filter(sens => {
      return this.commonSharedService.evaluateSensorStatus(
        criteriaOther,
        sens,
        sens
      );
    });

    if (this.allSensors.length == 0) {
      this.alertSandbox.showAlert({ data: "No Content" });
    }
  }

  doCompare() {
    // console.log(this.selectLocation);
    localStorage.setItem(
      "com.cdashboard.selectedNetworkId",
      this.selectLocation.Id
    );
    this.router.navigate(["dashboard/sensor-comparison", "I1"]);
  }

  enableSubmit($event) {
    console.log("got enable submit");
    console.log($event);
    this.disableSubmitButton = !$event;
  }

  // }
  goBack() {
    this.router.navigate(["dashboard"]);
  }

  onClickNotifyOn(e, sensor) {

    console.log('selected element-->',sensor);

    let requestObject = {
      sensorID:sensor.sensorID,
      name:'CorF',
      value:'C'
    };
  console.log('',requestObject);

    this.sensorSummaryService.updateSensorScale(requestObject).then((result) => {
      console.log(result);
      this.allSensors.forEach(x => {
        if(x === sensor){
          console.log('enered',x);
           x.checkModelNotify = { active: true, inActive: false };
        }
      });
    });
  }

  onClickNotifyOff(e, sensor) {
    console.log('selected element-->',sensor);

    let requestObject = {
     sensorID:sensor.sensorID,
      name:'CorF',
      value:'C'
    };

    console.log(',requestObject');
   this.sensorSummaryService.updateSensorScale(requestObject).then((result) => {
      console.log(result);
      this.allSensors.forEach(x => {
        if(x === sensor){
          console.log('enered',x);
           x.checkModelNotify = { active: false, inActive: true };
        }
      });
    });
  }
}
