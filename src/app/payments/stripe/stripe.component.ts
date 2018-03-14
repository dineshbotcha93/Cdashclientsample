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
  customerData: Object = null;
  stripe: any = null;
  validationError: String = null;

  constructor(private stripeService: StripeService, private router: Router, private activatedRoute: ActivatedRoute) {
    this.stripe = Stripe('pk_test_rh7KqKZ2eaklfF1FO2WWURYX');
  }

  ngOnInit() {
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

    card.addEventListener('change', function(event) {
      if (event.error) {
        this.validationError = event.error.message;
      } else {
        this.validationError = null;
      }
    }.bind(this));
  }

  public getToken() {
    return this.stripe.createToken(this.card);
  }

}
