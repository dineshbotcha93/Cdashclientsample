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
import {BsModalRef} from "ngx-bootstrap/modal/bs-modal-ref.service";
import * as moment from 'moment/moment';
import { HaccpReportingService } from '../services/haccpReporting.service';

@Component({
  selector: 'app-dailysummary-report',
  templateUrl: './dailySummaryReport.component.html',
  styles: [
    `.btn-generate { margin-top: 20px}
     .pdf-scroll {overflow:scroll;height:340px}
     `
  ]
})
export class DailySummaryReportComponent  {

  bsValue: Date = moment().subtract(1, 'days').toDate();
  bsValueTwo: Date = moment().toDate();
  bsRangeValue: any = [this.bsValue , this.bsValueTwo];
  bsModalRef: BsModalRef;
  private locationId = '';
  private pdfSrc;
  private showReport = false;

  constructor(
    private router: Router,
    private translate: TranslateService,
    private haccpReportingService: HaccpReportingService
  ){
    //super();
  }

  base64ToArrayBuffer(base64String) {

    let binary_string =  window.atob(base64String);
    let len = binary_string.length;
    let bytes = new Uint8Array(len);
    for (let i = 1; i < len-1; i++)        {
      bytes[i] = binary_string.charCodeAt(i);
    }
    return bytes.buffer;
  }

  GenerateReport() {
    this.showReport = false;
    console.log('::::generating report::::', moment(this.bsValue).format('MM/DD/YYYY')+' ::: ' +moment(this.bsValueTwo).format('MM/DD/YYYY'));

  const fromDate = moment(this.bsValue).format('MM/DD/YYYY'),
        toDate = moment(this.bsValueTwo).format('MM/DD/YYYY'),
        userId = 1,
        TimeZone = 'Eastern Standard Time',
        LocationId = 1148;

    this.haccpReportingService.getReportsPdfData(fromDate, toDate, userId, LocationId, TimeZone).then(  (result) => {

      console.log(':::::', result);
      //let pdfBaseString = result._body.
     this.pdfSrc = this.base64ToArrayBuffer(result.content);

     //console.log('::::::::::', this.base64ToArrayBuffer(this.pdfSrc));
    });

    this.showReport = true;
  }

}
