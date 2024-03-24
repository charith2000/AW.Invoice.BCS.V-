import {AuthorizedStatus} from "@core/enums/authorized-status";

export interface MapAndVerificationSummery {

  id : number,
  facilityNo : string,
  customerNo : string,
  customerName : string,
  facilityType : string,
  ccy : string,
  crLimit : string,
  facilityStatus : string,
  disbDate : string,
  osBalance : string,
  creditFacility : VerificationStatus,
  subject: VerificationStatus,
  security : VerificationStatus,
  guarantor : VerificationStatus,
  suitFiled: VerificationStatus,
  relationship : VerificationStatus,
  employment : VerificationStatus
  authorizedStatus: AuthorizedStatus;
}
export enum VerificationStatus {
  Success = 1,
  Reject = 2,
  NotFound = 3
}
export interface ExceptionModel {
  reportingId: string;
  reportingSegmentId: string;
  dataSourceId: string;
  facilityNumber: string;
  customerNo: string;
  customerName: string;
  exceptionType: string;
  exceptionReason: string;
  reportingSessionDetailId: number;
}

export interface MapAndVerificationModel {
  consumerCreditFacilityTempId: number;
  consumerCreditFacilityTemp?: any;
  consumerCreditFacilityStructuredVerifications: any[];
  consumerCreditFacilityValueVerifications: ConsumerCreditFacilityValueVerification[];
  segmentIdentifier: string;
  dataProviderIdentificationNumber: string;
  previousDataProviderIdentificationNumber: string;
  dataProviderBranchID: string;
  previousDataProviderBranchID: string;
  creditFacilityType: string;
  ownershipType: string;
  creditFacilityNumber: string;
  previousCreditFacilityNumber: string;
  creditFacilityOpenedOrActivatedDate: string;
  customerCreditLimit: string;
  creditFacilityApprovalAmountOrLimit: string;
  creditFacilityTemporaryOverdraftApprovalAmount: string;
  creditFacilityApprovalCurrency: string;
  creditFacilitySanctionAmountOrLimit: string;
  drawingLimit: string;
  firstDisbursementDate: string;
  disbursedAmount: string;
  naturalCreditFacilityMaturityOrExpiryDate: string;
  purposeOfCreditFacility: string;
  interestOrProfitOrType: string;
  interestOrProfitRate: string;
  highestCreditUsage: string;
  repaymentFrequency: string;
  numberOfInstallments: string;
  legalFlag: string;
  totalOutstandingBalance: string;
  dateOfLastRepaidAmount: string;
  lastRepaidAmount: string;
  remainingNumberOfInstallments: string;
  expectedNextInstallmentAmount: string;
  nextPaymentDueDate: string;
  arrearsStartDate: string;
  numberOfDaysInArrears: string;
  amountInArrears: string;
  amountOverdue1To30Days: string;
  amountOverdue31To60Days: string;
  amountOverdue61To90Days: string;
  amountOverdue91To120Days: string;
  amountOverdue121To150Days: string;
  amountOverdue151To180Days: string;
  amountOverdue180DaysOrMore: string;
  assetClassification: string;
  creditFacilityStatus: string;
  creditFacilityReschedulingRestructuringDate: string;
  reasonforReschedulingRestructuring: string;
  writeoffFlag: string;
  totalAmountWrittenOff: string;
  reasonForAmountWrittenOff: string;
  creditFacilityClosingDate: string;
  reasonForClosure: string;
  securityCoverageFlag: string;
  totalCashSpendsForBillingCycle: string;
  totalRetailsSpendsForBillingCycle: string;
  amountDisputed: string;
  minimumPaymentDue: string;
  minimumPaymentDueDate: string;
  highestSingleValueTransactionForTheBillingCycle: string;
  repaymentSources: string;
  transactionTypeCode: string;
  disputeStatus: string;
  disputeID: string;
  filler1: string;
  filler2: string;
  loanApplicationDate: string;
  monthlyInstallmentAmount: string;
  firstPaymentDate: string;
  daysPastDue: string;
  numberOfInstallmentOverdue: string;
  installmentType: string;
  chargedAmount: string;
  lastChargeDate: string;
  flagCardUsed: string;
  cardUsageCount: string;
  minimumPaymentIndicator: string;
  minimumPaymentPercentage: string;
  numberOfServicesLines: string;
  thirdPartyOwnership: string;
  goodType: string;
  goodValue?: any;
  newOrUsedCode: string;
  goodBrand: string;
  manufacturingDate: string;
  registrationNumber: string;
  id: number;
  reportingSegmentDataSourceId: string;
  reportingSessionDetailId: number;
  reportingSessionDetail?: any;
  createdAt: string;
  createdBy: string;
  lastModifiedAt?: any;
  lastModifiedBy?: any;
  deleted: boolean;
  deletedAt?: any;
  deletedBy?: any;
  authorizedAt?: any;
  authorizedBy?: any;
  processType?:any;
}

export interface ConsumerCreditFacilityValueVerification {
  consumerCreditFacilityId: number;
  consumerCreditFacility?: any;
  id: number;
  rules: Rule[];
  columns: string;
  verification: boolean;
}

export interface Rule {
  errors: string[];
  ruleName: string;
  columnName: string;
  success: boolean;
}

export interface VerificationVerificationValue {
  fieldName : string,
  fieldNameNotFormatted:string,
  fieldValue : string,
  description: string[],
  verification : boolean
  bureauRequirement : string
}

export interface DashBordModel {
  exceptionCount: number;
  uploadedDate: string;
  status: string;
  records: number;
  noOfRecordsConsidered: number;
  passRecords: number;
  rejectedRecords: number;
  verificationStatus: string;
  verifiedDate: string;
}

export interface MapAndVerificationSubject {
  consumerSubjectTempId: number;
  consumerSubjectTemp?: any;
  employments?: any;
  relationships?: any;
  consumerSubjectValueVerifications: ConsumerSubjectValueVerification[];
  segmentIdentifier: string;
  dataProviderIdentificationNumber: string;
  dataProviderBranchID: string;
  creditFacilityNumber: string;
  customerNumber: string;
  icNumber: string;
  expiryDateOfICNumber: string;
  previousICNumber: string;
  passportNumber: string;
  expiryDateOfPassport?: any;
  previousPassportNumber: string;
  identifierType: string;
  uniformServicesIdentificationNumber: string;
  previousUniformServicesIdentificationNumber: string;
  uniformServicesIdentificationNumberExpiryDate: string;
  subjectName: string;
  subjectPreviousName: string;
  subjectNationality: string;
  dateOfBirth: string;
  gender: string;
  address1Type: string;
  address1Line1: string;
  address1Line2: string;
  address1Line3: string;
  address1POBox: string;
  address1Kampong: string;
  address1Mukim: string;
  address1District: string;
  address1PostalCode: string;
  address1Country: string;
  telephoneNumber1: string;
  address2Type: string;
  address2Line1: string;
  address2Line2: string;
  address2Line3: string;
  address2POBox: string;
  address2Kampong: string;
  address2Mukim: string;
  address2District: string;
  address2PostalCode: string;
  address2Country: string;
  telephoneNumber2: string;
  mobileNumber: string;
  numberOfDependents?: any;
  emailAddress: string;
  identifierIssueDate1: string;
  identifierIssueDate2: string;
  identifierIssueCountry2: string;
  identifierType3: string;
  identifierIssueDate3: string;
  identifierIssueCountry3: string;
  identifierType1: string;
  identifierNumber1: string;
  identifierType2: string;
  identifierNumber2: string;
  subjectFirstName: string;
  subjectLastName: string;
  subjectMiddleName: string;
  placeOfBirth: string;
  fullAddress1: string;
  fullAddress2: string;
  soleTraderTradeName: string;
  soleTraderAddressType1: string;
  soleTraderFullAddress1: string;
  soleTraderStreetNo1: string;
  soleTraderPOBox1: string;
  soleTraderPostalCode1: string;
  soleTraderKampong1: string;
  soleTraderMukim1: string;
  soleTraderDistrict1: string;
  soleTraderCountry1: string;
  soleTraderAddressType2: string;
  soleTraderFullAddress2: string;
  soleTraderStreetNo2: string;
  soleTraderPOBox2: string;
  soleTraderPostalCode2: string;
  soleTraderKampong2: string;
  soleTraderMukim2: string;
  soleTraderDistrict2: string;
  soleTraderCountry2: string;
  soleTraderIdentifierType1?: any;
  soleTraderIdentifierNumber1: string;
  soleTraderIdentifierType2: string;
  soleTraderIdentifierNumber2: string;
  soleTraderContactType1: string;
  soleTraderContactValue1: string;
  soleTraderContactType2: string;
  soleTraderContactValue2: string;
  id: number;
  reportingSegmentDataSourceId: string;
  reportingSessionDetailId: number;
  reportingSessionDetail?: any;
  createdAt: string;
  createdBy: string;
  lastModifiedAt?: any;
  lastModifiedBy?: any;
  deleted: boolean;
  deletedAt?: any;
  deletedBy?: any;
  authorizedAt?: any;
  authorizedBy?: any;
}

export interface ConsumerSubjectValueVerification {
  consumerSubjectId: number;
  consumerSubject?: any;
  id: number;
  rules: Rule[];
  columns: string;
  verification: boolean;
}

export interface Rule {
  errors: string[];
  ruleName: string;
  columnName: string;
  success: boolean;
}

export interface verificationSummary {
  id: number
  reportingSessionDetailId: number
  facilityNo: string
  customerNo: string
  customerName: string
  facilityType: string
  ccy: string
  crLimit: string
  facilityStatus: string
  disbDate: string
  osBalance: string
  creditFacility: string
  subject: string
  security: string
  guarantor: string
  suitFiled: string
  relationship: string
  employment: string
  verification: boolean
  amendedVerification: string
  authorizedStatus: string
}
