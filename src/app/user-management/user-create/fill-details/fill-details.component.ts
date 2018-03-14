import { Component, OnInit } from '@angular/core';
import { FillDetailsService } from './fill-details.service';
import {Router} from '@angular/router';
import { FormGroup,FormBuilder ,FormControl,Validators , FormsModule, ReactiveFormsModule } from '@angular/forms';


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

  public accountForm: FormGroup;

  constructor(private fillDetailsService: FillDetailsService, private router: Router, private fb: FormBuilder){
    this.selectedStep = 2;
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

  industryChanged(){
    console.log("selected industry");
    console.log(this.selectedIndustry);
    this.businessTypeSelection = this.businessType.filter((res)=>res['id'] == this.selectedIndustry );
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
    if(this.accountForm.valid){
      console.log("form is valid");
      console.log(this.accountForm.value);
    } else {

    }
  }
}
