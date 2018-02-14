import { Component, Input } from '@angular/core';

@Component({
  selector: '<app-gauge>',
  styleUrls: ['./gauge.component.scss'],
  template: `
    <ngx-gauge [type]="type"
               [value]="value"
               [label]="title"
               [append]="gaugeAppendText"
               [cap]="round"
               [thick]="10">
    </ngx-gauge>
  `
})
export class GaugeComponent {

  //gaugeType = "arch";
  /*gaugeValue = 28.3;
  gaugeLabel = "Temp";
  gaugeAppendText = "F";*/

  @Input() title;
  @Input() value;
  @Input() type;
}
