import {Component, OnInit} from '@angular/core';
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {ReportingSessionModalComponent} from "@core/modules/reporting-session-modal/reporting-session-modal.component";
import {ReportingSessionDetail, ReportingSessionModel} from "@application/reporting-session/reporting-session.model";

import {HttpClient} from "@angular/common/http";
import {ApiBaseService} from "@core/services/api-base.service";
import {ReportingSessionApi} from "@application/reporting-session/reporting-session.api";
import {ColorModeService} from "@core/services/color-mode.service";
import {Router} from "@angular/router";
import {SessionDetailSubjectService} from "@core/services/session-detail-subject.service";
import {StorageService} from "@core/services/storage.service";
import {AuthService} from "@core/services/auth.service";


@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit{

  isExpanded = false;
  currentUser: string | null = '';

  constructor(private http: HttpClient,
              public dialog: MatDialog,
              private router: Router,
              private sessionDetailSubject: SessionDetailSubjectService,
              private colorModeService: ColorModeService,
              private apiBaseService: ApiBaseService,
              private storageService: StorageService,
              private authService: AuthService
  ) {

  }

  ngOnInit() {
    this.getUserName()
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }

  checkSessionIsAvailable(reportingId: string): void {

    this.apiBaseService.get<ReportingSessionModel>([ReportingSessionApi.base])
      .subscribe((res) => {
        if (res.id == 0) {
          this.onOpenDialog(reportingId, res.fromDate, res.toDate);
        } else {
          console.log(res);
          this.sessionDetailSubject.navigateAndSendMessage(res, reportingId);
        }

      })
  }


  onOpenDialog(reportingId: string, nextReportingDate: Date, reportingDate: Date): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.panelClass = 'custom-dialog-container'
    this.dialog.open(ReportingSessionModalComponent, {
      data: {
        reportingId,
        nextReportingDate,
        reportingDate
      },
      width: "400px"
    });
  }

  // toggleColorMode() {
  //   this.colorModeService.toggleColorMode();
  // }
  logOut() : void {
    this.storageService.clean()
    this.router.navigate(['/']).then()
  }

 getUserName(): void {
   this.currentUser =  this.authService.getUserName();
   console.log(this.currentUser)
  }

  hasPermission(firstPart: string): boolean {
    const userRoles = this.authService.getUserRoles();
    return userRoles.some(role => role.startsWith(firstPart));
  }

}
