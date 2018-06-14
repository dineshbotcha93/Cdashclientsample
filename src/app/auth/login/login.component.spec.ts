import { TestBed, async, ComponentFixture, fakeAsync  } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ComponentsModule } from '../../shared/components';
import { SharedModule } from '../../shared/modules/shared.module';
import { RouterTestingModule } from '@angular/router/testing';
import { AlertSandbox } from '../../shared/components/alerts/alerts.sandbox';
import { CUSTOM_ELEMENTS_SCHEMA, EventEmitter } from '@angular/core';
import { CommonModule, APP_BASE_HREF } from '@angular/common';
import { Store, StoreModule }              from '@ngrx/store';
import { store }               from '../../shared/store';
import { LoginSandbox } from './login.sandbox';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { LoggerService } from "../../shared/services/logger.service";
import {ConsoleLoggerService} from "../../shared/services/console-logger.service";

describe('LoginComponent',()=>{
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let app;

  class MockLoginSandbox {
    getData(){

    }
    doLogin(){

    }
  };

  class MockTranslation {
    onTranslationChange = new EventEmitter();
    onLangChange = new EventEmitter();
    onDefaultLangChange = new EventEmitter();

    use(key,interpolation){
      return Observable.of(key);
    }
    get(key,interpolation){
      return Observable.of(key);
    }
    setDefaultLang(x){
      return x;
    }
  }


  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      declarations: [
        LoginComponent
      ],
      providers:[
        AlertSandbox,
        Store,
        {provide: APP_BASE_HREF, useValue: '/'},
      ],
      imports:[
        RouterTestingModule.withRoutes([]),
        FormsModule,
        ReactiveFormsModule,
        ComponentsModule,
        SharedModule,
        CommonModule,
        StoreModule.forRoot({'tiles':store}),
      ],
      schemas:[CUSTOM_ELEMENTS_SCHEMA]
    })
    .overrideComponent(LoginComponent, {
  set: {
    providers: [
      {provide: LoginSandbox, useClass: MockLoginSandbox},
      {provide: TranslateService, useClass: MockTranslation},
      {provide: LoggerService, useClass: ConsoleLoggerService}
    ]
  }
  }).compileComponents();
  }));

  beforeEach(()=>{
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
    fixture = TestBed.createComponent(LoginComponent);
    fixture.detectChanges();
    app = fixture.debugElement.componentInstance;
  });

  it('should place the component on the page', async(()=>{
    expect(app).toBeTruthy();
  }));
  it('should have the username field', async(()=>{
    var dummyElement = document.createElement('div');
    document.getElementById = jasmine.createSpy('HTML Element').and.returnValue(dummyElement);
    document.getElementById("username").innerHTML = 'test';
    expect(document.getElementById("username").focus).toBeDefined();
  }));
  it('should have the username field set to "test"',async(()=>{
    $('input[formcontrolname="username"]').val("test");
    expect($("input[formcontrolname='username']").val()).toEqual("test");
  }));
  it('should have the password field set to test',async(()=>{
    $('input[formcontrolname="password"]').val("test");
    expect($("input[formcontrolname='password']").val()).toEqual("test");
  }));
  it('should test the onSubmit() method - doLogin case', async(()=>{
    spyOn(app.loginSandbox$,"doLogin").and.callThrough();
    app.myform.setValue({username:"test","password":"test"});
    app.onSubmit();
    expect(app.loginSandbox$.doLogin).toHaveBeenCalled();
  }));
  it('should test the onSubmit() method - showAlert case', async(()=>{
    spyOn(app.alertSandbox,"showAlert").and.callThrough();
    app.onSubmit();
    expect(app.alertSandbox.showAlert).toHaveBeenCalled();
  }));
  it('should test the submitAnonymousPayment() method', async(()=>{
    app.anonymousPayments.setValue({invoiceId:12});
    spyOn(app.router,"navigate");
    app.submitAnonymousPayment();
    expect(app.router.navigate).toHaveBeenCalledWith(['/payments'],{queryParams: { invoiceId:12}});
  }));
  it('should test the submitAnonymousPayment() with an invalid anonymousPayments value', async(()=>{
    app.invalidInvoice = false;
    app.submitAnonymousPayment();
    expect(app.invalidInvoice).toEqual(true);
  }));
  it('should set the language', ()=>{
    const lang = 'en';
    spyOn(app.translate,'setDefaultLang');
    spyOn(app.translate,'use');
    app.catchLanguage(lang);
    expect(app.translate.setDefaultLang).toHaveBeenCalled();
    expect(app.translate.use).toHaveBeenCalled();
  });
});
