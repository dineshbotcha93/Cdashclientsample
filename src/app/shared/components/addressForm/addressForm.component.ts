import {Component, OnInit, EventEmitter} from "@angular/core";
import { Input, Output } from "@angular/core";
import { FormGroup,FormBuilder ,FormControl,Validators, ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'address-form-component',
  template: `
	<form [formGroup]="addressForm">
		<div class="form-group">
			<label for="street">street</label>
			<input name="street" class="form-control" type="text" formControlName="street" />
			<div *ngIf="addressForm.get('street').touched">
				<div *ngIf="addressForm.get('street').hasError('required')">This field is required.</div>
			</div>
		</div>
		<div class="form-group">
			<label for="housenumber">housenumber</label>
			<input name="housenumber" class="form-control" type="text" formControlName="housenumber" />
			<div *ngIf="addressForm.get('housenumber').touched">
				<div *ngIf="addressForm.get('housenumber').hasError('required')">This field is required.</div>
			</div>
		</div>
		<div class="form-group">
			<label for="city">city</label>
			<input name="city" class="form-control" type="text" formControlName="city" />
			<div *ngIf="addressForm.get('city').touched">
				<div *ngIf="addressForm.get('city').hasError('required')">This field is required.</div>
			</div>
		</div>
		<div class="form-group">
			<label for="zipcode">zipcode</label>
			<input name="zipcode" class="form-control" type="text" formControlName="zipcode" />
			<div *ngIf="addressForm.get('zipcode').touched">
				<div *ngIf="addressForm.get('zipcode').hasError('required')">This field is required.</div>
			</div>
		</div>
	</form>
`
})
export class AddressFormComponent implements OnInit {


  @Output()
  private formReady : EventEmitter<FormGroup> = new EventEmitter<FormGroup>();
  public addressForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.addressForm = this.fb.group({
      "street": new FormControl("", Validators.required),
      "housenumber": new FormControl("", [Validators.required, Validators.pattern(/\d+/g)]),
      "city": new FormControl("", Validators.required),
      "zipcode": new FormControl("", [Validators.required, Validators.pattern(/\d+/g)])
    });
  }

  ngOnInit(): void {
    this.formReady.emit(this.addressForm);

    console.log('addressform oninit', this.addressForm.value);
  }
}
