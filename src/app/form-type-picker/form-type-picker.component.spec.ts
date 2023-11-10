import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormTypePickerComponent } from './form-type-picker.component';

describe('FormTypePickerComponent', () => {
  let component: FormTypePickerComponent;
  let fixture: ComponentFixture<FormTypePickerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormTypePickerComponent]
    });
    fixture = TestBed.createComponent(FormTypePickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
