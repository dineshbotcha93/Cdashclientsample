import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ForgotPasswordComponent } from './forgot-password.component';
import { AlertSandbox } from '../../shared/components/alerts/alerts.sandbox';
import {Routes,RouterModule,Router} from '@angular/router';
import { APP_BASE_HREF } from '@angular/common';
import { UserManagementService } from '../user-management.service';

fdescribe('ForgotPasswordComponent', () => {
  let component: ForgotPasswordComponent;
  let fixture: ComponentFixture<ForgotPasswordComponent>;

  class MockAlertSandbox {

  }

  class MockUserManagementService {
    
  }

  const routes: Routes = [
    { path:'',component: ForgotPasswordComponent }
  ]

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ForgotPasswordComponent ],
      imports:[
        FormsModule,
        ReactiveFormsModule,
        RouterModule.forRoot(routes),
      ],
      providers:[
        {provide: APP_BASE_HREF, useValue: '/'},
      ],
    })
    .overrideComponent(ForgotPasswordComponent, {
  set: {
    providers: [
      {provide: AlertSandbox, useClass: MockAlertSandbox},
      {provide:UserManagementService, useClass: MockUserManagementService}
    ]
  }
  }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForgotPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
