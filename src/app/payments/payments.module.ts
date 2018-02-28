import { NgModule, Component, } from '@angular/core';
import { PaymentsComponent } from './payments.component';
import {Routes,RouterModule} from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ContainersModule } from '../shared/containers';
import { CommonModule } from '@angular/common';
import {SharedModule} from '../shared/modules/shared.module';
import {ComponentsModule} from '../shared/components';

export const routes: Routes = [
  { path:'payments', component: PaymentsComponent }
]
@NgModule({
  declarations: [
    PaymentsComponent
  ],
  imports: [
    RouterModule.forRoot(routes),
    CommonModule,
    SharedModule,
    ComponentsModule,
    ContainersModule,
    FormsModule,
    SharedModule
  ]
})
export class PaymentsModule {
}
