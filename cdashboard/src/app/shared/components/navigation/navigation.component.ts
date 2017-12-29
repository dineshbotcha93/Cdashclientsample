import {
  Component,
  ChangeDetectorRef,
  ChangeDetectionStrategy,
  ViewEncapsulation
 } from '@angular/core';
import { TranslateService } from 'ng2-translate';
import * as $ from 'jquery';


@Component({
  selector: 'navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,

})
export class NavigationComponent {
  constructor(private changeDetector: ChangeDetectorRef, private translate: TranslateService) {

    /**
     * Detaches the change detector from the change detector tree.
     * The detached change detector will not be checked until it is reattached.
     */
     changeDetector.detach();
  }

  clicker($event){
    $('ul[class*="side-menu"]').children("li").each(function(e,elem){
      if($(elem).hasClass("active")){
        $(elem).children("ul").slideToggle();
        $(elem).removeClass("active");
      }
    });
    if($($event.target.parentNode).is(".active")){
      $($event.target.parentNode).removeClass('active active-sm');
    } else {
      $($event.target.parentNode).addClass('active');
    }
    let element = $($event.target.parentNode).children("ul");
    if(element.hasClass("child_menu")){
      element.slideToggle();
    } else {
      if($($event.target.parentNode.parentNode).is(".active")){
        $($event.target.parentNode.parentNode).removeClass('active active-sm');
      } else {
        $($event.target.parentNode.parentNode).addClass('active');
      }
      element = $($event.target.parentNode.parentNode).children("ul");
      if(element.hasClass("child_menu")){
        element.slideToggle();
      }
    }
  }
}
