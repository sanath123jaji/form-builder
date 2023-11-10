import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { FormTypePickerComponent } from '../form-type-picker/form-type-picker.component';
import { FORM_TYPE } from 'src/utils/enum';
import { take } from 'rxjs';

@Component({
  selector: 'app-form-builder',
  templateUrl: './form-builder.component.html',
  styleUrls: ['./form-builder.component.css'],
})
export class FormBuilderComponent {
  constructor(public dialog: MatDialog) {}

  fControls = new Map();

  values: any = {};

  loadDefinition(event: any) {
    const that = this;
    var reader = new FileReader();
    reader.onload = function () {
      const formDefinition = JSON.parse(reader.result as string);
      Object.values(formDefinition).forEach((element: any) => {
        that.fControls.set(element.name, {
          type: element.type,
          name: element.name,
          control: new FormControl('', Validators.required),
        });
      });
    };
    reader.readAsText(event.target.files[0]);
  }

  getFormControlsByGroup(index: FormGroup) {
    return Object.values(index.controls);
  }

  valueChange(event: any, name: string) {
    this.values[name] = event;
  }

  openTypePicker() {
    const dialogRef = this.dialog.open(FormTypePickerComponent);
    dialogRef
      .afterClosed()
      .pipe(take(1))
      .subscribe((result) => {
        if (result) {
          this.fControls.set(result.name, {
            type: result.type,
            name: result.name,
            control: new FormControl('', Validators.required),
          });
        }
      });
  }

  saveDefinition() {
    const saveObj: any = {};
    this.fControls.forEach((element) => {
      saveObj[element.name] = {
        type: element.type,
        name: element.name,
      };
    });
    var dataStr =
      'data:text/json;charset=utf-8,' +
      encodeURIComponent(JSON.stringify(saveObj));
    var downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute('href', dataStr);
    downloadAnchorNode.setAttribute('download', 'form-definition' + '.json');
    document.body.appendChild(downloadAnchorNode); // required for firefox
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  }
}
