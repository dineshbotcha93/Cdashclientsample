import {
  Component,
  Output,
  Input,
  EventEmitter,
  ChangeDetectionStrategy,
  ViewEncapsulation
} from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-header',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent {
  @Input() selectedLanguage:    string;
  @Input() availableLanguages:  Array<any>;
  @Input() userImage:           string;
  @Input() userEmail:           string;

  @Output() selectLanguage: EventEmitter<any> = new EventEmitter();
  @Output() logout:         EventEmitter<any> = new EventEmitter();

  menuToggle(){
    let $BODY = $('body');
    let $SIDEBAR_MENU = $('#sidebar-menu');

    if ($BODY.hasClass('nav-md')) {
        $SIDEBAR_MENU.find('li.active ul').hide();
        $SIDEBAR_MENU.find('li.active').addClass('active-sm').removeClass('active');
    } else {
        $SIDEBAR_MENU.find('li.active-sm ul').show();
        $SIDEBAR_MENU.find('li.active-sm').addClass('active').removeClass('active-sm');
    }

    $BODY.toggleClass('nav-md nav-sm');

  }
}
