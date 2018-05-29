import { TestBed, inject } from '@angular/core/testing';

import { CommonSharedService } from './common-shared.service';

fdescribe('CommonSharedService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CommonSharedService]
    });
  });

  it('should be created', inject([CommonSharedService], (service: CommonSharedService) => {
    expect(service).toBeTruthy();
  }));
});
