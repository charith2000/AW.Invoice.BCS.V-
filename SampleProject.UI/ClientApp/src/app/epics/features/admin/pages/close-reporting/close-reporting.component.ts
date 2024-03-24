import {Component, OnInit} from '@angular/core';
import {ApiBaseService} from "@core/services/api-base.service";
import {ReportingCycle, ReportingSessionDetail} from "@application/reporting-cycle/reporting-cycle.model";
import {ReportingCycleApi} from "@application/reporting-cycle/reporting-cycle.api";
import {MatDialog} from "@angular/material/dialog";
import {ConfirmAndCloseSessionComponent} from "./confirm-and-close-session/confirm-and-close-session.component";
import {NzModalService} from "ng-zorro-antd/modal";
import {ReportingSessionApi} from "@application/reporting-session/reporting-session.api";

@Component({
  selector: 'app-close-reporting',
  templateUrl: './close-reporting.component.html',
  styleUrls: ['./close-reporting.component.css']
})
export class CloseReportingComponent implements OnInit{
  fromDate: Date | null = null;
  toDate: Date | null = null;
  consumer: boolean = false;
  commercial: boolean = false;
  consumerDc: boolean = false;
  commercialDc: boolean = false;

  consumerStatus: string = '';
  commercialStatus:  string = '';
  consumerDcStatus:  string = '';
  commercialDcStatus: string = '';

  isPopupOpen = false;

  sessionId: number = 0


  constructor(
    private apiBaseService: ApiBaseService,
    private modal: NzModalService,
    public dialog: MatDialog) {
  }
  ngOnInit(): void {
    const reportingSessionDetail = JSON.parse(localStorage.getItem("CONSUMER_SESSION_DETAIL") || '{}');
    this.sessionId = reportingSessionDetail.reportingSessionId
    this.manageStatus();
    this.getSession();
    this.getStatus();
    console.log(this.consumerStatus + "###################################################")
  }

  getStatus() : void {
    this.apiBaseService.get<ReportingCycle>([ReportingCycleApi.base])
      .subscribe((res) => {
        this.fromDate = res.fromDate;
        this.toDate = res.toDate;
        this.consumer = res.consumer;
        this.commercial = res.commercial;
        this.commercialDc = res.commercialDc;
        this.consumerDc = res.consumerDc;
        console.log(this.consumer + "@@@@@@@@@@@@@@@@@@@@@@@@@")
        if(this.consumer){
          this.consumerStatus = "Closed"
        }else {
          this.consumerStatus = "Open"
        }

        if(this.commercial){
          this.commercialStatus = "Closed"
        }else {
          this.commercialStatus = "Open"
        }

        if(this.commercialDc){
          this.commercialDcStatus = "Closed"
        }else {
          this.commercialDcStatus = "Open"
        }

        if(this.consumerDc){
          this.consumerDcStatus = "Closed"
        }else {
          this.consumerDcStatus = "Open"
        }
      })
  }

  manageStatus() : void {
    // this.getStatus();
    // debugger
    // if(this.consumer){
    //   this.consumerStatus = "Closed"
    // }else {
    //   this.consumerStatus = "Open"
    // }
    //
    // if(this.commercial){
    //   this.commercialStatus = "Open"
    // }else {
    //   this.commercialStatus = "Closed"
    // }
    //
    // if(this.commercialDc){
    //   this.commercialDcStatus = "Open"
    // }else {
    //   this.commercialDcStatus = "Closed"
    // }
    //
    // if(this.consumerDc){
    //   this.consumerDcStatus = "Open"
    // }else {
    //   this.consumerDcStatus = "Closed"
    // }

  }

  openConfirmation():void{
    this.modal.confirm({
      nzTitle: 'Do you want to close the Current reporting Cycle ?',
      nzContent: '<b></b>',
      nzOnOk: () => this.onOpenDialog(this.toDate)
    });
  }
  onOpenDialog(toDate :  Date | null ) : void {
    if(!this.isPopupOpen){
      this.isPopupOpen = true
      const dialogRef = this.dialog.open(ConfirmAndCloseSessionComponent,
        {data : {
            toDate : toDate
          }, width : "500px"});

      dialogRef.afterClosed()
        .subscribe(() => {
          this.isPopupOpen = false
          const reportingSessionDetail = JSON.parse(localStorage.getItem("CONSUMER_SESSION_DETAIL") || '{}');
          this.sessionId = reportingSessionDetail.reportingSessionId
          this.getStatus();
          this.manageStatus();
          this.getSession();
        })
    }
  }

  getSession(): void {
    this.apiBaseService.get<ReportingSessionDetail>([ReportingSessionApi.base],false,false).subscribe(
      (res) => {
        this.sessionId = res.id
      }
    )
  }
}
