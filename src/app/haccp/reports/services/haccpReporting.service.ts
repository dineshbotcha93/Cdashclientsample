import { RequesterService } from '../../../shared/services/requester.service';
import { Injectable } from '@angular/core';
import { SERVICE_CONSTANTS } from '../../../shared/constants/service.constants';
import * as moment from 'moment/moment';


@Injectable()
export class HaccpReportingService {
  constructor(private requesterService: RequesterService) {

  }

  getReportsPdfData( fromDate = null, toDate = null, userId, LocationId, TimeZone) {
    if (fromDate == null) {
      fromDate = moment().format('MM/DD/YYYY');
    }
    if (toDate == null) {
      toDate = moment().subtract(1, 'days').format('MM/DD/YYYY');
    }


    return this.requesterService
      .getExternalRequest('/api/HACCp/Report/DailySummary?'+ 'StartDate=' + fromDate + '&EndDate=' + toDate + '&UserId=' + userId + '&LocationId=' + LocationId + '&TimeZone=' + TimeZone);
  }

  getCheckListReportsPdfData(fromDate = null, toDate = null, userId, LocationId, TimeZone, groupBy) {
    if (fromDate == null) {
      fromDate = moment().format('MM/DD/YYYY');
    }
    if (toDate == null) {
      toDate = moment().subtract(1, 'days').format('MM/DD/YYYY');
    }


    return this.requesterService
      .getExternalRequest('/api/HACCp/Report/Checklists?'+ 'StartDate=' + fromDate + '&EndDate=' + toDate + '&UserId=' + userId + '&LocationId=' + LocationId + '&TimeZone=' + TimeZone + '&GroupBy=' + groupBy);
  }

  getTemperatureReportsPdfData(fromDate = null, toDate = null, userId, LocationId, TimeZone, groupBy) {
    if (fromDate == null) {
      fromDate = moment().format('MM/DD/YYYY');
    }
    if (toDate == null) {
      toDate = moment().subtract(1, 'days').format('MM/DD/YYYY');
    }


    return this.requesterService
      .getExternalRequest('/api/HACCp/Report/Checklists?'+ 'StartDate=' + fromDate + '&EndDate=' + toDate + '&UserId=' + userId + '&LocationId=' + LocationId + '&TimeZone=' + TimeZone + '&GroupBy=' + groupBy);
  }
}
