import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/operator/map';
import 'rxjs/operator/catch';
import {MockBackendService} from '../../../mocks/mock.backend.service';
import {ProductionInterceptor} from '../../../production/productionInterceptor';
import {environment} from '../../../environments/environment';
import {SERVER_URLS} from '../../shared/constants/serverUrl.constants';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Router } from '@angular/router';
import { AlertSandbox } from '../../../app/shared/components/alerts/alerts.sandbox';

@Injectable()
export class RequesterService {
  data:String[] = [];
  serverUrls = SERVER_URLS;
  constructor(
    private http:Http,
    private httpClient: HttpClient,
    private mockBackendService:MockBackendService,
    private productionInterceptor: ProductionInterceptor,
    private router: Router,
    private alertSandbox: AlertSandbox
  ) {
    if(!environment.production){
      this.mockBackendService.start();
      this.serverUrls['EXTERNAL_SERVER_URL']  = this.serverUrls.EXTERNAL_SERVER_URL_DEV;
    } else {
      this.productionInterceptor.start();
      this.serverUrls['EXTERNAL_SERVER_URL'] = this.serverUrls.EXTERNAL_SERVER_URL_PROD;
    }
  }
  get(path:string):Promise<any>{
    return this.http.get(window.location.origin+path)
    .map(e=>e.json())
    .catch(error=>{
      console.log('error is ');
      console.log(error);
      if(error.status == 401){
        this.alertSandbox.showAlert({ data: 'Session Expired. Please Re-Login' });
        this.router.navigate(['/login']);
      } else if(error.status == 500){
        this.alertSandbox.showAlert({ data: 'Sorry, a technical error occurred! Please try again later.'});
      }
      return error;
    })
    .toPromise();
  }

  getGoogleRequest(url:string):Promise<any>{
      return this.http.get(SERVER_URLS.GOOGLE_API_URL+url).map(e=>e.json())
      .catch(e=>{
        return e;
      })
      .toPromise();
  }

  getExternalRequest(url:string):Promise<any>{
      return this.http.get(this.serverUrls['EXTERNAL_SERVER_URL']+url).map(e=>e.json())
      .catch((error)=>{
        if(error.status == 401){
          this.alertSandbox.showAlert({ data: 'Session Expired. Please Re-Login' });
          this.router.navigate(['/login']);
        } else if(error.status == 500){
          this.alertSandbox.showAlert({ data: 'Sorry, a technical error occurred! Please try again later.'});
        }
        throw error;
      })
      .toPromise();
  }

  postExternalRequest(url:string,body:object):Promise<any>{
    return this.http.post(this.serverUrls['EXTERNAL_SERVER_URL']+url,body).map(e=>e.json())
    .catch(error=>{
      if(error.status == 401){
        this.alertSandbox.showAlert({ data: 'Session Expired. Please Re-Login' });
        this.router.navigate(['/login']);
      } else if(error.status == 500){
        this.alertSandbox.showAlert({ data: 'Sorry, a technical error occurred! Please try again later.'});
      }
      throw error;
    })
    .toPromise();
  }

  postExternalRequestWithHeaders(url: string, body: object, headers: HttpHeaders): Promise<any> {

    const requestOptions = {
      headers: headers
    };

    return this.httpClient.post(this.serverUrls['EXTERNAL_SERVER_URL'] + url, body, requestOptions).toPromise();
  }

  putExternalRequest(url:string,body:object):Promise<any>{
    return this.http.put(this.serverUrls['EXTERNAL_SERVER_URL']+url,body).map(e=>e.json())
    .catch(error=>{
      if(error.status == 401){
        this.alertSandbox.showAlert({ data: 'Session Expired. Please Re-Login' });
        this.router.navigate(['/login']);
      } else if(error.status == 500){
        this.alertSandbox.showAlert({ data: 'Sorry, a technical error occurred! Please try again later.'});
      }
      throw error;
    })
    .toPromise();
  }

  deleteExternalRequest(url:string):Promise<any>{
    return this.http.delete(this.serverUrls['EXTERNAL_SERVER_URL']+url).map(e=>e.json())
    .catch(error=>{
      if(error.status == 401){
        this.alertSandbox.showAlert({ data: 'Session Expired. Please Re-Login' });
        this.router.navigate(['/login']);
      } else if(error.status == 500){
        this.alertSandbox.showAlert({ data: 'Sorry, a technical error occurred! Please try again later.'});
      }
      throw error;
    })
    .toPromise();
  }
}
