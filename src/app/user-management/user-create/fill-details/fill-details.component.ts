import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {FillDetailsService} from './fill-details.service';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {AccountRegistrationForm} from './fill-details.component.model';
import {AddressFormComponent} from '../../../shared/components/addressForm/addressForm.component';
import {add} from 'ngx-bootstrap/chronos';


@Component({
  selector: 'fill-details',
  templateUrl: './fill-details.html',
  styleUrls: ['./fill-details.component.scss'],
  providers: [FillDetailsService]
})

export class FillDetailsComponent implements OnInit, AfterViewInit {
  selectedStep: number;
  industries: Array<object> = [];
  businessType: Array<object> = [];
  selectedIndustry: object;
  businessTypeSelection: Array<object> = [];
  timeZones: Array<object> = [];
  placeOfPurchase: Array<object> = [];
  stepOneData = {};

  public accountForm: FormGroup;
  private accountInfo: any;
  postData: object = {};

  @ViewChild('addressForm')
  addressForm: AddressFormComponent;

  public accountUpdateStatus: any = {
    error: false,
    message: ''
  };

  constructor(private fillDetailsService: FillDetailsService, private router: Router, private fb: FormBuilder, private route: ActivatedRoute) {
    this.selectedStep = 2;

    this.stepOneData = route.data.map(d => d.userData);

    this.accountInfo = {};


    this.fillDetailsService.getIndustries().subscribe((e) => {
      e.forEach((res) => {
        res.forEach((r) => {
          if (r.Parent == null) {
            this.industries.push({id: r.IndustryClassificationID, name: r.Name});
          } else {
            this.businessType.push({id: r.Parent, name: r.Name});
          }
        });
      });
    });
    this.fillDetailsService.getTimeZones().subscribe((e) => {
      e[0].forEach((tZ) => {
        this.timeZones.push({id: tZ.TimeZoneID, name: tZ.DisplayName});
      });
    });
    this.placeOfPurchase = [
      {name: 'Foodservice Distributor'},
      {name: 'HVAC/R Wholesaler'},
      {name: 'Industrial Catalog'},
      {name: 'Online'},
      {name: 'Other'}
    ];
  }

  ngOnInit() {
    this.accountForm = this.fb.group({
      company_name: new FormControl('', Validators.required),
      industry_type: new FormControl('', Validators.required),
      business_type: new FormControl('', Validators.required),
      timeZone: new FormControl('', Validators.required),
      placeOfPurchase: new FormControl('', Validators.required),
      zip_postalcode: new FormControl('', Validators.required)
    });
  }

  ngAfterViewInit() {
    this.fillDetailsService.fetchExistingUserInfo()
      .then(data => {
        console.log('user info', data.account[0]);
        this.accountInfo = data.account[0];
        this.accountForm.patchValue({
          company_name: this.accountInfo.companyName,
          timeZone: this.accountInfo.timeZoneID,
          placeOfPurchase: this.accountInfo.reselect
        });
        this.addressForm.addressForm.patchValue({
          country: this.accountInfo.country,
          street: this.accountInfo.address,
          housenumber: this.accountInfo.address2,
          city: this.accountInfo.city,
          zipcode: this.accountInfo.postalCode,
          state: this.accountInfo.state,
        });
      })
      .catch(error => {
        console.log('error in fetching user details info', error.message);
      });
  }


  private addFormControl(name: string, formGroup: FormGroup): void {
    this.accountForm.addControl(name, formGroup);
  }

  industryChanged(id) {
    console.log('selected industry', id);
    this.businessTypeSelection = this.businessType.filter((res) => res['id'] == id);
  }

  onPrevious($event) {
    console.log($event);
    this.router.navigate(['user-register/user-create/fill-details']);
  }

  onNext($event) {
    console.log('not implemented yet');
  }

  onSubmit() {
    console.log(this.accountForm.value);
    // if(this.accountForm.valid){

    console.log(this.accountForm.value);

    // set the token to the header before making the api call

    this.prepareAccountRegistrationForm();
    // submit data to the new account creation api
    // this.createNewUserAccount(this.accountForm);

    this.updateExistingUserAccount(this.accountForm, this.addressForm.addressForm);

  }

  private createNewUserAccount(accountForm: FormGroup) {

    this.fillDetailsService.createNewUserAccount(accountForm.value).then((e) => {
      console.log(e);
    });

  }

  private updateExistingUserAccount(accountForm: FormGroup, addressForm: FormGroup) {
    console.log('update existing user account', accountForm);

    const payloadData = {
      accountID: this.accountInfo.accountID,
      timeZone: accountForm.get('timeZone').value,
      resellerID: this.accountInfo.resellerID,
      companyName: accountForm.get('company_name').value,
      address: addressForm.get('street').value,
      address2: addressForm.get('housenumber').value,
      city: addressForm.get('city').value,
      state: addressForm.get('state').value,
      country: addressForm.get('country').value,
      postalCode: addressForm.get('zipcode').value
    };

    this.fillDetailsService.updateExistingUserInfo(payloadData)
      .then((data) => {
        console.log('Update Works', data);
      })
      .catch((error) => {
        this.accountUpdateStatus.error = true;
        this.accountUpdateStatus.message = error.message;
        console.log('error occured', error);
      });
  }

  private prepareAccountRegistrationForm() {

    //prepare the post data here
  }
}
