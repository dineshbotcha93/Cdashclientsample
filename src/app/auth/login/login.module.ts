import { NgModule } from '@angular/core';
import { LoginComponent } from './login.component';
import {Routes,RouterModule} from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

export const routes: Routes = [
  { path:'login',component: LoginComponent }
]

@NgModule({
  declarations: [
    LoginComponent,
  ],
  imports:[
    RouterModule.forChild(routes),
    CommonModule,
    ReactiveFormsModule,
  ],
})
export class LoginModule {}