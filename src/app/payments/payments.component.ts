import { Component, OnInit, AfterViewInit } from '@angular/core';
import { PaymentsService } from './services/payments.service';
import { StripeComponent } from './stripe/stripe.component';
import {Router} from '@angular/router';
import { CustomerDetailsService } from '../business/customer-details/services/customer-details.service';

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
  paymentDataError: String = null;


  constructor(private customerDetailsService: CustomerDetailsService, private paymentsService: PaymentsService, private router: Router) {
    paymentsService.getPaymentData().then(function(data) {
      this.paymentData = data;
      this.transactionId = data.id;
      this.paymentData.transactionInfo.amount = (data.transactionInfo.amount / 100).toFixed(2);
      this.paymentData.transactionInfo.tax = (data.transactionInfo.tax / 100).toFixed(2);
      this.paymentData.transactionInfo.total = parseFloat(this.paymentData.transactionInfo.amount)
        + parseFloat(this.paymentData.transactionInfo.tax);

    }.bind(this))
      .catch((error) => {
        //this.paymentDataError = error;
      });
  }

  ngOnInit()	{
    this.getCustomerData();
  }

  private getCustomerData() {
    this.customerDetailsService.getRealData('user2')
      .then((result) => {
        this.customerData = result.customer;
      }).catch((error: Error) => {
        this.paymentDataError = error.message;
      });
  }

  routeToStripe() {
    this.router.navigate(['payments/confirm/' + this.transactionId]);
  }

  goBack() {
    this.router.navigate(['user-profile']);

  }

}
