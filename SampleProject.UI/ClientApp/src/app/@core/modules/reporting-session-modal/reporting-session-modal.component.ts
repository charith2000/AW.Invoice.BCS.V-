import {Component, Inject} from '@angular/core';
import {ReportingSessionModel} from "@application/reporting-session/reporting-session.model";
import {HttpClient} from "@angular/common/http";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {ApiBaseService} from "@core/services/api-base.service";
import {ReportingSessionApi} from "@application/reporting-session/reporting-session.api";
import {NzModalService} from "ng-zorro-antd/modal";
import {Router} from "@angular/router";
import {SessionDetailSubjectService} from "@core/services/session-detail-subject.service";


@Component({
  selector: 'app-reporting-session-modal',
  templateUrl: './reporting-session-modal.component.html',
  styleUrls: ['./reporting-session-modal.component.css']
})
export class ReportingSessionModalComponent {

  nextReportingDate: Date | null = null;
  reportingDate: Date | null = null;

  constructor(private http: HttpClient,
              public dialog: MatDialog,
              private modal: NzModalService,
              @Inject(MAT_DIALOG_DATA)
              public data: {
                reportingId: string,
                nextReportingDate: Date,
                reportingDate: Date
              },
              public dialogRef: MatDialogRef<ReportingSessionModalComponent>,
              private sessionDetailSubject: SessionDetailSubjectService,
              private router: Router,
              private apiBaseService: ApiBaseService
  ) {
      this.nextReportingDate = this.data.nextReportingDate;
      this.reportingDate = this.data.reportingDate;
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

  openSaveConfirmation(): void {
    this.modal.confirm({
      nzTitle: 'Do you want to save this session ?',
      nzContent: '<b></b>',
      nzIconType: 'exclamation-circle',
      nzOnOk: () => this.onSaveSession(),
      nzCancelText: 'No',
      nzOkText: 'Yes'
    });
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
      toDate: this.reportingDate,
      fromDate: this.nextReportingDate
    } as ReportingSessionModel

    this.apiBaseService.post<ReportingSessionModel>(
      [ReportingSessionApi.base],
      reportingSessionModel,
      true,
      true,
      'Successfully Added New Session!')
      .subscribe(res => {

        this.sessionDetailSubject.navigateAndSendMessage(res, this.data.reportingId);
      });

    this.handleCancel();
  }

  redirectToAdmin(): void {
    this.router.navigate(['home/admin']).then(() => {
      this.handleCancel()
    })
  }
}
