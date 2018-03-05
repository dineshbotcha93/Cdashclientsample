import {
	Pipe,
	PipeTransform
} 							from '@angular/core';
import * as moment from 'moment/moment';

@Pipe({
  name: 'dateFormat'
})
export class DateFormatPipe implements PipeTransform  {
  transform(v: string,...args:any[]) : String {
    return moment(v).format(args[0]).toString();
  }
}
