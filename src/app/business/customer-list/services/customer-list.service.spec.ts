import { TestBed, inject } from '@angular/core/testing';

import { CustomerListService } from './customer-list.service';

fdescribe('CustomerListService', () => {
  class MockCustomerListService {

  }
  
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CustomerListService]
    })
    .overrideProvider(CustomerListService, {useValue:MockCustomerListService});
  });

  it('should be created', inject([CustomerListService], (service: CustomerListService) => {
    expect(service).toBeTruthy();
  }));
});
