import { RequesterService } from '../../../shared/services/requester.service';
import { Injectable } from '@angular/core';
import { SERVICE_CONSTANTS } from '../../../shared/constants/service.constants';

@Injectable()
export class SensorDetailsService {
  constructor(private requesterService:RequesterService) {

  }
  getData(location){
    switch(location){
      case 'I11':
      return this.requesterService.get(SERVICE_CONSTANTS.GET_SENSOR_DETAIL.live);
      case 'I12':
      return this.requesterService.get(SERVICE_CONSTANTS.GET_SENSOR_DETAIL_TWO.live);
      case 'I13':
      return this.requesterService.get(SERVICE_CONSTANTS.GET_SENSOR_DETAIL_THREE.live);
      case 'I14':
      return this.requesterService.get(SERVICE_CONSTANTS.GET_SENSOR_DETAIL_FOUR.live);
      default:
      break;
    }
  }
}
