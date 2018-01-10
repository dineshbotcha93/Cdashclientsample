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
      return this.requesterService.get(SERVICE_CONSTANTS.GET_LOCATION_ONE.live);
      case 'I002':
      return this.requesterService.get(SERVICE_CONSTANTS.GET_LOCATION_TWO.live);
      case 'I003':
      return this.requesterService.get(SERVICE_CONSTANTS.GET_LOCATION_THREE.live);
      case 'I004':
      return this.requesterService.get(SERVICE_CONSTANTS.GET_LOCATION_FOUR.live);
      case 'I005':
      return this.requesterService.get(SERVICE_CONSTANTS.GET_LOCATION_FIVE.live);
      case 'I006':
      return this.requesterService.get(SERVICE_CONSTANTS.GET_LOCATION_SIX.live);
      case 'I007':
      return this.requesterService.get(SERVICE_CONSTANTS.GET_LOCATION_SEVEN.live);
      case 'I008':
      return this.requesterService.get(SERVICE_CONSTANTS.GET_LOCATION_EIGHT.live);
      case 'I009':
      return this.requesterService.get(SERVICE_CONSTANTS.GET_LOCATION_NINE.live);
      case 'I010':
      return this.requesterService.get(SERVICE_CONSTANTS.GET_LOCATION_TEN.live);
      case 'I011':
      return this.requesterService.get(SERVICE_CONSTANTS.GET_LOCATION_ELEVEN.live);
      case 'I012':
      return this.requesterService.get(SERVICE_CONSTANTS.GET_LOCATION_TWELVE.live);
      case 'I013':
      return this.requesterService.get(SERVICE_CONSTANTS.GET_LOCATION_THIRTEEN.live);
      case 'I014':
      return this.requesterService.get(SERVICE_CONSTANTS.GET_LOCATION_FOURTEEN.live);
      case 'I015':
      return this.requesterService.get(SERVICE_CONSTANTS.GET_LOCATION_FIFTEEN.live);
      case 'I016':
      return this.requesterService.get(SERVICE_CONSTANTS.GET_LOCATION_SIXTEEN.live);
      default:
      break;
    }
  }

}
