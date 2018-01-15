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
}