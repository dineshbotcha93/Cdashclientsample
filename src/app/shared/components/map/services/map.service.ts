import { Injectable } from '@angular/core';
import { MapConstants } from '../constants/map.constants';

@Injectable()
export class MapService{
  private mapStatus = MapConstants.STATUS;

  constructor(){
  }

  getIcon(status:string){
    switch(status){
      case this.mapStatus.LOW_BATTERY:
      return 'assets/images/tempMarkers/temp-green.png';
      case this.mapStatus.ALERTS:
      return 'assets/images/tempMarkers/temp-red.png';
      case this.mapStatus.LOW_SIGNAL:
      return 'assets/images/tempMarkers/temp-yellow.png';
      case this.mapStatus.MISSED_COMMUNICATION:
      return 'assets/images/tempMarkers/temp-orange.png';
      default:
      break;
    }
  }
  getPriorityCount(record){
    let priority = null;
    if(record[this.mapStatus.ALERTS] > 0){
      priority = this.mapStatus.ALERTS;
    } else if(record[this.mapStatus.MISSED_COMMUNICATION] > 0 && priority === null){
      priority = this.mapStatus.MISSED_COMMUNICATION;
    } else if(record[this.mapStatus.LOW_SIGNAL] > 0 && priority === null){
      priority = this.mapStatus.LOW_SIGNAL;
    } else if(record[this.mapStatus.LOW_BATTERY] > 0 && priority === null){
      priority = this.mapStatus.LOW_BATTERY;
    } else {
      priority = this.mapStatus.LOW_BATTERY;
    }
    return priority;
  }

  getData():Object{
    return {
        "Location": [
          {
            "Id": "I001",
            "Title": "Boston Pizza 203",
            "Address": "1502 8th Street   Saskatoon  Saskatchewan S7S 1P4 Canada",
            "Latitude": "52.150813",
            "Longitude": "-106.567821",
            "ActiveSensors": "10",
            "Alerts": "3",
            "MissedCommunication": "2",
            "LowSignal": "0",
            "LowBattery": "0"
          },
          {
            "Id": "I002",
            "Title": "Boston Pizza 207",
            "Address": "226 Broadway Street E  Yorkton Saskatchewan S3N 4C3 Canada",
            "Latitude": "51.209425",
            "Longitude": "-102.449612",
            "ActiveSensors": "10",
            "Alerts": "0",
            "MissedCommunication": "4",
            "LowSignal": "0",
            "LowBattery": "0"
          },
          {
            "Id": "I003",
            "Title": "Boston Pizza Beaumont",
            "Address": "6210 50th Street  Beaumont Alberta T4X0B6 Canada",
            "Latitude": "53.362812",
            "Longitude": "-113.417260",
            "ActiveSensors": "10",
            "Alerts": "0",
            "MissedCommunication": "0",
            "LowSignal": "5",
            "LowBattery": "0"
          },
          {
            "Id": "I004",
            "Title": "Boston Pizza Regent",
            "Address": "1615 Regent Ave W.  Winnipeg Manitoba R2C5C6 Canada",
            "Latitude": "49.900865",
            "Longitude": "-97.069143",
            "ActiveSensors": "5",
            "Alerts": "0",
            "MissedCommunication": "0",
            "LowSignal": "0",
            "LowBattery": "5"
          }
        ]
      }
    }
}
