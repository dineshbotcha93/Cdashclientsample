import { TestBed, inject } from '@angular/core/testing';

import { CommonDashboardService } from './common-dashboard.service';

describe('CommonDashboardService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CommonDashboardService]
    });
  });

  it('should be created', inject([CommonDashboardService], (service: CommonDashboardService) => {
    expect(service).toBeTruthy();
  }));
});
