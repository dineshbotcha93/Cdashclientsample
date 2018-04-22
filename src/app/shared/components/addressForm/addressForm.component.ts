import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {AddressFormService} from './addressForm.service';
import {MapService} from '../../../shared/components/map/services/map.service';


@Component({
  selector: 'address-form-component',
  templateUrl: './addressForm.component.html',
  providers: [AddressFormService, MapService]
})
export class AddressFormComponent implements OnInit {


  @Output()
  private formReady: EventEmitter<FormGroup> = new EventEmitter<FormGroup>();
  @Output()
  private validAddress: EventEmitter<any> = new EventEmitter<any>();
  @Output()
  private coordinates: EventEmitter<any> = new EventEmitter<any>();
  public addressForm: FormGroup;

  private states = [];
  public countries = [];
  private selectedCountry = 'united states';
  public isUsa = true;
  public  latitude = null;
  public  longitude = null;
  private;

  constructor(private fb: FormBuilder,
              private AddressFormService: AddressFormService,
              private mapService: MapService) {

    this.addressForm = this.fb.group({
      'street': new FormControl('', Validators.required),
      'housenumber': new FormControl(),
      'city': new FormControl('', Validators.required),
      'zipcode': new FormControl('', [Validators.required]),
      'state': new FormControl(),
      'country': new FormControl('', [Validators.required]),
    });

    this.loadCountries();
    this.loadStates();

    this.addressForm.valueChanges.forEach((v) => {
      if (v.country !== 'US') {
        this.isUsa = false;
      } else {
        this.isUsa = true;
      }
      if (this.addressForm.get('country').value !== 'Select Country' &&
        this.addressForm.get('country').value !== '' &&
        this.addressForm.valid
      ) {
        const country = this.addressForm.get('country').value || '';
        const street = this.addressForm.get('street').value || '';
        const city = this.addressForm.get('city').value || '';
        const zipcode = this.addressForm.get('zipcode').value || '';
        const state = this.addressForm.get('state').value || '';
        const housenumber = this.addressForm.get('housenumber').value || '';
        this.mapService.geoCode(housenumber + street + city + zipcode + state + country).then((geoCoded) => {
          if (geoCoded.status === 'OK') {
            console.log('geo code', geoCoded);

            if (geoCoded.results[0]) {
              this.latitude = geoCoded.results[0].geometry.location.lat;
              this.longitude = geoCoded.results[0].geometry.location.lng;
            }
            this.validateAddress();
            this.getCoordinates();
          }
        });
      } else {
        this.getCoordinates();
        this.validAddress.emit(false);
      }
    });
  }

  ngOnInit(): void {
    this.formReady.emit(this.addressForm);
  }

  onSelectCountry(countryid) {
    console.log('selected country;', countryid);
    if (parseInt(countryid) !== 230) {
      this.isUsa = false;
    } else {
      this.isUsa = true;
    }
  }

  loadStates() {

    this.AddressFormService.getStates().subscribe((e) => {
      this.states = e[0];
      console.log(this.states);
    });
  }

  loadCountries() {

    this.AddressFormService.getCountries().subscribe((e) => {
      this.countries = e[0];
      console.log(this.countries);
    });
  }

  validateAddress() {
    this.validAddress.emit(true);
    return true;
  }

  getCoordinates() {
    this.coordinates.emit({
      latitude:this.latitude,
      longitude:this.longitude
    });
    return {
      latitude: this.latitude,
      longitude: this.longitude,
    };
  }
}
