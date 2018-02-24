import { NgModule }         from '@angular/core';
import { SanitizeHtmlPipe } from './sanitizeHtml.pipe';
import { StringToNumberPipe } from './stringToNumber.pipe';
import { OrderByPipe } from './orderBy.pipe';
import { DateFormatPipe } from './dateFormat.pipe';

export const PIPES = [
  SanitizeHtmlPipe,
  StringToNumberPipe,
  OrderByPipe,
  DateFormatPipe
];

@NgModule({
  imports: [],
  declarations: PIPES,
  exports: PIPES
})
export class PipesModule { }
