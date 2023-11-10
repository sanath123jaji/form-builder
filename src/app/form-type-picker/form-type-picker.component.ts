import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { FORM_TYPE } from 'src/utils/enum';

@Component({
  selector: 'app-form-type-picker',
  templateUrl: './form-type-picker.component.html',
  styleUrls: ['./form-type-picker.component.css']
})
export class FormTypePickerComponent {

  constructor(public dialogRef: MatDialogRef<FormTypePickerComponent>,) { }

  selectedFormType: FORM_TYPE = FORM_TYPE.STRING;
  formNameControl = new FormControl('', [Validators.required, Validators.pattern(/^[A-Za-z]+$/)]);

  formTypes = Object.values(FORM_TYPE);

  submitFormType() {
    this.dialogRef.close({
      type: this.selectedFormType,
      name: this.formNameControl.value,
    });
  }
}
