import { TestBed } from '@angular/core/testing';

import { NgTooltipService } from './ng-tooltip.service';

describe('NgTooltipService', () => {
  let service: NgTooltipService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgTooltipService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
