import { Injectable } from '@angular/core';
import { RequesterService } from '../../../shared/services/requester.service';
import { SERVICE_CONSTANTS } from '../../../shared/constants/service.constants';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

@Injectable()
export class CustomerDetailsService {
  constructor(private requesterService: RequesterService) { }
  getData(): Observable<any> {
    return Observable.of([
      {
        "Id": "l001",
        "Name": "Boston Pizza 203",
        "Address": "1502 8th Street   Saskatoon  Saskatchewan S7S 1P4 Canada",
        "ExpiryDate": "2017-12-31",
        "Amount": "33000",
        "Status": "Defaulter",
        "Subscription": "Premier",
        "ContactName": "Paul Alter",
        "ContactEmail": "Paul.Alter@xyz.ca",
        "ContactNumber": "+14168552735",
        "NumberOfSensors": "10",
        "NumberOfGateways": "1",
        "Users": [
          {
            "Name": "Icare LastName",
            "Email": "Reclamationbin@gmail.com",
            "PhoneNumber": "555-555-1234",
            "SMSProvider": "Verizon",
            "NotificationTypes": [
              "Email",
              "SMS"
            ],
            "MaintenanceAlerts": [
              "Email"
            ],
            "IsAdmin": true
          },
          {
            "Name": "Mike LastName",
            "Email": "Mike@gmail.com",
            "PhoneNumber": "",
            "SMSProvider": "",
            "NotificationTypes": [
              "Email"
            ],
            "MaintenanceAlerts": [
              "Email"
            ],
            "IsAdmin": false
          },
          {
            "Name": "Rebecca LastName",
            "Email": "Rebecca@gmail.com",
            "PhoneNumber": "555-555-1234",
            "SMSProvider": "Verizon",
            "NotificationTypes": [
              "Email",
              "SMS"
            ],
            "MaintenanceAlerts": [
              "Email",
              "SMS"
            ],
            "IsAdmin": false
          },

        ],
        "Gateway": [
          {
            "GatewayID": "108830382",
            "NetworkID": "N001",
            "Name": "Base Station - 1508830382",
            "GatewayType": "Base Station",
            "Heartbeat": "5",
            "IsDirty": "false",
            "LastCommunicationDate": "12/31/2017 1:44 PM",
            "LastInboundIPAddress": "192.147.20.10",
            "MacAddress": "2486F48051B9",

          },
          {
            "GatewayID": "108830403",
            "NetworkID": "N001",
            "Name": "Gateway - 1508830403",
            "GatewayType": "Gateway",
            "Heartbeat": "5",
            "IsDirty": "false",
            "LastCommunicationDate": "12/31/2017 1:44 PM",
            "LastInboundIPAddress": "",
            "MacAddress": "2786F48051B7",

          },
          {
            "GatewayID": "335830382",
            "NetworkID": "N001",
            "Name": "Gateway - 335830382",
            "GatewayType": "335830382",
            "Heartbeat": "5",
            "IsDirty": "false",
            "LastCommunicationDate": "12/31/2017 1:44 PM",
            "LastInboundIPAddress": "192.147.20.10",
            "MacAddress": "2486F48051B9",

          },
          {
            "GatewayID": "235830403",
            "NetworkID": "N002",
            "Name": "Basestation - 1508830403",
            "GatewayType": "Basestation",
            "Heartbeat": "5",
            "IsDirty": "false",
            "LastCommunicationDate": "12/31/2017 1:44 PM",
            "LastInboundIPAddress": "",
            "MacAddress": "2786F48051B7",

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
  getRealData(AccountId) {
    return this.requesterService
    .getExternalRequest('/api/Account/'+AccountId+'/Details');
  }
}
