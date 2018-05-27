import { Injectable } from '@angular/core';
import { RequesterService } from '../../shared/services/requester.service';


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

  sendStripeToken(paymentInfo) {
    return this.requesterService.postExternalRequest('/api/Payment', paymentInfo);
  }
}
