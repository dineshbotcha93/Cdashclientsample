import { NgModule }         from '@angular/core';
import { StringToNumberPipe } from './stringToNumber.pipe';
import { OrderByPipe } from './orderBy.pipe';
import { DateFormatPipe } from './dateFormat.pipe';
import { SafePipe } from './safe.pipe';


export const PIPES = [
  StringToNumberPipe,
  OrderByPipe,
  DateFormatPipe,
  SafePipe
];

@NgModule({
  imports: [],
  declarations: PIPES,
  exports: PIPES
})
export class PipesModule { }
