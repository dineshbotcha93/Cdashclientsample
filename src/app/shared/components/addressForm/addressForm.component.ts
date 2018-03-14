import {Component, OnInit, EventEmitter} from "@angular/core";
import { Input, Output } from "@angular/core";
import { FormGroup,FormBuilder ,FormControl,Validators, ReactiveFormsModule } from '@angular/forms';
import {AddressFormService} from "./addressForm.service";
import {FillDetailsService} from "../../../user-management/user-create/fill-details/fill-details.service";


@Component({
  selector: 'address-form-component',
  template: `
	<form [formGroup]="addressForm">
    <div class="form-group">
      <label for="country">Country</label>
      <select formControlName="country" (change)="onSelectCountry($event.target.value)"> 
        <option *ngFor="let country of countries" [ngValue]="country.name">{{country.name}}</option>
      </select>
    </div>
		<div class="form-group">
			<label for="street">Address 1</label>
			<input name="street" class="form-control" type="text" formControlName="street" />
			<div *ngIf="addressForm.get('street').touched">
				<div *ngIf="addressForm.get('street').hasError('required')">This field is required.</div>
			</div>
		</div>
		<div class="form-group">
			<label for="housenumber">Address 2</label>
			<input name="housenumber" class="form-control" type="text" formControlName="housenumber" />
			<!--<div *ngIf="addressForm.get('housenumber').touched">
				<div *ngIf="addressForm.get('housenumber').hasError('required')">This field is required.</div>
			</div>-->
		</div>
		<div class="form-group">
			<label for="city">City</label>
			<input name="city" class="form-control" type="text" formControlName="city" />
			<div *ngIf="addressForm.get('city').touched">
				<div *ngIf="addressForm.get('city').hasError('required')">This field is required.</div>
			</div>
		</div>
    <div class="form-group">
      <label for="state">State</label>
      <select formControlName="state">
        <option *ngFor="let state of states" [ngValue]="state.name">{{state.name}}</option>
      </select>
    </div>
		<div class="form-group">
			<label for="zipcode">Postal Code</label>
			<input name="zipcode" class="form-control" type="text" formControlName="zipcode" />
			<div *ngIf="addressForm.get('zipcode').touched">
				<div *ngIf="addressForm.get('zipcode').hasError('required')">This field is required.</div>
			</div>
		</div>
	</form>
`,
  providers: [AddressFormService]
})
export class AddressFormComponent implements OnInit {


  @Output()
  private formReady : EventEmitter<FormGroup> = new EventEmitter<FormGroup>();
  public addressForm: FormGroup;

  private states = [];
  private countries = [];
  private selectedCountry = 'united states';

  constructor(private fb: FormBuilder, private AddressFormService: AddressFormService) {
    this.addressForm = this.fb.group({
      "street": new FormControl("", Validators.required),
      "housenumber": new FormControl(),
      "city": new FormControl("", Validators.required),
      "zipcode": new FormControl("", [Validators.required, Validators.pattern(/\d+/g)]),
      "state": new FormControl(),
      "country": new FormControl()
    });

    this.AddressFormService.getStates().subscribe((e)=>{
      this.states = e[0];
      console.log(this.states);
    })
    this.AddressFormService.getCountries().subscribe((e)=>{
      this.countries = e[0];
      console.log(this.countries);
    });

  }

  ngOnInit(): void {
    this.formReady.emit(this.addressForm);

    console.log('addressform oninit', this.addressForm.value);
  }

  onSelectCountry(countryid) {
    console.log('selected country;', countryid);

  }
}
