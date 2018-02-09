import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-languagedropdown',
  styleUrls:['./languageDropdown.component.scss'],
  templateUrl:'./languageDropdown.component.html'
})
export class LanguageDropdownComponent implements OnInit {
  @Input() chosenLanguage: string;
  @Output() currentLanguage: EventEmitter<any> = new EventEmitter();
  private selectedLanguage: string;
  constructor(private translate: TranslateService){
    if(!!this.chosenLanguage){
      this.selectedLanguage = this.chosenLanguage;
    } else if(!!localStorage.getItem('com.cdashboard.language')){
      this.selectedLanguage = localStorage.getItem('com.cdashboard.language');
    } else {
      navigator.languages.forEach((e)=>{
        if(e == 'en'){
          this.selectedLanguage = 'en';
          return;
        } else if (e == 'it'){
          this.selectedLanguage = 'it';
          return;
        } else if (e == 'es'){
          this.selectedLanguage = 'es';
          return;
        }
      });
    }
    this.translate.setDefaultLang(this.selectedLanguage);
    this.translate.use(this.selectedLanguage);
    localStorage.setItem('com.cdashboard.language', this.selectedLanguage);
  }

  ngOnInit(){
    this.currentLanguage.emit(this.selectedLanguage);
  }

  languagePicked(){
    this.translate.use(this.selectedLanguage);
    this.translate.setDefaultLang(this.selectedLanguage);
    localStorage.setItem('com.cdashboard.language', this.selectedLanguage);
  }
}
