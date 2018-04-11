import { Injectable } from '@angular/core';
import { RequesterService } from '../../../shared/services/requester.service';
import { SERVICE_CONSTANTS } from '../../../shared/constants/service.constants';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

@Injectable()
export class CustomerListService {
  constructor(private requesterService: RequesterService) { }
  getData(): Observable<any> {
    return Observable.of([
      {
        company: 'company',
        subscription: 'Defaulters',
        renewalDate: '10-10-2018',
        primaryContact: '333-444-2345',
        paymentAmount: '$1000',
        status:'Defaulters',
        numberOfSensors: '5',
        numberOfGateways: '3'
      },
      {
        company: 'company',
        subscription: 'Defaulters',
        renewalDate: '10-10-2018',
        primaryContact: '333-444-2345',
        paymentAmount: '$1000',
        status:'New Customers',
        numberOfSensors: '5',
        numberOfGateways: '3'
      },
      {
        company: 'company',
        subscription: 'Defaulters',
        renewalDate: '10-10-2018',
        primaryContact: '333-444-2345',
        paymentAmount: '$1000',
        status:'Renewed Customers',
        numberOfSensors: '5',
        numberOfGateways: '3'
      },
      {
        company: 'company',
        subscription: 'Defaulters',
        renewalDate: '10-10-2018',
        primaryContact: '333-444-2345',
        paymentAmount: '$1000',
        status:'Due customers',
        numberOfSensors: '5',
        numberOfGateways: '3'
      }
    ]);
  }

}
