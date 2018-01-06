import { Injectable } from '@angular/core';
import { MapConstants } from '../constants/map.constants';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

@Injectable()
export class MapService{
  private mapStatus = MapConstants.STATUS;
  private readableStatus = MapConstants.READABLE_STATUS;

  constructor(){
  }

  getIcon(status:string){
    switch(status){
      case this.mapStatus.LOW_BATTERY:
      return 'assets/images/tempMarkers/temp-purple.png';
      case this.mapStatus.ALERTS:
      return 'assets/images/tempMarkers/temp-red.png';
      case this.mapStatus.LOW_SIGNAL:
      return 'assets/images/tempMarkers/temp-blue.png';
      case this.mapStatus.MISSED_COMMUNICATION:
      return 'assets/images/tempMarkers/temp-yellow.png';
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

  getReadableStatus(record){
    let priority = null;
    if(record[this.mapStatus.ALERTS] > 0){
      priority = this.readableStatus.ALERTS;
    } else if(record[this.mapStatus.MISSED_COMMUNICATION] > 0 && priority === null){
      priority = this.readableStatus.MISSED_COMMUNICATION;
    } else if(record[this.mapStatus.LOW_SIGNAL] > 0 && priority === null){
      priority = this.readableStatus.LOW_SIGNAL;
    } else if(record[this.mapStatus.LOW_BATTERY] > 0 && priority === null){
      priority = this.readableStatus.LOW_BATTERY;
    } else {
      priority = this.readableStatus.LOW_BATTERY;
    }
    return priority;
  }

  getData():Observable<any>{
    return Observable.of({
      "LocationGroup": [
        {
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
              "Title": "Boston Pizza 208",
              "Address": "3250 2nd Avenue West  Prince Albert Saskatchewan S6V 5E9 Canada",
              "Latitude": "53.183366",
              "Longitude": "-105.759101",
              "ActiveSensors": "10",
              "Alerts": "0",
              "MissedCommunication": "0",
              "LowSignal": "5",
              "LowBattery": "0"
            },
            {
              "Id": "I004",
              "Title": "Boston Pizza 211",
              "Address": "11434 Railway Ave  North Battleford Saskatchewan S9A 3G8 Canada",
              "Latitude": "52.759558",
              "Longitude": "-108.273011",
              "ActiveSensors": "5",
              "Alerts": "0",
              "MissedCommunication": "0",
              "LowSignal": "0",
              "LowBattery": "5"
            },
            {
              "Id": "I005",
              "Title": "Boston Pizza 213",
              "Address": "2331 Quill Centre Humboldt Saskatchewan S0K 2A0 Canada",
              "Latitude": "52.200497",
              "Longitude": "-105.149627",
              "ActiveSensors": "10",
              "Alerts": "0",
              "MissedCommunication": "0",
              "LowSignal": "5",
              "LowBattery": "0"
            },
            {
              "Id": "I006",
              "Title": "Boston Pizza 214",
              "Address": "515 Nelson Road  Saskatoon Saskatchewan S7S 1P4 Canada",
              "Latitude": "52.150395",
              "Longitude": "-106.567853",
              "ActiveSensors": "5",
              "Alerts": "0",
              "MissedCommunication": "0",
              "LowSignal": "0",
              "LowBattery": "5"
            },
            {
              "Id": "I007",
              "Title": "Boston Pizza 215",
              "Address": "329 Herold Road  Saskatoon  Saskatchewan S7V 1H9 Canada",
              "Latitude": "52.098713",
              "Longitude": "-106.567082",
              "ActiveSensors": "10",
              "Alerts": "0",
              "MissedCommunication": "0",
              "LowSignal": "5",
              "LowBattery": "0"
            },
            {
              "Id": "I008",
              "Title": "Boston Pizza 216",
              "Address": "35 Riverview Drive  Weyburn Saskatchewan S4H 3B4 Canada",
              "Latitude": "49.659554",
              "Longitude": "-103.856885",
              "ActiveSensors": "5",
              "Alerts": "0",
              "MissedCommunication": "0",
              "LowSignal": "0",
              "LowBattery": "5"
            },
            {
              "Id": "I009",
              "Title": "Boston Pizza 218",
              "Address": "111 Manitoba Street East  Moose Jaw  Saskatchewan S6H 0A1 Canada",
              "Latitude": "50.389363",
              "Longitude": "-105.531384",
              "ActiveSensors": "10",
              "Alerts": "0",
              "MissedCommunication": "0",
              "LowSignal": "5",
              "LowBattery": "0"
            },
            {
              "Id": "I010",
              "Title": "Boston Pizza 220  Blairmore",
              "Address": "107 Betts Avenue   Saskatoon  Saskatchewan  S7L 1M2  Canada",
              "Latitude": "52.128460",
              "Longitude": "-106.760206",
              "ActiveSensors": "5",
              "Alerts": "0",
              "MissedCommunication": "0",
              "LowSignal": "0",
              "LowBattery": "5"
            }
          ]
        },{
          "Location": [
            {
              "Id": "I011",
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
              "Id": "I012",
              "Title": "Boston Pizza Albany",
              "Address": "12788 167 AVE NW  Edmonton Alberta T6V 1J6 Canada",
              "Latitude": "53.629673",
              "Longitude": "-113.544247",
              "ActiveSensors": "5",
              "Alerts": "0",
              "MissedCommunication": "0",
              "LowSignal": "0",
              "LowBattery": "5"
            },
            {
              "Id": "I013",
              "Title": "Boston Pizza Namao (183)",
              "Address": "16521 97th Street  Edmonton Alberta T5X 6A9 Canada",
              "Latitude": "53.627364",
              "Longitude": "-113.491104",
              "ActiveSensors": "5",
              "Alerts": "0",
              "MissedCommunication": "0",
              "LowSignal": "0",
              "LowBattery": "5"
            },
            {
              "Id": "I014",
              "Title": "Boston Pizza Namao (183)",
              "Address": "5527 49 Avenue  Wetaskiwin AB T9A0R5 Canada",
              "Latitude": "52.969906",
              "Longitude": "-113.389623",
              "ActiveSensors": "5",
              "Alerts": "0",
              "MissedCommunication": "0",
              "LowSignal": "0",
              "LowBattery": "5"
            }
          ]
        },{
          "Location": [
            {
              "Id": "I015",
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
      ]
    });
  }
}
