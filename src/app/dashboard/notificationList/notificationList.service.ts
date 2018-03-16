import { Injectable } from '@angular/core';
import { RequesterService } from '../../shared/services/requester.service';

@Injectable()
export class NotificationListService {
  constructor(private requesterService: RequesterService){

  }
  getNotificationList(){
    return this.requesterService.getExternalRequest('/api/Notification/SentToAccount?AccountID=194&StartIndex=1&Count=100&FromDate=3-12-2018&ToDate=3-14-2018');
  }
}
