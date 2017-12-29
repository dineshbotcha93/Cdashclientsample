import { Component, Output, EventEmitter, ChangeDetectionStrategy, Input } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Store }              from '@ngrx/store';
import {Sandbox}              from '../../../shared/sandbox/base.sandbox';
import * as store             from '../../../shared/store';

@Component({
  selector: 'profile-action-bar',
  templateUrl:'./profileActionBar.component.html',
  styleUrls: ['./profileActionBar.component.scss'],
})
export class ProfileActionBarComponent {

  @Input() userImage: string;
  @Input() userEmail: string;
	@Output() logout: EventEmitter<any> = new EventEmitter();
  constructor(){

  }
}
