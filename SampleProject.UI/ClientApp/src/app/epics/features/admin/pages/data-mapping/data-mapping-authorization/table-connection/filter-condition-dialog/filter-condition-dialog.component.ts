import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";

@Component({
  selector: 'app-filter-condition-dialog',
  templateUrl: './filter-condition-dialog.component.html',
  styleUrls: ['./filter-condition-dialog.component.css']
})
export class FilterConditionDialogComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data:
      {
        filterCondition : string
      }
  ){}

  options = {
    mode: 'text/x-mysql',
    lineNumbers: true,
    theme: 'ssms',
    showHint: true,
    indentWithTabs: true,
    smartIndent: true,
    autofocus: true,
    lint: {
      onUpdateLinting: this.handleErrors
    },
    extraKeys: {'Ctrl-Space': 'autocomplete'}
  };

  private handleErrors() {
    console.log('handleErrors');
  }

}
