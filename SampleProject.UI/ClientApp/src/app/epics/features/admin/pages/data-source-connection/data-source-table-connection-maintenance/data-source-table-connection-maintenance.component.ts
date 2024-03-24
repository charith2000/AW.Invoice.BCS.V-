import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {BaseComponent} from "@core/components/base/base.component";
import {ReportingSegmentFieldModel} from "@application/common-reporting-settings/reporting-segment.model";
import {Observable} from "rxjs";
import {
  ReportingSegmentDataSourceModel
} from "@application/reporting-segment-data-source/reporting-segment-data-source.model";
import {HttpClient} from "@angular/common/http";
import {MatDialog} from "@angular/material/dialog";
import {ApiBaseService} from "@core/services/api-base.service";
import {
  AddComponent
} from "../../system-settings/shared/common-reporting-settings-view/common-segment-settings/common-data-source/components/add/add.component";
import {
  UpdateComponent
} from "../../system-settings/shared/common-reporting-settings-view/common-segment-settings/common-data-source/components/update/update.component";
import {ReportingSystemDataSourceApi} from "@application/reporting-system-setting/reporting-system-data-source.api";
import {
  DataSourceTableConnectionUpdateComponent
} from "./data-source-table-connection-update/data-source-table-connection-update.component";
import {
  DataSourceTableConnectionAddComponent
} from "./data-source-table-connection-add/data-source-table-connection-add.component";
import {DataSourceConnection} from "@application/data-source-connection/data-source-connection.model";
import {DataSourceConnectionApi} from "@application/data-source-connection/data-source-connection.api";

@Component({
  selector: 'app-data-source-table-connection-maintenance',
  templateUrl: './data-source-table-connection-maintenance.component.html',
  styleUrls: ['./data-source-table-connection-maintenance.component.css']
})
export class DataSourceTableConnectionMaintenanceComponent extends BaseComponent implements OnChanges, OnInit {

  @Input() fields: ReportingSegmentFieldModel[] = [];
  @Input() segmentId: string | undefined;
  dataSource : DataSourceConnection[] = [];
  selectedSegmentId : string = '';
  isPopupOpen = false;

  constructor(private http: HttpClient,
              public dialog: MatDialog,
              private apiBaseService: ApiBaseService
  ) {
    super();
  }

  ngOnInit(): void {
    this.getDataSource()
  }
  onOpenAddDataSourceDialog(): void {
    if(!this.isPopupOpen){
      this.isPopupOpen = true;
      const dialogRef = this.dialog.open(DataSourceTableConnectionAddComponent, {
        data: {
          selectedSegmentId: this.segmentId},
        width : "500px"
        });

      this.subscription$.add(
        dialogRef.afterClosed()
          .subscribe(() => {
            this.isPopupOpen = false
            this.getDataSource()
          }));
    }
  }

  onOpenUpdateDataSourceDialog(dataSourceList: DataSourceConnection): void {
    if(!this.isPopupOpen){
      this.isPopupOpen = true;
      console.log(dataSourceList.serverName, "############################################")
      const dialogRef = this.dialog.open(DataSourceTableConnectionUpdateComponent,{
        data: {
          id : dataSourceList.id,
          sourceName : dataSourceList.name,
          serverName : dataSourceList.serverName ,
          dbName : dataSourceList.dbName,
          userId : dataSourceList.userId,
          password : dataSourceList.password,
          status: dataSourceList.status
        }, width : "500px"
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
  this.apiBaseService.get<DataSourceConnection[]>(
      [DataSourceConnectionApi.base], true, false).subscribe( (res)=>{
        this.dataSource = res
  });
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
