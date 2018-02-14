import { NgModule } 				from '@angular/core';
import { CommonModule } 		from '@angular/common';
import { HeaderComponent }  from './header/header.component';
import { PipesModule }                  from '../pipes';
import { ProfileActionBarComponent } from './profileActionBar/profileActionBar.component';
import { TileComponent }   from './tile/tile.component';
import { TileSandbox }     from './tile/tile.sandbox';
import { NavigationComponent } from './navigation/navigation.component';
import { MapComponent }     from './map/map.component';
import { NotificationComponent } from './notification/notification.component';
import { LanguageDropdownComponent } from './languageDropdown/languageDropdown.component';
import { DataTableComponent } from './dataTable/dataTable.component';
import { AlertsComponent } from './alerts/alerts.component';
import { Tab } from './tabs/tab.component';
import { Tabs } from './tabs/tabs.component';
import { GaugeComponent } from './gauge/gauge.component';

// Google map integration
import { AgmCoreModule } from '@agm/core';
import { AgmJsMarkerClustererModule } from '@agm/js-marker-clusterer';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgxGaugeModule } from 'ngx-gauge';

export const COMPONENTS = [
  HeaderComponent,
  ProfileActionBarComponent,
  TileComponent,
  NavigationComponent,
  NotificationComponent,
  LanguageDropdownComponent,
  MapComponent,
  DataTableComponent,
  AlertsComponent,
  Tab,
  Tabs,
  GaugeComponent
];

@NgModule({
  imports: [
    CommonModule,
    PipesModule,
    NgxDatatableModule,
    NgxGaugeModule,
    AgmCoreModule.forRoot({
     apiKey: 'AIzaSyBzgI77Zkjsakww8mMHBFXEo4io7SkW-0M',
     libraries: ["places"]
   }),
   AgmJsMarkerClustererModule,
   ReactiveFormsModule,
   FormsModule
  ],
  declarations: COMPONENTS,
  exports: COMPONENTS,
  providers: [TileSandbox]
})
export class ComponentsModule { }
