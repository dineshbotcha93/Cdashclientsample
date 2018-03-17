import {Component, OnInit, EventEmitter} from "@angular/core";
import { Input, Output } from "@angular/core";
import { FormGroup,FormBuilder ,FormControl,Validators, ReactiveFormsModule } from '@angular/forms';



@Component({
  selector: 'network-setup',
  templateUrl: './networkSetup.component.html'
})
export class NetworkSetupComponent implements OnInit {


  public networkFormSetup: FormGroup;
  selectedStep: number;


  constructor(private fb: FormBuilder) {

    this.selectedStep = 3;

    this.networkFormSetup = this.fb.group({

    });
  }

  ngOnInit(): void {

  }

  private addFormControl(name: string, formGroup: FormGroup) : void {
    console.log('::::::setup network form:::');
    this.networkFormSetup.addControl(name, formGroup);
  }

  onSubmit() {
    console.log('::::::create network form:::', this.networkFormSetup.value);
  }

}
