import {
	Pipe,
	PipeTransform
} 							from '@angular/core';
import { CommonSharedService } from '../../../shared/services/common-shared.service';

@Pipe({
	name: 'filterByCriteria'
})
export class FilterByCriteria implements PipeTransform  {
	constructor(private commonSharedService:CommonSharedService){}

	transform(v: Array<Object>,...args:any[]) : object {
		if(args[0]!==null){
			let acceptableSensors = [];
			v.forEach((item)=>{
				if(item['SensorName'].toLowerCase().indexOf(args[0].toLowerCase())>-1){
					acceptableSensors.push(item);
					if(args[1]!==null){
						acceptableSensors = acceptableSensors.filter((aS)=>{
							return this.commonSharedService.evaluateSensorStatus(args[1],item,aS);
						});
					}
					if(args[2]!==null){
					acceptableSensors = acceptableSensors.filter((aS)=>{
						return this.commonSharedService.evaluateSensorType(args[2],item,aS);
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
