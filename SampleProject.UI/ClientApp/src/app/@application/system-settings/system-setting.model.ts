export interface SystemSetting{
  //systemSettingId: number;
  dataProviderName: string;
  dataProviderId: string;
  dataProviderBranchId: string;
  guarantorInformationFrom: string;
  suiteInformationFrom: string;
  errorLogFilePath: string;
  currentReportingDate: Date | null;
  nextReportingDate: Date | null;
  authorizedStatus: number;
}
