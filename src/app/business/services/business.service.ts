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
            "Sensors": "10",
            "Amount": "33000",
          },
          {
            "Name": "Boston Pizza 207",
            "RenewalDate": "2017-12-31",
            "Status": "Overdue",
            "Subscription": "Premier",
            "ContactName": "207 Alter",
            "ContactEmail": "207.Alter@xyz.ca",
            "ContactNumber": "+14168552207",
            "Sensors": "8",
            "Amount": "27000",
          },
          {
            "Name": "Boston Pizza 208",            
            "RenewalDate": "2017-12-30",
            "Status": "Due",
            "Subscription": "Premier",
            "ContactName": "208 Alter",
            "ContactEmail": "208.Alter@xyz.ca",
            "ContactNumber": "+14168552208",
            "Sensors": "12",
            "Amount": "39000",
          },
          {
            "Name": "Boston Pizza 211",
            "RenewalDate": "2017-12-30",
            "Status": "Renewed",
            "Subscription": "Premier",
            "ContactName": "211 Alter",
            "ContactEmail": "211.Alter@xyz.ca",
            "ContactNumber": "+14168552211",
            "Sensors": "12",
            "Amount": "43000",
          },
          {
            "Name": "Boston Pizza 213",
            "RenewalDate": "2017-12-30",
            "Status": "New",
            "Subscription": "Premier",
            "ContactName": "213 Alter",
            "ContactEmail": "213.Alter@xyz.ca",
            "ContactNumber": "+14168552213",
            "Sensors": "12",
            "Amount": "34000",
          },
          {
            "Name": "Boston Pizza 214",
            "RenewalDate": "2018-01-30",
            "Status": "Renewed",
            "Subscription": "Premier",
            "ContactName": "214 Alter",
            "ContactEmail": "214.Alter@xyz.ca",
            "ContactNumber": "+14168552214",
            "Sensors": "13",
            "Amount": "29000",
          },
          {
            "Name": "Boston Pizza 215",
            "RenewalDate": "2018-01-30",
            "Status": "Renewed",
            "Subscription": "Premier",
            "ContactName": "215 Alter",
            "ContactEmail": "215.Alter@xyz.ca",
            "ContactNumber": "+14168552215",
            "Sensors": "19",
            "Amount": "27000",
          },
          {
            "Name": "Boston Pizza 216",
            "RenewalDate": "2018-02-20",
            "Status": "Due",
            "Subscription": "Premier",
            "ContactName": "216 Alter",
            "ContactEmail": "216.Alter@xyz.ca",
            "ContactNumber": "+14168552216",
            "Sensors": "10",
            "Amount": "35000",
          },
          {
            "Name": "Boston Pizza 218",
            "RenewalDate": "2018-02-20",
            "Status": "Due",
            "Subscription": "Premier",
            "ContactName": "218 Alter",
            "ContactEmail": "218.Alter@xyz.ca",
            "ContactNumber": "+14168552218",
            "Sensors": "4",
            "Amount": "23000",
          },
          {
            "Name": "Boston Pizza 220  Blairmore",
            "RenewalDate": "2018-02-20",
            "Status": "Due",
            "Subscription": "Premier",
            "ContactName": "220 Alter",
            "ContactEmail": "220.Alter@xyz.ca",
            "ContactNumber": "+14168552220",
            "Sensors": "10",
            "Amount": "33000",
          },
          {
            "Name": "Boston Pizza Beaumont",
            "RenewalDate": "2018-01-20",
            "Status": "Renewed",
            "Subscription": "Premier",
            "ContactName": "217 Alter",
            "ContactEmail": "217.Alter@xyz.ca",
            "ContactNumber": "+14168552217",
            "Sensors": "17",
            "Amount": "28000",
          },
          {
            "Name": "Boston Pizza Albany",
            "RenewalDate": "2018-01-20",
            "Status": "Renewed",
            "Subscription": "Premier",
            "ContactName": "218 Alter",
            "ContactEmail": "218.Alter@xyz.ca",
            "ContactNumber": "+14168552218",
            "Sensors": "15",
            "Amount": "51000",
          },
          {
            "Name": "Boston Pizza Namao (183)",
            "RenewalDate": "2018-03-20",
            "Status": "Due",
            "Subscription": "Premier",
            "ContactName": "183 Alter",
            "ContactEmail": "183.Alter@xyz.ca",
            "ContactNumber": "+14168552183",
            "Sensors": "17",
            "Amount": "54000",
          },
          {
            "Name": "Boston Pizza Wetaskiwin",
            "RenewalDate": "2019-01-20",
            "Status": "New",
            "Subscription": "Premier",
            "ContactName": "220 Alter",
            "ContactEmail": "220.Alter@xyz.ca",
            "ContactNumber": "+14168552220",
            "Sensors": "8",
            "Amount": "33000",
          },
           {
            "Name": "Boston Pizza Regent",
            "RenewalDate": "2019-01-20",
            "Status": "New",
            "Subscription": "Premier",
            "ContactName": "221 Alter",
            "ContactEmail": "221.Alter@xyz.ca",
            "ContactNumber": "+14168552221",
            "Sensors": "8",
            "Amount": "43000",
          }
        ]
      }
    ]);
  }
}
