import { NgModule  } 				from '@angular/core';
import { CommonModule } 		from '@angular/common';
import { ComponentsModule } from '../components';
import { LayoutContainer }  from './layout/layout.container';
import { TranslateModule, TranslateLoader, TranslateService } from '@ngx-translate/core';

export const CONTAINERS = [
  LayoutContainer
];

@NgModule({
  imports: [
  	CommonModule,
  	ComponentsModule,
  	TranslateModule,
  ],
  declarations: CONTAINERS,
  exports: CONTAINERS,
})
export class ContainersModule {}
