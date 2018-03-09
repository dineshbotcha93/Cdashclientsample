import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector:'user-flow-buttons',
  styleUrls: ['./flow-buttons.component.scss'],
  templateUrl: './flow-buttons.component.html',
})

export class FlowButtonsComponent {
  @Output() onPreviousEmitter: EventEmitter<any> = new EventEmitter();
  @Output() onNextEmitter: EventEmitter<any> = new EventEmitter();

  onPrevious($event){
    this.onPreviousEmitter.emit("clicked");
  }

  onNext($event){
    this.onNextEmitter.emit("clicked");
  }
}
