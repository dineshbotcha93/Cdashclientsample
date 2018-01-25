import {
	Pipe,
	PipeTransform
} 							from '@angular/core';

@Pipe({
	name: 'filterByCriteria'
})
export class FilterByCriteria implements PipeTransform  {
	constructor(){}

	transform(v: Array<Object>,...args:any[]) : object {
		if(args[0]!==null){
			let acceptableSensors = [];
			v.forEach((item)=>{
				if(item['SensorName'].toLowerCase().indexOf(args[0].toLowerCase())>-1){
					acceptableSensors.push(item);
					if(args[1]!==null){
						acceptableSensors = acceptableSensors.filter((aS)=>{
							switch(args[1]){
								case 'good':
								return (item['Status'] == 0) ? aS:'';
								case 'low signal':
								return (item['Status'] == 1) ? aS:'';
								case 'low battery':
								return (item['Status'] == 2) ? aS:'';
								case 'missed communication':
								return (item['Status'] == 3) ? aS:'';
								case 'alerts':
								return (item['Status'] == 4) ? aS:'';
								default:
								return aS;
							}
						});
					}
					if(args[2]!==null){
					acceptableSensors = acceptableSensors.filter((aS)=>{
						switch(args[2]){
							case 'temperature':
							return (item['SensorType']==2) ? aS : '';
							case 'humidity':
							return (item['SensorType']==43) ? aS : '';
							case 'contact':
							return (item['SensorType']==9) ? aS: '';
							default:
							return aS;
						}
					});
				}
			}
		});
			return acceptableSensors;
		} else {
			return v;
		}
	}
}
