import {ChangeDetectionStrategy, Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {
  ReportingSegmentFieldModel
} from "@application/common-reporting-settings/reporting-segment.model";
import {HttpClient} from "@angular/common/http";
import {MatDialog} from "@angular/material/dialog";
import {ApiBaseService} from "@core/services/api-base.service";
import {AddComponent} from "./components/add/add.component";
import {Observable} from "rxjs";
import {ReportingSystemDataSourceApi} from "@application/reporting-system-setting/reporting-system-data-source.api";
import {BaseComponent} from "@core/components/base/base.component";
import {UpdateComponent} from "./components/update/update.component";

import {ReportingSegmentDataSourceModel} from "@application/reporting-segment-data-source/reporting-segment-data-source.model";
// @ts-ignore
import {MatChipColor } from '@angular/material/chips';
import {style} from "@angular/animations";

@Component({
  selector: 'app-common-data-source',
  templateUrl: './common-data-source.component.html',
  styleUrls: ['./common-data-source.component.css'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class CommonDataSourceComponent extends BaseComponent implements OnChanges {

  @Input() fields: ReportingSegmentFieldModel[] = [];
  @Input() segmentId: string | undefined;
  dataSource?: Observable<ReportingSegmentDataSourceModel[]>;
  selectedSegmentId : string = '';
  isPopupOpen = false;

  constructor(private http: HttpClient,
              public dialog: MatDialog,
              private apiBaseService: ApiBaseService
  ) {
    super();
  }

  onOpenAddDataSourceDialog(): void {
    if(!this.isPopupOpen){
      this.isPopupOpen = true;
      const dialogRef = this.dialog.open(AddComponent, {
        data: {
          selectedSegmentId: this.segmentId}});

      this.subscription$.add(
        dialogRef.afterClosed()
          .subscribe(() => {
          this.isPopupOpen = false
          this.getDataSource()
        }));
    }
  }

  onOpenUpdateDataSourceDialog(dataSourceList: ReportingSegmentDataSourceModel): void {
    if(!this.isPopupOpen){
      this.isPopupOpen = true;
      const dialogRef = this.dialog.open(UpdateComponent,{
        data: {
          selectedSegmentId: this.segmentId,
          reportingSegmentDataSourceId : dataSourceList.reportingSegmentDataSourceId,
          sourceName : dataSourceList.sourceName,
          serverName : dataSourceList.serverName,
          dbName : dataSourceList.dbName,
          connectionName : dataSourceList.dataSourceConnectionId,
          tableName: dataSourceList.tableName,
          status: dataSourceList.status
        }
      });
      this.subscription$.add(
        dialogRef.afterClosed().subscribe(() => {
          this.isPopupOpen = false
          this.getDataSource()
        }));
    }

  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.segmentId.currentValue && changes.segmentId.previousValue != changes.segmentId.currentValue) {
      this.selectedSegmentId = changes.segmentId.currentValue;
      this.getDataSource();
    }


  }
  getDataSource() : void {
    this.dataSource = this.apiBaseService.get<ReportingSegmentDataSourceModel[]>(
      [ReportingSystemDataSourceApi.segment,this.selectedSegmentId], true, false);
  }

  statusChip(status: number): string {
    if (status == 1) {
      return 'alert alert-success';
    } else {
      return 'alert alert-danger';
    }
  }

  authorizeStatusChip(authorizedStatus: number): string {
    if (authorizedStatus == 1) {
      return 'alert alert-success';
    }if (authorizedStatus == 2) {
      return  'alert alert-warning';
    }
    else {
      return 'alert alert-danger';
    }
  }


}
