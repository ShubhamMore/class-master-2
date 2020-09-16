import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewSalaryReceiptComponent } from './view-salary-receipt.component';

describe('ViewSalaryReceiptComponent', () => {
  let component: ViewSalaryReceiptComponent;
  let fixture: ComponentFixture<ViewSalaryReceiptComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewSalaryReceiptComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewSalaryReceiptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
