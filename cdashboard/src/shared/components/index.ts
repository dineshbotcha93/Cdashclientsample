import { NgModule } 				from '@angular/core';
import { CommonModule } 		from '@angular/common';
import { HeaderComponent }  from './header/header.component';
import { ProfileActionBarComponent } from './profileActionBar/profileActionBar.component';
import { TilesComponent }   from './tiles/tiles.component';
import { TilesSandbox }     from './tiles/tiles.sandbox';

export const COMPONENTS = [
  HeaderComponent,
  ProfileActionBarComponent,
  TilesComponent
];

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: COMPONENTS,
  exports: COMPONENTS,
  providers: [TilesSandbox]
})
export class ComponentsModule { }
