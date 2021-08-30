import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgTooltipComponent } from './ng-tooltip.component';

describe('NgTooltipComponent', () => {
  let component: NgTooltipComponent;
  let fixture: ComponentFixture<NgTooltipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NgTooltipComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NgTooltipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
