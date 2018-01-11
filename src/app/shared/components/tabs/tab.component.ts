import { Component,Input } from '@angular/core';
import { Tabs } from './tabs.component';

@Component({
  selector: 'tab',
  template: `
    <div [hidden]="!active" role="tabpanel">
      <ng-content></ng-content>
    </div>
  `
})
export class Tab {
  @Input() tabTitle;
  public active;
  constructor(tabs: Tabs) {
    tabs.addTab(this);
  }
}
