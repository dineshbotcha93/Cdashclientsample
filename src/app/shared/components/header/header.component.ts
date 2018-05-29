import {
  Component,
  Output,
  Input,
  EventEmitter,
  ChangeDetectionStrategy,
  ViewEncapsulation, OnInit
} from '@angular/core';
import * as $ from 'jquery';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements OnInit {
  @Input() selectedLanguage:    string;
  @Input() availableLanguages:  Array<any>;
  @Input() userImage:           string;
  @Input() userEmail:           string;
  @Input() anonymous = false;
  private languagePicked: string;
  public isCooperAdmin: boolean = false;
  public isHaccpUser: boolean = false;


  @Output() selectLanguage: EventEmitter<any> = new EventEmitter();
  @Output() logout:         EventEmitter<any> = new EventEmitter();

  constructor(private translate: TranslateService, private router:Router){

  }

  ngOnInit() {
    this.isCooperAdmin = this.isCooperAdminUser();
    this.getProducttype();
  }

  isCooperAdminUser() {

    if(this.getUserInfoFromLocal()!=='') {
      if(this.getUserInfoFromLocal().userName==='Admin') {
        return true;
      }
    }
    return false;
  }

  getUserInfoFromLocal() {

    if(localStorage.getItem('com.cdashboard.userInfoObject')) {
      return JSON.parse(localStorage.getItem('com.cdashboard.userInfoObject'));
    }
    return ''; // clean this later
  }

  getProducttype() {
    if(localStorage.getItem('com.cdashboard.userInfoObject')){
      let products = JSON.parse(localStorage.getItem('com.cdashboard.userInfoObject')).account;
      for(let i = 0; i < products.length; i++) {
        if(products[i].productType === 'HACCP'){
           this.isHaccpUser = true;
          }
      }
    }
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

  goToLink(link){
    this.router.navigate([link]);
  }

  catchLanguage(lang){
    this.translate.setDefaultLang(lang);
    this.translate.use(lang);
  }
}
