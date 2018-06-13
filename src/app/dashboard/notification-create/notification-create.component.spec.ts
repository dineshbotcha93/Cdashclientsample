import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationCreateComponent } from './notification-create.component';

describe('NotificationCreateComponent', () => {
  let component: NotificationCreateComponent;
  let fixture: ComponentFixture<NotificationCreateComponent>;
  let app;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotificationCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotificationCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    app = fixture.debugElement.componentInstance;
  });

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
      console.log('HEREEE');
      console.log(component['sensorGlobalList']);
      app.setEditNotifyDetails();
      console.log(component['sensorGlobalList']);
      expect(app.globalNotificationList.sensors).toHaveBeenCalled();
    });
  });
});
