import {Component, Inject, ViewContainerRef} from '@angular/core';
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
  selector: 'app-data-source-table-connection-update',
  templateUrl: './data-source-table-connection-update.component.html',
  styleUrls: ['./data-source-table-connection-update.component.css']
})
export class DataSourceTableConnectionUpdateComponent {

  constructor(
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA)
    public data:
      {
        id: string
        sourceName : string,
        serverName : string,
        dbName : string,
        userId : string,
        password : string,
        status: number

      },
    public dialogRef: MatDialogRef<DataSourceTableConnectionUpdateComponent>,
    private modal: NzModalService,
    private viewContainerRef: ViewContainerRef,
    private http: HttpClient,
    private apiBaseService: ApiBaseService,
  ) {
  }

  updateDataSourceForm = new FormGroup({
    id: new  FormControl({value : this.data.id, disabled: true},[Validators.required]),
    sourceName : new FormControl({value : this.data.sourceName, disabled: true},[Validators.required , Validators.maxLength(20)] ),
    serverName : new FormControl(this.data.serverName, [Validators.required]),
    dbName : new FormControl(this.data.dbName, [Validators.required]),
    userId : new FormControl(this.data.userId, [Validators.required]),
    password : new FormControl(this.data.password, [Validators.required]),
    status : new FormControl(this.data.status.toString(), [Validators.required]),
  });

  onUpdateSelectedDataSource(): void{
    let dataSourceConnection = {
      id : this.updateDataSourceForm.get('id')?.value,
      name : this.updateDataSourceForm.get('sourceName')?.value ,
      serverName : this.updateDataSourceForm.get('serverName')?.value ,
      dbName :this.updateDataSourceForm.get('dbName')?.value ,
      userId : this.updateDataSourceForm.get('userId')?.value ,
      password : this.updateDataSourceForm.get('password')?.value ,
      status : +(this.updateDataSourceForm.get('status')?.value ?? 1),
    }
    this.apiBaseService.put<DataSourceConnection>([DataSourceConnectionApi.base]
      ,dataSourceConnection, true, true, 'Successfully Updated !')
      .subscribe(()=> this.onCloseModel());
  }

  onTestDataSource(): void{
    let commonTestDataSourceModel = {
      serverName : this.updateDataSourceForm.get('serverName')!.value !,
      dbName : this.updateDataSourceForm.get('dbName')!.value !,
      userId : this.updateDataSourceForm.get('userId')!.value !,
      password : this.updateDataSourceForm.get('password')!.value !
    }
    this.apiBaseService
      .post<ReportingSegmentDataSourceModel>(
        [TestConnectionApi.test],
        commonTestDataSourceModel,
        true, true, 'Test Connection Success !')
      .subscribe(result => {
        this. openConfirmation()
      });

  }


  openConfirmation(): void{
    this.modal.confirm({
      nzTitle: 'Do you want to update-segment this data source ?',
      nzIconType: 'exclamation-circle',
      nzContent: '<b></b>',
      nzOnOk: () => this.onUpdateSelectedDataSource(),
      nzCancelText: 'No',
      nzOkText: 'Yes'
    });
  }
  handleCancel(): void{
    if (this.updateDataSourceForm.dirty || this.updateDataSourceForm.valid ){
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
