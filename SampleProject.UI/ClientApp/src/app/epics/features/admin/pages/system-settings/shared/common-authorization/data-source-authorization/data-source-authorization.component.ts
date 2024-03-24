import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {ReportingSegmentDataSourceModel} from "@application/reporting-segment-data-source/reporting-segment-data-source.model";

// @ts-ignore
import {MatChipColor} from "@angular/material/chips";


@Component({
  selector: 'app-data-source-authorization',
  templateUrl: './data-source-authorization.component.html',
  styleUrls: ['./data-source-authorization.component.css']
})
export class DataSourceAuthorizationComponent  {

  @Input() dataSource: ReportingSegmentDataSourceModel[] = [];


  constructor() {}

  hidePassword(password: string): string {
    return '*'.repeat(password.length);
  }
  statusChip(status: number): string {
    if (status == 1) {
      return 'alert alert-success';
    } else {
      return 'alert alert-danger';
    }
  }





}
