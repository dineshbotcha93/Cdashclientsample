import { TestBed, async, ComponentFixture, fakeAsync  } from '@angular/core/testing';
import { DashboardComponent } from './dashboard.component';
import { CUSTOM_ELEMENTS_SCHEMA, EventEmitter } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { SharedModule } from '../shared/modules/shared.module';
import { DashboardService } from './services/dashboard.service';
import {MapService}           from '../shared/components/map/services/map.service';
import {Routes,RouterModule} from '@angular/router';
import { CommonModule, APP_BASE_HREF } from '@angular/common';


fdescribe('DashboardComponent',()=>{
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

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
        {provide: MapService, useClass: MockMapService}
      ]
    }
  }).compileComponents();
  }));

  beforeEach(()=>{
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
  });

  it('should place the component on the page', async(()=>{
    const fixture = TestBed.createComponent(DashboardComponent);
    fixture.detectChanges();
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
});
