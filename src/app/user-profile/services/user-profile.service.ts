import { Injectable } from '@angular/core';
import { RequesterService } from '../../shared/services/requester.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

@Injectable()
export class UserProfileService {
  constructor(private requestService:RequesterService) { }
  getData(): Observable<any> {
    return Observable.of([
      {
        "Id": "l001",
        "name": "Boston Pizza 203",
        "address": "1502 8th Street   Saskatoon  Saskatchewan S7S 1P4 Canada",
        "expiryDate": "2017-12-31",
        "amount": "33000",
        "status": "Defaulter",
        "subscription": "Premier",
        "contactName": "Paul Alter",
        "contactEmail": "Paul.Alter@xyz.ca",
        "contactNumber": "+14168552735",
        "numberOfSensors": "10",
        "numberOfGateways": "1",
        "users": [
          {
            "name": "Icare LastName",
            "emailAddress": "Reclamationbin@gmail.com",
            "smsNumber": "555-555-1234",
            "smsProvider": "Verizon",
            "NotificationTypes": [
              "Email",
              "SMS"
            ],
            "MaintenanceAlerts": [
              "Email"
            ],
            "isAdmin": true
          },
          {
            "name": "Mike LastName",
            "emailAddress": "Mike@gmail.com",
            "smsNumber": "",
            "smsProvider": "",
            "NotificationTypes": [
              "Email"
            ],
            "MaintenanceAlerts": [
              "Email"
            ],
            "isAdmin": false
          },
          {
            "name": "Rebecca LastName",
            "emailAddress": "Rebecca@gmail.com",
            "smsNumber": "555-555-1234",
            "smsProvider": "Verizon",
            "NotificationTypes": [
              "Email",
              "SMS"
            ],
            "MaintenanceAlerts": [
              "Email",
              "SMS"
            ],
            "isAdmin": false
          },

        ],
        "renewal": [
          {
            "sno":"1",
            "expiryDate": "12/31/2017 1:44 PM",
            "previousRenewalDate": "12/31/2016 3:44 PM",
            "newRenewalDate": "12/31/2017 1:44 PM",
          },
          {
            "sno":"2",
            "expiryDate": "12/31/2017 1:44 PM",
            "previousRenewalDate": "12/31/2016 3:44 PM",
            "newRenewalDate": "12/31/2017 1:44 PM",
          },
          {
            "sno":"3",
            "expiryDate": "12/31/2017 1:44 PM",
            "previousRenewalDate": "12/31/2016 3:44 PM",
            "newRenewalDate": "12/31/2017 1:44 PM",
          },
          {
            "sno":"4",
            "expiryDate": "12/31/2017 1:44 PM",
            "previousRenewalDate": "12/31/2016 3:44 PM",
            "newRenewalDate": "12/31/2017 1:44 PM",
          }
        ],
        "Sensor": [
          {
            "SensorID": "1153235073321",
            "SensorType": "2",
            "NetworkID": "N001",
            "SensorName": "Sensor 3.21",
            "LastCommunicationDate": "12/31/2017 1:44 PM",
            "NextCommunicationDate": "12/31/2017 1:44 PM",
            "LastDataMessageID": "2563914831",
            "PowerSourceID": "1",
            "Status": "1",
            "CanUpdate": "true",
            "CurrentReading": "35.4° F",
            "BatteryLevel": "100",
            "SignalStrength": "20",
            "AlertsActive": "true"
          },
          {
            "SensorID": "2190116004322",
            "SensorType": "43",
            "NetworkID": "N001",
            "SensorName": "Sensor 3.22",
            "LastCommunicationDate": "12/31/2017 1:44 PM",
            "NextCommunicationDate": "12/31/2017 1:44 PM",
            "LastDataMessageID": "2563942032",
            "PowerSourceID": "1",
            "Status": "1",
            "CanUpdate": "true",
            "CurrentReading": "16.3% @ 62.1° F",
            "BatteryLevel": "100",
            "SignalStrength": "20",
            "AlertsActive": "true"
          },
          {
            "SensorID": "1156073157323",
            "SensorType": "2",
            "NetworkID": "N002",
            "SensorName": "Sensor 3.23",
            "LastCommunicationDate": "12/31/2017 1:44 PM",
            "NextCommunicationDate": "12/31/2017 1:44 PM",
            "LastDataMessageID": "2563379833",
            "PowerSourceID": "1",
            "Status": "1",
            "CanUpdate": "true",
            "CurrentReading": "26.1° F",
            "BatteryLevel": "100",
            "SignalStrength": "100",
            "AlertsActive": "true"
          },
          {
            "SensorID": "1156073157324",
            "SensorType": "2",
            "NetworkID": "N002",
            "SensorName": "Sensor 3.24",
            "LastCommunicationDate": "12/31/2017 1:44 PM",
            "NextCommunicationDate": "12/31/2017 1:44 PM",
            "LastDataMessageID": "2563379324",
            "PowerSourceID": "1",
            "Status": "1",
            "CanUpdate": "true",
            "CurrentReading": "72.1° F",
            "BatteryLevel": "100",
            "SignalStrength": "20",
            "AlertsActive": "true"
          },
          {
            "SensorID": "1156073157325",
            "SensorType": "43",
            "NetworkID": "N001",
            "SensorName": "Sensor 3.25",
            "LastCommunicationDate": "12/31/2017 1:44 PM",
            "NextCommunicationDate": "12/31/2017 1:44 PM",
            "LastDataMessageID": "2563379825",
            "PowerSourceID": "1",
            "Status": "1",
            "CanUpdate": "true",
            "CurrentReading": "17.3% @ 72.1° F",
            "BatteryLevel": "100",
            "SignalStrength": "20",
            "AlertsActive": "true"
          },
          {
            "SensorID": "3235073321",
            "SensorType": "2",
            "NetworkID": "N001",
            "SensorName": "Sensor 21",
            "LastCommunicationDate": "12/31/2017 1:44 PM",
            "NextCommunicationDate": "12/31/2017 1:44 PM",
            "LastDataMessageID": "2563914831",
            "PowerSourceID": "1",
            "Status": "1",
            "CanUpdate": "true",
            "CurrentReading": "45.4° F",
            "BatteryLevel": "100",
            "SignalStrength": "20",
            "AlertsActive": "true"
          },
          {
            "SensorID": "116004322",
            "SensorType": "43",
            "NetworkID": "N002",
            "SensorName": "Sensor 3.22",
            "LastCommunicationDate": "12/31/2017 1:44 PM",
            "NextCommunicationDate": "12/31/2017 1:44 PM",
            "LastDataMessageID": "2563942032",
            "PowerSourceID": "1",
            "Status": "1",
            "CanUpdate": "true",
            "CurrentReading": "16.3% @ 62.1° F",
            "BatteryLevel": "100",
            "SignalStrength": "20",
            "AlertsActive": "true"
          },
          {
            "SensorID": "2356073157323",
            "SensorType": "3",
            "NetworkID": "N001",
            "SensorName": "Sensor 3.23",
            "LastCommunicationDate": "12/31/2017 1:44 PM",
            "NextCommunicationDate": "12/31/2017 1:44 PM",
            "LastDataMessageID": "2563379833",
            "PowerSourceID": "1",
            "Status": "1",
            "CanUpdate": "true",
            "CurrentReading": "62.1° F",
            "BatteryLevel": "100",
            "SignalStrength": "100",
            "AlertsActive": "true"
          },
          {
            "SensorID": "2256073157324",
            "SensorType": "",
            "NetworkID": "N002",
            "SensorName": "Sensor 785.24",
            "LastCommunicationDate": "12/31/2017 1:44 PM",
            "NextCommunicationDate": "12/31/2017 1:44 PM",
            "LastDataMessageID": "2563379324",
            "PowerSourceID": "1",
            "Status": "1",
            "CanUpdate": "true",
            "CurrentReading": "27.1° F",
            "BatteryLevel": "100",
            "SignalStrength": "20",
            "AlertsActive": "true"
          },
          {
            "SensorID": "2696073157325",
            "SensorType": "43",
            "NetworkID": "N002",
            "SensorName": "Sensor 534.32",
            "LastCommunicationDate": "12/31/2017 1:44 PM",
            "NextCommunicationDate": "12/31/2017 1:44 PM",
            "LastDataMessageID": "2563379825",
            "PowerSourceID": "1",
            "Status": "1",
            "CanUpdate": "true",
            "CurrentReading": "28.3% @ 72.1° F",
            "BatteryLevel": "100",
            "SignalStrength": "20",
            "AlertsActive": "true"
          }
        ],
        "Networks": [
          {
            "Id": "N001",
            "Name": "BP203NET",
            "Address": "226 Broadway Street E  Yorkton Saskatchewan S3N 4C3 Canada",
            "CountofGateways": "2",
            "CountOfSensors": "10",
            "SendNotifications": "True",
            "HoldingNetwork": "False"
          },
          {
            "Id": "N002",
            "Name": "BP305NET",
            "Address": "1502 8th Street   Saskatoon  Saskatchewan S7S 1P4 Canada",
            "CountofGateways": "20",
            "CountOfSensors": "100",
            "SendNotifications": "True",
            "HoldingNetwork": "False"
          }
        ]
      }
    ]);
  }

getRealData() {
 return this.requestService.getExternalRequest('/api/User/Details');
}

}
