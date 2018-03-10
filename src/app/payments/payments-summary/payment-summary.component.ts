import {Component, EventEmitter, Input, Output} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Router} from '@angular/router';

@Component({
  selector: 'app-payment-success',
  templateUrl: './payments-summary.component.html'
})

export class PaymentSummaryComponent {

  @Input() title: string;
  @Input() isOpen = false;
  @Input() newRenewalDate: string = null;
  @Input() renewalError = false;

  constructor(private modalService: NgbModal, private router: Router) {
  }

  open(content) {
    this.modalService.open(content);
  }

  @Output()
  onClose = new EventEmitter<string>();

  closePopup() {
    this.isOpen = false;
    this.onClose.emit('Pop-up window closed');
  }

  routeToUserProfile() {
    this.router.navigate(['user-profile']);
  }


  /*private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }*/
}
