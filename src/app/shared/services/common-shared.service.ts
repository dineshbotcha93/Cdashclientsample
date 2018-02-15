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
			return (sensorDetail['status'] == 0) ? aSensor:'';
			case 'low signal':
			return (sensorDetail['status'] == 1) ? aSensor:'';
			case 'low battery':
			return (sensorDetail['status'] == 2) ? aSensor:'';
			case 'missed communication':
			return (sensorDetail['status'] == 3) ? aSensor:'';
			case 'alerts':
			return (sensorDetail['status'] == 4) ? aSensor:'';
			default:
			return aSensor;
		}
	}

	evaluateSensorType(criteria,sensorDetail,aSensor){
		console.log(sensorDetail);
		switch(criteria){
			case 'temperature':
			return (sensorDetail['sensorType']==2) ? aSensor : '';
			case 'humidity':
			return (sensorDetail['sensorType']==43) ? aSensor : '';
			case 'contact':
			return (sensorDetail['sensorType']==9) ? aSensor: '';
			default:
			return aSensor;
		}
	}
}
