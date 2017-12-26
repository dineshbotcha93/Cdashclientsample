import { Injectable } from '@angular/core';
import { RequesterService } from '../../shared/services/requester.service';
import { SERVICE_CONSTANTS } from '../../shared/constants/service.constants';

@Injectable()
export class DashboardService {
  data:String[] = [];
  constructor(private requesterService:RequesterService) {

  }
  getData(){
    return this.requesterService.get(SERVICE_CONSTANTS.GET_HEROES_LIST.live);
  }

}
