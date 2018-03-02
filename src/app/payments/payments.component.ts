import { Component, OnInit, AfterViewInit } from '@angular/core';
import { PaymentsService } from './services/payments.service';
import { CustomerDetailsService } from '../business/customer-details/services/customer-details.service';
const stripe = Stripe('pk_test_rh7KqKZ2eaklfF1FO2WWURYX');

@Component({
  selector: 'app-payments',
  providers: [PaymentsService, CustomerDetailsService],
  styleUrls: ['./payments.component.scss'],
  templateUrl: './payments.component.html'
})

export class PaymentsComponent implements OnInit {

  card: object;
  paymentData: Object;
  customerData: Object = null;
  acknowledgement = false;

  constructor(private customerDetailsService: CustomerDetailsService, private paymentsService: PaymentsService) {
    paymentsService.getPaymentData().then(function(data) {
      this.paymentData = data;
    }.bind(this));
  }

  ngOnInit()	{
// Create an instance of Elements.
    const elements = stripe.elements();
    this.getCustomerData();

// Custom styling can be passed to options when creating an Element.
// (Note that this demo uses a wider set of styles than the guide below.)
    const style = {
      base: {
        color: '#32325d',
        lineHeight: '18px',
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSmoothing: 'antialiased',
        fontSize: '16px',
        '::placeholder': {
          color: '#aab7c4'
        }
      },
      invalid: {
        color: '#fa755a',
        iconColor: '#fa755a'
      }
    };

// Create an instance of the card Element.
    const card = elements.create('card', {style: style});

// Add an instance of the card Element into the `card-element` <div>.
    card.mount('#card-element');
    this.card = card;
  }

  getToken() {
    console.log('checked', this.acknowledgement);
    /*stripe.createToken(this.card).then(function(tokenData) {
      console.log('data is', tokenData);
      this.paymentsService.sendStripeToken({
        stripeToken: tokenData.token.id,
        transactionId: this.paymentData.id
      }).then(function(data){
        console.log('successful call', data);
      });
    }.bind(this));*/
  }

  logCheckbox(checkbox) {
    console.log('checked', checkbox.checked);
    this.acknowledgement = checkbox.checked;
  }

  private getCustomerData() {
    this.customerDetailsService.getRealData('user2').then((result) => {
      this.customerData = result.customer;
    });
  }

}
