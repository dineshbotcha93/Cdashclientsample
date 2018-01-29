import { Injectable } from '@angular/core';
import { RequesterService } from '../../shared/services/requester.service';
import { SERVICE_CONSTANTS } from '../../shared/constants/service.constants';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
@Injectable()
export class BusinessService {
  data: String[] = [];
  constructor(private requesterService: RequesterService) {
  }
  getData(): Observable<any> {
    return Observable.of([
      {
        count: '3',
        status: 'Defaulters',
        title: 'Defaulters'
      },
      {
        count: '10',
        status: 'DueCustomers',
        title: 'Due Customers'
      },
      {
        count: '15',
        status: 'RenewedCustomers',
        title: 'Renewed Customers'
      },
      {
        count: '3',
        status: 'NewCustomers',
        title: 'New Customers'
      }
    ]);
  }
}
