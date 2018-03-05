import { Injectable } from '@angular/core';
import { RequesterService } from '../../../shared/services/requester.service';


@Injectable()
export class StripeService {
  data: String[] = [];
  constructor(private requesterService: RequesterService ) {

  }

  sendStripeToken(paymentInfo) {
    return this.requesterService.postExternalRequest('/api/Payment', paymentInfo);
  }
}
