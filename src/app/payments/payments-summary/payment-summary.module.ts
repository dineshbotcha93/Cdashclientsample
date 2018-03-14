import { NgModule, Component, } from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ContainersModule } from '../../shared/containers';
import {SharedModule} from '../../shared/modules/shared.module';
import {ComponentsModule} from '../../shared/components';

import {AuthGuard} from '../../shared/services/auth-guard.service';
import {PaymentSummaryComponent} from './payment-summary.component';

export const routes: Routes = [
  {
    path: 'stripe',
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: PaymentSummaryComponent
      }
    ]
  },
];
@NgModule({
  declarations: [
  ],
  imports: [
    RouterModule.forRoot(routes),
    SharedModule,
    ComponentsModule,
    ContainersModule,
    CommonModule,
    FormsModule
  ]
})
export class PaymentSummaryModule {
}
