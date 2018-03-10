import { Injectable } from '@angular/core';
import { Observable } from "rxjs/Observable";
import "rxjs/add/observable/of";
import * as INDUSTRIES from './jsons/industries.json';
import * as TIME_ZONES from './jsons/timeZones.json';

@Injectable()
export class FillDetailsService{
  getIndustries():any {
    return Observable.of([INDUSTRIES]);
  }
  getTimeZones(): any {
    return Observable.of([TIME_ZONES]);
  }
}
