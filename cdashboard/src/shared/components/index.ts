import { NgModule } 				from '@angular/core';
import { CommonModule } 		from '@angular/common';
import { HeaderComponent }  from './header/header.component';
import { ProfileActionBarComponent } from './profileActionBar/profileActionBar.component';

export const COMPONENTS = [
  HeaderComponent,
  ProfileActionBarComponent,
];

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: COMPONENTS,
  exports: COMPONENTS
})
export class ComponentsModule { }
