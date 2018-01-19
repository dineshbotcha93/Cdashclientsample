import { RequesterService } from '../../../shared/services/requester.service';
import { Injectable } from '@angular/core';
import { SERVICE_CONSTANTS } from '../../../shared/constants/service.constants';

@Injectable()
export class SensorDetailsService {
  constructor(private requesterService:RequesterService) {

  }
  getData(location){
    switch(location){
      case '1156073157':
      return this.requesterService.get(SERVICE_CONSTANTS.GET_SENSOR_DETAIL.live);
      case '1156073158':
      return this.requesterService.get(SERVICE_CONSTANTS.GET_SENSOR_DETAIL_TWO.live);
      case '1156073159':
      return this.requesterService.get(SERVICE_CONSTANTS.GET_SENSOR_DETAIL_THREE.live);
      case '1156073160':
      return this.requesterService.get(SERVICE_CONSTANTS.GET_SENSOR_DETAIL_FOUR.live);
      default:
      break;
    }
  }
}
