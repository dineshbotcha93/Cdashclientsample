import {Component, OnInit, EventEmitter} from "@angular/core";
import { Input, Output } from "@angular/core";
import { FormGroup,FormBuilder ,FormControl,Validators, ReactiveFormsModule } from '@angular/forms';
import {AddressFormService} from "./addressForm.service";


@Component({
  selector: 'address-form-component',
  templateUrl: './addressForm.component.html',
  providers: [AddressFormService]
})
export class AddressFormComponent implements OnInit {


  @Output()
  private formReady : EventEmitter<FormGroup> = new EventEmitter<FormGroup>();
  public addressForm: FormGroup;

  private states = [];
  private countries = [];
  private selectedCountry = 'united states';
  private isUsa = true;

  constructor(private fb: FormBuilder, private AddressFormService: AddressFormService) {

    this.addressForm = this.fb.group({
      "street": new FormControl("", Validators.required),
      "housenumber": new FormControl(),
      "city": new FormControl("", Validators.required),
      "zipcode": new FormControl("", [Validators.required]),
      "state": new FormControl(),
      "country": new FormControl()
    });

    this.loadCountries();
    this.loadStates();

    this.addressForm.valueChanges.forEach((v)=>{
      if(v.country!=='US'){
        this.isUsa = false;
      } else {
        this.isUsa = true;
      }
    })
  }

  ngOnInit(): void {
    this.formReady.emit(this.addressForm);
  }

  onSelectCountry(countryid) {
    console.log('selected country;', countryid);
   if(parseInt(countryid)!== 230){
     this.isUsa = false;
   } else {
     this.isUsa = true;
   }
  }

  loadStates() {

    this.AddressFormService.getStates().subscribe((e)=>{
      this.states = e[0];
      console.log(this.states);
    });
  }

  loadCountries() {

    this.AddressFormService.getCountries().subscribe((e)=>{
      this.countries = e[0];
      console.log(this.countries);
    });
  }

  validateAddress() {
      return true;
  }
}
