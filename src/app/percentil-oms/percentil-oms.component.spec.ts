import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PercentilOmsComponent } from './percentil-oms.component';

describe('PercentilOmsComponent', () => {
  let component: PercentilOmsComponent;
  let fixture: ComponentFixture<PercentilOmsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PercentilOmsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PercentilOmsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
