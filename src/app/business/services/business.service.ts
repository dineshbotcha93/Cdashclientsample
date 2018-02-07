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
            count: '5',
            status: 'Overdue',
            title: 'Overdue',
            amount: '177000'
          },
          {
            count: '4',
            status: 'Due',
            title: 'Due',
            amount: '135000'
          },
          {
            count: '4',
            status: 'Renewed',
            title: 'Renewed',
            amount: '207000'
          },
          {
            count: '2',
            status: 'New',
            title: 'New',
            amount: '0'
          }
        ],
        "Customers": [
          {
            "Id": "l001",
           "Title": "Boston Pizza 203",
           "Address": "1502 8th Street   Saskatoon  Saskatchewan S7S 1P4 Canada",
           "Latitude": "52.150813",
           "Longitude": "-106.567821",
            "ExpiryDate": "2017-12-31",
            "Amount": "33000",
            "Status": "Overdue",
            "Subscription": "Premier",
            "ContactName": "Paul Alter",
            "ContactEmail": "Paul.Alter@xyz.ca",
            "ContactNumber": "+14168552735",
            "NumberOfSensors": "10",
            "NumberOfGateways": "1",
          },
          {
            "Id": "l002",
            "Title": "Boston Pizza 207",
            "Address": "226 Broadway Street E  Yorkton Saskatchewan S3N 4C3 Canada",
            "Latitude": "51.209425",
            "Longitude": "-102.449612",
            "ExpiryDate": "2017-12-31",
            "Amount": "27000",
            "Status": "Overdue",
            "Subscription": "Premier",
            "ContactName": "207 Alter",
            "ContactEmail": "207.Alter@xyz.ca",
            "ContactNumber": "+14168552207",
            "NumberOfSensors": "8",
            "NumberOfGateways": "1",
            
          },
          {
            "Id": "l003",
            "Title": "Boston Pizza 208",
            "Address": "3250 2nd Avenue West  Prince Albert Saskatchewan S6V 5E9 Canada",
            "Latitude": "53.183366",
            "Longitude": "-105.759101",
            "ExpiryDate": "2017-12-30",
            "Amount": "39000",
            "Status": "Overdue",
            "Subscription": "Premier",
            "ContactName": "208 Alter",
            "ContactEmail": "208.Alter@xyz.ca",
            "ContactNumber": "+14168552208",
            "NumberOfSensors": "12",
            "NumberOfGateways": "1",
            
          },
          {
            "Id": "l004",
            "Title": "Boston Pizza 211",
            "Address": "11434 Railway Ave  North Battleford Saskatchewan S9A 3G8 Canada",
            "Latitude": "52.759558",
            "Longitude": "-108.273011",
            "ExpiryDate": "2017-12-30",
            "Amount": "39000",
            "Status": "Overdue",
            "Subscription": "Premier",
            "ContactName": "211 Alter",
            "ContactEmail": "211.Alter@xyz.ca",
            "ContactNumber": "+14168552211",
            "NumberOfSensors": "12",
            "NumberOfGateways": "1",
            
          },
          {
            "Id": "l005",
            "Title": "Boston Pizza 213",
            "Address": "2331 Quill Centre Humboldt Saskatchewan S0K 2A0 Canada",
            "Latitude": "52.200497",
            "Longitude": "-105.149627",
            "ExpiryDate": "2017-12-30",
            "Amount": "39000",
            "Status": "Overdue",
            "Subscription": "Premier",
            "ContactName": "213 Alter",
            "ContactEmail": "213.Alter@xyz.ca",
            "ContactNumber": "+14168552213",
            "NumberOfSensors": "12",
            "NumberOfGateways": "1",
            
          },
          {
            "Id": "l006",
            "Title": "Boston Pizza 214",
            "Address": "515 Nelson Road  Saskatoon Saskatchewan S7S 1P4 Canada",
            "Latitude": "52.150395",
            "Longitude": "-106.567853",
            "ExpiryDate": "2018-01-30",
            "Amount": "42000",
            "Status": "Renewed",
            "Subscription": "Premier",
            "ContactName": "214 Alter",
            "ContactEmail": "214.Alter@xyz.ca",
            "ContactNumber": "+14168552214",
            "NumberOfSensors": "13",
            "NumberOfGateways": "1"
          },
          {
            "Id": "l007",
            "Title": "Boston Pizza 215",
            "Address": "329 Herold Road  Saskatoon  Saskatchewan S7V 1H9 Canada",
            "Latitude": "52.098713",
            "Longitude": "-106.567082",
            "ExpiryDate": "2018-01-30",
            "Amount": "60000",
            "Status": "Renewed",
            "Subscription": "Premier",
            "ContactName": "215 Alter",
            "ContactEmail": "215.Alter@xyz.ca",
            "ContactNumber": "+14168552215",
            "NumberOfSensors": "19",
            "NumberOfGateways": "1"
          },
          {
            "Id": "l008",
            "Title": "Boston Pizza 216",
            "Address": "35 Riverview Drive  Weyburn Saskatchewan S4H 3B4 Canada",
            "Latitude": "49.659554",
            "Longitude": "-103.856885",
            "ExpiryDate": "2018-02-20",
            "Amount": "33000",
            "Status": "Due",
            "Subscription": "Premier",
            "ContactName": "216 Alter",
            "ContactEmail": "216.Alter@xyz.ca",
            "ContactNumber": "+14168552216",
            "NumberOfSensors": "10",
            "NumberOfGateways": "1"
          },
          {
            "Id": "l009",
            "Title": "Boston Pizza 218",
            "Address": "111 Manitoba Street East  Moose Jaw  Saskatchewan S6H 0A1 Canada",
            "Latitude": "50.389363",
            "Longitude": "-105.531384",
            "ExpiryDate": "2018-02-20",
            "Amount": "15000",
            "Status": "Due",
            "Subscription": "Premier",
            "ContactName": "218 Alter",
            "ContactEmail": "218.Alter@xyz.ca",
            "ContactNumber": "+14168552218",
            "NumberOfSensors": "4",
            "NumberOfGateways": "1"
          },
          {
            "Id": "l010",
            "Title": "Boston Pizza 220  Blairmore",
            "Address": "107 Betts Avenue   Saskatoon  Saskatchewan  S7L 1M2  Canada",
            "Latitude": "52.128460",
            "Longitude": "-106.760206",
            "ExpiryDate": "2018-03-05",
            "Amount": "33000",
            "Status": "Due",
            "Subscription": "Premier",
            "ContactName": "220 Alter",
            "ContactEmail": "220.Alter@xyz.ca",
            "ContactNumber": "+14168552220",
            "NumberOfSensors": "10",
            "NumberOfGateways": "1"
          },
          {
            "Id": "l011",
            "Title": "Boston Pizza Beaumont",
            "Address": "6210 50th Street  Beaumont Alberta T4X0B6 Canada",
            "Latitude": "53.362812",
            "Longitude": "-113.417260",
            "ExpiryDate": "2018-01-20",
            "Amount": "54000",
            "Status": "Renewed",
            "Subscription": "Premier",
            "ContactName": "217 Alter",
            "ContactEmail": "217.Alter@xyz.ca",
            "ContactNumber": "+14168552217",
            "NumberOfSensors": "17",
            "NumberOfGateways": "1"
          },
          {
            "Id": "l012",
            "Title": "Boston Pizza Albany",
            "Address": "12788 167 AVE NW  Edmonton Alberta T6V 1J6 Canada",
            "Latitude": "53.629673",
            "Longitude": "-113.544247",
            "ExpiryDate": "2018-01-20",
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
            "Id": "l013",
            "Title": "Boston Pizza Namao (183)",
            "Address": "16521 97th Street  Edmonton Alberta T5X 6A9 Canada",
            "Latitude": "53.627364",
            "Longitude": "-113.491104",
            "ExpiryDate": "2018-03-20",
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
            "Id": "l014",
            "Title": "Boston Pizza Wetaskiwin",
            "Address": "5527 49 Avenue  Wetaskiwin AB T9A0R5 Canada",
            "Latitude": "52.969906",
            "Longitude": "-113.389623",
            "ExpiryDate": "2019-01-20",
            "Amount": "0",
            "Status": "New",
            "Subscription": "Premier",
            "ContactName": "220 Alter",
            "ContactEmail": "220.Alter@xyz.ca",
            "ContactNumber": "+14168552220",
            "NumberOfSensors": "8",
            "NumberOfGateways": "1"
          },
          {
            "Id": "l015",
            "Title": "Boston Pizza Regent",
            "Address": "1615 Regent Ave W.  Winnipeg Manitoba R2C5C6 Canada",
            "Latitude": "49.900865",
            "Longitude": "-97.069143",
            "ExpiryDate": "2019-01-20",
            "Amount": "0",
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
