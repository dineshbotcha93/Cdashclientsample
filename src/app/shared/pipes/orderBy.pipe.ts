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
	  if (a.Status < b.Status)
	    return -1;
	  if (a.Status > b.Status)
	    return 1;
	  return 0;
	}
  transform(v: Array<Object>,...args:any[]) : object {
		if(args[1]=='asc'){
			return v.sort(this.compare).reverse();
		} else {
			return v.sort(this.compare);
		}
  }
}
