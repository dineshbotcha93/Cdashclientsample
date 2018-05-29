import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { UserRegisterComponent } from './user-register.component';
import { SharedModule } from '../../shared/modules/shared.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BsModalService, ModalModule } from 'ngx-bootstrap/modal';
import { UserManagementService } from '../user-management.service';
import {RouterTestingModule} from "@angular/router/testing";
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AlertSandbox } from '../../shared/components/alerts/alerts.sandbox';

fdescribe('UserRegisterComponent', () => {
  let component: UserRegisterComponent;
  let fixture: ComponentFixture<UserRegisterComponent>;

  class BsModalServiceMock {

  }

  class UserManagementServiceMock {

  }

  class AlertSandboxMock {
    
  }

  const routes = [{
    path:'user-register',
    component: UserRegisterComponent
  }];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserRegisterComponent ],
      imports: [
        SharedModule,
        FormsModule,
        ReactiveFormsModule,
        ModalModule,
        RouterTestingModule.withRoutes(routes),
        HttpClientTestingModule
      ],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA,
        NO_ERRORS_SCHEMA
      ]
    })
    .overrideComponent(UserRegisterComponent, {
      set: {
        providers: [
          {provide: BsModalService, useClass: BsModalServiceMock},
          {provide: UserManagementService, useClass: UserManagementServiceMock},
          {provide: AlertSandbox, useClass: AlertSandboxMock}
        ]
      }
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
