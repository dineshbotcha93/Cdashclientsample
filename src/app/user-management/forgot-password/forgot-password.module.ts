import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ForgotPasswordComponent} from './forgot-password.component';
import {RouterModule, Routes} from '@angular/router';
import { FormsModule } from '@angular/forms';
import {ComponentsModule} from '../../shared/components';
import { ReactiveFormsModule  } from '@angular/forms';

const routes: Routes = [{
  path: 'forgot-password', component: ForgotPasswordComponent
}];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ComponentsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ForgotPasswordComponent]
})
export class ForgotPasswordModule { }
