import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgbModule,NgbTooltipConfig, NgbPopoverConfig } from '@ng-bootstrap/ng-bootstrap';
import { UserCreateComponent } from './user-create.component';
import {ActivatedRoute, Router} from '@angular/router';
import { Observable } from 'rxjs/Observable';
import {UserManagementService} from '../user-management.service';
import {CommonSharedService} from '../../shared/services/common-shared.service';

describe('UserCreateComponent', () => {
  let component: UserCreateComponent;
  let fixture: ComponentFixture<UserCreateComponent>;

  class NgbTooltipConfigMock {

  }
  class NgbPopoverConfigMock {}

  class CommonSharedServiceMock {

  }

  class UserManagementServiceMock {

  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        ReactiveFormsModule,
        NgbModule
      ],
      declarations: [ UserCreateComponent ],
      providers:[{
        provide: ActivatedRoute, useValue: {
          queryParams: Observable.of({ id: 'test' })
        },
      },{
        provide: Router, useValue: {
          queryParams: Observable.of({queryParams:'test'})
        }
      }],
      schemas:[CUSTOM_ELEMENTS_SCHEMA]
    })
    .overrideComponent(UserCreateComponent, {
  set: {
    providers: [
      {provide: NgbTooltipConfig, useClass: NgbTooltipConfigMock},
      {provide: UserManagementService, useClass: UserManagementServiceMock},
      {provide: CommonSharedService, useClass: CommonSharedServiceMock},
      {provide: NgbPopoverConfig, useClass: NgbPopoverConfigMock}
    ]
  }
  }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
