import { NgModule }         from '@angular/core';
import { SanitizeHtmlPipe } from './sanitizeHtml.pipe';
import { StringToNumberPipe } from './stringToNumber.pipe';

export const PIPES = [
  SanitizeHtmlPipe,
  StringToNumberPipe
];

@NgModule({
  imports: [],
  declarations: PIPES,
  exports: PIPES
})
export class PipesModule { }
