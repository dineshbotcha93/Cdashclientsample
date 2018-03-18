import { Injectable } from '@angular/core';
import { RequesterService } from '../../../shared/services/requester.service';
import { SERVICE_CONSTANTS } from '../../../shared/constants/service.constants';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

@Injectable()
export class NetworkSetupService {

  constructor(private requesterService:RequesterService) {}

  getNetworkList(){
    return this.requesterService
      .getExternalRequest('/api/Location/UserLocations');
  }

  createNetwork(postData){
    return this.requesterService
      .postExternalRequest('api/Network', postData);
  }
}

