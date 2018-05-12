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
import {HaccpReportingService} from "../services/haccpReporting.service";
import {BsModalRef} from "ngx-bootstrap/modal/bs-modal-ref.service";
import * as moment from 'moment/moment';

@Component({
  selector: 'app-checklist-report',
  templateUrl: './checkListReport.component.html',
  styles: [
    `.btn-generate { margin-top: 20px}
    .pdf-scroll {overflow:scroll;height:340px}
    .groupby-control {width:14%}`
  ]
})
export class CheckListReportComponent  {

  private filterByGroup = 'date';
  private filterByQesType = 'select'
  bsValue: Date = moment().subtract(1, 'days').toDate();
  bsValueTwo: Date = moment().toDate();
  bsRangeValue: any = [this.bsValue , this.bsValueTwo];
  bsModalRef: BsModalRef;
  private locationId = '';
  private pdfSrc;
  private showReport = false;

  constructor(
    private router:Router,
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
    console.log('::::generating report::::', moment(this.bsValue).format('MM/DD/YYYY')+' ::: ' +moment(this.bsValueTwo).format('MM/DD/YYYY') + ' ' + this.filterByGroup + ' ' + this.filterByQesType);
    this.showReport = false;

    const fromDate = moment(this.bsValue).format('MM/DD/YYYY'),
      toDate = moment(this.bsValueTwo).format('MM/DD/YYYY'),
      userId = 1,
      LocationId = 1148,
      groupBy = this.filterByGroup;

    this.haccpReportingService.getCheckListReportsPdfData(fromDate, toDate, userId, LocationId, groupBy).then(  (result) => {
      this.pdfSrc = this.base64ToArrayBuffer(result.content);
      //console.log('::::::::::', this.base64ToArrayBuffer(this.pdfSrc));
    });
    this.showReport = true;
  }

}
