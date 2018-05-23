import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ControlCrecimientoComponent } from './control-crecimiento.component';

describe('ControlCrecimientoComponent', () => {
  let component: ControlCrecimientoComponent;
  let fixture: ComponentFixture<ControlCrecimientoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ControlCrecimientoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ControlCrecimientoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
