import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-languagedropdown',
  styleUrls:['./languageDropdown.component.scss'],
  templateUrl:'./languageDropdown.component.html'
})
export class LanguageDropdownComponent {
  private selectedLanguage = 'en';

  constructor(private translate: TranslateService){

  }

  languagePicked(){
    this.translate.use(this.selectedLanguage);
    console.log(this.translate);
  }
}
