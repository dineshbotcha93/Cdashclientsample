import {Component, Input,EventEmitter,OnInit, Output} from '@angular/core';

import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'modal',
  templateUrl: './modal.component.html'
})
export class ModalComponent {

  @Input() title : string;
  @Input()
  isOpen = false;

  closeResult: string;

  constructor(private modalService: NgbModal) {
  }

  open(content) {
    this.modalService.open(content).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  @Output()
  onClose = new EventEmitter<string>();

  closePopup() {
    this.isOpen = false;
    this.onClose.emit('Pop-up window closed');
  }


  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }
}
