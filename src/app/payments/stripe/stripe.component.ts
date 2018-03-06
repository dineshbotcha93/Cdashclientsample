import { Component, OnInit, AfterViewInit } from '@angular/core';
import { StripeService } from './services/stripe.service';
import {Router, ActivatedRoute} from '@angular/router';
import { PaymentsService } from '../services/payments.service';

@Component({
  selector: 'app-stripe',
  styleUrls: ['./stripe.component.scss'],
  providers: [StripeService, PaymentsService],
  templateUrl: './stripe.component.html'
})

export class StripeComponent implements OnInit {

  card: object;
  paymentData: Object;
  customerData: Object = null;
  acknowledgement = false;
  stripe: any = null;

  constructor(private stripeService: StripeService, private router: Router, private activatedRoute: ActivatedRoute) {
    this.stripe = Stripe('pk_test_rh7KqKZ2eaklfF1FO2WWURYX');
  }

  ngOnInit() {
    this.checkForActiveTransaction();
// Create an instance of Elements.
    const elements = this.stripe.elements();

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
    this.stripe.createToken(this.card).then(function(tokenData) {
      this.stripeService.sendStripeToken({
        stripeToken: tokenData.token.id,
        transactionId: this.activatedRoute.snapshot.params['id']
      }).then(function(data){
        this.router.navigate(['payments/success']);
      }.bind(this));
    }.bind(this));
  }

  checkForActiveTransaction() {
    /*if ( transactionId === null) {
      this.router.navigate(['payments']);
    }*/
  }

}
