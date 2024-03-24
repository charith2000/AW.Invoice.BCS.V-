import {Component, Inject, OnInit, ViewContainerRef} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {NzModalService} from "ng-zorro-antd/modal";
import {HttpClient} from "@angular/common/http";
import {ApiBaseService} from "@core/services/api-base.service";
import {TestConnectionApi} from "@application/reporting-segment-data-source/test-connection.api";
import {ReportingSegmentDataSourceModel} from "@application/reporting-segment-data-source/reporting-segment-data-source.model";
import {
  ReportingSegmentDataSourceApi
} from "@application/reporting-segment-data-source/reporting-segment-data-source.api";
import {ConnectionName} from "@application/data-source-connection/data-source-connection.model";
import {DataSourceConnectionApi} from "@application/data-source-connection/data-source-connection.api";
import {Observable} from "rxjs";

@Component({
  selector: 'app-update-segment',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit{

  activeUpdateButton = false;
  connectionName? : Observable<ConnectionName[]>

  constructor(
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA)
    public data:
      {
        selectedSegmentId: string,
        reportingSegmentDataSourceId: string,
        sourceName : string,
        serverName : string,
        connectionName : string,
        tableName : string,
        dbName : string,
        userId : string,
        password : string,
        status: number

      },
    public dialogRef: MatDialogRef<UpdateComponent>,
    private modal: NzModalService,
    private viewContainerRef: ViewContainerRef,
    private http: HttpClient,
    private apiBaseService: ApiBaseService,
  ) {
  }

  ngOnInit(): void {
    this.connectionName = this.apiBaseService.get<ConnectionName[]>([DataSourceConnectionApi.base, DataSourceConnectionApi.sourceNames])
  }

  updateDataSourceForm = new FormGroup({
    segmentId : new FormControl({value: this.data.selectedSegmentId, disabled: true}, [Validators.required]),
    sourceName : new FormControl({value : this.data.sourceName, disabled: true},[Validators.required , Validators.maxLength(20)] ),
    connectionName : new FormControl(this.data.connectionName, [Validators.required]),
    tableName : new FormControl(this.data.tableName, [Validators.required]),
    status : new FormControl(this.data.status.toString(), [Validators.required]),
  });

  onUpdateSelectedDataSource(): void{
    let commonDataSourceModel = {
      reportingSegmentDataSourceId: this.data.reportingSegmentDataSourceId,
      reportingSegmentId : this.data.selectedSegmentId,
      sourceName : this.updateDataSourceForm.get('sourceName')?.value ,
      tableName : this.updateDataSourceForm.get('tableName')?.value ,
      dataSourceConnectionId : this.updateDataSourceForm.get('connectionName')?.value ,
      status : +(this.updateDataSourceForm.get('status')?.value ?? 1),
  }
     this.apiBaseService.put<ReportingSegmentDataSourceModel>([ReportingSegmentDataSourceApi.base]
       ,commonDataSourceModel, true, true, 'Successfully Updated !')
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
      }, error => {

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
