import {
  Component,
  ChangeDetectorRef,
  ChangeDetectionStrategy,
  ViewEncapsulation
 } from '@angular/core';
import { TranslateService } from 'ng2-translate';

@Component({
  selector: 'navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,

})
export class NavigationComponent {
  private $ = jQuery;
  constructor(private changeDetector: ChangeDetectorRef, private translate: TranslateService) {

    /**
     * Detaches the change detector from the change detector tree.
     * The detached change detector will not be checked until it is reattached.
     */
     changeDetector.detach();
  }

  clicker($event){
    let element = $($event.target.parentNode).children("ul");
    if(element.hasClass("child_menu")){
      element.toggle();
    }
  }
}
