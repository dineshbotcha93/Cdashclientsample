import { Injectable } from '@angular/core';
import { RequesterService } from '../../shared/services/requester.service';
import {moment} from 'ngx-bootstrap/chronos/test/chain';

@Injectable()
export class NotificationListService {
  constructor(private requesterService: RequesterService) {

  }
  getNotificationList(accountId: string) {
    const fromDate = moment().subtract(1, 'days').format('MM-DD-YYYY');
    const toDate = moment().format('MM-DD-YYYY');
    const url = `/api/Notification/SentToAccount?AccountID=${accountId}&StartIndex=1&Count=500&FromDate=${fromDate}&ToDate=${toDate}`;
    return this.requesterService
      .getExternalRequest(url);
  }
}
