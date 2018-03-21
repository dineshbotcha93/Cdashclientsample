import {Injectable} from '@angular/core';
import * as CryptoJS from 'crypto-js';

@Injectable()
export class CommonSharedService {

  constructor() {
  }

  getHahedPassword(userName: string, passWord: string) {
    let hash = CryptoJS.SHA256(userName.concat(passWord));
    let hash_Base64 = hash.toString(CryptoJS.enc.Base64);
    return hash_Base64;
  }

  getEncodedPassword(password: string) {
    return CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(password));
  }

  evaluateSensorStatus(criteria, sensorDetail, aSensor) {
    switch (criteria) {
      case 'ok':
        return (sensorDetail['status'] === 0) ? aSensor : '';
      case 'warning':
        return (sensorDetail['status'] === 1) ? aSensor : '';
      case 'alert':
        return (sensorDetail['status'] === 2) ? aSensor : '';
      case 'inactive':
        return (sensorDetail['status'] === 3) ? aSensor : '';
      case 'sleeping':
        return (sensorDetail['status'] === 4) ? aSensor : '';
      default:
        return aSensor;
    }
  }

  evaluateSensorType(criteria, sensorDetail, aSensor) {
    console.log(sensorDetail);
    switch (criteria) {
      case 'temperature':
        return (sensorDetail['sensorType'] === 2) ? aSensor : '';
      case 'humidity':
        return (sensorDetail['sensorType'] === 43) ? aSensor : '';
      case 'contact':
        return (sensorDetail['sensorType'] === 9) ? aSensor : '';
      default:
        return aSensor;
    }
  }
}
