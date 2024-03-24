import {Component, Inject, OnInit, ViewContainerRef} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {NzModalService} from "ng-zorro-antd/modal";
import {HttpClient} from "@angular/common/http";
import {ApiBaseService} from "@core/services/api-base.service";
import {ReportingSessionDetail, ReportingSessionModel} from "@application/reporting-session/reporting-session.model";
import {ReportingSessionApi} from "@application/reporting-session/reporting-session.api";
import {Router} from "@angular/router";
import {ConsumerReportingApi} from "@application/close-reporting/consumer-reporting/consumer-reporting.api";

@Component({
  selector: 'app-confirm-and-close-session',
  templateUrl: './confirm-and-close-session.component.html',
  styleUrls: ['./confirm-and-close-session.component.css']
})
export class ConfirmAndCloseSessionComponent implements OnInit{
  nextReportingDate: Date | null = null;
  reportingDate: Date | null = null;
  sessionId: number = 0

  nextFromDate : Date | null = null;
  nextToDate : Date | null = null;

  constructor(
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA)
    public data:
      {
        toDate: Date
        sessionId: number
      },
    public dialogRef: MatDialogRef<ConfirmAndCloseSessionComponent>,
    private modal: NzModalService,
    private viewContainerRef: ViewContainerRef,
    private http: HttpClient,
    private router: Router,
    private apiBaseService: ApiBaseService
  ) {
    this.nextReportingDate = this.data.toDate;
  }


  ngOnInit(): void {
    this.manageDate();
    this.getSession();
  }

  getSession(): void {
    this.apiBaseService.get<ReportingSessionDetail>([ReportingSessionApi.base],false,false).subscribe(
      (res) => {
        this.sessionId = res.id
      }
    )
  }
  updateNextReportingDate() {
    if (this.reportingDate) {
      const updatedReportingDate = new Date(this.reportingDate);
      updatedReportingDate.setDate(updatedReportingDate.getDate() + 14);
      this.nextReportingDate = updatedReportingDate;
    } else {
      this.nextReportingDate = this.reportingDate
    }
  }

  disabledDate = (current: Date): boolean => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return current < today;
  };

  handleCancel(): void {
    this.dialogRef.close();
  }

  onOpenCancelConfirmation(): void {
    this.modal.confirm({
      nzTitle: 'Do you want to cancel this session ?',
      nzContent: '<b>Your are redirect.</b>',
      nzIconType: 'exclamation-circle',
      nzOnOk: () => this.redirectToAdmin(),
      nzCancelText: 'No',
      nzOkText: 'Yes'
    });
  }

  onSaveSession(): void {
    let reportingSessionModel = {
      toDate: this.nextToDate,
      fromDate: this.nextFromDate
    } as ReportingSessionModel

    this.apiBaseService.post<ReportingSessionModel>(
      [ReportingSessionApi.base],
      reportingSessionModel,
      true,
      true,
      'Successfully Added New Session!')
      .subscribe();

    this.handleCancel();
  }

  onOpenCreateNewSessionConfirmation(): void {
    this.modal.confirm({
      nzTitle: 'Reporting Closing Process Successfully Completed, System is ready for new reporting cycle',
      nzContent: '<b></b>',
      nzIconType: 'exclamation-circle',
      nzOnOk: () => this.onSaveSession(),
      nzCancelText: 'No',
      nzOkText: 'Yes'
    });
  }
  closeReportingCycle():void {
    // const reportingSessionDetail = JSON.parse(localStorage.getItem("CONSUMER_SESSION_DETAIL") || '{}');
    // this.sessionId = reportingSessionDetail.reportingSessionId


    let requestBody = {
      reportingSessionId : this.sessionId,
    }
    this.apiBaseService.post<any>([ConsumerReportingApi.base, ConsumerReportingApi.detail, ConsumerReportingApi.close]
      , requestBody, true, true , "Reporting Closing Process Successfully Completed").subscribe(
      (res) => {
        this.onOpenCreateNewSessionConfirmation();
      }
    )

    // let responseBody = {
    //   id: this.sessionId,
    //   status: 2
    // }
    // this.apiBaseService.put<any>([ReportingSessionApi.base],
    //   responseBody,
    //   true,
    //   true,
    //   'Reporting Closing Process Successfully Completed ').subscribe((res)=>{
    //     this.onOpenCreateNewSessionConfirmation();
    // })
  }


  manageDate(): void {
    if(this.data.toDate)
    {
      const fromDate = new Date(this.data.toDate);
      fromDate.setDate(fromDate.getDate() + 1)
      this.nextFromDate = fromDate
      const toDate = new Date(this.nextFromDate)
      toDate.setDate(toDate.getDate() + 14)
      this.nextToDate = toDate
    }
  }
  redirectToAdmin(): void {
    this.router.navigate(['home/admin']).then(() => {
      this.handleCancel()
    })
  }

}
