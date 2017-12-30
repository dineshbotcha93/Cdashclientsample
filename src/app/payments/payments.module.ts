import { NgModule } from '@angular/core';
import { PaymentsComponent } from './payments.component';
import {Routes,RouterModule} from '@angular/router';
import { ContainersModule }         from '../shared/containers';

export const routes: Routes = [
  { path:'payments',component: PaymentsComponent }
]
@NgModule({
  declarations: [
    PaymentsComponent
  ],
  imports:[RouterModule.forRoot(routes),ContainersModule]
})
export class PaymentsModule {}
