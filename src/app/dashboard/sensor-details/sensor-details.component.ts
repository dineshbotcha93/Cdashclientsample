import { Component, ViewChild, ViewChildren, QueryList, ChangeDetectorRef } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';
import { SensorDetailsService } from './services/sensor-details.service';
import { Router, ActivatedRoute } from '@angular/router';
import { BaseChartDirective } from 'ng2-charts/ng2-charts';
import { ChartOptions, ChartColors } from '../chart.config';
import { environment } from '../../../environments/environment';
import { DatePipe } from '@angular/common';
import { AlertSandbox } from '../../shared/components/alerts/alerts.sandbox';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { ModalContentComponent } from './modals/modalContent.component';
import { TranslateService } from '@ngx-translate/core';
import * as moment from 'moment/moment';
declare var jsPDF: any; // Important

@Component({
  selector: 'app-sensor-details',
  templateUrl: './sensor-details.component.html',
  styleUrls: ['./sensor-details.component.scss'],
  providers: [SensorDetailsService, AlertSandbox, BsModalService],
  encapsulation: ViewEncapsulation.None,
})
export class SensorDetailsComponent {
  private result;
  private sensorDetailsData;
  private detailId;
  private rows: Array<any> = ['N/A'];
  private columns: Array<any> = [];
  private limit: Number  = 10;
  private data: Array<any> = [];

  public chartLabels: Array<any> = [];
  public chartOptions: any = ChartOptions;
  public chartColors: Array<any> = [ChartColors];
  public chartData: Array<any> = [
    { data: this.data, label: 'Temperature Vs. Time', fill: false }
  ];
  @ViewChild('baseChart') chart: BaseChartDirective;
  @ViewChildren('tabs') tabs: QueryList<any>;
  bsValue: Date = moment().subtract(7, 'days').toDate();
  bsValueTwo: Date = moment().toDate();
  bsRangeValue: any = [new Date(2017, 7, 4), new Date(2017, 7, 20)];
  bsModalRef: BsModalRef;

  constructor(
    private sensorDetailsService: SensorDetailsService,
    private router: Router,
    private route: ActivatedRoute,
    private alertSandbox: AlertSandbox,
    private cd: ChangeDetectorRef,
    private modalService: BsModalService,
    private translate: TranslateService
  ) {
    this.route.params.subscribe((params) => {
      this.detailId = params.id.toString();
   });
    sensorDetailsService.getDetails(this.detailId).then((result) => {
      this.sensorDetailsData = result;
    });
    this.columns.push({prop: 'messageDate', name: 'Date'});
    this.columns.push({prop: 'signalStrength', name: 'Signal'});
    this.columns.push({prop: 'battery', name: 'Battery'});
    this.columns.push({prop: 'data', name: 'Reading'});

    this.translate.use('en');
  }

  ngAfterViewInit() {
    this.tabs.forEach((e) => {
      e.tabs.forEach((tab) => {
        if (tab.tabTitle === 'Graph') {
          tab.active = true;
        } else {
          tab.active = false;
        }
      });
      this.cd.detectChanges();
    });
  }

  onDateChange(event) {
    const fromDate = moment(this.bsValue).format('MM/DD/YYYY');
    const toDate = moment(this.bsValueTwo).format('MM/DD/YYYY');
    this.sensorDetailsService.getDataMessages(this.detailId, fromDate, toDate).then((result) => {
      this.result = result;
      this.rows = [];
      this.chartLabels = [];
      if (this.result.length === 0) {
        this.alertSandbox.showAlert({data: 'No Content'});
        return;
      }
      result.forEach((res) => {
        this.data.push(res.plotValue);
        this.chartLabels.push(moment(res.messageDate).format('MM/DD/YYYY hh:mm:ss').substring(11, 19));
        this.rows.push({
          data: res.plotValue,
          messageDate: moment(res.messageDate).format('MM/DD/YYYY hh:mm:ss'),
          signalStrength: res.signalStrength,
          battery: res.battery,
        });
      });
    }).then((e) => {
      this.cd.detectChanges();
    }).catch((e) => {
      this.alertSandbox.showAlert({data: 'No Content'});
    });
  }

  reset(attribute) {
    if (attribute === 'zoom') {
      this.chart.chart.resetZoom();
    }
  }

  export(){
    console.log('clicked');
    const a = new jsPDF();
    const doc = new jsPDF();
    const col = [
    {
      title: 'Date',
      dataKey: 'messageDate'
    },
    {
        title: 'Signal',
        dataKey: 'signalStrength'
    },
    {
      title: 'Battery',
      dataKey: 'battery'
    },
    {
      title: 'Reading',
      dataKey: 'data'
    },
  ];
    const rows = [];
    console.log(doc);
    const item = this.rows;
    console.log(item);

    for (var key in item) {
      const temp = [key, item[key]];
      rows.push(temp);
    };
    console.log(rows);
    doc.autoTable(col, this.rows);
    doc.save('SensorDetails.pdf');
  }


  onChartClick(event) {
    console.log(event);
  }

  goBack() {
    let networkId = localStorage.getItem("com.cdashboard.selectedNetworkId"); // fix for setting up selected network id
    this.router.navigate(['dashboard/sensor-summary', networkId]);
  }

  addComments(){
    const initialState = {
      list: [
        'Open a modal with component',
        'Pass your data',
        'Do something else',
        '...'
      ],
      title: 'Modal with component'
    };
    this.bsModalRef = this.modalService.show(ModalContentComponent, {initialState});
    this.bsModalRef.content.closeBtnName = 'Close';
    this.bsModalRef.content.saveBtnName = 'Save';
  }
}
