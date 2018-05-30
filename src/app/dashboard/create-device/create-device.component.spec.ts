import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, EventEmitter } from '@angular/core';
import { CreateDeviceComponent } from './create-device.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CreateDeviceService } from "./services/create-device.service";
import { NgbTooltipConfig } from "@ng-bootstrap/ng-bootstrap";

describe('CreateDeviceComponent', () => {
  let component: CreateDeviceComponent;
  let fixture: ComponentFixture<CreateDeviceComponent>;

  class CreateDeviceServiceMock {

  }

  class NgbToolTipConfigMock {

  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports:[
        FormsModule,
        ReactiveFormsModule,
      ],
      declarations: [ CreateDeviceComponent ],
      schemas:[CUSTOM_ELEMENTS_SCHEMA]
    })
    .overrideComponent(CreateDeviceComponent, {
  set: {
    providers: [
      {provide: CreateDeviceService, useClass: CreateDeviceServiceMock},
      {provide: NgbTooltipConfig, useClass: NgbToolTipConfigMock}
    ]
  }})
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateDeviceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
