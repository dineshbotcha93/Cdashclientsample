import { NgModule, Component, } from '@angular/core';
import {Routes,RouterModule} from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ContainersModule } from '../../shared/containers';
import {SharedModule} from '../../shared/modules/shared.module';
import {ComponentsModule} from '../../shared/components';

import {AuthGuard} from '../../shared/services/auth-guard.service';
import {StripeComponent} from './stripe.component';

export const routes: Routes = [
  {
    path: 'stripe',
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: StripeComponent
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
export class StripeModule {
}
