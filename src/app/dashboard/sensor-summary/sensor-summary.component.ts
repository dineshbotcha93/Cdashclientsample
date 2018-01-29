
import { Component,OnInit ,ViewChild} from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { MapService } from '../../shared/components/map/services/map.service';
import { MapConstants } from '../../shared/components/map/constants/map.constants';
import { SensorSummaryService } from './services/sensor-summary.service';
import { environment } from '../../../environments/environment';
import { CommonSharedService } from '../../shared/services/common-shared.service';


//import { CreateDeviceComponent } from '../create-device/create-device.component';

@Component({
  selector:'app-sensor-summary',
  templateUrl:'./sensor-summary.component.html',
  styleUrls: ['./sensor-summary.component.scss'],
  providers:[MapService,SensorSummaryService,CommonSharedService]
})
export class SensorSummaryComponent implements OnInit{
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

   isSelectedToAddDevice: boolean = false;
   isDeviceAddedSucceess : boolean = false;

  private mapStatus = MapConstants.STATUS;
  private doFilterByName:string = null;
  private doFilterByStatus:string = 'select';
  private doFilterByType:string = 'select';

  constructor(private route:ActivatedRoute,
    private router:Router,
    private mapService:MapService,
    private sensorSummaryService:SensorSummaryService,
    private commonSharedService:CommonSharedService
    ){

      this.route.params.subscribe((params)=>{
        this.netWorkId = params.id.toString();
        this.getNetworkData();

     });
   }

   ngOnInit() {
      this.mapService.getData().subscribe(e => {
         for (let location of e.LocationGroup) {
            location.Location.forEach((loc) => {
               let Obj = {
                  Title: null,
                  Id: null
               };
               Obj.Id = loc.Id;
               Obj.Title = loc.Title;
               if (loc.Id === this.netWorkId) {
                  this.selectLocation = Obj;
               }
               this.locationData.push(Obj);
            });
         }
      });
      this.onSelectSensorRadio();
   }

   /*Get sensor data from service by selecting the network Id*/
   private getNetworkData() {
      this.allSensors = [];
      this.mapData = null;
      this.sensorSummaryService.getData(this.netWorkId).then((e) => {
         this.mapData = e;
         this.getSensorData(e.Location.Network.Sensor);
         this.getGatewayData(e.Location.Network.Gateway, '');
      });
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
         this.allSensors.push(sens);
      });
      console.log(this.allSensors);
      this.originalSensor = this.allSensors.map(x => Object.assign({}, x));
   }

    /*Onchange event for selection of network ID*/
   private onChange(e) {
      this.netWorkId = e.Id.toString();
      this.getNetworkData();
   }

   /*Selection Of Sensor radion*/
   private onSelectSensorRadio() {
      this.radioModel = 'sensor';
      this.isSelectedToAddDevice = false;
   }
   /*Selection Of Gateway radion*/
   private onSelectGatewayRadio() {
      this.radioModel = 'gateway';
      this.isSelectedToAddDevice = false;
   }

   /*Selection Of Gateway radion*/
   private onSelectNetworkRadio() {
      this.radioModel = 'network';
   }
   /* */
   // onCheckAll(e){
   //   this.gateWayData.forEach(x => {
   //     x.checked = e.target.checked
   //     if(!e.target.checked){
   //       x.gateWayEditOption = 'display';
   //       this.editSaveModel = 'Edit';
   //     }
   //   });
   // }
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
      }
   }

   /*Edit the selected ,update and get refresh data drom network*/
   private onClickEditDetails() {
      this.radioModel === 'gateway' ? this.setEdiyGatewayDetails() : this.setEditSensorDetails();
      this.isSelectedToAddDevice = false;
   }

   /*Move the selected ,update and get refresh data drom network*/
   private onClickMoveDetails() {

      this.selectedUserDataForOperation = this.getSelectedRowDetails();
      this.locationDataForMoveNetwork = this.locationData;
      this.isSelectedToAddDevice = false;
   }

   private onClickEditNetwork() {

      this.locationDataForMoveNetwork = this.locationData;
   }
   /*Remove the selected ,update and get refresh data drom network*/
   private onClickRemoveDetails() {

      if (this.radioModel === 'gateway') {
         //backend function to be replaced with
         this.selectedGateway = Object.assign({}, this.gateWayData);
         let selectedRemoveData = this.getSelectedRowDetails();
         if (selectedRemoveData) {
            this.getNetworkData();
         }
      } else if (this.radioModel === 'sensor') {
         //backend function to be replaced with
         this.selectedSensor = Object.assign({}, this.allSensors);
         let selectedRemoveData = this.getSelectedRowDetails();
         if (selectedRemoveData) {
            this.getNetworkData();
         }
      }
      this.isSelectedToAddDevice = false;
   }

   private setEdiyGatewayDetails() {
      this.selectedGateway = Object.assign({}, this.gateWayData);
      let isRecordSelected: boolean = false;
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
         //after backend call
         this.gateWayData.forEach(x => {
            if (x.checked) {
               x.gateWayEditOption = 'display';
               x.checked = false;
            }
         });
         this.editSaveModel = 'Edit';
         this.selectAllValue = false;
      }
   }


   private setEditSensorDetails() {
      this.selectedSensor = Object.assign({}, this.allSensors);
      let isRecordSelected: boolean = false;
      if (this.editSaveModel === 'Edit') {
         this.allSensors.forEach(x => {
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
         //after backend call
         this.allSensors.forEach(x => {
            if (x.checked) {
               x.gateWayEditOption = 'display';
               x.checked = false;
            }
         });
         console.log(this.allSensors);
         this.editSaveModel = 'Edit';
         this.selectAllValue = false;
      }
   }

   private onChangeNetworkMove(e) {
      this.netWorkId = e.Id.toString();
   }

   /*Update the network assigned details*/
   private onClickSaveMoveNetwork(gateWayData) {
      /*Backend call t update network*/
      //  $('#myModal').modal('hide');
      /*
      Backend call to remove the records.
      this.gateWayData = selectedRemoveData;
      And get networ call again getNetworkData();'
      */
      // Remove later
      this.getNetworkData();
   }


   private getSelectedRowDetails() {
      let selectedCheckedData: any = [];
      let selectedDetails = this.radioModel === 'gateway' ? this.gateWayData : this.allSensors;
      selectedDetails.forEach(x => {
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


   onClickAddDetail(){
     console.log('----------',this.radioModel);
     this.isSelectedToAddDevice = true;
   }


   receiveMessage($event) {
    this.isDeviceAddedSucceess = $event;
    this.isSelectedToAddDevice = false;
  }


    //     /*Get sensor data from service by selecting the network Id*/
    //     private  getSensorData(){
    //       this.allSensors = [];
    //       this.mapData = null;
    //       this.sensorSummaryService.getData(this.netWorkId).then((e)=>{
    //         console.log(e);
    //         this.mapData = e;
    //         this.originalMapSensor = this.mapData;
    //         e.Location.Network.Sensor.forEach((sens)=>{
    //           this.allSensors.push(sens);
    //         });
    //         this.originalSensor = this.allSensors.map(x => Object.assign({}, x));
    //         console.log('-----------'+this.originalSensor);
    //       });
    //     }
    // >>>>>>> feature/dashboard

    gotoSummary(){
      this.router.navigate(['dashboard/sensor-details','I1']);
    }

    filterName(){
      if(this.doFilterByName!==null){
        this.allSensors = this.originalSensor.filter((sens)=>sens.SensorName.toLowerCase().indexOf(this.doFilterByName.toLowerCase()) > -1 ? sens:'',this);
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
    }

    doCompare(){
      this.router.navigate(['dashboard/sensor-comparison','I1']);
    }
  }
