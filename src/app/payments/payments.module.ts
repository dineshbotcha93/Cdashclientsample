import { NgModule, Component, } from '@angular/core';
import { PaymentsComponent } from './payments.component';
import {Routes,RouterModule} from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ContainersModule } from '../shared/containers';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/modules/shared.module';
import { ComponentsModule } from '../shared/components';
import { AuthGuard } from '../shared/services/auth-guard.service';
import { StripeModule } from './stripe/stripe.module';
import { StripeComponent } from './stripe/stripe.component';
import { PaymentSummaryModule } from './payments-summary/payment-summary.module';
import { PaymentSummaryComponent} from './payments-summary/payment-summary.component';

export const routes: Routes = [
  {
    path: 'payments',
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: PaymentsComponent
      },
      {
        path: 'success',
        component: PaymentSummaryComponent
      }
    ]
  },
];
@NgModule({
  declarations: [
    PaymentsComponent,
    StripeComponent,
    PaymentSummaryComponent
  ],
  imports: [
    RouterModule.forRoot(routes),
    CommonModule,
    SharedModule,
    ComponentsModule,
    ContainersModule,
    FormsModule,
    StripeModule,
    SharedModule,
    PaymentSummaryModule
  ]
})
export class PaymentsModule {
}
