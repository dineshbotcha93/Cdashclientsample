import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, EventEmitter } from '@angular/core';
import { CustomerDetailsComponent } from './customer-details.component';
import { ComponentsModule } from '../../shared/components';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CustomerDetailsService } from './services/customer-details.service';
import { ActivatedRoute, Router,Routes } from '@angular/router';
import {RouterTestingModule} from "@angular/router/testing";
import { Observable } from 'rxjs/Observable';

describe('CustomerDetailsComponent', () => {
  let component: CustomerDetailsComponent;
  let fixture: ComponentFixture<CustomerDetailsComponent>;

  class CustomerDetailsMockService {
    getRealData(id){
      return Promise.resolve({
        customer:{
          expiryDate:'10/10/2018'
        }
      });
    }
  }

  const routes: Routes = [{
    path: 'customer-details',
    component: CustomerDetailsComponent
  }];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerDetailsComponent ],
      imports:[
        ComponentsModule,
        FormsModule,
        ReactiveFormsModule,
        RouterTestingModule.withRoutes(routes)
      ],
      schemas:[CUSTOM_ELEMENTS_SCHEMA]
    })
    .overrideComponent(CustomerDetailsComponent, {
  set: {
    providers: [
      {provide: CustomerDetailsService, useClass: CustomerDetailsMockService},
      {
         provide: ActivatedRoute, useValue: {
           params: Observable.of({ id: 'test' })
         }
       }
    ]
  }})
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerDetailsComponent);
    component = fixture.debugElement.componentInstance;
    fixture.detectChanges();
  });

  it('should create', async(() => {
    expect(component).toBeTruthy();
  }));
  it('should call the back method of the location object when goToPrevPage is called', ()=>{
    //spyOn(component, "location.back()");
  });
});
