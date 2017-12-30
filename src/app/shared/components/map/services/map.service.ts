import { Injectable } from '@angular/core';

@Injectable()
export class MapService{
  constructor(){
  }

  getData():Array<Object>{
    return [
      {
        'lat':12.5,'lng':12.4,
      },
      {
        'lat':15.5,'lng':15.5
      },
      {'lat':20,'lng':20}];
    }
  }
