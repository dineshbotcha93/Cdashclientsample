import { Injectable } from '@angular/core';
import { RequesterService } from '../../shared/services/requester.service';
import {HttpHeaders} from '@angular/common/http';


@Injectable()
export class PaymentsService {
  data: String[] = [];
  constructor(private requesterService: RequesterService ) {

  }

  getPaymentData() {
    return this.requesterService
    .getExternalRequest('/api/Payment/Details?ProductName=NotifEye');
  }

  getAnonymousPaymentData(invoiceId) {
    return this.requesterService
      .getExternalRequest(`/api/Payment/InvoiceDetails?InvoiceID=${invoiceId}`);
  }

  submitAnonymousPayment(paymentInfo) {
    return this.requesterService
      .postExternalRequest('/api/Payment', paymentInfo);
  }

  sendStripeToken(paymentInfo, token) {
    if (!token) {
      return this.requesterService.postExternalRequest('/api/Payment', paymentInfo);
    } else {
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + token
      });
      return this.requesterService.postExternalRequestWithHeaders('/api/Payment', paymentInfo, headers);
    }
  }
}
