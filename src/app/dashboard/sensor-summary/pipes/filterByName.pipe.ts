import {
	Pipe,
	PipeTransform
} 							from '@angular/core';

@Pipe({
  name: 'filterByName'
})
export class FilterByName implements PipeTransform  {
  constructor(){}

  transform(v: Array<Object>,...args:any[]) : object {
		let acceptableSensors = [];
		v.forEach((item)=>{
			if(item['SensorName'] == args[1]){
				acceptableSensors.push(item);
			}
		});
    return acceptableSensors;
  }
}
