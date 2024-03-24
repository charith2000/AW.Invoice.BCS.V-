export interface ReportingCycle {
  id: number;
  fromDate: Date;
  toDate: Date;
  consumer: boolean;
  commercial: boolean;
  consumerDc: boolean;
  commercialDc: boolean;
}

export interface ReportingCycleConsumer {
  id: number;
  fromDate: string;
  toDate: string;
  reportingSessionDetail: ReportingSessionDetail;
  status1: string;
  status2: string;
  status3: string;
  status4: string;
  status5: string;
  status6: string;
  status7: string;
}

export interface ReportingSessionDetail {
  id: number;
  reporting?: any;
  reportingId: string;
  reportingSession?: any;
  reportingSessionId: number;
  status: number;
  createdAt: string;
  createdBy?: any;
  closedAt: string;
  closedUser: string;
  consumerCreditFacilityTemps?: any;
  consumerEmploymentTemps?: any;
  consumerGuarantorTemps?: any;
  consumerRelationshipTemps?: any;
  consumerSecurityTemps?: any;
  consumerSuitFiledTemps?: any;
  consumerSubjectTemps?: any;
}
