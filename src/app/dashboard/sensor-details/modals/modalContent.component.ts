import {
  Component,
  ViewChild,
  ViewChildren,
  QueryList,
  ChangeDetectorRef,
  OnInit
} from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { SensorDetailsService } from '../services/sensor-details.service';

@Component({
  selector: 'modal-content',
  providers:[SensorDetailsService],
  template: `
    <div class="modal-header">
      <h4 class="modal-title pull-left">{{title}}</h4>
      <button type="button" class="close pull-right" aria-label="Close" (click)="close()">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body">
      <textarea cols="30" rows="10" style="width:100%" [(ngModel)]="commentsBox">
      </textarea>
    </div>
    <div class="modal-footer">
      <input type="hidden" value="{{detailId}}" />
      <button type="button" class="btn btn-default" (click)="close()">{{closeBtnName}}</button>
      <button type="button" class="btn btn-default" (click)="save()">{{saveBtnName}}</button>
    </div>
  `
})

export class ModalContentComponent implements OnInit {
  title: string;
  closeBtnName: string;
  list: any[] = [];
  commentsBox: string;

  constructor(
    public bsModalRef: BsModalRef,
    private sensorDetailsService: SensorDetailsService
  ) {
    console.log(this);
  }
  close(){
    this.bsModalRef.hide();
  }
  save(){
    const requestData = {
      sensorID:this['detailId'],
      note: this.commentsBox
    }
    this.sensorDetailsService.saveComments(requestData).then((e)=>{
      this.close();
    })
  }
  ngOnInit() {
    this.title = "Add Comments";
    this.list.push('PROFIT!!!');
  }
}
