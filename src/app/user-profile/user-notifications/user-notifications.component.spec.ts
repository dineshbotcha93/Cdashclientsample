import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserNotificationsComponent } from './user-notifications.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { UserProfileService } from '../services/user-profile.service';
import { SensorSummaryService } from '../../dashboard/sensor-summary/services/sensor-summary.service';

describe('UserNotificationsComponent', () => {
  let component: UserNotificationsComponent;
  let fixture: ComponentFixture<UserNotificationsComponent>;

  class UserProfileServiceMock {}
  class SensorSummaryServiceMock {
    getGlobalNotificationsList(){
      return Promise.resolve();
    }
    getNotificationSettingsDetails(){
      return Promise.resolve([{
        userID:'123'
      }]);
    }
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserNotificationsComponent ],
      schemas:[
        CUSTOM_ELEMENTS_SCHEMA
      ]
    })
    .overrideComponent(UserNotificationsComponent, {
      set: {
        providers: [
          {provide: UserProfileService, useClass: UserProfileServiceMock},
          {provide: SensorSummaryService, useClass: SensorSummaryServiceMock}
        ]
      }
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserNotificationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
