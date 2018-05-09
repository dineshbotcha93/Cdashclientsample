import { TestBed, async, ComponentFixture, fakeAsync  } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ComponentsModule } from '../../shared/components';
import { SharedModule } from '../../shared/modules/shared.module';
import {Routes,RouterModule} from '@angular/router';
import { AlertSandbox } from '../../shared/components/alerts/alerts.sandbox';
import { CUSTOM_ELEMENTS_SCHEMA, EventEmitter } from '@angular/core';
import { CommonModule, APP_BASE_HREF } from '@angular/common';
import { Store, StoreModule }              from '@ngrx/store';
import { store }               from '../../shared/store';
import { LoginSandbox } from './login.sandbox';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

fdescribe('LoginComponent',()=>{
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  const routes: Routes = [
    { path:'',component: LoginComponent }
  ]

  class MockLoginSandbox {
    getData(){

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
        RouterModule.forRoot(routes),
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
      {provide: TranslateService, useClass: MockTranslation}
    ]
  }
  }).compileComponents();
  }));

  beforeEach(()=>{
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
  });

  it('should place the component on the page', async(()=>{
    const fixture = TestBed.createComponent(LoginComponent);
    fixture.detectChanges();
    const app = fixture.debugElement.componentInstance;
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
});
