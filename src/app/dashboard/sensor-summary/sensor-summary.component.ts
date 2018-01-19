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

  private mapStatus = MapConstants.STATUS;
  private doFilterByName:string = null;

  constructor(private route:ActivatedRoute,
    private router:Router,
    private mapService:MapService,
    private sensorSummaryService:SensorSummaryService){

    this.route.params.subscribe((params)=>{
      this.netWorkId = params.id.toString();
      this.getSensorData();

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
    this.getSensorData();
  }


  /*Get sensor data from service by selecting the network Id*/
  private  getSensorData(){
    this.allSensors = [];
    this.mapData = null;
    this.sensorSummaryService.getData(this.netWorkId).then((e)=>{
      console.log(e);
      this.mapData = e;
      this.originalMapSensor = this.mapData;
      e.Location.Network.Sensor.forEach((sens)=>{
         this.allSensors.push(sens);
      });
      this.originalSensor = this.allSensors.map(x => Object.assign({}, x));
      console.log('-----------'+this.originalSensor);
    });
  }

  gotoSummary(){
    this.router.navigate(['dashboard/sensor-details','I1']);
  }

  filterName(){
    if(this.gateway=='all'){
      this.allSensors = this.originalSensor.filter((sens)=>sens.SensorName.indexOf(this.doFilterByName) > -1 ? sens:'',this);
      if(this.doFilterByName == ''){
        this.allSensors = this.originalSensor;
      }
    }
  }
  doCompare(){
    this.router.navigate(['dashboard/sensor-comparison','I1']);
  }
}
