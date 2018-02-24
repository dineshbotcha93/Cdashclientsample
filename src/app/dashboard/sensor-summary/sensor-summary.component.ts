import { Component,OnInit ,ViewChild} from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { MapService } from '../../shared/components/map/services/map.service';
import { MapConstants } from '../../shared/components/map/constants/map.constants';
import { SensorSummaryService } from './services/sensor-summary.service';
import { environment } from '../../../environments/environment';
import { CommonSharedService } from '../../shared/services/common-shared.service';
import { AlertSandbox } from '../../shared/components/alerts/alerts.sandbox';
import { DatePipe } from '@angular/common';


//import { CreateDeviceComponent } from '../create-device/create-device.component';
@Component({
  selector:'app-sensor-summary',
  templateUrl:'./sensor-summary.component.html',
  styleUrls: ['./sensor-summary.component.scss'],
  providers:[MapService,SensorSummaryService,CommonSharedService,AlertSandbox]
})
export class SensorSummaryComponent implements OnInit {
  mapData:Object = null;
  allSensors:Array<any> = [];
  displayTiles:Object = null;
  orderBy: any = 'asc';
  gateway: any = 'all';
  originalSensor:Array<any> = [];
  originalMapSensor:Object = null;
  locationData: any = [];
  selectLocation:any = [];
  locationId:any = null;
  netWorkId : string = null;
  selectedGateway : any = null;
  gateWayEditOption: string = 'display';
  gateWayData:any = [];

  selectedSensor: any = null;

  radioModel: any = 'sensor';
   editSaveModel: string = 'Edit';
   selectAllValue: Object = {
      checked: false
   };
   sensorSliderValue: string = '10';
   /*Model to update*/
   locationDataForMoveNetwork: any = [];
   selectedUserDataForOperation: any = [];
   editNetworkData: Object = {
      name: '',
      notifyAlert: true,
      holdNetwork: false

   };
   enable : boolean = false;

   counterToCheckSelected : number = 0;

   disable: Object = {
     edit:false,
     remove:false,
     move:false,
     add:false,
     reset:true
   }

   isSelectedAll: boolean = false;
   isSelectedToAddDevice: boolean = false;
   isDeviceAddedSucceess : boolean = false;

   netWorkIdToMove : string = null;

   notificationRadio: any = 'overview';

  private mapStatus = MapConstants.STATUS;
  private doFilterByName:string = null;
  private doFilterByStatus:string = 'select';
  private doFilterByType:string = 'select';

  constructor(private route:ActivatedRoute,
    private router:Router,
    private mapService:MapService,
    private sensorSummaryService:SensorSummaryService,
    private commonSharedService:CommonSharedService,
    private alertSandbox: AlertSandbox
    ){
      this.route.params.subscribe((params)=>{
        this.netWorkId = params.id.toString();
        localStorage.setItem("com.cdashboard.networkId",this.netWorkId);
        this.getNetworkData();
        this.getDropdownDetails();
     });
   }

   ngOnInit() {
      // this.mapService.getData().subscribe(e => {
      //    for (let location of e.LocationGroup) {
      //       location.Location.forEach((loc) => {
      //          let Obj = {
      //             Title: null,
      //             Id: null
      //          };
      //          Obj.Id = loc.Id;
      //          Obj.Title = loc.Title;
      //          if (loc.Id === this.netWorkId) {
      //             this.selectLocation = Obj;
      //          }
      //          this.locationData.push(Obj);
      //       });
      //    }
      // });
   }

   private getDropdownDetails(){
     this.sensorSummaryService.getNetworkLocations().then((result)=>{
       result.forEach((loc)=>{
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
        this.sensorSummaryService.getSingleUserLocation(this.netWorkId).then((result)=>{
          this.mapData = result;
          this.getSensorData(result.sensors);
          this.getGatewayData(result.gateways, '');
          if(this.mapData['noOfSensors'] > 0){
            this.onSelectSensorRadio();
          } else {
          }
        });
         //this.mapData = e;
   }

   /*Get the gateway data from the Backend*/
   private getGatewayData(gateway, id: string) {
      this.gateWayData = [];
      gateway.forEach((gate) => {
         let Obj: Object = null;
         gate.gateWayEditOption = 'display';
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
      sensor.forEach((sens) => {
         // Default values
         sens.checked = false;
         sens.gateWayEditOption = 'display';
         sens.sensorSliderValue = '10';
         // hardcoded for now
         sens.sensorType = 2;
         this.allSensors.push(sens);
      });
      this.originalSensor = this.allSensors.map(x => Object.assign({}, x));
   }

    /*Onchange event for selection of network ID*/
   private onChangeLocation(e) {
      this.netWorkId = e.Id.toString();
      this.getNetworkData();
      this.isSelectedToAddDevice = false;

   }

   onChangeSwicth(e){
     if(e){
       this.onSelectGatewayRadio();
     }else{
       this.onSelectSensorRadio();
     }
   }

   /*Selection Of Sensor radion*/
   private onSelectSensorRadio() {
      this.radioModel = 'sensor';
      this.isSelectedToAddDevice = false;
       this.onCheckSetRestValues(false);
       this.isSelectedAll = false;
        this.editSaveModel = 'Edit';

         this.disable= {
         edit:false,
         remove:false,
         move:false,
         add:false,
         reset:true
       }

   }
   /*Selection Of Gateway radion*/
   private onSelectGatewayRadio() {
      this.radioModel = 'gateway';
      this.isSelectedToAddDevice = false;

        this.onCheckSetRestValues(false);
        this.isSelectedAll = false;
        this.editSaveModel = 'Edit';

         this.disable= {
         edit:false,
         remove:false,
         move:false,
         add:false,
         reset:true
       }


   }

   /*Selection Of Gateway radion*/
   private onSelectNetworkRadio() {
      this.radioModel = 'network';
   }
   /* */
   onCheckAll(e){
    this.onCheckSetRestValues(e.target.checked);

    if(!this.isSelectedAll){
      this.editSaveModel = 'Edit';
       this.disable= {
         edit:false,
         remove:false,
         move:false,
         add:false,
         reset:true
       }
    }

   // e.target.checked = true;
   }


   onCheckSetRestValues(value){

      if(this.radioModel === 'sensor'){
       this.allSensors.forEach(x => {
         x.checked = value === true?true: false;
         x.gateWayEditOption = x.gateWayEditOption === 'edit'? 'display':'display';
        });
     }else{
          this.gateWayData.forEach(x => {
           x.checked = value === true?true: false;
           x.gateWayEditOption = x.gateWayEditOption === 'edit'? 'display':'display';
         });
     }
   }
   private plainValueChanged(event, sensor) {
      sensor.sensorSliderValue = event.startValue;
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
         gateway.gateWayEditOption = 'display';
         this.counterToCheckSelected--;
      }else{
        this.counterToCheckSelected++;
      }

      if(this.counterToCheckSelected === 0 && this.editSaveModel==='Save'){
        this.editSaveModel = 'Edit';
      }
   }



   private onClickButtonReset(){

     // buttons to initial state
     this.disable= {
         edit:false,
         remove:false,
         move:false,
         add:false,
         reset:true
       }

       this.onCheckSetRestValues(false);
       this.isSelectedAll = false;
       this.editSaveModel = 'Edit';


   }

   /*Edit the selected ,update and get refresh data drom network*/
   private onClickEditDetails() {
      this.radioModel === 'gateway' ? this.setEdiyGatewayDetails() : this.setEditSensorDetails();
      this.isSelectedToAddDevice = false;



   }

   /*Move the selected ,update and get refresh data drom network*/
   private onClickMoveDetails() {

      this.selectedUserDataForOperation = this.getSelectedRowDetailsToMove();
      this.locationDataForMoveNetwork = this.locationData;
      this.isSelectedToAddDevice = false;
      this.isSelectedAll = false;

      //after success call from backend
      this.disable= {
         edit:false,
         remove:false,
         move:false,
         add:false,
          reset:true
       };
   }

   private onClickEditNetwork() {

      this.locationDataForMoveNetwork = this.locationData;
   }
   /*Remove the selected ,update and get refresh data drom network*/
   private onClickRemoveDetails() {

      if (this.radioModel === 'gateway') {
         //backend function to be replaced with
         this.selectedGateway = Object.assign({}, this.gateWayData);
         let selectedRemoveData = this.getSelectedRowDetailsToRemove();
        if (selectedRemoveData) {
           /*Backend call to remove and get latest details*/
           this.sensorSummaryService.removeGatewayDetails(selectedRemoveData).
           subscribe(
             res => {this.getNetworkData();},
            err => {}
           );
         }
      } else if (this.radioModel === 'sensor') {
         this.selectedSensor = Object.assign({}, this.allSensors);
         let selectedRemoveData = this.getSelectedRowDetailsToRemove();

         if (selectedRemoveData) {
           /*Backend call to remove and get latest details*/
           this.sensorSummaryService.removeSensorDetails(selectedRemoveData).
           subscribe(
             res => {this.getNetworkData();},
            err => {}
           );
         }
      }


      this.isSelectedToAddDevice = false;

      this.isSelectedAll = false;
      this.disable= {
         edit:false,
         remove:false,
         move:false,
         add:false,
         reset:true
       }
       this.onCheckSetRestValues(false);

   }

    onClickAddDetail(){
     this.isSelectedToAddDevice = true;

     //on success
     this.disable= {
         edit:false,
         remove:false,
         move:false,
         add:false,
         reset:true
       }
       this.onCheckSetRestValues(false);
        this.isSelectedAll = false;
   }


   private setEdiyGatewayDetails() {
      this.selectedGateway = Object.assign({}, this.gateWayData);
      let isRecordSelected: boolean = false;
       this.disable= {
         edit:false,
         remove:true,
         move:true,
         add:true,
         reset:false
       }

      if (this.editSaveModel === 'Edit') {
         this.gateWayData.forEach(x => {
            if (x.checked) {
               x.gateWayEditOption = 'edit'
               isRecordSelected = true;
            }
         });
         if (isRecordSelected) {
            this.editSaveModel = 'Save';
         } else
            return false;
      } else {
         //Backedn Call and then update
         /* Post call to update gateways
         And get networ call again getNetworkData();'
         */


         let gateWayDataToUpdate:Array<any> = [];
         this.gateWayData.forEach(x => {
           let tempObj :any = [];
            if (x.checked) {
              tempObj.gatewayId = x.GatewayID;
              tempObj.gatewayName = x.Name;
              gateWayDataToUpdate.push(tempObj);
              tempObj = [];
              }

         });

         /*BACKEND call to update gateway details*/
         this.sensorSummaryService.updateGatewayDetails(gateWayDataToUpdate).
           subscribe(
             res => {
               this.editSaveModel = 'Edit';
               this.isSelectedAll = false;
               this.disable= {
                 edit:false,
                 remove:false,
                 move:false,
                 add:false,
                 reset:true
               };
              //after backend call
              this.gateWayData.forEach(x => {
                if (x.checked) {
                  x.gateWayEditOption = 'display';
                  x.checked = false;
                }
              });
            },
            err => {}
           );
          }
      }


   private setEditSensorDetails() {
      this.selectedSensor = Object.assign({}, this.allSensors);
      let isRecordSelected: boolean = false;
      this.disable= {
         edit:false,
         remove:true,
         move:true,
         add:true,
         reset:false
       }
      if (this.editSaveModel === 'Edit') {
         this.allSensors.forEach(x => {
            if (x.checked) {
               x.gateWayEditOption = 'edit'
               isRecordSelected = true;
             //  this.counterToCheckSelected++;
            }
         });
         if (isRecordSelected) {
            this.editSaveModel = 'Save';
         } else
            return false;
      } else {
          let sensorDataToUpdate:Array<any> = [];
           this.allSensors.forEach(x => {
             let tempObj :any = [];
              if (x.checked) {
                tempObj.sensorID = x.SensorID;
                tempObj.sensorName = x.SensorName;
                tempObj.sensorSliderValue = x.sensorSliderValue;
                sensorDataToUpdate.push(tempObj);
                tempObj = [];
                }

           });

         /*BACKEND call to update gateway details*/
         this.sensorSummaryService.updateSensorDetails(sensorDataToUpdate).
           subscribe(
             res => {
               this.allSensors.forEach(x => {
                  if (x.checked) {
                     x.gateWayEditOption = 'display';
                     x.checked = false;
                  }
               });
               this.editSaveModel = 'Edit';
               this.selectAllValue = false;
                this.isSelectedAll = false;
                this.disable= {
               edit:false,
               remove:false,
               move:false,
               add:false,
               reset:true
             }
            },
            err => {}
           );


      }
   }

   private onChangeNetworkMove(e) {
      this.netWorkIdToMove = e.Id.toString();
   }



   /*Update the network assigned details*/
   private onClickSaveMoveNetwork(gatewaydata) {

       let tempObj :any = [];
       let selectedCheckedData: any = [];

       gatewaydata.forEach(x => {
        let tempObj :any = [];
         if (x.checked) {
           x.id = this.radioModel === 'gateway'?x.GatewayID: x.sensorId;
            selectedCheckedData.push(x);
         }
      });

       this.sensorSummaryService.moveSensorDetails(selectedCheckedData).
           subscribe(
             res => {this.getNetworkData();},
            err => {}
           );
   }


   private getSelectedRowDetailsToRemove() {
      let selectedCheckedData: any = [];
      let selectedDetails = this.radioModel === 'gateway' ? this.gateWayData : this.allSensors;
      selectedDetails.forEach(x => {
        let tempObj :any = [];
         if (x.checked) {
           x.id = this.radioModel === 'gateway'?x.GatewayID: x.sensorId;
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
      let selectedDetails = this.radioModel === 'gateway' ? this.gateWayData : this.allSensors;
      selectedDetails.forEach(x => {
        let tempObj :any = [];
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
      gateway.gateWayEditOption = 'display';
      gateway.checked = false;
   }

   onClickSaveNetworkDetail(e){
      this.editNetworkData = {
        name: '',
        notifyAlert: false,
        holdNetwork: false
      };
   }




   receiveMessage($event) {
      this.isDeviceAddedSucceess = $event;
      this.isSelectedToAddDevice = false;
    }

    receiveCancelMessage($event) {
      this.isDeviceAddedSucceess = $event;
      this.isSelectedToAddDevice = false;
    }

    gotoSummary(sensor){
      this.router.navigate(['dashboard/sensor-details',sensor.sensorID]);
    }

    filterName(){
      if(this.doFilterByName!==null){
        this.allSensors = this.originalSensor.filter((sens)=>sens.sensorName.toLowerCase().indexOf(this.doFilterByName.toLowerCase()) > -1 ? sens:'',this);
      }
      else if(this.doFilterByName == '' || this.doFilterByName == null){
        this.allSensors = this.originalSensor;
      }
    }
    filterStatus(){
      const criteria = this.doFilterByStatus ? this.doFilterByStatus.toLowerCase():'select';
      const criteriaOther = this.doFilterByType ? this.doFilterByType.toLowerCase():'select';

      this.allSensors = this.originalSensor.filter((sens)=>{
        return this.commonSharedService.evaluateSensorStatus(criteria,sens,sens);
      });

      this.allSensors = this.allSensors.filter((sens)=>{
        return this.commonSharedService.evaluateSensorType(criteriaOther,sens,sens);
      });

      if(this.allSensors.length == 0){
        this.alertSandbox.showAlert({data:'No Content'});
      }
    }

    filterByType(){
      const criteria = this.doFilterByType ? this.doFilterByType.toLowerCase():'select';
      const criteriaOther = this.doFilterByStatus ? this.doFilterByStatus.toLowerCase():'select';

      this.allSensors = this.originalSensor.filter((sens)=>{
        return this.commonSharedService.evaluateSensorType(criteria,sens,sens);
      });

      this.allSensors = this.allSensors.filter((sens)=>{
        return this.commonSharedService.evaluateSensorStatus(criteriaOther,sens,sens);
      });

      if(this.allSensors.length == 0){
        this.alertSandbox.showAlert({data:'No Content'});
      }
    }

    doCompare(){
      console.log(this.selectLocation);
      localStorage.setItem("com.cdashboard.selectedNetworkId", this.selectLocation.Id);
      this.router.navigate(['dashboard/sensor-comparison','I1']);
    }


    onClickNotificationOverview(){
      this.notificationRadio = 'overview';
    }

    onClickNotificationSummary(){
      this.notificationRadio = 'summary';
    }

    onClickAddNotification(){
      this.notificationRadio = 'addNotify';
    }
    onClickResetNotification(){
      
      this.notificationRadio = 'summary';
    }
    goBack(){
      this.router.navigate(['dashboard']);

    }
    receiveAddNotificationMessage($event) {
      console.log($event);
      this.notificationRadio = 'summary';
    }
  }
