import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

interface tileDetail{
  locationID:number;
  lat:number;
  lng:number;
  count:number;
  status:string;
  details:object;
}
@Component({
  selector:'app-sensor-details',
  templateUrl:'./sensor-details.component.html',
  styleUrls: ['./sensor-details.component.scss'],
})
export class SensorDetailsComponent {
  mapData:Array<tileDetail> = null;
  displayTiles:Array<tileDetail> = null;
  constructor(private route:ActivatedRoute){
    this.mapData = [
      {
        'locationID':1,'lat':12.5,'lng':12.4,status:'LOW_SIGNAL',count:15,details:{
          fahrenHeight:12,
          relativeHumidity:11,
          title:'Sensor 2'
        }
      },
      {
        'locationID':2,'lat':18.5,'lng':15.5,status:'MISSED_COMMUNICATION',count:32,details:{
          fahrenHeight:15,
          relativeHumidity:11,
          title:'Sensor 1'
        }
      },
      {
        'locationID':3,'lat':20,'lng':20,status:'ALERTS',count:7,details:{
          fahrenHeight:11,
          relativeHumidity:11,
          title: 'Sensor 2'
        }
      },
      {
        'locationID':4,'lat':15.7,'lng':15.7,status:'LOW_BATTERY',count:1,details:{
          fahrenHeight:10,
          relativeHumidity:11,
          title:'Sensor 1'
        }
      }];
      this.route.params.subscribe((params)=>{
        this.displayTiles = this.mapData.filter((map)=>map.locationID==params.id);
      });
    }
  }
