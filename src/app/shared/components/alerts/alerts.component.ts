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
  private alertSandboxSubscription;
  private successSandboxSubscription;
  private warningSandboxSubscription;
  @Input() close;
  constructor(public alertSandbox$: AlertSandbox){

  }

  ngOnInit(){
    this.alertSandboxSubscription = this.alertSandbox$.getAlert().subscribe((e)=>{
      if(e.type == true){
        this.showDiv = true;
        this.alertContent = e.payload['data'];
        if(e.payload['autohide'] || (e.payload['autohide']==undefined)){
          setTimeout(()=>{
            this.showDiv = false;
            this.showAlert(e.payload);
          },2000)
        }
      }
    });
    this.successSandboxSubscription = this.alertSandbox$.getSuccess().subscribe((e)=>{
      if(e.type == true){
        this.showGood = true;
        this.successContent = e.payload['data'];
        if(e.payload['autohide'] || (e.payload['autohide']==undefined)){
          setTimeout(()=>{
            this.showGood = false;
            this.showSuccess();
          },2000);
        }
      }
    });
    this.warningSandboxSubscription = this.alertSandbox$.getWarning().subscribe((e)=>{
      if(e.type == true){
        this.isWarning = true;
        this.warningContent = e.payload['data'];
        if(e.payload['autohide'] || (e.payload['autohide']==undefined)){
          setTimeout(()=>{
            this.isWarning = false;
            this.showWarning();
          },2000)
        }
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

  onClose(type){
    if(type=='alert'){
      this.showDiv = false;
      this.showAlert();
    }
    if(type=='success'){
      this.showGood = false;
      this.showSuccess();
    }
    if(type=='warning'){
      this.isWarning = false;
      this.showWarning();
    }
  }

  ngOnDestroy(){
    this.alertSandboxSubscription.unsubscribe();
    this.successSandboxSubscription.unsubscribe();
    this.warningSandboxSubscription.unsubscribe();
  }

}
