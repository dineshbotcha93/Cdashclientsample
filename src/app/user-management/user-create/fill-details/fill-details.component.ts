import {AfterViewInit, Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {FillDetailsService} from './fill-details.service';
import {UserManagementService} from '../../user-management.service';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {AddressFormComponent} from '../../../shared/components/addressForm/addressForm.component';


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
  stepOneData: any = null;

  public accountForm: FormGroup;
  public isNewMaster = false;
  public accountInfo: any = null;
  private email = null;
  postData: object = {};
  disableSubmitButton = true;

  @ViewChild('addressForm')
  addressForm: AddressFormComponent;

  @Output()
  private enableSubmit: EventEmitter<any> = new EventEmitter<any>();

  public accountUpdateStatus: any = {
    error: false,
    message: ''
  };

  constructor(private fillDetailsService: FillDetailsService, private router: Router, private fb: FormBuilder, private route: ActivatedRoute, private userManagementService: UserManagementService) {
    this.selectedStep = 2;
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
      conditionsCheck: new FormControl(false, Validators.requiredTrue),
    });
  }

  ngAfterViewInit() {
    this.stepOneData = this.userManagementService.getRegistrationData();

    if (this.stepOneData) {
      this.isNewMaster = this.stepOneData.isNewMaster;
      this.email = this.stepOneData.email;
    }

    if (!this.isNewMaster) {
      this.accountForm.get('business_type').clearValidators();
      this.accountForm.get('business_type').updateValueAndValidity();

      this.accountForm.get('industry_type').clearValidators();
      this.accountForm.get('industry_type').updateValueAndValidity();


      this.accountForm.get('placeOfPurchase').clearValidators();
      this.accountForm.get('placeOfPurchase').updateValueAndValidity();

      this.fillDetailsService.fetchExistingUserInfo()
        .then(data => {
          console.log('user info', data.account[0]);
          this.accountInfo = data.account[0];
          this.email = data.email;
          this.accountForm.patchValue({
            company_name: this.accountInfo.companyName,
            timeZone: this.accountInfo.timeZone,
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
  }


  public addFormControl(name: string, formGroup: FormGroup): void {
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
    this.accountUpdateStatus.error = !this.accountForm.valid || !this.addressForm.validateAddress();

    if (!this.accountUpdateStatus.error) {
      if (this.isNewMaster) {
        this.createNewMasterUser(this.accountForm, this.addressForm.addressForm);
      } else {
        this.updateExistingUserAccount(this.accountForm, this.addressForm.addressForm);
      }
    }
  }

  private updateExistingUserAccount(accountForm: FormGroup, addressForm: FormGroup) {
    const coordinates = this.addressForm.getCoordinates();
    const selectedTimeZone: any = this.fetchTimeZone(this.accountForm.get('timeZone').value);
    const reseller: any = this.placeOfPurchase.find((pop: any) => {
      return pop.name === accountForm.get('placeOfPurchase').value;
    });

    const payloadData = {
      accountID: this.accountInfo.accountID,
      timeZone: selectedTimeZone.id,
      resellerID: 1,
      companyName: accountForm.get('company_name').value,
      address: addressForm.get('street').value,
      address2: addressForm.get('housenumber').value,
      city: addressForm.get('city').value,
      state: addressForm.get('state').value,
      country: addressForm.get('country').value,
      postalCode: addressForm.get('zipcode').value,
      latitude: coordinates.latitude,
      longitude: coordinates.longitude,
    };

    this.fillDetailsService.updateExistingUserInfo(payloadData)
      .then((data) => {
        //this.router.navigate(['/user-register/user-create/fill-details'], { queryParams: { email: this.userRegisterModel.email}});
        this.router.navigate(['/user-register/user-create/fill-details/network-setup']);
      })
      .catch((error) => {
        this.accountUpdateStatus.error = true;
        this.accountUpdateStatus.message = error.message;
        console.log('error occured', error);
      });
  }

  private fetchTimeZone(name): any {
    return this.timeZones.find((timezone: any) => {
      return timezone.name === name;
    });
  }

  public isValidAddress($event) {
    this.disableSubmitButton = !$event;
  }

  private createNewMasterUser(accountForm: FormGroup, addressForm: FormGroup) {
    const coordinates = this.addressForm.getCoordinates();
    const payloadData = {
      dashboardUserName: this.stepOneData.dashboardUserName,
      dashboardPassword: this.stepOneData.dashboardPassword,
      firstName: this.stepOneData.firstName,
      lastName: this.stepOneData.lastName,
      productName: this.stepOneData.productName,
      email: this.stepOneData.email,
      account: {
        companyName: accountForm.get('company_name').value,
        address: addressForm.get('street').value,
        address2: addressForm.get('housenumber').value,
        city: addressForm.get('city').value,
        state: addressForm.get('state').value,
        country: addressForm.get('country').value,
        postalCode: addressForm.get('zipcode').value,
        purchaseLocation: accountForm.get('placeOfPurchase').value,
        industryType: accountForm.get('industry_type').value,
        businessType: accountForm.get('business_type').value,
        timeZone: this.fetchTimeZone(accountForm.get('timeZone').value).id,
        latitude: coordinates.latitude,
        longitude: coordinates.longitude,
      }
    };


    this.userManagementService.registerNewMaster(payloadData, this.stepOneData.registrationToken)
      .then((data) => {
        localStorage.setItem('com.cdashboard.token', data);

        //this.router.navigate([`/user-register/user-create/${this.stepOneData.email}/network-setup`]);
        this.router.navigate([`/user-register/user-create/fill-details/network-setup`]);
      })
      .catch(error => {
        this.accountUpdateStatus.error = true;
        this.accountUpdateStatus.message = error.message;
      });
  }
}
