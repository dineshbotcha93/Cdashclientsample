import { RequesterService } from '../../../shared/services/requester.service';
import { Injectable } from '@angular/core';
import { SERVICE_CONSTANTS } from '../../../shared/constants/service.constants';
import * as moment from 'moment/moment';


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

  getDataMessages(location,fromDate = null, toDate = null){
    console.log("FROM DATE "+fromDate);
    console.log("TO DATE"+toDate);
    if(fromDate == null){
      fromDate = moment().format('d/m/yyyy');
      console.log(fromDate);
    }
    if(toDate == null){
      toDate = moment().add(5,'days').format('d/m/yyyy');
      console.log(toDate);
    }
    console.log("FROM DATE "+fromDate);
    console.log("TO DATE"+toDate);
    return this.requesterService
    .getExternalRequest('/api/Sensor/DataMessages?SensorID='+location+'&FromDate='+fromDate+'&ToDate='+toDate);
  }

  getDetails(location){
    return this.requesterService
    .getExternalRequest('/api/Sensor/Details/'+location);
  }
}
