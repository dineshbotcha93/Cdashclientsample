import { NgModule } 				from '@angular/core';
import { CommonModule } 		from '@angular/common';
import { HeaderComponent }  from './header/header.component';
import { PipesModule }                  from '../pipes';
import { ProfileActionBarComponent } from './profileActionBar/profileActionBar.component';
import { TileComponent }   from './tile/tile.component';
import { TileSandbox }     from './tile/tile.sandbox';
import { NavigationComponent } from './navigation/navigation.component';
import { MapComponent }     from './map/map.component';
import { DataTableComponent } from './dataTable/dataTable.component';
import { AgmCoreModule } from '@agm/core';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

export const COMPONENTS = [

  HeaderComponent,
  ProfileActionBarComponent,
  TileComponent,
  NavigationComponent,
  MapComponent,
  DataTableComponent,
];

@NgModule({
  imports: [
    CommonModule,
    PipesModule,
    NgxDatatableModule,
    AgmCoreModule.forRoot({
     apiKey: 'AIzaSyBzgI77Zkjsakww8mMHBFXEo4io7SkW-0M',
     libraries: ["places"]
   }),
  ],
  declarations: COMPONENTS,
  exports: COMPONENTS,
  providers: [TileSandbox]
})
export class ComponentsModule { }
