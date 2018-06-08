import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA,NO_ERRORS_SCHEMA } from '@angular/core';
import { UserProfileComponent } from './user-profile.component';
import { FillDetailsService } from '../user-management/user-create/fill-details/fill-details.service';
import { UserProfileService } from './services/user-profile.service';
import {ActivatedRoute, Router} from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { FormBuilder, FormControl, FormGroup, Validators, FormArray } from '@angular/forms';
import { CommonSharedService } from '../shared/services/common-shared.service';
import { NgbModule,NgbTooltipConfig, NgbPopoverConfig } from '@ng-bootstrap/ng-bootstrap';
import {ToastModule,ToastsManager} from 'ng2-toastr/ng2-toastr';

describe('UserProfileComponent', () => {
  let component: UserProfileComponent;
  let fixture: ComponentFixture<UserProfileComponent>;

  class FillDetailsServiceMock {
    getTimeZones(x){
      return Observable.of([
        [{
          TimeZoneID:'1',
          DisplayName:'2'
        }]
      ]);
    }
  }
  class UserProfileServiceMock {
    getPaymentHistoryData(){
      return Promise.resolve();
    }
    getRealData(){
      return Promise.resolve([]);
    }
    saveUserData(x){
      return Promise.resolve();
    }
  }
  class CommonSharedServiceMock {}
  class NgbTooltipConfigMock {}
  class ToastManagerMock {
    setRootViewContainerRef(x){
      return x;
    }
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserProfileComponent ],
      providers:[
      FormBuilder,
      {
        provide: ActivatedRoute, useValue: {
          params: Observable.of({ id: 'test' })
        },
      },{
        provide: Router, useValue: {
          queryParams: Observable.of({queryParams:'test'})
        }
      }],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA,
        NO_ERRORS_SCHEMA
      ]
    })
    .overrideComponent(UserProfileComponent, {
  set: {
    providers: [
      {provide: FillDetailsService, useClass: FillDetailsServiceMock},
      {provide: UserProfileService, useClass: UserProfileServiceMock},
      {provide: CommonSharedService, useClass: CommonSharedServiceMock},
      {provide: NgbTooltipConfig, useClass: NgbTooltipConfigMock},
      {provide: ToastsManager, useClass: ToastManagerMock}
    ]
  }
}).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
