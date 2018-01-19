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
		console.log('this is args 1 '+args[1]);
		if(args[1]!=null){
			let acceptableSensors = [];
			v.forEach((item)=>{
				if(item['SensorName'] == args[1]){
					acceptableSensors.push(item);
				}
			});
			return acceptableSensors;
		} else {
			return v;
		}
	}
}
