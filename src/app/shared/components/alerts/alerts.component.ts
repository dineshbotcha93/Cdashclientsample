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
  constructor(public alertSandbox$: AlertSandbox){
    this.alertSandbox$.getAlert().subscribe((e)=>{
      if(e == true){
        this.showDiv = true;
        setTimeout(()=>{
          this.showDiv = false;
          this.showAlert();
        },2000)
      }
    });
    this.alertSandbox$.getSuccess().subscribe((e)=>{
      if(e == true){
        this.showGood = true;
        setTimeout(()=>{
          this.showGood = false;
          this.showSuccess();
        },2000)
      }
    });
    this.alertSandbox$.getWarning().subscribe((e)=>{
      if(e == true){
        this.isWarning = true;
        setTimeout(()=>{
          this.isWarning = false;
          this.showWarning();
        },2000)
      }
    });
  }

  showAlert(){
    this.alertSandbox$.showAlert();
  }

  showSuccess(){
    this.alertSandbox$.showSuccess();
  }

  showWarning(){
    this.alertSandbox$.showWarning();
  }

}
