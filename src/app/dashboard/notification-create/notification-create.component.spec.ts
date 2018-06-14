import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule,ReactiveFormsModule} from '@angular/forms';
import { NotificationCreateComponent } from './notification-create.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { TimepickerModule } from 'ngx-bootstrap';
import { MultiselectDropdownModule } from 'angular-2-dropdown-multiselect';
import { ButtonsModule } from 'ngx-bootstrap';
import { SensorSummaryService } from "../sensor-summary/services/sensor-summary.service";

describe('NotificationCreateComponent', () => {
  let component: NotificationCreateComponent;
  let fixture: ComponentFixture<NotificationCreateComponent>;
  let app;

  class SensorSummaryServiceMock {

  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotificationCreateComponent ],
      imports:[
        FormsModule,
        ReactiveFormsModule,
        BsDatepickerModule.forRoot(),
        TimepickerModule.forRoot(),
        MultiselectDropdownModule,
        ButtonsModule.forRoot()
      ],
    })
      .overrideComponent(NotificationCreateComponent, {
        set: {
          providers: [
            {provide: SensorSummaryService, useClass: SensorSummaryServiceMock},
          ]
        }
      })
    .compileComponents();
  }));

  beforeEach(async(() => {
    fixture = TestBed.createComponent(NotificationCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    app = fixture.debugElement.componentInstance;
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('setEditNotifyDetails()',()=>{
    it('should set the sensor global list,gateway global list and user global list', ()=>{
      app.globalNotificationList = {
        sensors:'sensors',
        gateways:'gateways',
        users:'users'
      };
      app.notifyOperationType = "editNotify";
      app.editNotifyObject = {
        name:'test',
        text:'123',
        snooze:true
      };
      app.setEditNotifyDetails();
      console.log('HEREE');
      console.log(app.notificationModel);
    });
  });
});
