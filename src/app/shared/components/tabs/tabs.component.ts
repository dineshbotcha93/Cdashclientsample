import { Component } from '@angular/core';
import { Tab } from './tab.component';

@Component({
  selector: 'tabs',
  styleUrls: ['./tab.component.scss'],
  template: `
  <ul class="nav nav-tabs bar_tabs" role="tablist">
  <li *ngFor="let tab of tabs" (click)="selectTab(tab)" [class.active]="tab.active" class="tabs" role="tab">
    <a>{{ tab.tabTitle }}</a>
  </li>
  </ul>
  <ng-content></ng-content>
  `
})
export class Tabs {
  tabs: Tab[] = [];
  selectTab(tab: Tab) {
    if(tab.isDisabled){
      return;
    }
    this.tabs.forEach((tab) => {
      tab.active = false;
    });
    tab.active = true;
  }

  addTab(tab: Tab) {
    if (this.tabs.length === 0) {
      tab.active = true;
    }
    this.tabs.push(tab);
  }
}
