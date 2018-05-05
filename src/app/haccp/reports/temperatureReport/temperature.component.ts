import {
  Component,
  Injector,
  AfterContentInit,
  AfterViewInit,
  ViewContainerRef
} from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {Router} from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-temp-report',
  templateUrl: './temperature.component.html'
})
export class TemperatureComponent  {

  constructor(
    private router:Router,
    private translate: TranslateService
  ){
    //super();


  }

}
