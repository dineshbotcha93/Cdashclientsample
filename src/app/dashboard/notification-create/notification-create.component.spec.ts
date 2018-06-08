import { async, ComponentFixture, TestBed,fakeAsync } from '@angular/core/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NotificationCreateComponent } from './notification-create.component';
import { CUSTOM_ELEMENTS_SCHEMA, EventEmitter } from '@angular/core';
import { TimepickerModule } from 'ngx-bootstrap';
import { SensorSummaryService } from "../sensor-summary/services/sensor-summary.service";

describe('NotificationCreateComponent', () => {
  let component: NotificationCreateComponent;
  let fixture: ComponentFixture<NotificationCreateComponent>;

  class SensorSummaryServiceMock {

  }

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      imports:[
        FormsModule,
        ReactiveFormsModule,
        TimepickerModule.forRoot(),
      ],
      declarations: [ NotificationCreateComponent ],
      schemas:[CUSTOM_ELEMENTS_SCHEMA]
    })
    .overrideComponent(NotificationCreateComponent, {
  set: {
    providers: [
      {provide: SensorSummaryService, useClass: SensorSummaryServiceMock},
    ]
  }
}).compileComponents();
  }));

  beforeEach(() => {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
    fixture = TestBed.createComponent(NotificationCreateComponent);
    fixture.detectChanges();
    component = fixture.componentInstance;
  });

  it('should create', async(() => {
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
});
