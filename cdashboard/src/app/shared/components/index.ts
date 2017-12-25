import { NgModule } 				from '@angular/core';
import { CommonModule } 		from '@angular/common';
import { HeaderComponent }  from './header/header.component';
import { PipesModule }                  from '../pipes';
import { ProfileActionBarComponent } from './profileActionBar/profileActionBar.component';
import { NavigationComponent } from './navigation/navigation.component';


export const COMPONENTS = [
  HeaderComponent,
  ProfileActionBarComponent,
  NavigationComponent
];

@NgModule({
  imports: [
    CommonModule,
    PipesModule
  ],
  declarations: COMPONENTS,
  exports: COMPONENTS
})
export class ComponentsModule { }
