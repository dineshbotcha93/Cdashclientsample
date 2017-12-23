import { NgModule } from '@angular/core';
import { LoginComponent } from './login.component';
import {Routes,RouterModule} from '@angular/router';
import { CommonModule } from '@angular/common';

export const routes: Routes = [
  { path:'login',component: LoginComponent }
]

@NgModule({
  declarations: [
    LoginComponent,
  ],
  imports:[RouterModule.forRoot(routes),CommonModule]
})
export class LoginModule {}
