import {Component, OnInit, EventEmitter} from "@angular/core";
import { Input, Output } from "@angular/core";
import { NetworkSetupService } from '../../../user-management/user-create/networkSetup/networkSetup.service';
import { FormGroup,FormBuilder ,FormControl,Validators, ReactiveFormsModule } from '@angular/forms';



@Component({
  selector: 'create-network',
  templateUrl: './createNetwork.component.html'
})
export class CreateNetworkComponent implements OnInit {

  @Output()
  private formReady: EventEmitter<FormGroup> = new EventEmitter<FormGroup>();
  @Output()
  private enableSubmit: EventEmitter<any> = new EventEmitter<any>();
  @Output()
  private grabbedCoordinates: EventEmitter<any> = new EventEmitter<any>();
  @Output()
  private copyAccountAddress: EventEmitter<any> = new EventEmitter<any>();
  public createNetworkForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.createNetworkForm = this.fb.group({
      "name": new FormControl("", Validators.required),
      "isActive": new FormControl("", Validators.required)

    });
  }

  ngOnInit(): void {
    this.formReady.emit(this.createNetworkForm);

  }

  public addFormControl(name: string, formGroup: FormGroup) : void {

    this.createNetworkForm.addControl(name, formGroup);
  }

  public isValidAddress($event) {
    console.log('is valid address');
    console.log($event);
    this.enableSubmit.emit($event);
  }

  public grabCoordinates($event) {
    console.log('grabbed coordinates is');
    console.log($event);
    this.grabbedCoordinates.emit($event);
  }

  public copyAddress($event) {
    this.copyAccountAddress.emit($event);
  }

}
