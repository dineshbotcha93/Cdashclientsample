import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {CommonSharedService} from '../../shared/services/common-shared.service';
import { UserUpdateComponent } from './user-update.component';
import { FormsModule } from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { UserManagementService } from '../user-management.service';

fdescribe('UserUpdateComponent', () => {
  let component: UserUpdateComponent;
  let fixture: ComponentFixture<UserUpdateComponent>;

  class UserManagementServiceMock {

  }

  class CommonSharedServiceMock {

  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports:[
        FormsModule,
      ],
      declarations: [ UserUpdateComponent ],
      providers:[{
        provide: ActivatedRoute, useValue: {
          params: Observable.of({ id: 'test' })
        },
      },{
        provide: Router, useValue: {
          queryParams: Observable.of({queryParams:'test'})
        }
      }],
    })
    .overrideComponent(UserUpdateComponent, {
  set: {
    providers: [
      {provide: UserManagementService, useClass: UserManagementServiceMock},
      {provide: CommonSharedService, useClass: CommonSharedServiceMock},
    ]
  }
}).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
