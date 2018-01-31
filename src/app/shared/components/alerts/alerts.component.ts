import { Component, ViewEncapsulation, Input } from '@angular/core';
import { AlertSandbox } from './alerts.sandbox';
@Component({
  selector:'app-alerts',
  styleUrls: ['./alerts.component.scss'],
  providers:[AlertSandbox],
  templateUrl:'alerts.component.html'
})

export class AlertsComponent {
  private showDiv;
  private showGood;
  private isWarning;
  private alertContent;
  private successContent;
  private warningContent;
  constructor(public alertSandbox$: AlertSandbox){
    this.alertSandbox$.getAlert().subscribe((e)=>{
      if(e.type == true){
        this.showDiv = true;
        this.alertContent = e.payload['data'];
        setTimeout(()=>{
          this.showDiv = false;
          this.showAlert(e.payload);
        },2000)
      }
    });
    this.alertSandbox$.getSuccess().subscribe((e)=>{
      if(e.type == true){
        this.showGood = true;
        this.successContent = e.payload['data'];
        setTimeout(()=>{
          this.showGood = false;
          this.showSuccess();
        },2000)
      }
    });
    this.alertSandbox$.getWarning().subscribe((e)=>{
      if(e.type == true){
        this.isWarning = true;
        this.warningContent = e.payload['data'];
        setTimeout(()=>{
          this.isWarning = false;
          this.showWarning();
        },2000)
      }
    });
  }

  showAlert(content = null){
    this.alertSandbox$.showAlert(content);
  }

  showSuccess(content = null){
    this.alertSandbox$.showSuccess(content);
  }

  showWarning(content = null){
    this.alertSandbox$.showWarning(content);
  }

}
