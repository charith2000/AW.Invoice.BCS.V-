export interface CommercialDltFileGenerationModel{
  reportingSessionDetailId: number;
  reportingDate: Date;
}
export interface CommercialDltFilePendingGenerationModel {
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

export interface CommercialDltFileGeneratedModel {
  id: number;
  fileName: string;
  numberOfRecord: number;
  reportingSessionDetailId: number;
}
export interface CommercialPendingDltFileGeneratedModel {
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
