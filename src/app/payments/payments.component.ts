import {Component, OnInit, AfterViewInit, Input, ViewChild} from '@angular/core';
import { PaymentsService } from './services/payments.service';
import {Router} from '@angular/router';
import { CustomerDetailsService } from '../business/customer-details/services/customer-details.service';
import { StripeService } from './stripe/services/stripe.service';
import { StripeComponent } from './stripe/stripe.component';
import { PaymentSummaryComponent } from './payments-summary/payment-summary.component';

@Component({
  selector: 'app-payments',
  providers: [PaymentsService, CustomerDetailsService, StripeService],
  styleUrls: ['./payments.component.scss'],
  templateUrl: './payments.component.html'
})

export class PaymentsComponent {
  paymentData: Object;
  customerData: Object = null;
  acknowledgement = true;
  transactionId: String = null;
  paymentDataError: Error = null;
  showConfirmation = false;
  renewalError = false;
  newRenewalDate: string = null;
  loading = false;

  @ViewChild('stripe')
  stripe: StripeComponent;

  @ViewChild('paymentModal')
  paymentModal: PaymentSummaryComponent;

  constructor(private customerDetailsService: CustomerDetailsService, private paymentsService: PaymentsService, private stripeService: StripeService, private router: Router) {
    paymentsService.getPaymentData()
      .then(function(data) {
        this.paymentData = data;
        this.transactionId = data.id;
        this.paymentData.transactionInfo.amount = (data.transactionInfo.subscriptionAmount / 100).toFixed(2);
        this.paymentData.transactionInfo.tax = (data.transactionInfo.taxAmount / 100).toFixed(2);
        this.paymentData.transactionInfo.total = (data.transactionInfo.totalAmount / 100).toFixed(2);
      }.bind(this))
      .catch(error => this.paymentDataError = error);
  }

  confirmPayment() {
    // Fetch Token From Stripe
    this.stripe.getToken().then(function(tokenData) {
      // Use the fetched token to confirm payment using Payments API
      this.paymentsService.sendStripeToken({
        stripeToken: tokenData.token.id,
        transactionId: this.transactionId
      }).then(function(data){
        this.newRenewalDate = data.transaction.transactionInfo.newRenewalDate;
        this.showConfirmation = true;
      }.bind(this));
    }.bind(this))
      .catch(function() {
        this.renewalError = true;
      });
  }

  goBack() {
    this.router.navigate(['user-profile']);

  }

}
