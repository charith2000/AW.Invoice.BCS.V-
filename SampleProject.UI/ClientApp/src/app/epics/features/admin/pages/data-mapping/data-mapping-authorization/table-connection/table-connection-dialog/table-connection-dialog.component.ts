import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";

@Component({
  selector: 'app-table-connection-dialog',
  templateUrl: './table-connection-dialog.component.html',
  styleUrls: ['./table-connection-dialog.component.css']
})
export class TableConnectionDialogComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data:
      {
        tableConnection : string
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
