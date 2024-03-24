import {Injectable} from '@angular/core';
import {Observable, Subject} from "rxjs";
import {ReportingSessionDetail, ReportingSessionModel} from "@application/reporting-session/reporting-session.model";
import {Router} from "@angular/router";
import {Expansion} from "@angular/compiler";


@Injectable({
  providedIn: 'root'
})
export class SessionDetailSubjectService {

  constructor(private router: Router) {
  }

  private _session: ReportingSessionModel = {} as ReportingSessionModel;
  private subject = new Subject<ReportingSessionDetail>();


  public sessionDetail(reportingId: string): ReportingSessionDetail {
    return this._session.reportingSessionDetails.find(x => x.reportingId == reportingId)
      ?? {} as ReportingSessionDetail;
  }

// sendMessage(session: ReportingSessionModel) {
  //   this.session = session;
  //   this.subject.next(session);
  // }

  navigateAndSendMessage(session: ReportingSessionModel, reportingId: string) {
    this._session = session;

    const sessionDetail = session.reportingSessionDetails
      .find(x => x.reportingId == reportingId);

    this.navigate(reportingId);
    if (!sessionDetail)
      throw Error("session detail cannot find for " + reportingId)

    this.subject.next(sessionDetail);
  }


  private navigate(reportingId: string) {
    switch (reportingId) {
      case 'CN':
        this.router.navigate(['home/consumer']).then(res => {
          console.log(res);
          console.log('Navigated')
        });
        break;
      case 'CM':
        this.router.navigate(['home/commercial']).then(res => {
          console.log(res);
          console.log('Navigated')
        });
        break;

    }
  }


  // clearMessages() {
  //   this.subject.next(null);
  // }

  getMessage(): Observable<ReportingSessionDetail> {
    return this.subject.asObservable();
  }


}
