import { Component,Input } from '@angular/core';
import { Tabs } from './tabs.component';

@Component({
  selector: 'tab',
  template: `
    <div [hidden]="!active" role="tabpanel" class="tab-panel">
      <ng-content></ng-content>
    </div>
  `
})
export class Tab {
  @Input() tabTitle;
  @Input() isDisabled;
  @Input() isShow;
  public active;
  constructor(tabs: Tabs) {
    tabs.addTab(this);
  }
}
