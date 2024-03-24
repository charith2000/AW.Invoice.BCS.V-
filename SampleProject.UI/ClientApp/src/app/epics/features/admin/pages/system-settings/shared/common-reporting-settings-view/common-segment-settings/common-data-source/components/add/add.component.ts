import {Component, Inject, OnInit, ViewContainerRef} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {NzModalService} from "ng-zorro-antd/modal";
import {HttpClient} from "@angular/common/http";
import {ApiBaseService} from "@core/services/api-base.service";
import {ReportingSegmentDataSourceApi} from "@application/reporting-segment-data-source/reporting-segment-data-source.api";
import {TestConnectionApi} from "@application/reporting-segment-data-source/test-connection.api";
import {ReportingSegmentDataSourceModel} from "@application/reporting-segment-data-source/reporting-segment-data-source.model";
import {BaseComponent} from "@core/components/base/base.component";
import {Observable} from "rxjs";
import {ConnectionName} from "@application/data-source-connection/data-source-connection.model";
import {DataSourceConnectionApi} from "@application/data-source-connection/data-source-connection.api";

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent extends BaseComponent implements OnInit{

  activeAddButton = false;

  connectionName? : Observable<ConnectionName[]>
  constructor(
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA)
    public data: {selectedSegmentId: string},
    public dialogRef: MatDialogRef<AddComponent>,
    private modal: NzModalService,
    private viewContainerRef: ViewContainerRef,
    private http: HttpClient,
    private apiBaseService: ApiBaseService,
  ) {
    super()
  }

  ngOnInit(): void {
    this.connectionName = this.apiBaseService.get<ConnectionName[]>([DataSourceConnectionApi.base, DataSourceConnectionApi.sourceNames])
  }
  addNewDataSourceForm = new FormGroup({
    segmentId : new FormControl({value : this.data.selectedSegmentId, disabled: true}, [Validators.required]),
    sourceName : new FormControl('',[Validators.required , Validators.maxLength(20)] ),
    connectionName : new FormControl('', [Validators.required]),
    tableName : new FormControl('', [Validators.required]),
  });

  onSaveNewDataSource() : void {
    let commonDataSourceModel = {
      reportingSegmentId : this.data.selectedSegmentId,
      sourceName : this.addNewDataSourceForm.get('sourceName')!.value !,
      dataSourceConnectionId : this.addNewDataSourceForm.get('connectionName')!.value !,
      tableName : this.addNewDataSourceForm.get('tableName')!.value !,
    }
    this.apiBaseService.post<ReportingSegmentDataSourceModel>([ReportingSegmentDataSourceApi.base], commonDataSourceModel, true, true, 'Successfully Added!')
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

  // onTestDataSource(): void{
  //   let commonTestDataSourceModel = {
  //     serverName : this.addNewDataSourceForm.get('serverName')!.value !,
  //     dbName : this.addNewDataSourceForm.get('dbName')!.value !,
  //     userId : this.addNewDataSourceForm.get('userId')!.value !,
  //     password : this.addNewDataSourceForm.get('password')!.value !
  //   }
  //   this.apiBaseService.post<ReportingSegmentDataSourceModel>([TestConnectionApi.test], commonTestDataSourceModel, true, true, 'Test Connection Success !')
  //     .subscribe(result => {
  //       this.openConfirmation();
  //     }, error => {
  //     });
  //
  // }
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
