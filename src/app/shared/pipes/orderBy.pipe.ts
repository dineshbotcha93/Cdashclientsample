import {
	Pipe,
	PipeTransform
} 							from '@angular/core';

@Pipe({
  name: 'orderBy'
})
export class OrderByPipe implements PipeTransform  {
  constructor(){}
	compare(a,b) {
	  if (a.status < b.status)
	    return -1;
	  if (a.status > b.status)
	    return 1;
	  return 0;
	}
  transform(v: Array<Object>,...args:any[]) : object {
		if(args[1]=='asc'){
			return v.sort(this.compare).reverse();
		} else if(args[1]=='desc') {
			return v.sort(this.compare);
		}
  }
}
