import { Injectable } from '@angular/core';
import { RequesterService } from '../../shared/services/requester.service';
import { SERVICE_CONSTANTS } from '../../shared/constants/service.constants';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

@Injectable()
export class DashboardService {
  data:String[] = [];
  constructor(private requesterService:RequesterService) {

  }
  getData():Observable<any>{
    return Observable.of([
      {
        count:'5',
        status:'Alerts',
        title:'Alerts'
      },
      {
        count:'3',
        status:'MissedCommunication',
        title:'Offline'
      },
      {
        count:'1',
        status:'LowSignal',
        title:'Low Signal'
      },
      {
        count:'7',
        status:'LowBattery',
        title:'Low Battery'
      }
    ]);
  }
    getHaccpData():Observable<any>{
      return Observable.of([
        {
          count:'70',         
          title:'Tasks Completed'
        },
        {
          count:'50',
          title:'Not In Compliance'
        },
        {
          count:'40',
          title:'Active Handheld Devices'
        },
        {
          count:'50',
          title:'Food Safety score'
        }
      ]);
  }
  getRealData(){
    return this.requesterService
    .getExternalRequest('/api/Location/UserLocations');
  }
}
