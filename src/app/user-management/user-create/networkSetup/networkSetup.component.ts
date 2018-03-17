import {Component, OnInit, EventEmitter} from "@angular/core";
import { Input, Output } from "@angular/core";
import { FormGroup,FormBuilder ,FormControl,Validators, ReactiveFormsModule } from '@angular/forms';



@Component({
  selector: 'network-setup',
  templateUrl: './networkSetup.component.html'
})
export class NetworkSetupComponent implements OnInit {


  public networkFormSetup: FormGroup;


  constructor(private fb: FormBuilder) {

    this.networkFormSetup = this.fb.group({

    });
  }

  ngOnInit(): void {

  }

}
