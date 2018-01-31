import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { SERVICE_CONSTANTS } from '../../shared/constants/service.constants';
import 'rxjs/operator/map';
import 'rxjs/operator/catch';
import { MockBackendService } from '../../../mocks/mock.backend.service';
import { environment } from '../../../environments/environment';

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
}
