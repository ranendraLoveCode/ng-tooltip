import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgTooltipDirectiveComponent } from './ng-tooltip-directive.component';

describe('NgTooltipDirectiveComponent', () => {
  let component: NgTooltipDirectiveComponent;
  let fixture: ComponentFixture<NgTooltipDirectiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NgTooltipDirectiveComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NgTooltipDirectiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
