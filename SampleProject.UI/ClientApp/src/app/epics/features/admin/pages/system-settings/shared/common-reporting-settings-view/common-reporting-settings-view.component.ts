import {Component, Input} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";


@Component({
  selector: 'app-common-reporting-settings-view',
  templateUrl: './common-reporting-settings-view.component.html',
  styleUrls: ['./common-reporting-settings-view.component.css']
})
export class CommonReportingSettingsViewComponent {


  @Input() code: string = '';

  constructor(
    public dialog: MatDialog
  ) {
  }

}
