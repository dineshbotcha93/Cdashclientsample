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
          "Id": "l001",
          "Title": "Boston Pizza 203",
          "Address": "1502 8th Street   Saskatoon  Saskatchewan S7S 1P4 Canada",
          "Latitude": "52.150813",
          "Longitude": "-106.567821",
          "ActiveSensors": "10",
          "Alerts": "3",
          "MissedCommunication": "3",
          "LowSignal": "0",
          "LowBattery": "0"
        },
        {
          "Id": "l001",
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
          "Id": "l003",
          "Title": "Boston Pizza Beaumont",
          "Address": "6210 50th Street  Beaumont Alberta T4X0B6 Canada",
          "Latitude": "53.362812",
          "Longitude": "-113.417260",
          "ActiveSensors": "10",
          "Alerts": "0",
          "MissedCommunication": "0",
          "LowSignal": "3",
          "LowBattery": "0"
        },
        {
          "Id": "l004",
          "Title": "Boston Pizza Regent",
          "Address": "1615 Regent Ave W.  Winnipeg Manitoba R2C5C6 Canada",
          "Latitude": "49.900865",
          "Longitude": "-97.069143",
          "ActiveSensors": "10",
          "Alerts": "0",
          "MissedCommunication": "0",
          "LowSignal": "0",
          "LowBattery": "0"
        }
      ]
    }
  }

  getSensorList():Object{
    return {
      "Location": {
        "Id": "1001",
        "Title": "Boston Pizza 203",
        "Address": "1502 8th Street   Saskatoon  Saskatchewan S7S 1P4 Canada",
        "ActiveSensors": "10",
        "Network": {
          "Id": "N001",
          "Name": "BP203NET",
          "CountofGateways": "2",
          "CountOfSensors": "10",
          "SendNotifications": "True",
          "HoldingNetwork": "False",
          "Gateway": [
            {
              "GatewayID": "108830382",
              "NetworkID": "1000",
              "Name": "Base Station - 1508830382",
              "GatewayType": "Base Station",
              "Heartbeat": "5",
              "IsDirty": "false",
              "LastCommunicationDate": "12/31/2017 1:44 PM",
              "LastInboundIPAddress": "",
              "MacAddress": "2486F48051B9",
              "Sensor": [
                {
                  "SensorID": "1153235073",
                  "MonnitApplicationID": "2",
                  "CSNetID": "1000",
                  "SensorName": "Sensor 1",
                  "LastCommunicationDate": "12/31/2017 1:44 PM",
                  "NextCommunicationDate": "12/31/2017 1:44 PM",
                  "LastDataMessageID": "25639148",
                  "PowerSourceID": "1",
                  "Status": "0",
                  "CanUpdate": "true",
                  "CurrentReading": "35.4° F",
                  "BatteryLevel": "100",
                  "SignalStrength": "100",
                  "AlertsActive": "true"
                },
                {
                  "SensorID": "2190116004",
                  "MonnitApplicationID": "43",
                  "CSNetID": "1000",
                  "SensorName": "HARRY'S HUMIDITY SENSOR",
                  "LastCommunicationDate": "12/31/2017 1:44 PM",
                  "NextCommunicationDate": "12/31/2017 1:44 PM",
                  "LastDataMessageID": "25639420",
                  "PowerSourceID": "1",
                  "Status": "0",
                  "CanUpdate": "true",
                  "CurrentReading": "16.3% @ 62.1° F",
                  "BatteryLevel": "100",
                  "SignalStrength": "100",
                  "AlertsActive": "true"
                },
                {
                  "SensorID:1156073157": {},
                  "MonnitApplicationID": "2",
                  "CSNetID:1000": {},
                  "SensorName":"HARRY'S TEST SENSOR #1",
                  "LastCommunicationDate": "",
                  "NextCommunicationDate": "",
                  "LastDataMessageID": "25633798",
                  "PowerSourceID": "1",
                  "Status": "2",
                  "CanUpdate": "true",
                  "CurrentReading": "\"62.1° F\"",
                  "BatteryLevel": "100",
                  "SignalStrength": "100",
                  "AlertsActive": "true"
                }
              ]
            },
            {
              "GatewayID": "108830383",
              "NetworkID": "1000",
              "Name": "Gateway - 1508830383",
              "GatewayType": "Gateway",
              "Heartbeat": "5",
              "IsDirty": "false",
              "LastCommunicationDate": "12/31/2017 1:44 PM",
              "LastInboundIPAddress": "",
              "MacAddress": "2386F48051B7",
              "Sensor": [
                {
                  "SensorID": "1153235073",
                  "MonnitApplicationID": "2",
                  "CSNetID": "1000",
                  "SensorName": "Sensor 1",
                  "LastCommunicationDate": "12/31/2017 1:44 PM",
                  "NextCommunicationDate": "12/31/2017 1:44 PM",
                  "LastDataMessageID": "25639148",
                  "PowerSourceID": "1",
                  "Status": "0",
                  "CanUpdate": "true",
                  "CurrentReading": "38.4° F",
                  "BatteryLevel": "100",
                  "SignalStrength": "100",
                  "AlertsActive": "true"
                },
                {
                  "SensorID": "2190116004",
                  "MonnitApplicationID": "43",
                  "CSNetID": "1000",
                  "SensorName": "HARRY'S HUMIDITY SENSOR",
                  "LastCommunicationDate": "12/31/2017 1:44 PM",
                  "NextCommunicationDate": "12/31/2017 1:44 PM",
                  "LastDataMessageID": "25639420",
                  "PowerSourceID": "1",
                  "Status": "0",
                  "CanUpdate": "true",
                  "CurrentReading": "16.3% @ 77.1° F",
                  "BatteryLevel": "100",
                  "SignalStrength": "100",
                  "AlertsActive": "true"
                },
                {
                  "SensorID:1156073157": {},
                  "MonnitApplicationID": "2",
                  "CSNetID:1000": {},
                  "SensorName":"HARRY'S TEST SENSOR #1",
                  "LastCommunicationDate": "",
                  "NextCommunicationDate": "",
                  "LastDataMessageID": "25633798",
                  "PowerSourceID": "1",
                  "Status": "2",
                  "CanUpdate": "true",
                  "CurrentReading": "\"62.1° F\"",
                  "BatteryLevel": "100",
                  "SignalStrength": "100",
                  "AlertsActive": "true"
                }
              ]
            }
          ]
        }
      }
    }
  }
}
