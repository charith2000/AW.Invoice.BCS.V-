import {Component, Inject, OnInit} from '@angular/core';
import {ReportingSessionDetail, ReportingSessionModel} from "@application/reporting-session/reporting-session.model";
import {ReportingSessionApi} from "@application/reporting-session/reporting-session.api";
import {ApiBaseService} from "@core/services/api-base.service";

import {NzMessageService} from 'ng-zorro-antd/message';
import {NzUploadChangeParam} from 'ng-zorro-antd/upload';
import {ExceptionFileApi} from "@application/file-uplaod/exception-file.api";
import {NotificationService} from "@core/services/notification.service";
import {ViewErrorRecordComponent} from "./view-error-record/view-error-record.component";
import {HttpClient} from "@angular/common/http";
import {MatDialog} from "@angular/material/dialog";
import {ExceptionFileModel} from "@application/file-uplaod/exception-file.model";

@Component({
  selector: 'app-upload-error-log',
  templateUrl: './upload-error-log.component.html',
  styleUrls: ['./upload-error-log.component.css']
})
export class UploadErrorLogComponent implements OnInit {
  reportingDate: Date | null = null;
  nextReportingDate: Date | null = null;
  baseApiUrl = this.baseUrl;
  reportingSessionDetail: ReportingSessionDetail = {} as ReportingSessionDetail;
  sessionId: number = 0
  apiPath : string = ''
  isPopupOpen = false;
  uploadedExceptionFiles : ExceptionFileModel[] = []


  constructor(
    private http: HttpClient,
    public dialog: MatDialog,
    private apiBaseService: ApiBaseService,
    @Inject('BASE_URL') private baseUrl: string,
    private msg: NzMessageService,
    private notificationService: NotificationService) {
  }

  ngOnInit(): void {
    this.getReportingDates();
    const reportingSessionDetail = JSON.parse(localStorage.getItem("CONSUMER_SESSION_DETAIL") || "COMMERCIAL_SESSION_DETAIL" || '{}');
    this.sessionId = reportingSessionDetail.reportingSessionId
    console.log(this.sessionId)
    this.apiPath = this.baseApiUrl  + ExceptionFileApi.base + "/" + ExceptionFileApi.save + "/" + this.sessionId.toString();
    this.getRecords();
  }


  getReportingDates(): void {
    this.apiBaseService.get<ReportingSessionModel>([ReportingSessionApi.base])
      .subscribe((res) => {
        this.reportingDate = res?.toDate ?? null
        this.nextReportingDate = res?.fromDate ?? null
      })
  }



  handleChange({ file, fileList  }: NzUploadChangeParam): void {
    const status = file.status;

    if (status == 'uploading') {
      this.notificationService.showSuccess(`${file.name} file uploading`, 'Uploading')
    }
    if (status === 'done') {
      this.notificationService.showSuccess(`${file.name} file uploaded successfully.`, 'Success')
      this.getRecords();
    } else if (status === 'error'  ) {

      this.notificationService.showError(`${file?.error?.error.message}`, 'Failed');
      this.getRecords();
    }
  }
  getRecords() : void {
    this.apiBaseService.get<ExceptionFileModel[]>([ExceptionFileApi.base,ExceptionFileApi.uploaded])
      .subscribe((res) => {
        this.uploadedExceptionFiles = res
          .map((item) => ({
            ...item,
            createdDate: new Date(item.createdDate)
          }))
          .sort((a, b) => b.createdDate.getTime() - a.createdDate.getTime());
      });
  }
  statusChip(status: number): string {
    if (status == 1) {
      return 'alert alert-success';
    } else {
      return 'alert alert-warning';
    }
  }

  viewRecord(record: ExceptionFileModel) {
    if (!this.isPopupOpen) {
      this.isPopupOpen = true
      const dialogRef = this.dialog.open(ViewErrorRecordComponent,
        {
          data: {
            fileName : record.fileName,
            numberOfRecords : record.numberOfRecords,
            status: record.status
          },
          width: "70%",


        }
      );

      dialogRef.afterClosed()
        .subscribe((value) => {
          this.isPopupOpen = false
          this.getRecords();
        })
    }
  }
}
