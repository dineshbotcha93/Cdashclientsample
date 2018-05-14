import { Component, Input } from '@angular/core';

@Component({
  selector:'user-flow-component',
  styleUrls: ['./flow-display.component.scss'],
  templateUrl: './flow-display.component.html',
})

export class FlowDisplayComponent {
  @Input() selected: number;
}
