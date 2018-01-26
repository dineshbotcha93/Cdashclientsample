import { Component,OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { MapService } from '../../shared/components/map/services/map.service';
import { MapConstants } from '../../shared/components/map/constants/map.constants';
import { SensorSummaryService } from './services/sensor-summary.service';
import { environment } from '../../../environments/environment';
import { CommonSharedService } from '../../shared/services/common-shared.service';

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

  private mapStatus = MapConstants.STATUS;
  private doFilterByName:string = null;
  private doFilterByStatus:string = 'select';
  private doFilterByType:string = 'select';

  constructor(private route:ActivatedRoute,
    private router:Router,
    private mapService:MapService,
    private sensorSummaryService:SensorSummaryService,
    private commonSharedService:CommonSharedService){

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
    }

    /*Onchange event for selection of network ID*/
    private onChange(e){
      this.netWorkId = e.Id.toString();
      this.getNetworkData();
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
        Obj = gate;
        // this.gateWayData.push(Obj);
        if(id !== gate.GatewayID){
          this.gateWayData.push(Obj);
        }
        console.log(this.gateWayData);

      });
    }

    private getSensorData(sensor){
      this.allSensors = [];
      this.originalMapSensor = sensor;
      sensor.forEach((sens)=>{
        this.allSensors.push(sens);
      });
      this.originalSensor = this.allSensors.map(x => Object.assign({}, x));

    }

    /* Gateway functions  */
    onClickEdit(gateway){
      gateway.gateWayEditOption='edit';
      this.selectedGateway = Object.assign({}, gateway);
    }

    onClickSave(gateway){
      //Backend function
      gateway.gateWayEditOption='display';
      this.selectedGateway = gateway;
      // this.getSensorData();
    }

    onClickCancel(gateway){

      gateway.gateWayEditOption='display';
    }

    onClickDelete(gateway){
      //backend function to be replaced with
      this.getGatewayData( this.gateWayData,gateway.GatewayID);
      gateway.gateWayEditOption ='display';
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
