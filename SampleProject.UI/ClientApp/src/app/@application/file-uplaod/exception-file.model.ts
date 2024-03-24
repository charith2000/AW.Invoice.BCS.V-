export interface ExceptionFileModel{
  fileName: string;
  numberOfRecords: number;
  createdDate: Date;
  status: number;
}
export interface ExceptionFileDetailModel {
  creditFacilityNo: string;
  cfErrors: number;
  reportingId: string;
  status: number;
}

export interface ExceptionFacilityModel{
  numberOfFacilities: number
}

export interface ErrorLogFileRecordModel {
  creditFacilityNo: string;
  subjectNo: string;
  subjectName: string;
  facilityType: string;
  facilityStatus: string;
  authorizedStatus: number;
}

export interface ErrorLogUpload {
  succeeded: boolean;
  isPending: boolean;
  requestId?: any;
  dateTime: string;
  message: string;
  errors: any[];
  recordCount: number;
}
