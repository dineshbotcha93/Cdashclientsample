import { Injectable } from '@angular/core';
import { Observable } from "rxjs/Observable";
import "rxjs/add/observable/of";
import * as COUNTRIES from './json/countries.json';
import * as STATES from './json/states.json';

@Injectable()
export class AddressFormService {
  getCountries():any {
    return Observable.of([COUNTRIES]);
  }
  getStates(): any {
    return Observable.of([STATES]);
  }
}
