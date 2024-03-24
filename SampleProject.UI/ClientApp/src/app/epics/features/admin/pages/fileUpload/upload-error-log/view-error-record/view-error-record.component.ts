import {Component, Inject, OnInit} from '@angular/core';
import {ApiBaseService} from "@core/services/api-base.service";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {
  ExceptionFacilityModel,
  ExceptionFileDetailModel
} from "@application/file-uplaod/exception-file.model";
import {ExceptionFileApi} from "@application/file-uplaod/exception-file.api";

@Component({
  selector: 'app-view-error-record',
  templateUrl: './view-error-record.component.html',
  styleUrls: ['./view-error-record.component.css']
})
export class ViewErrorRecordComponent implements OnInit{
  modifiedFileName: string = '';
  fileDetail: ExceptionFileDetailModel[] =[]
  facilityCount : number = 0;
  constructor(
    private apiBaseService: ApiBaseService,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      fileName: string
      numberOfRecords: string
      status: number
    },
    public dialogRef: MatDialogRef<ViewErrorRecordComponent>) {
  }

  ngOnInit(): void {
    this.modifiedFileName = this.data.fileName.replace('.txt', '');
    this.getRecordDetails();
  }

  handleCancel() {
    this.dialogRef.close();
  }


    getRecordDetails(): void {
      this.apiBaseService.get<ExceptionFileDetailModel[]>([ExceptionFileApi.base,this.data.fileName, ExceptionFileApi.details])
        .subscribe((res) => {
          this.fileDetail = res
        });
      this.apiBaseService.get<ExceptionFacilityModel>([ExceptionFileApi.base,this.data.fileName, ExceptionFileApi.facilities])
        .subscribe((res) => {
          this.facilityCount = res.numberOfFacilities
        });
  }

  statusChip(status: number): string {
    if (status == 1) {
      return 'alert alert-success';
    } else {
      return 'alert alert-warning';
    }
  }

  onSubmit() {
    this.apiBaseService.post<any>([ExceptionFileApi.base, ExceptionFileApi.submit, this.data.fileName],
        null,
      true,
      true,
      'Successfully submitted !')
      .subscribe(() =>{
        this.handleCancel();
      });
  }
}
