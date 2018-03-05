import {
	Pipe,
	PipeTransform
} 							from '@angular/core';

@Pipe({
  name: 'stringToNumber'
})
export class StringToNumberPipe implements PipeTransform  {
  constructor(){}

  transform(v: string,...args:any[]) : number {
		if(args.includes('digitsOnly') && v){
			return Number(v.replace(/[^0-9.]/g,''));
		}
    return Number(v);
  }
}
