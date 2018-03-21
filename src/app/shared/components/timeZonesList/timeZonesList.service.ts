import { Injectable } from '@angular/core';
import { Observable } from "rxjs/Observable";
import "rxjs/add/observable/of";
import * as TIME_ZONES from './timeZones.json';
import { RequesterService } from "../../services/requester.service";

@Injectable()
export class TimeZonesListService{

  constructor(private requesterService: RequesterService) {

  }

  getTimeZones(): any {
    return Observable.of([TIME_ZONES]);
  }
}
