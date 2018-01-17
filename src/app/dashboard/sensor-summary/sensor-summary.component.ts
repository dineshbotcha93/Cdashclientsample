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
  locationData: any = [];
  selectLocation:any = [];
  locationId:any = null;
  private mapStatus = MapConstants.STATUS;
  constructor(private route:ActivatedRoute, private router:Router,private mapService:MapService,private sensorSummaryService:SensorSummaryService){
  this.route.params.subscribe((params)=>{
  this.locationId=params.id;
  this.sensorSummaryService.getData(params.id).then((e)=>{
  this.mapData = e;
  e.Location.Network.Gateway.forEach((gate)=>{
  gate.Sensor.forEach((sens)=>{
  this.allSensors.push(sens);
  });
  });
  });
  });
  }
  ngOnInit() {
  this.mapService.getData().subscribe(e=>{
  for (let location of e.LocationGroup) {
  location.Location.forEach((loc)=>{
  let Obj = {
  name: null,
  Id: null
  };
  
  Obj.Id=loc.Id;
  Obj.name=loc.Title;
  this.locationData.push(Obj);
  });
  this.selectLocation = this.locationData[0];
  }
  });
  }
  gotoSummary(){
  this.router.navigate(['dashboard/sensor-details','I1']);
  }
  doCompare(){
  this.router.navigate(['dashboard/sensor-comparison','I1']);
  }
  }