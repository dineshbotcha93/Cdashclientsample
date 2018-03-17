import {Component, OnInit, EventEmitter} from "@angular/core";
import { Input, Output } from "@angular/core";
import { FormGroup,FormBuilder ,FormControl,Validators, ReactiveFormsModule } from '@angular/forms';



@Component({
  selector: 'create-network',
  templateUrl: './createNetwork.component.html'
})
export class CreateNetworkComponent implements OnInit {

  @Output()
  private formReady : EventEmitter<FormGroup> = new EventEmitter<FormGroup>();
  public createNetworkForm: FormGroup;


  constructor(private fb: FormBuilder) {

    this.createNetworkForm = this.fb.group({
      "name": new FormControl("", Validators.required),
      "isActive": new FormControl("", Validators.required)

    });
  }

  ngOnInit(): void {

  }

  private addFormControl(name: string, formGroup: FormGroup) : void {

    console.log(':::::into addformcontrol networksetup', FormGroup);
    this.createNetworkForm.addControl(name, formGroup);
  }

}
