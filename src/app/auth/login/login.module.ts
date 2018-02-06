import { NgModule } from '@angular/core';
import { LoginComponent } from './login.component';
import {Routes,RouterModule} from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/modules/shared.module';
import { LanguageDropdownComponent } from '../../shared/components/languageDropdown/languageDropdown.component';
import { ComponentsModule } from '../../shared/components';

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
    FormsModule,
    SharedModule,
    ComponentsModule
  ],
})
export class LoginModule {}
