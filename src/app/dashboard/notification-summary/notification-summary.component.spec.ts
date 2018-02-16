import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationSummaryComponent } from './notification-summary.component';

describe('NotificationSummaryComponent', () => {
  let component: NotificationSummaryComponent;
  let fixture: ComponentFixture<NotificationSummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotificationSummaryComponent ]
    })
    .compileComponents();
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
