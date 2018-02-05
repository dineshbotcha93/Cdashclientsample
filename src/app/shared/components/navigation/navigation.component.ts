import {
  Component,
  ChangeDetectionStrategy,
  ViewEncapsulation,
  Input,
 } from '@angular/core';
import * as $ from 'jquery';
import { Router } from '@angular/router';


@Component({
  selector: 'navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,

})
export class NavigationComponent {
  @Input() userEmail:           string;
  constructor(private router:Router) {
  }

  goToLink(link){
    this.router.navigate([link]);
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
