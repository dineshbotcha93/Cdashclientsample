import { Component, OnInit, AfterViewInit } from '@angular/core';
import { PaymentsService } from './services/payments.service';
import {Router} from '@angular/router';
import { CustomerDetailsService } from '../business/customer-details/services/customer-details.service';
const stripe = Stripe('pk_test_rh7KqKZ2eaklfF1FO2WWURYX');

@Component({
  selector: 'app-payments',
  providers: [PaymentsService, CustomerDetailsService],
  styleUrls: ['./payments.component.scss'],
  templateUrl: './payments.component.html'
})

export class PaymentsComponent implements OnInit {
  paymentData: Object;
  customerData: Object = null;
  acknowledgement = false;
  transactionId: String = null;

  constructor(private customerDetailsService: CustomerDetailsService, private paymentsService: PaymentsService, private router: Router) {
    paymentsService.getPaymentData().then(function(data) {
      this.paymentData = data;
      this.transactionId = data.id;
      this.paymentData.transactionInfo.amount = (data.transactionInfo.amount / 100).toFixed(2);
      this.paymentData.transactionInfo.tax = (data.transactionInfo.tax / 100).toFixed(2);
    }.bind(this));
  }

  ngOnInit()	{
// Create an instance of Elements.
    const elements = stripe.elements();
    this.getCustomerData();
  }

  private getCustomerData() {
    this.customerDetailsService.getRealData('user2').then((result) => {
      this.customerData = result.customer;
    });
  }

  routeToStripe() {
    this.router.navigate(['payments/confirm/' + this.transactionId]);
  }

  goBack() {
    this.router.navigate(['user-profile']);

  }

}
