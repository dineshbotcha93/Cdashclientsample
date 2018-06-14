import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NotificationsComponent } from './notifications.component';
import { CUSTOM_ELEMENTS_SCHEMA, EventEmitter } from '@angular/core';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { DatePipe } from '@angular/common';

describe('NotificationsComponent', () => {
  let component: NotificationsComponent;
  let fixture: ComponentFixture<NotificationsComponent>;

  class DatePipeMock {
    transform(k){
      return k;
    }
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotificationsComponent ],
      imports:[
        FormsModule,
        ReactiveFormsModule,
        BsDatepickerModule.forRoot()
      ],
      schemas:[CUSTOM_ELEMENTS_SCHEMA]
    })
    .overrideComponent(NotificationsComponent, {
  set: {
    providers: [
      {provide: DatePipe, useClass: DatePipeMock},
    ]
  }
}).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotificationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
