import { NgModule }         from '@angular/core';
import { SanitizeHtmlPipe } from './sanitizeHtml.pipe';
import { StringToNumberPipe } from './stringToNumber.pipe';
import { OrderByPipe } from './orderBy.pipe';

export const PIPES = [
  SanitizeHtmlPipe,
  StringToNumberPipe,
  OrderByPipe
];

@NgModule({
  imports: [],
  declarations: PIPES,
  exports: PIPES
})
export class PipesModule { }
