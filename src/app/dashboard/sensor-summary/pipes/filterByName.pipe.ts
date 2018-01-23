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
		if(args[1]!=null){
			let acceptableSensors = [];
			v.forEach((item)=>{
				if(item['SensorName'].toLowerCase().indexOf(args[1].toLowerCase())){
					acceptableSensors.push(item);
				}
			});
			return acceptableSensors;
		} else {
			return v;
		}
	}
}
