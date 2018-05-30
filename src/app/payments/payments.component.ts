import {Component, OnInit, AfterViewInit, Input, ViewChild} from '@angular/core';
import { PaymentsService } from './services/payments.service';
import {Router} from '@angular/router';
import {ActivatedRoute} from '@angular/router';
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
  transactionId: String = null;
  paymentDataError: Error = null;
  anonymousPayment = false;
  showConfirmation = false;
  renewalError = false;
  newRenewalDate: string = null;
  loading = false;
  invoiceId: String = null;

  @ViewChild('stripe')
  stripe: StripeComponent;

  @ViewChild('paymentModal')
  paymentModal: PaymentSummaryComponent;

  constructor(private customerDetailsService: CustomerDetailsService, private paymentsService: PaymentsService,
              private stripeService: StripeService, private router: Router, private activatedRoute: ActivatedRoute) {
    this.invoiceId = activatedRoute.snapshot.queryParams['invoiceId'];

    if (!this.invoiceId) {
      paymentsService.getPaymentData()
        .then(function(data) {
          this.paymentData = data;
          this.transactionId = data.id;
          this.paymentData.transactionInfo.amount = (data.transactionInfo.subscriptionAmount / 100).toFixed(2);
          this.paymentData.transactionInfo.tax = (data.transactionInfo.taxAmount / 100).toFixed(2);
          this.paymentData.transactionInfo.discount = (data.transactionInfo.discount / 100).toFixed(2);
          this.paymentData.transactionInfo.total = (data.transactionInfo.totalAmount / 100).toFixed(2);
        }.bind(this))
        .catch(error => this.paymentDataError = error);
    } else {
      this.anonymousPayment = true;
      paymentsService.getAnonymousPaymentData(this.invoiceId)
        .then(function(data) {
          this.paymentData = data;
          this.transactionId = data.id;
          this.paymentData.transactionInfo.amount = (data.transactionInfo.subscriptionAmount / 100).toFixed(2);
          this.paymentData.transactionInfo.tax = (data.transactionInfo.taxAmount / 100).toFixed(2);
          this.paymentData.transactionInfo.discount = (data.transactionInfo.discount / 100).toFixed(2);
          this.paymentData.transactionInfo.total = (data.transactionInfo.totalAmount / 100).toFixed(2);
        }.bind(this))
        .catch(error => this.paymentDataError = error);
    }
  }

  confirmPayment() {
    if (this.stripe.isValidCard) {
      this.loading = true;
      this.showConfirmation = true;
      // Fetch Token From Stripe
      this.stripe.getToken().then(function(tokenData) {
        // Use the fetched token to confirm payment using Payments API
        const paymentInfo = {
          stripeToken: tokenData.token.id,
          transactionId: this.transactionId
        };
        let token = null;

        if (this.invoiceId) {
          paymentInfo.transactionId = this.paymentData.id;
          token = this.paymentData.paymentToken;
        }

        this.paymentsService.sendStripeToken(paymentInfo, token).then(function(data){
          this.newRenewalDate = data.transaction.transactionInfo.newRenewalDate;
          this.loading = false;
        }.bind(this))
        .catch(function() {
          this.renewalError = true;
          this.loading = false;
        }.bind(this));
      }.bind(this))
        .catch(function() {
          this.renewalError = true;
          this.loading = false;
        }.bind(this));
    }
  }

  resetConfirmation() {
    this.renewalError = false;
    this.loading = false;
    this.showConfirmation = false;
    this.newRenewalDate = null;
    this.paymentDataError = null;
  }

  goBack() {
    this.router.navigate(['user-profile']);

  }

}
