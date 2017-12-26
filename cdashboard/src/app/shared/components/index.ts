import { NgModule } 				from '@angular/core';
import { CommonModule } 		from '@angular/common';
import { HeaderComponent }  from './header/header.component';
import { PipesModule }                  from '../pipes';
import { ProfileActionBarComponent } from './profileActionBar/profileActionBar.component';
import { TilesComponent }   from './tiles/tiles.component';
import { TilesSandbox }     from './tiles/tiles.sandbox';
import { NavigationComponent } from './navigation/navigation.component';


export const COMPONENTS = [
  HeaderComponent,
  ProfileActionBarComponent,
  TilesComponent,
  NavigationComponent
];

@NgModule({
  imports: [
    CommonModule,
    PipesModule
  ],
  declarations: COMPONENTS,
  exports: COMPONENTS,
  providers: [TilesSandbox]
})
export class ComponentsModule { }
