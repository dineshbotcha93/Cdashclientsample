import { Component,OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { MapService } from '../../shared/components/map/services/map.service';
import { MapConstants } from '../../shared/components/map/constants/map.constants';
import { SensorSummaryService } from './services/sensor-summary.service';

@Component({
  selector:'app-sensor-summary',
  templateUrl:'./sensor-summary.component.html',
  styleUrls: ['./sensor-summary.component.scss'],
  providers:[MapService,SensorSummaryService]
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
  selectedSensor : any  = null;
  gateWayEditOption: string = 'display';
  gateWayData:any = [];
  radioModel:any = 'sensor';
  editSaveModel:string= 'Edit';
  selectAllValue : Object = {
    checked: false
  };
  /*Model to update*/
  locationDataForMoveNetwork :any = [];
  selectedUserDataForOperation :any = [];
  private mapStatus = MapConstants.STATUS;
  private doFilterByName:string = null;
  private doFilterByStatus:string = 'select';
  private doFilterByType:string = 'select';
  constructor(private route:ActivatedRoute,
    private router:Router,
    private mapService:MapService,
    private sensorSummaryService:SensorSummaryService){
    this.route.params.subscribe((params)=>{
      this.netWorkId = params.id.toString();
      this.getNetworkData();
    });
  }
  ngOnInit() {
    this.mapService.getData().subscribe(e=>{
      for (let location of e.LocationGroup) {
        location.Location.forEach((loc)=>{
          let Obj = {
            Title: null,
            Id: null
          };
          Obj.Id=loc.Id;
          Obj.Title=loc.Title;
          if(loc.Id === this.netWorkId){
            this.selectLocation = Obj;
          }
          this.locationData.push(Obj);
        });
      }
    });
    this.onSelectSensorRadio();
  }
  /*Onchange event for selection of network ID*/
  private onChange(e){
    this.netWorkId = e.Id.toString();
    this.getNetworkData();
  }
  private onSelectSensorRadio(){
    this.radioModel = 'sensor';
  }
  private onSelectGatewayRadio(){
    this.radioModel = 'gateway';
  }
  /*Get sensor data from service by selecting the network Id*/
  private  getNetworkData(){
    this.allSensors = [];
    this.mapData = null;
    this.sensorSummaryService.getData(this.netWorkId).then((e)=>{
      this.mapData = e;
      this.getSensorData(e.Location.Network.Sensor);
      this.getGatewayData(e.Location.Network.Gateway,'');
    });
  }
  private getGatewayData(gateway,id:string){
    this.gateWayData = [];
    gateway.forEach((gate)=>{
      let Obj : Object = null;
      gate.gateWayEditOption = 'display';
      gate.checked = false;
      Obj = gate;
    // this.gateWayData.push(Obj);
    if(id !== gate.GatewayID){
      this.gateWayData.push(Obj);
    }
  });
  }
  private getSensorData(sensor){
    this.allSensors = [];
    this.originalMapSensor = sensor;
    sensor.forEach((sens)=>{
      sens.checked = false;
      sens.gateWayEditOption = 'display';
      this.allSensors.push(sens);
    });
    this.originalSensor = this.allSensors.map(x => Object.assign({}, x));
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
    private onClickInlineCheckBox(e,gateway){
      if(!e.target.checked){
        gateway.gateWayEditOption = 'display';
      }
    }
    /* Gateway functions  */
    private onClickEditDetails(){
      this.radioModel === 'gateway'?this.setEdiyGatewayDetails(): this.setEditSensorDetails();
    }

    private setEdiyGatewayDetails(){
      this.selectedGateway = Object.assign({}, this.gateWayData);
      let isRecordSelected : boolean = false;
      if(this.editSaveModel === 'Edit'){
        this.gateWayData.forEach(x => {
          if(x.checked){
            x.gateWayEditOption = 'edit'
            isRecordSelected = true;
          }
        });
        if(isRecordSelected){
          this.editSaveModel ='Save';
        }else
        return false;
      }else{
          //Backedn Call and then update
          /* Post call to update gateways
          And get networ call again getNetworkData();'
          */
          //after backend call
          this.gateWayData.forEach(x => {
            if(x.checked){
              x.gateWayEditOption = 'display';
              x.checked = false;
            }
          });
          this.editSaveModel ='Edit';
          this.selectAllValue = false;
       }
    }
    private setEditSensorDetails(){
      this.selectedSensor = Object.assign({}, this.allSensors);
      let isRecordSelected : boolean = false;
      if(this.editSaveModel === 'Edit'){
        this.allSensors.forEach(x => {
          if(x.checked){
            x.gateWayEditOption = 'edit'
            isRecordSelected = true;
          }
        });
        if(isRecordSelected){
          this.editSaveModel ='Save';
        }else
        return false;
      }else{
        //Backedn Call and then update
        /* Post call to update gateways
        And get networ call again getNetworkData();'
        */
        //after backend call
        this.allSensors.forEach(x => {
          if(x.checked){
            x.gateWayEditOption = 'display';
            x.checked = false;
          }
        });
        this.editSaveModel ='Edit';
        this.selectAllValue = false;
      }
    }
    private onClickMoveDetails(){
      this.selectedUserDataForOperation  = this.getSelectedRowDetails();
      this.locationDataForMoveNetwork = this.locationData;
    }
    private onChangeNetworkMove(e){
      this.netWorkId = e.Id.toString();
    }
    private onClickSaveMoveNetwork(gateWayData){
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
    private getSelectedRowDetails(){

      let selectedCheckedData : any = [];

      let selectedDetails = this.radioModel === 'gateway'?  this.gateWayData : this.allSensors;
      selectedDetails.forEach(x => {
        if(x.checked){
          selectedCheckedData.push(x);
        }
      });

      if(selectedCheckedData.length < 1){
        return false;
      }
      else{
        return selectedCheckedData;
      }
      
    }
    onClickCancel(gateway){
      gateway.gateWayEditOption='display';
      gateway.checked=false;
    }
    private onClickRemoveDetails(){
     

       if(this.radioModel === 'gateway'){
         //backend function to be replaced with
          this.selectedGateway = Object.assign({}, this.gateWayData);
          let selectedRemoveData  =  this.getSelectedRowDetails();
          if(selectedRemoveData){
            this.getNetworkData();
          }
      }
      else if(this.radioModel === 'sensor'){
      //backend function to be replaced with
          this.selectedSensor = Object.assign({}, this.allSensors);
          let selectedRemoveData  =  this.getSelectedRowDetails();
          if(selectedRemoveData){
            this.getNetworkData();
          }
      }


      /*
      Backend call to remove the records.
      this.gateWayData = selectedRemoveData;
      And get networ call again getNetworkData();'
      */
      // Remove later
      
    }
    gotoSummary(){
      this.router.navigate(['dashboard/sensor-details','I1']);
    }
    filterName(){
      if(this.doFilterByName!==null){
        this.allSensors = this.originalSensor.filter((sens)=>sens.SensorName.toLowerCase().indexOf(this.doFilterByName.toLowerCase()) > -1 ? sens:'',this);
        if(this.doFilterByName == '' || this.doFilterByName == null){
          this.allSensors = this.originalSensor;
        }
      }
    }
  filterStatus(){
    const criteria = this.doFilterByStatus ? this.doFilterByStatus.toLowerCase():'select';
    if(criteria!=='select'){
      this.allSensors = this.originalSensor.filter((sens)=>{
        switch(criteria){
          case 'good':
          return (sens.Status == 0) ? sens:'';
          case 'low signal':
          return (sens.Status == 1) ? sens:'';
          case 'low battery':
          return (sens.Status == 2) ? sens:'';
          case 'missed communication':
          return (sens.Status == 3) ? sens:'';
          case 'alerts':
          return (sens.Status == 4) ? sens:'';
          default:
          break;
        }
      });
    } else {
      this.allSensors = this.originalSensor;
    }
  }
  filterByType(){
    const criteria = this.doFilterByType ? this.doFilterByType.toLowerCase():'select';
    if(criteria!=='select'){
      this.allSensors = this.originalSensor.filter((sens)=>{
        switch(criteria){
          case 'temperature':
          return (sens.SensorType==2) ? sens : '';
          case 'humidity':
          return (sens.SensorType==43) ? sens : '';
          case 'contact':
          return (sens.SensorType==9) ? sens: '';
          default:
          break;
        }
      })
    } else {
      this.allSensors = this.originalSensor;
    }
  }
  doCompare(){
    this.router.navigate(['dashboard/sensor-comparison','I1']);
  }
}