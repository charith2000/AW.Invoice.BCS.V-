export interface ReportingSystemSettingModel {
  reportingSystemSettingId: string;
  natureOfData: string;
  iffVersion: string;
  comment: string;
  dltFilePath: string;
  password: string;
  cribErrorLogPath: string;
  authorizedStatus: number;
}
