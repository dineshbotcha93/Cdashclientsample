import {
	Pipe,
	PipeTransform
} 							from '@angular/core';

@Pipe({
  name: 'stringToNumber'
})
export class StringToNumberPipe implements PipeTransform  {
  constructor(){}

  transform(v: string) : number {
    return Number(v);
  }
}
