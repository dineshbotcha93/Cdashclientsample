import {
  Component,
  ViewChild,
  ViewChildren,
  QueryList,
  ChangeDetectorRef,
  OnInit
} from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

@Component({
  selector: 'modal-content',
  template: `
    <div class="modal-header">
      <h4 class="modal-title pull-left">{{title}}</h4>
      <button type="button" class="close pull-right" aria-label="Close" (click)="close()">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body">
      <textarea cols="30" rows="10" style="width:100%">
      </textarea>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-default" (click)="close()">{{closeBtnName}}</button>
      <button type="button" class="btn btn-default" (click)="save()">{{saveBtnName}}</button>
    </div>
  `
})

export class ModalContentComponent implements OnInit {
  title: string;
  closeBtnName: string;
  list: any[] = [];

  constructor(public bsModalRef: BsModalRef) {}
  close(){
    this.bsModalRef.hide();
    // hacky way of eliminating the backdrop and restoring state - its a bug on ngx-bootstrap
    document.body.removeChild(document.getElementsByTagName('modal-container')[0]);
    if(document.getElementsByTagName('bs-modal-backdrop')[0]){
      document.body.removeChild(document.getElementsByTagName('bs-modal-backdrop')[0]);
    }
  }
  save(){
    console.log('not implemented yet');
  }
  ngOnInit() {
    this.title = "Add Comments";
    this.list.push('PROFIT!!!');
  }
}
