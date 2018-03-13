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
  @Input() loading = false;

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
}
