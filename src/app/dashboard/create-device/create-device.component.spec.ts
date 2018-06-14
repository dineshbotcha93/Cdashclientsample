import { async, ComponentFixture, TestBed, fakeAsync } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, EventEmitter } from '@angular/core';
import { CreateDeviceComponent } from './create-device.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CreateDeviceService } from "./services/create-device.service";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";

describe('CreateDeviceComponent', () => {
  let component: CreateDeviceComponent;
  let fixture: ComponentFixture<CreateDeviceComponent>;

  class CreateDeviceServiceMock {

  }

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateDeviceComponent ],
      imports:[
        FormsModule,
        ReactiveFormsModule,
        NgbModule.forRoot()
      ],
      schemas:[CUSTOM_ELEMENTS_SCHEMA]
    })
    .overrideComponent(CreateDeviceComponent, {
  set: {
    providers: [
      {provide: CreateDeviceService, useClass: CreateDeviceServiceMock},
    ]
  }
}).compileComponents();
  }));

  beforeEach(()=>{
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
    fixture = TestBed.createComponent(CreateDeviceComponent);
    fixture.detectChanges();
    component = fixture.componentInstance;
  });

  it('should be created', async(() => {
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
});
