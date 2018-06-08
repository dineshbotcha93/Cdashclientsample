import { TestBed, async, ComponentFixture, fakeAsync  } from '@angular/core/testing';
import { DashboardComponent } from './dashboard.component';
import { CUSTOM_ELEMENTS_SCHEMA, EventEmitter } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { SharedModule } from '../shared/modules/shared.module';
import { DashboardService } from './services/dashboard.service';
import {MapService}           from '../shared/components/map/services/map.service';
import {Routes,RouterModule,Router} from '@angular/router';
import { CommonModule, APP_BASE_HREF } from '@angular/common';


describe('DashboardComponent',()=>{
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let mockRouter = {
	navigate: jasmine.createSpy('navigate')
  }

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
    instant(key){
      return key;
    }
  }

  class MockDashboardService {
    getRealData(){
      return Promise.resolve([]);
    }
  }

  class MockMapService {

  }

  const routes: Routes = [
    { path:'',component: DashboardComponent }
  ]

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      declarations: [
        DashboardComponent
      ],
      imports: [
        SharedModule,
        RouterModule.forRoot(routes),
      ],
      providers:[
        {provide: APP_BASE_HREF, useValue: '/'},
      ],
      schemas:[CUSTOM_ELEMENTS_SCHEMA]
    }).overrideComponent(DashboardComponent, {
    set: {
      providers: [
        {provide: TranslateService, useClass: MockTranslation},
        {provide: DashboardService, useClass: MockDashboardService},
        {provide: MapService, useClass: MockMapService},
        { provide: Router, useValue: mockRouter},
      ]
    }
  });
   fixture = TestBed.createComponent(DashboardComponent);
   fixture.detectChanges();
   component = fixture.componentInstance;
  }));

  beforeEach(()=>{
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
  });

  it('should place the component on the page', async(()=>{
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
  it('should change the value of showList to be true when showListView is called', ()=>{
    component['showList'] = false;
    component['showMap'] = true;
    component.showListView();
    expect(component['showList']).toEqual(true);
    expect(component['showMap']).toEqual(false);
  });
  it('should change the value of showMap to be true when showMapView is called', ()=>{
    component['showMap'] = false;
    component['showList'] = true;
    component.showMapView();
    expect(component['showMap']).toEqual(true);
    expect(component['showList']).toEqual(false);
  });
  it('should call gotoDetails when onLocationSelect is picked', ()=>{
    spyOn(component, "gotoDetails");
    component.onLocationSelect(123);
    console.log(component.gotoDetails);
    expect(component.gotoDetails).toHaveBeenCalled();
  });
  it('should call the router navigate when gotoNotificationList is called', ()=>{
    let sensor = {
      status: 1
    }
    component.gotoNotificationList(sensor);
    expect (mockRouter.navigate).toHaveBeenCalledWith (['dashboard/notificationList',sensor.status]);
  });
  it('should go to the details page when gotoDetails is called, provided the id is given', ()=>{
    let location = 123;
    component.gotoDetails(location);
    expect (mockRouter.navigate).toHaveBeenCalledWith (['dashboard/sensor-summary',location]);
  });
});
