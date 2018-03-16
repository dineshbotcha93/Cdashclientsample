import { Injectable } from '@angular/core';
import { Observable } from "rxjs/Observable";
import "rxjs/add/observable/of";
import * as INDUSTRIES from './jsons/industries.json';
import * as TIME_ZONES from './jsons/timeZones.json';
import { RequesterService } from "../../../shared/services/requester.service";

@Injectable()
export class FillDetailsService{

  constructor(private requesterService: RequesterService) {

  }

  getIndustries():any {
    return Observable.of([INDUSTRIES]);
  }
  getTimeZones(): any {
    return Observable.of([TIME_ZONES]);
  }

  createNewUserAccount(postData) {

    console.log(':::: create new user service :::', postData);
    return this.requesterService
      .postExternalRequest('api/User/RegisterNewUser', postData);

  }

  fetchExistingUserInfo() {
    return this.requesterService.getExternalRequest('/api/User/Info');
  }
}
