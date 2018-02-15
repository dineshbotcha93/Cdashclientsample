import {
  Component,
  Output,
  Input,
  EventEmitter,
  ChangeDetectionStrategy,
  ViewEncapsulation
} from '@angular/core';
import * as $ from 'jquery';
import { TranslateService } from '@ngx-translate/core';

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
  private languagePicked: string;

  @Output() selectLanguage: EventEmitter<any> = new EventEmitter();
  @Output() logout:         EventEmitter<any> = new EventEmitter();

  constructor(private translate: TranslateService){

  }
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

    $BODY.toggleClass('nav-sm nav-md');

  }

  catchLanguage(lang){
    this.translate.setDefaultLang(lang);
    this.translate.use(lang);
  }
}
