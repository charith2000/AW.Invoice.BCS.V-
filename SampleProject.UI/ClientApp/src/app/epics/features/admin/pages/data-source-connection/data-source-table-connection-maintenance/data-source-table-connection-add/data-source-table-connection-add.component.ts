import {Component, Inject, ViewContainerRef} from '@angular/core';
import {BaseComponent} from "@core/components/base/base.component";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {NzModalService} from "ng-zorro-antd/modal";
import {HttpClient} from "@angular/common/http";
import {ApiBaseService} from "@core/services/api-base.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {
  ReportingSegmentDataSourceModel
} from "@application/reporting-segment-data-source/reporting-segment-data-source.model";
import {TestConnectionApi} from "@application/reporting-segment-data-source/test-connection.api";
import {DataSourceConnection} from "@application/data-source-connection/data-source-connection.model";
import {DataSourceConnectionApi} from "@application/data-source-connection/data-source-connection.api";

@Component({
  selector: 'app-data-source-table-connection-add',
  templateUrl: './data-source-table-connection-add.component.html',
  styleUrls: ['./data-source-table-connection-add.component.css']
})
export class DataSourceTableConnectionAddComponent extends BaseComponent {

  activeAddButton = false;
  constructor(
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      selectedSegmentId: string
    },
    public dialogRef: MatDialogRef<DataSourceTableConnectionAddComponent>,
    private modal: NzModalService,
    private viewContainerRef: ViewContainerRef,
    private http: HttpClient,
    private apiBaseService: ApiBaseService,
  ) {
    super()
  }

  addNewDataSourceForm = new FormGroup({
    name : new FormControl('',[Validators.required , Validators.maxLength(20)] ),
    serverName : new FormControl('', [Validators.required]),
    dbName : new FormControl('', [Validators.required]),
    userId : new FormControl('', [Validators.required]),
    password : new FormControl('', [Validators.required]),
  });

  onSaveNewDataSource() : void {
    let dataSourceConnection = {
      name : this.addNewDataSourceForm.get('name')!.value !,
      serverName : this.addNewDataSourceForm.get('serverName')!.value !,
      dbName : this.addNewDataSourceForm.get('dbName')!.value !,
      userId : this.addNewDataSourceForm.get('userId')!.value !,
      password : this.addNewDataSourceForm.get('password')!.value !
    }
    this.apiBaseService.post<DataSourceConnection>([DataSourceConnectionApi.base], dataSourceConnection, true, true, 'Successfully Added!')
      .subscribe(()=> this.onCloseModel());

  }
  openConfirmation(): void{
    this.modal.confirm({
      nzTitle: 'Do you want to add this data source ?',
      nzContent: '<b></b>',
      nzIconType: 'exclamation-circle',
      nzOnOk: () => this.onSaveNewDataSource(),
      nzCancelText: 'No',
      nzOkText: 'Yes'
    });

  }

  onTestDataSource(): void{
    let commonTestDataSourceModel = {
      serverName : this.addNewDataSourceForm.get('serverName')!.value !,
      dbName : this.addNewDataSourceForm.get('dbName')!.value !,
      userId : this.addNewDataSourceForm.get('userId')!.value !,
      password : this.addNewDataSourceForm.get('password')!.value !
    }
    this.apiBaseService.post<ReportingSegmentDataSourceModel>([TestConnectionApi.test], commonTestDataSourceModel, true, true, 'Test Connection Success !')
      .subscribe(result => {
        this.openConfirmation();
      }, error => {
      });

  }
  handleCancel(): void{
    if (this.addNewDataSourceForm.dirty || this.addNewDataSourceForm.valid ){
      this.modal.confirm({
        nzTitle: 'Do you want to leave this window? ',
        nzContent: '<b></b>',
        nzOnOk: () => this.onCloseModel(),
        nzOkText: "Yes",
        nzCancelText: "No"
      });
    } else {
      this.dialogRef.close();
    }
  }
  onCloseModel(): void{
    this.dialogRef.close();
  }
}
