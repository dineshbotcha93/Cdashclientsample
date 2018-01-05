import { Injectable } from '@angular/core';
import { RequesterService } from '../../shared/services/requester.service';
import { SERVICE_CONSTANTS } from '../../shared/constants/service.constants';

@Injectable()
export class DashboardService {
  data:String[] = [];
  constructor(private requesterService:RequesterService) {

  }
  getData(){
    return [
      {
        count:'5',
        status:'Alerts'
      },
      {
        count:'3',
        status:'MissedCommunication'
      },
      {
        count:'1',
        status:'LowSignal'
      },
      {
        count:'7',
        status:'LowBattery'
      }
    ];
  }

}
