export interface ConsumerDltFileGenerationModel{
  reportingSessionDetailId: number;
  reportingDate: Date;
}
export interface ConsumerDltFilePendingGenerationModel {
  id: number;
  reportingSessionDetailId: number;
  facilityNo: string;
  customerNo: string;
  customerName: string;
  facilityType: string;
  ccy: string;
  crLimit: string;
  facilityStatus: string;
  disbDate: string;
  osBalance: string;
  creditFacility: number;
  subject: number;
  security: number;
  guarantor: number;
  suitFiled: number;
  relationship: number;
  employment: number;
  verification: boolean;
  amendedVerification: string;
  authorizedStatus: number;
}

export interface ConsumerDltFileGeneratedModel {
  id: number;
  fileName: string;
  numberOfRecord: number;
  reportingSessionDetailId: number;
}
export interface ConsumerPendingDltFileGeneratedModel {
  id: number;
  reportingSessionDetailId: number;
  facilityNo: string;
  customerNo: string;
  customerName: string;
  facilityType: string;
  ccy: string;
  crLimit: string;
  facilityStatus: string;
  disbDate: string;
  osBalance: string;
  creditFacility: number;
  subject: number;
  security: number;
  guarantor: number;
  suitFiled: number;
  relationship: number;
  employment: number;
  verification: boolean;
  amendedVerification?: any;
  authorizedStatus: number;
}

export interface DltFileSummary {
  creditFacilityNo: string;
  subjectName: string;
  creditFacilityType: string;
  ccy: string;
  facilityStatus: string;
  osBalance: string;
  openDate: string;
  recordStatus: string;
}
