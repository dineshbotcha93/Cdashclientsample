import { Component }        from '@angular/core';
import { Observable }       from 'rxjs/Observable';
import { Subscription }     from "rxjs";

@Component({
  selector: 'app-layout',
  styleUrls: ['./layout.container.scss'],
  template: `
    <app-header
      [userImage]="userImage"
      [userEmail]="userEmail">
    </app-header>
    <navigation></navigation>
    <div class="layout-content">
      <ng-content></ng-content>
    </div>
  `
})
export class LayoutContainer {

  public userImage:     string = '';
  public userEmail:     string = '';
  private assetsFolder: string;

  private subscriptions: Array<Subscription> = [];

  constructor(
  ) {
  }

  ngOnInit() {
    this.registerEvents();
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  private registerEvents() {
    // Subscribes to user changes

  }
}
