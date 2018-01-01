import { RequesterService } from '../../shared/services/requester.service';
import { Injectable } from '@angular/core';
import { SERVICE_CONSTANTS } from '../../shared/constants/service.constants';

@Injectable()
export class SensorDetailsService {
  data:String[] = [];
  constructor(private requesterService:RequesterService) {

  }
  getData(location){
    switch(location){
      case 'I001':
      console.log('here');
      return this.requesterService.get(SERVICE_CONSTANTS.GET_LOCATION_ONE.live);
      case 'I002':
      console.log('here');
      return this.requesterService.get(SERVICE_CONSTANTS.GET_LOCATION_TWO.live);
      case 'I003':
      console.log('here');
      return this.requesterService.get(SERVICE_CONSTANTS.GET_LOCATION_THREE.live);
      case 'I004':
      console.log('here');
      return this.requesterService.get(SERVICE_CONSTANTS.GET_LOCATION_FOUR.live);
      default:
      break;
    }
  }

}
