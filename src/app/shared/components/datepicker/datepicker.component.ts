import { Component, Input, Output, EventEmitter, ViewEncapsulation } from '@angular/core';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';

@Component({
  selector: 'app-datepicker',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./datepicker.component.scss'],
  template: `
  <div class="input-group">
  <input type="text"
         class="form-control"
         [minDate]="minDate"
         [maxDate]="maxDate"
         [bsConfig]="datepickerConfig"
         #dp="bsDatepicker"
         (bsValueChange)="onDateChange($event);"
         bsDatepicker [(bsValue)]="bsValue">
  <span class="input-group-addon" (click)="dp.show()">
    <i class="fa fa-calendar" aria-hidden="true"></i>
  </span>
</div>
  `
})
export class DatepickerComponent {
  datepickerConfig: Partial<BsDatepickerConfig>;
  constructor() {
    this.datepickerConfig = Object.assign({}, {containerClass: 'theme-dark-blue'});
  }
@Input() minDate;
@Input() maxDate;
@Input() bsValue;
@Output() dateChange: EventEmitter<any> = new EventEmitter<any>();

onDateChange(value: Date): void {
  this.bsValue = value;
  this.dateChange.emit(value);
}
}
