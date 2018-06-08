import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CustomerListComponent } from './customer-list.component';
import { FormsModule} from '@angular/forms';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { ComponentsModule } from '../../shared/components';
import {RouterTestingModule} from "@angular/router/testing";
import { Routes, RouterModule,ActivatedRoute } from '@angular/router';
import { CUSTOM_ELEMENTS_SCHEMA, EventEmitter } from '@angular/core';
import { BusinessService } from '../services/business.service';
import { Observable } from 'rxjs/Observable';


describe('CustomerListComponent', () => {
  let component: CustomerListComponent;
  let fixture: ComponentFixture<CustomerListComponent>;
  let app;

  const routes: Routes = [
    {
      path: 'customer-list',
      component: CustomerListComponent
    }
  ];

  class MockBusinessService {
    getRealData(x){
      return Promise.resolve({
        results:{
          status:'200',
          customers:{
            latitude:'45',
            longitude:'44'
          }
        }
      });
    }
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports:[
        FormsModule,
        ComponentsModule,
        RouterTestingModule.withRoutes(routes),
        BsDatepickerModule.forRoot(),
      ],
      declarations: [ CustomerListComponent ],
      schemas:[CUSTOM_ELEMENTS_SCHEMA]
    })
    .overrideComponent(CustomerListComponent, {
    set: {
      providers: [
        {provide: BusinessService, useClass: MockBusinessService},
        {
           provide: ActivatedRoute, useValue: {
             params: Observable.of({status:'test' })
           }
         }
      ]
    }
  })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerListComponent);
    component = fixture.componentInstance;
    app = fixture.debugElement.componentInstance;
    console.log(component['route']);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('updateFilter()',()=>{
    it('should test the updateFilter method with no parameters', ()=>{
      app.tempData = {test:1};
      app.rows = {};
      app.updateFilter({});
      expect(app.rows).toEqual(app.tempData);
    });
    it('should test the updateFilter method with parameters', () => {
      app.tempData = {test:1};
      app.rows = {};
      const event = {
        target: {
          value:'jenny'
        }
      }
      app.rows = [
        {name:'Walter'},
        {name:'Joe'},
        {name:'Peter'},
        {name:'Jenny'}
      ];
      app.updateFilter(event);
      expect(app.rows).toEqual([{name:'Jenny'}]);
    });
  });
  describe('onChange',()=>{
    it('should set a bunch of values', ()=>{
      const event = new Date();
      app.bsValue = new Date();
      app.bsValueTwo = new Date();
      app.items = '';
      app.rows = [1,2,3];
      app.onChange(event);
      expect(app.bsValue).toEqual(event);
      expect(app.rows).toEqual(app.items);
    });
  });
  describe('onChangeToDp',()=>{
    it('should set a bunch of values', ()=>{
      const event = new Date();
      app.bsValue = new Date();
      app.bsValueTwo = new Date();
      app.items = '';
      app.rows = [1,2,3];
      app.onChangeToDp(event);
      expect(app.bsValueTwo).toEqual(event);
      expect(app.rows).toEqual(app.items);
    });
  });
});
