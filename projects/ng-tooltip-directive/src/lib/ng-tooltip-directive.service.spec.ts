import { TestBed } from '@angular/core/testing';

import { NgTooltipDirectiveService } from './ng-tooltip-directive.service';

describe('NgTooltipDirectiveService', () => {
  let service: NgTooltipDirectiveService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgTooltipDirectiveService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
