export interface ReportingSessionModel{
  reportingSessionDetails :ReportingSessionDetail[];
  id: number
  sessionDetailId: number
  fromDate: Date
  toDate :Date
  createdAt : Date
  createdBy : string
  lastModifiedAt : Date
  lastModifiedBy : string
  status: SessionDetailStatus
  code: string
}
export interface ReportingSessionDetail{
  id: number
  reportingId : string
  reportingSessionId : number
  status : SessionDetailStatus
  createdAt : Date
  createdBy : string
  closedAt : Date
  closedUser : string
}
export enum SessionDetailStatus{
  download = 1,
  confirmDownload = 2,
}

export interface HistorySummery{
  createdDate: Date,
  createdBy: string,
  status: number
  downloadHistorySummaries: DownloadHistorySummaries[]
}
export interface DownloadHistorySummaries{
  reportingSegmentId: string,
  recordCount : number,
  resultRemark : string,
  result : number,
  dataSourceName : string
  reportingSegment: string
}
