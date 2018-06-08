import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, EventEmitter } from '@angular/core';
import { BusinessComponent } from './business.component';
import { ComponentsModule } from '../shared/components';
import { ChartsModule } from 'ng2-charts';
import { MapService } from '../shared/components/map/services/map.service';
import { BusinessService } from './services/business.service';
import { ActivatedRoute, Router,Routes } from '@angular/router';
import {RouterTestingModule} from "@angular/router/testing";
import { AuthGuard } from '../shared/services/auth-guard.service';


describe('BusinessComponent', () => {
  let component: BusinessComponent;
  let fixture: ComponentFixture<BusinessComponent>;

  class MockMapService {

  }

  class MockBusinessService {
    getRealData(x){
      return Promise.resolve({
          status:'200',
          customers:[{
            latitude:'45',
            longitude:'44'
          }]
        });
    }
  }

  const routes: Routes = [{
    path: 'business',
    canActivate: [AuthGuard],
    children: [
        {
            path: '',
            component: BusinessComponent
        },
        {
            path: ':customer-list/:status',
            loadChildren: './customer-list/customer-list.module#CustomerListModule'
        },
        {
           path: ':customer-details/:id/:view',
           loadChildren: './customer-details/customer-details.module#CustomerDetailsModule'
        }
    ]
  }];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BusinessComponent],
      imports:[
        ComponentsModule,
        ChartsModule,
        RouterTestingModule.withRoutes(routes),
      ],
      schemas:[CUSTOM_ELEMENTS_SCHEMA],
    })
    .overrideComponent(BusinessComponent, {
  set: {
    providers: [
      {provide: MapService, useClass: MockMapService},
      {provide: BusinessService, useClass: MockBusinessService}
    ]
  }})
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BusinessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
