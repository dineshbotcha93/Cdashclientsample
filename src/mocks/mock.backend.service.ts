import {Injectable} from "@angular/core";
import {MockBackend, MockConnection} from "@angular/http/testing";
import { SERVICE_CONSTANTS } from '../app/shared/constants/service.constants';
import { SERVER_URLS } from '../app/shared/constants/serverUrl.constants';
import { RequestMethod } from '@angular/http';
import {
  ResponseOptions,
  RequestOptions,
  Response,
  Http,
  BaseRequestOptions,
  XHRBackend,
  Headers
 } from "@angular/http";
import { Router } from '@angular/router';
import { AlertSandbox } from '../app/shared/components/alerts/alerts.sandbox';


@Injectable()
export class MockBackendService {
  constructor(
    private backend: MockBackend,
    private http: Http,
    private options: BaseRequestOptions,
    private realBackend: XHRBackend,
    private router: Router,
    private alertSandbox: AlertSandbox
  ) {}

  start(): void {
    this.backend.connections.subscribe((c: MockConnection) => {
      let URL;
      let body;
      let datas = c.request.url.split('/');
      let finalizedPath = '';
      for(var i = 3;i<datas.length;i++){
        finalizedPath+= '/'+datas[i];
      }
      let baseOrigin = window.location.origin;
      switch (finalizedPath){
        case SERVICE_CONSTANTS.GET_HEROES_LIST.path:
        URL = baseOrigin+SERVICE_CONSTANTS.GET_HEROES_LIST.path;
        body = SERVICE_CONSTANTS.GET_HEROES_LIST.mock;
      break;
        case SERVICE_CONSTANTS.GET_AUTH_USERS.path:
        URL = baseOrigin+SERVICE_CONSTANTS.GET_AUTH_USERS.path;
        body = SERVICE_CONSTANTS.GET_AUTH_USERS.mock;
      break;
        case SERVICE_CONSTANTS.GET_LOCATION_ONE.path:
        URL = baseOrigin+SERVICE_CONSTANTS.GET_LOCATION_ONE.path;
        body = SERVICE_CONSTANTS.GET_LOCATION_ONE.mock;
      break;
        case SERVICE_CONSTANTS.GET_LOCATION_TWO.path:
        URL = baseOrigin+SERVICE_CONSTANTS.GET_LOCATION_TWO.path;
        body = SERVICE_CONSTANTS.GET_LOCATION_TWO.mock;
      break;
        case SERVICE_CONSTANTS.GET_LOCATION_THREE.path:
        URL = baseOrigin+SERVICE_CONSTANTS.GET_LOCATION_THREE.path;
        body = SERVICE_CONSTANTS.GET_LOCATION_THREE.mock;
      break;
        case SERVICE_CONSTANTS.GET_LOCATION_FOUR.path:
        URL = baseOrigin+SERVICE_CONSTANTS.GET_LOCATION_FOUR.path;
        body = SERVICE_CONSTANTS.GET_LOCATION_FOUR.mock;
      break;
        case SERVICE_CONSTANTS.GET_LOCATION_FIVE.path:
        URL = baseOrigin+SERVICE_CONSTANTS.GET_LOCATION_FIVE.path;
        body = SERVICE_CONSTANTS.GET_LOCATION_FIVE.mock;
      break;
        case SERVICE_CONSTANTS.GET_LOCATION_SIX.path:
        URL = baseOrigin+SERVICE_CONSTANTS.GET_LOCATION_SIX.path;
        body = SERVICE_CONSTANTS.GET_LOCATION_SIX.mock;
      break;
        case SERVICE_CONSTANTS.GET_LOCATION_SEVEN.path:
        URL = baseOrigin+SERVICE_CONSTANTS.GET_LOCATION_SEVEN.path;
        body = SERVICE_CONSTANTS.GET_LOCATION_SEVEN.mock;
      break;
        case SERVICE_CONSTANTS.GET_LOCATION_EIGHT.path:
        URL = baseOrigin+SERVICE_CONSTANTS.GET_LOCATION_EIGHT.path;
        body = SERVICE_CONSTANTS.GET_LOCATION_EIGHT.mock;
      break;
        case SERVICE_CONSTANTS.GET_LOCATION_NINE.path:
        URL = baseOrigin+SERVICE_CONSTANTS.GET_LOCATION_NINE.path;
        body = SERVICE_CONSTANTS.GET_LOCATION_NINE.mock;
      break;
        case SERVICE_CONSTANTS.GET_LOCATION_TEN.path:
        URL = baseOrigin+SERVICE_CONSTANTS.GET_LOCATION_TEN.path;
        body = SERVICE_CONSTANTS.GET_LOCATION_TEN.mock;
      break;
        case SERVICE_CONSTANTS.GET_LOCATION_ELEVEN.path:
        URL = baseOrigin+SERVICE_CONSTANTS.GET_LOCATION_ELEVEN.path;
        body = SERVICE_CONSTANTS.GET_LOCATION_ELEVEN.mock;
      break;
        case SERVICE_CONSTANTS.GET_LOCATION_TWELVE.path:
        URL = baseOrigin+SERVICE_CONSTANTS.GET_LOCATION_TWELVE.path;
        body = SERVICE_CONSTANTS.GET_LOCATION_TWELVE.mock;
      break;
        case SERVICE_CONSTANTS.GET_LOCATION_THIRTEEN.path:
        URL = baseOrigin+SERVICE_CONSTANTS.GET_LOCATION_THIRTEEN.path;
        body = SERVICE_CONSTANTS.GET_LOCATION_THIRTEEN.mock;
      break;
        case SERVICE_CONSTANTS.GET_LOCATION_FOURTEEN.path:
        URL = baseOrigin+SERVICE_CONSTANTS.GET_LOCATION_FOURTEEN.path;
        body = SERVICE_CONSTANTS.GET_LOCATION_FOURTEEN.mock;
      break;
        case SERVICE_CONSTANTS.GET_LOCATION_FIFTEEN.path:
        URL = baseOrigin+SERVICE_CONSTANTS.GET_LOCATION_FIFTEEN.path;
        body = SERVICE_CONSTANTS.GET_LOCATION_FIFTEEN.mock;
      break;
        case SERVICE_CONSTANTS.GET_LOCATION_SIXTEEN.path:
        URL = baseOrigin+SERVICE_CONSTANTS.GET_LOCATION_SIXTEEN.path;
        body = SERVICE_CONSTANTS.GET_LOCATION_SIXTEEN.mock;
      break;
        case SERVICE_CONSTANTS.GET_SENSOR_DETAIL.path:
        URL = baseOrigin+SERVICE_CONSTANTS.GET_SENSOR_DETAIL.path;
        body = SERVICE_CONSTANTS.GET_SENSOR_DETAIL.mock;
      break;
        case SERVICE_CONSTANTS.GET_SENSOR_DETAIL_ONE.path:
        URL = baseOrigin+SERVICE_CONSTANTS.GET_SENSOR_DETAIL_ONE.path;
        body = SERVICE_CONSTANTS.GET_SENSOR_DETAIL_ONE.mock;
      break;
        case SERVICE_CONSTANTS.GET_SENSOR_DETAIL_TWO.path:
        URL = baseOrigin+SERVICE_CONSTANTS.GET_SENSOR_DETAIL_TWO.path;
        body = SERVICE_CONSTANTS.GET_SENSOR_DETAIL_TWO.mock;
      break;
        case SERVICE_CONSTANTS.GET_SENSOR_DETAIL_THREE.path:
        URL = baseOrigin+SERVICE_CONSTANTS.GET_SENSOR_DETAIL_THREE.path;
        body = SERVICE_CONSTANTS.GET_SENSOR_DETAIL_THREE.mock;
      break;
        case SERVICE_CONSTANTS.GET_SENSOR_DETAIL_FOUR.path:
        URL = baseOrigin+SERVICE_CONSTANTS.GET_SENSOR_DETAIL_FOUR.path;
        body = SERVICE_CONSTANTS.GET_SENSOR_DETAIL_FOUR.mock;
      break;
        default:
        break;
      }
      if (c.request.url === URL && c.request.method === 0) {
        c.mockRespond(new Response(new ResponseOptions({
          body: JSON.stringify(body)
        })));
      } else if(c.request.url.match(/google/g) && c.request.method === RequestMethod.Get){
        this.http = new Http(this.realBackend, this.options);
        this.http.get(c.request.url).subscribe((result)=>{
          c.mockRespond(new Response(new ResponseOptions({
            body: JSON.stringify(result.json())
          })));
        },(error)=>{
          c.mockError(new Error(error));
        });
      } else if(c.request.url.match(new RegExp(SERVER_URLS.EXTERNAL_SERVER_URL,"g")) && c.request.method === RequestMethod.Post){
        let headers = new Headers();
        headers.append('Content-Type','application/json');

        if(!!localStorage.getItem('com.cdashboard.token')){
          headers.append('Authorization','Basic '+localStorage.getItem('com.cdashboard.token'));
        }
        this.http = new Http(this.realBackend, this.options);
        let options = new RequestOptions({ headers: headers });
        this.http.post(c.request.url,c.request.getBody(),options).subscribe((result)=>{
          c.mockRespond(new Response(new ResponseOptions({
            body: JSON.stringify(result.json())
          })));
        },(error)=>{
          if(error.status == 401){
            this.alertSandbox.showAlert({ data: 'Session Expired. Please Re-Login' });
            this.router.navigate(['/login']);
          }
          c.mockError(error.json());
        });
      } else if(c.request.url.match(new RegExp(SERVER_URLS.EXTERNAL_SERVER_URL,"g")) && c.request.method === RequestMethod.Get){
        let headers = new Headers();
        headers.append('Content-Type','application/json');
        if(!!localStorage.getItem('com.cdashboard.token')){
          headers.append('Authorization','Basic '+localStorage.getItem('com.cdashboard.token'));
        }
        this.http = new Http(this.realBackend, this.options);
        let options = new RequestOptions({ headers: headers });
        this.http.get(c.request.url,options).subscribe((response)=>{
          // TEMP FIX for HACCP reports needs to be changed later
          if(!c.request.url.includes('HACCp/Report')) {
            c.mockRespond(new Response(new ResponseOptions({
              body: JSON.stringify(response.json())
            })));
          } else {
            c.mockRespond(new Response(new ResponseOptions({
              body: response
            })));
          }

        },(error)=>{
          if(error.status == 401){
            this.router.navigate(['/login']);
            this.alertSandbox.showAlert({ data: 'Session Expired. Please Re-Login' });
          } else if(error.status == 500){
            this.alertSandbox.showAlert({ data: 'Sorry, a technical error occurred! Please try again later.'});
          }
          c.mockError(error.json());
        });
      } else if(c.request.url.match(new RegExp(SERVER_URLS.EXTERNAL_SERVER_URL,"g")) && c.request.method === RequestMethod.Put){
        let headers = new Headers();
        headers.append('Content-Type','application/json');
        if(!!localStorage.getItem('com.cdashboard.token')){
          headers.append('Authorization','Basic '+localStorage.getItem('com.cdashboard.token'));
        }
        this.http = new Http(this.realBackend, this.options);
        let options = new RequestOptions({ headers: headers });
        this.http.put(c.request.url,c.request.getBody(),options).subscribe((response)=>{
          c.mockRespond(new Response(new ResponseOptions({
            body: JSON.stringify(response.json())
          })));
        },(error)=>{
          if(error.status == 401){
            this.alertSandbox.showAlert({ data: 'Session Expired. Please Re-Login' });
            this.router.navigate(['/login']);
          } else if(error.status == 500){
            this.alertSandbox.showAlert({ data: 'Sorry, a technical error occurred! Please try again later.'});
          }
          c.mockError(error.json());
        });
      } else if(c.request.url.match(new RegExp(SERVER_URLS.EXTERNAL_SERVER_URL,"g")) && c.request.method === RequestMethod.Delete){
        let headers = new Headers();
        headers.append('Content-Type','application/json');
        if(!!localStorage.getItem('com.cdashboard.token')){
          headers.append('Authorization','Basic '+localStorage.getItem('com.cdashboard.token'));
        }
        this.http = new Http(this.realBackend, this.options);
        let options = new RequestOptions({ headers: headers });
        this.http.delete(c.request.url,options).subscribe((response)=>{
          c.mockRespond(new Response(new ResponseOptions({
            body: JSON.stringify(response.json())
          })));
        },(error)=>{
          if(error.status == 401){
            this.alertSandbox.showAlert({ data: 'Session Expired. Please Re-Login' });
            this.router.navigate(['/login']);
          } else if(error.status == 500){
            this.alertSandbox.showAlert({ data: 'Sorry, a technical error occurred! Please try again later.'});
          }
          c.mockError(error.json());
        });
      }
    });
  }
}
