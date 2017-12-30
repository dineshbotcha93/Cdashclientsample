import { Injectable } from '@angular/core';

@Injectable()
export class MapService{
  constructor(){
  }

  getData():Array<Object>{
    return [
      {
        'locationID':1,'lat':12.5,'lng':12.4,status:'LOW_SIGNAL',count:15
      },
      {
        'locationID':2,'lat':18.5,'lng':15.5,status:'MISSED_COMMUNICATION',count:32
      },
      {
        'locationID':3,'lat':20,'lng':20,status:'ALERTS',count:7
      },
    {
      'locationID':4,'lat':15.7,'lng':15.7,status:'LOW_BATTERY',count:1
    }];
    }
  }
