import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StoreReportingDateService {

  reportingDate : string = '';
  nextReportingDate : string = '';
  constructor() { }

  setReportingDates(reportingDate : string, nextReportingDate: string) : void {
    this.reportingDate = reportingDate;
    this.nextReportingDate = nextReportingDate;
  }

  getReportingDate() :  string{
    return this.reportingDate;
  }

  getNextReportingDate() : string{
    return this.nextReportingDate;
  }
}
