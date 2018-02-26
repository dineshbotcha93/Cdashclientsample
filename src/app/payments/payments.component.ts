import { Component, OnInit, AfterViewInit } from '@angular/core';

const stripe = Stripe('pk_test_6pRNASCoBOKtIshFeQd4XMUh');

@Component({
  selector: 'app-payments',
  styleUrls: ['./payments.component.scss'],
  templateUrl: './payments.component.html'
})

export class PaymentsComponent implements OnInit {

  cardNumber: string;
  cardHolderName: string;
  expiryMonth: string;
  expiryYear: string;
  cvc: string;
  card: object;

  constructor() {
  }

  ngOnInit()	{
// Create an instance of Elements.
    const elements = stripe.elements();

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
    stripe.createToken(this.card, function(err, token) {
      console.log('error is', err);
      console.log('token is', token);
    });
    alert(`Token is working for ${this.cardNumber} ${this.cardHolderName}`);
  }

}
