import { Injectable } from "@angular/core";
import { RequesterService } from "../../shared/services/requester.service";
import { SERVICE_CONSTANTS } from "../../shared/constants/service.constants";
import { Observable } from "rxjs/Observable";
import "rxjs/add/observable/of";
@Injectable()
export class BusinessService {
  data: String[] = [];
  constructor(private requesterService: RequesterService) {
  }
  getData(): Observable<any> {
    return Observable.of([
      {
        "status": [
          {
            count: "5",
            status: "Overdue",
            title: "Overdue",
            amount: "177000"
          },
          {
            count: "4",
            status: "Due",
            title: "Due",
            amount: "135000"
          },
          {
            count: "4",
            status: "Renewed",
            title: "Renewed",
            amount: "207000"
          },
          {
            count: "2",
            status: "New",
            title: "New",
            amount: "0"
          }
        ],
        "customers": [
          {
            "Name": "Boston Pizza 203",
            "RenewalDate": "2017-12-31",
            "Status": "Overdue",
            "Subscription": "Premier",
            "ContactName": "Paul Alter",
            "ContactEmail": "Paul.Alter@xyz.ca",
            "ContactNumber": "+14168552735",
            "NumberOfSensors": "10",
            "NumberOfGateways": "1",
          },
          {
            "Name": "Boston Pizza 207",
            "RenewalDate": "2017-12-31",
            "Status": "Overdue",
            "Subscription": "Premier",
            "ContactName": "207 Alter",
            "ContactEmail": "207.Alter@xyz.ca",
            "ContactNumber": "+14168552207",
            "NumberOfSensors": "8",
            "NumberOfGateways": "1",
          },
          {
            "Name": "Boston Pizza 208",            
            "RenewalDate": "2017-12-30",
            "Status": "Due",
            "Subscription": "Premier",
            "ContactName": "208 Alter",
            "ContactEmail": "208.Alter@xyz.ca",
            "ContactNumber": "+14168552208",
            "NumberOfSensors": "12",
            "NumberOfGateways": "1",
          },
          {
            "Name": "Boston Pizza 211",
            "RenewalDate": "2017-12-30",
            "Status": "Renewed",
            "Subscription": "Premier",
            "ContactName": "211 Alter",
            "ContactEmail": "211.Alter@xyz.ca",
            "ContactNumber": "+14168552211",
            "NumberOfSensors": "12",
            "NumberOfGateways": "1",
          },
          {
            "Name": "Boston Pizza 213",
            "RenewalDate": "2017-12-30",
            "Status": "New",
            "Subscription": "Premier",
            "ContactName": "213 Alter",
            "ContactEmail": "213.Alter@xyz.ca",
            "ContactNumber": "+14168552213",
            "NumberOfSensors": "12",
            "NumberOfGateways": "1",
          },
          {
            "Name": "Boston Pizza 214",
            "RenewalDate": "2018-01-30",
            "Status": "Renewed",
            "Subscription": "Premier",
            "ContactName": "214 Alter",
            "ContactEmail": "214.Alter@xyz.ca",
            "ContactNumber": "+14168552214",
            "NumberOfSensors": "13",
            "NumberOfGateways": "1"
          },
          {
            "Name": "Boston Pizza 215",
            "RenewalDate": "2018-01-30",
            "Status": "Renewed",
            "Subscription": "Premier",
            "ContactName": "215 Alter",
            "ContactEmail": "215.Alter@xyz.ca",
            "ContactNumber": "+14168552215",
            "NumberOfSensors": "19",
            "NumberOfGateways": "1"
          },
          {
            "Name": "Boston Pizza 216",
            "RenewalDate": "2018-02-20",
            "Status": "Due",
            "Subscription": "Premier",
            "ContactName": "216 Alter",
            "ContactEmail": "216.Alter@xyz.ca",
            "ContactNumber": "+14168552216",
            "NumberOfSensors": "10",
            "NumberOfGateways": "1"
          },
          {
            "Name": "Boston Pizza 218",
            "RenewalDate": "2018-02-20",
            "Status": "Due",
            "Subscription": "Premier",
            "ContactName": "218 Alter",
            "ContactEmail": "218.Alter@xyz.ca",
            "ContactNumber": "+14168552218",
            "NumberOfSensors": "4",
            "NumberOfGateways": "1"
          },
          {
            "Name": "Boston Pizza 220  Blairmore",
            "RenewalDate": "2018-02-20",
            "Status": "Due",
            "Subscription": "Premier",
            "ContactName": "220 Alter",
            "ContactEmail": "220.Alter@xyz.ca",
            "ContactNumber": "+14168552220",
            "NumberOfSensors": "10",
            "NumberOfGateways": "1"
          },
          {
            "Name": "Boston Pizza Beaumont",
            "RenewalDate": "2018-01-20",
            "Status": "Renewed",
            "Subscription": "Premier",
            "ContactName": "217 Alter",
            "ContactEmail": "217.Alter@xyz.ca",
            "ContactNumber": "+14168552217",
            "NumberOfSensors": "17",
            "NumberOfGateways": "1"
          },
          {
            "Name": "Boston Pizza Albany",
            "RenewalDate": "2018-01-20",
            "Amount": "51000",
            "Status": "Renewed",
            "Subscription": "Premier",
            "ContactName": "218 Alter",
            "ContactEmail": "218.Alter@xyz.ca",
            "ContactNumber": "+14168552218",
            "NumberOfSensors": "15",
            "NumberOfGateways": "2"
          },
          {
            "Name": "Boston Pizza Namao (183)",
            "RenewalDate": "2018-03-20",
            "Amount": "54000",
            "Status": "Due",
            "Subscription": "Premier",
            "ContactName": "183 Alter",
            "ContactEmail": "183.Alter@xyz.ca",
            "ContactNumber": "+14168552183",
            "NumberOfSensors": "17",
            "NumberOfGateways": "1"
          },
          {
            "Name": "Boston Pizza Wetaskiwin",
            "RenewalDate": "2019-01-20",
            "Status": "New",
            "Subscription": "Premier",
            "ContactName": "220 Alter",
            "ContactEmail": "220.Alter@xyz.ca",
            "ContactNumber": "+14168552220",
            "NumberOfSensors": "8",
            "NumberOfGateways": "1"
          },
           {
            "Name": "Boston Pizza Regent",
            "RenewalDate": "2019-01-20",
            "Status": "New",
            "Subscription": "Premier",
            "ContactName": "221 Alter",
            "ContactEmail": "221.Alter@xyz.ca",
            "ContactNumber": "+14168552221",
            "NumberOfSensors": "8",
            "NumberOfGateways": "1"
          }
        ]
      }
    ]);
  }
}
