import { Component } from '@angular/core';
import { Tab } from './tab.component';

@Component({
  selector: 'tabs',
  template: `
  <ul>
  <li *ngFor="let tab of tabs" (click)="selectTab(tab)" [class.active]="tab.active">{{ tab.tabTitle }}</li>
  </ul>
  `
})
export class Tabs {
  tabs: Tab[] = [];
  selectTab(tab: Tab) {
    console.log('test');
    console.log(tab);
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
