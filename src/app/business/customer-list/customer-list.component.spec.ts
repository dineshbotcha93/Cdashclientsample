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
    console.log(component['route']);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  describe('clearAll()',()=>{
    it('should clear a bunch of values',()=>{
      spyOn(app,'filterByStatus').and.returnValue(true);
      app.clearAll();
       expect(app.doSearchVal).toEqual('');
       expect(app.doFilterByStatus).toEqual('all');
       expect(app.filterByStatus).toHaveBeenCalled();
       expect(app.bsValue).toEqual(new Date());
       expect(app.bsValueTwo).toEqual(new Date());
    });
  });
  describe('goToPrevPage()',()=>{
    it('should go back in the location',()=>{
      spyOn(app._location,'back').and.returnValue(true);
      app.goToPrevPage();
      expect(app._location.back).toHaveBeenCalled();
    });
  });
});
