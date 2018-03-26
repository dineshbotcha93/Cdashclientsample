import { Injectable } from "@angular/core";
import { RequesterService } from "../../../shared/services/requester.service";

@Injectable()
export class CreateDeviceService {
  constructor(private requesterService: RequesterService){

  }

  createGateway(postData){
    return this.requesterService
    .postExternalRequest('/api/Gateway', postData);
  }

  createSensor(postData){
    return this.requesterService
    .postExternalRequest('/api/Sensor', postData);
  }
}
