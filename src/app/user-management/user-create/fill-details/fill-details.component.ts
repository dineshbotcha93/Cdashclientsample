import { Component, OnInit } from '@angular/core';
import { FillDetailsService } from './fill-details.service';
import {Router, ActivatedRoute} from '@angular/router';
import { FormGroup,FormBuilder ,FormControl,Validators , FormsModule, ReactiveFormsModule } from '@angular/forms';
import {NewUserRegistrationForm , AccountRegistrationForm } from "./fill-details.component.model";


@Component({
  selector: 'fill-details',
  templateUrl: './fill-details.html',
  styleUrls: ['./fill-details.component.scss'],
  providers: [FillDetailsService]
})

export class FillDetailsComponent implements OnInit {
  selectedStep: number;
  industries: Array<object> = [];
  businessType: Array<object> = [];
  selectedIndustry: object;
  businessTypeSelection: Array<object> = [];
  timeZones: Array<object> = [];
  placeOfPurchase: Array<object> = [];
  stepOneData = {};

  public accountForm: FormGroup;
  postData: object = {};

  constructor(private fillDetailsService: FillDetailsService, private router: Router, private fb: FormBuilder, private route: ActivatedRoute){
    this.selectedStep = 2;

    this.stepOneData = route.data.map(d => d.userData);



    this.fillDetailsService.getIndustries().subscribe((e)=>{
      e.forEach((res)=>{
        res.forEach((r)=>{
          if(r.Parent == null){
            this.industries.push({id:r.IndustryClassificationID, name: r.Name});
          } else {
            this.businessType.push({id:r.Parent, name: r.Name});
          }
        });
      })
    })
    this.fillDetailsService.getTimeZones().subscribe((e)=>{
      e[0].forEach((tZ)=>{
        this.timeZones.push({id:tZ.TimeZoneID,name:tZ.DisplayName});
      });
    });
    this.placeOfPurchase = [
      {name:'Foodservice Distributor'},
      {name:'HVAC/R Wholesaler'},
      {name:'Industrial Catalog'},
      {name:'Online'},
      {name:'Other'}
    ]
  }

  ngOnInit(){


    this.accountForm = this.fb.group({
      "company_name": new FormControl("", Validators.required),
      "industry_type": new FormControl("", Validators.required),
      "business_type": new FormControl("", Validators.required),
      "timeZone": new FormControl("", Validators.required),
      "placeOfPurchase": new FormControl("", Validators.required),
      "zip_postalcode": new FormControl("", Validators.required)
    });


  }


  private addFormControl(name: string, formGroup: FormGroup) : void {
    this.accountForm.addControl(name, formGroup);
  }

  industryChanged(id){
    console.log("selected industry", id);
    this.businessTypeSelection = this.businessType.filter((res)=>res['id'] == id );
  }

  onPrevious($event){
    console.log($event);
    this.router.navigate(['user-register/user-create/fill-details']);
  }

  onNext($event){
    console.log("not implemented yet");
  }

  onSubmit(){
    console.log("form..");
    console.log(this.accountForm.value);
   // if(this.accountForm.valid){

      console.log(this.accountForm.value);

      // set the token to the header before making the api call

    this.prepareAccountRegistrationForm();
      // submit data to the new account creation api
      this.createNewUserAccount(this.accountForm);

   /* } else {

    }*/
  }

  private createNewUserAccount(accountForm: FormGroup) {

    this.fillDetailsService.createNewUserAccount(accountForm.value).then((e)=>{
      console.log(e);
    })

  }

  private prepareAccountRegistrationForm() {

    //prepare the post data here
  }
}
