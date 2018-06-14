import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, EventEmitter } from '@angular/core';
import { SensorSummaryService } from "../sensor-summary/services/sensor-summary.service";
import { BsModalService } from 'ngx-bootstrap/modal';
import { NotificationSummaryComponent } from './notification-summary.component';
import { AngularFontAwesomeModule } from 'angular-font-awesome';

describe('NotificationSummaryComponent', () => {
  let component: NotificationSummaryComponent;
  let fixture: ComponentFixture<NotificationSummaryComponent>;

  class SensorSummaryServiceMock {

  }

  class BsModalServiceMock {

  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports:[
        AngularFontAwesomeModule,
      ],
      declarations: [ NotificationSummaryComponent ],
      schemas:[CUSTOM_ELEMENTS_SCHEMA]
    })
    .overrideComponent(NotificationSummaryComponent, {
  set: {
    providers: [
      {provide: SensorSummaryService, useClass: SensorSummaryServiceMock},
      {provide: BsModalService, useClass: BsModalServiceMock}
    ]
  }
}).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotificationSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
