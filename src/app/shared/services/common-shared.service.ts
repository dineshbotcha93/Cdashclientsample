import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';
@Injectable()
export class CommonSharedService {

	constructor() { }

	getHahedPassword(userName: string,passWord: string){
		let hash = CryptoJS.SHA256(userName.concat(passWord));
		let hash_Base64 = hash.toString(CryptoJS.enc.Base64);
		return hash_Base64;
	}

	evaluateSensorStatus(criteria,sensorDetail,aSensor){
		switch(criteria){
			case 'good':
			return (sensorDetail['Status'] == 0) ? aSensor:'';
			case 'low signal':
			return (sensorDetail['Status'] == 1) ? aSensor:'';
			case 'low battery':
			return (sensorDetail['Status'] == 2) ? aSensor:'';
			case 'missed communication':
			return (sensorDetail['Status'] == 3) ? aSensor:'';
			case 'alerts':
			return (sensorDetail['Status'] == 4) ? aSensor:'';
			default:
			return aSensor;
		}
	}

	evaluateSensorType(criteria,sensorDetail,aSensor){
		switch(criteria){
			case 'temperature':
			return (sensorDetail['SensorType']==2) ? aSensor : '';
			case 'humidity':
			return (sensorDetail['SensorType']==43) ? aSensor : '';
			case 'contact':
			return (sensorDetail['SensorType']==9) ? aSensor: '';
			default:
			return aSensor;
		}
	}
}
