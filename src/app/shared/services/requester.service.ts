import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { SERVICE_CONSTANTS } from '../../shared/constants/service.constants';
import 'rxjs/operator/map';
import 'rxjs/operator/catch';
import { MockBackendService } from '../../../mocks/mock.backend.service';
import { environment } from '../../../environments/environment';
import { SERVER_URLS } from '../../shared/constants/serverUrl.constants';

@Injectable()
export class RequesterService {
  data:String[] = [];
  constructor(private http:Http,private mockBackendService:MockBackendService) {
    if(!environment.production){
      this.mockBackendService.start();
    }
  }
  get(path:string):Promise<any>{
    return this.http.get(window.location.origin+path)
    .map(e=>e.json())
    .catch(e=>{
      console.log(e);
      return e;
    })
    .toPromise();
  }

  getGoogleRequest(url:string):Promise<any>{
      return this.http.get(SERVER_URLS.GOOGLE_API_URL+url).map(e=>e.json())
      .catch(e=>{
        console.log(e);
        return e;
      })
      .toPromise();
  }

  getExternalRequest(url:string):Promise<any>{
    console.log(SERVER_URLS.EXTERNAL_SERVER_URL+url);
      return this.http.get(SERVER_URLS.EXTERNAL_SERVER_URL+url).map(e=>e.json())
      .catch(e=>{
        console.log(e);
        return e;
      })
      .toPromise();
  }

  postExternalRequest(url:string,body:object):Promise<any>{
    return this.http.post(SERVER_URLS.EXTERNAL_SERVER_URL+url,body).map(e=>e.json())
    .catch(e=>{
      console.log(e);
      return e;
    })
    .toPromise();
  }
}
