import { Injectable } from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup} from "@angular/forms";


@Injectable({
  providedIn: 'root'
})
export class DataAmendTableFieldManagerService {

  constructor(private formBuilder: FormBuilder) {}

  createTableFormGroup(apiResponse: any[]): FormGroup {
    const formGroup = this.formBuilder.group({});

    apiResponse.forEach(item => {
      const formControlObject: { [key: string]: AbstractControl } = {};

      if (item.type === 'dropdown') {

        formControlObject[item.columnName] = new FormControl(item.data);
      } else {
        formControlObject[item.columnName] = new FormControl(item.data[0]);
      }

      formGroup.addControl(item.columnName, new FormGroup(formControlObject));
    });

    return formGroup;
  }

}
