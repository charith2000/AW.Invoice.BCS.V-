export interface ConsumerMapAndVerificationRelationshipModel {
  createdAt: string;
  createdBy: string;
  lastModifiedAt: string;
  lastModifiedBy: string;
  deleted: boolean;
  deletedAt: string;
  deletedBy: string;
  authorizedAt: string;
  authorizedBy: string;
  id: number;
  reportingSegmentDataSourceId: string;
  reportingSessionDetailId: number;
  reportingSessionDetail: ReportingSessionDetail;
  segmentIdentifier: string;
  dataProviderIdentificationNumber: string;
  dataProviderBranchID: string;
  creditFacilityNumber: string;
  ownCustomer: string;
  customerNumber: string;
  customerNumberOfRelationship: string;
  relationshipNature: string;
  relatedEntityType: string;
  relatedIndividualICNumber: string;
  expiryDateOfRelatedIndividualICNumber: string;
  relatedIndividualPreviousICNumber: string;
  relatedIndividualPassportNumber: string;
  expiryDateOfRelatedIndividualsPassport: string;
  relatedIndividualPreviousPassportNumber: string;
  relatedCommercialEntityCRN: string;
  relatedCommercialEntityPreviousCRN: string;
  relatedIndividualOrCommercialEntityIdentifierType: string;
  relatedIndividualUniformServiceOrCommercialEntityIdentificationNumber: string;
  relatedIndividualUniformServiceOrCommercialEntityPreviousIdentificationNumber: string;
  relatedIndividualUniformServiceOrCommercialEntityIdentificationNumberExpiryDate: string;
  relatedIndividualOrCommercialEntityName: string;
  relatedIndividualOrCommercialEntityPreviousName: string;
  relatedIndividualNationality: string;
  relatedIndividualDateOfBirthCommercialEntityDateOfRegistration: string;
  relatedIndividualGender: string;
  relatedCommercialEntityLegalConstitution: string;
  relationshipStatus: string;
  relatedIndividualOrCommercialEntityAddressType: string;
  relatedIndividualOrCommercialEntityAddressLine1: string;
  relatedIndividualOrCommercialEntityAddressLine2: string;
  relatedIndividualOrCommercialEntityAddressLine3: string;
  relatedIndividualOrCommercialEntityAddressPOBoxNumber: string;
  relatedIndividualOrCommercialEntityAddressKampong: string;
  relatedIndividualOrCommercialEntityAddressMukim: string;
  relatedIndividualOrCommercialEntityAddressDistrict: string;
  relatedIndividualOrCommercialEntityPostalCode: string;
  relatedIndividualOrCommercialEntityAddressCountry: string;
  relatedIndividualOrCommercialEntityTelephoneNumber: string;
  relatedIndividualOrCommercialEntityMobileNumber: string;
  relatedIndividualOrCommercialEntityEmailAddress: string;
  consumerRelationshipTempId: number;
  consumerRelationshipTemp: ConsumerRelationshipTemp;
  consumerRelationshipValueVerifications: ConsumerRelationshipValueVerification[];
}

export interface ConsumerRelationshipValueVerification {
  id: number;
  rules: Rule[];
  columns: string;
  verification: boolean;
  consumerRelationshipId: number;
  consumerRelationship: string;
}

export interface ReportingSessionDetail {
  id: number;
  reporting: Reporting;
  reportingId: string;
  reportingSession: ReportingSession;
  reportingSessionId: number;
  status: number;
  createdAt: string;
  createdBy: string;
  closedAt: string;
  closedUser: string;
  consumerCreditFacilities: ConsumerCreditFacility[];
  consumerEmploymentTemps: ConsumerEmploymentTemp[];
  consumerGuarantorTemps: ConsumerGuarantorTemp[];
  consumerRelationshipTemps: ConsumerRelationshipTemp[];
  consumerSecurityTemps: ConsumerSecurityTemp[];
  consumerSuitFiledTemps: ConsumerSuitFiledTemp[];
  consumerSubjectTemps: ConsumerSubjectTemp[];
}

export interface ConsumerSubjectTemp {
  createdAt: string;
  createdBy: string;
  lastModifiedAt: string;
  lastModifiedBy: string;
  deleted: boolean;
  deletedAt: string;
  deletedBy: string;
  authorizedAt: string;
  authorizedBy: string;
  id: number;
  reportingSegmentDataSourceId: string;
  reportingSessionDetailId: number;
  reportingSessionDetail: string;
  segmentIdentifier: string;
  dataProviderIdentificationNumber: string;
  dataProviderBranchID: string;
  creditFacilityNumber: string;
  customerNumber: string;
  icNumber: string;
  expiryDateOfICNumber: string;
  previousICNumber: string;
  passportNumber: string;
  expiryDateOfPassport: string;
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
  numberOfDependents: string;
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
  soleTraderIdentifierType1: string;
  soleTraderIdentifierNumber1: string;
  soleTraderIdentifierType2: string;
  soleTraderIdentifierNumber2: string;
  soleTraderContactType1: string;
  soleTraderContactValue1: string;
  soleTraderContactType2: string;
  soleTraderContactValue2: string;
}

export interface ConsumerSuitFiledTemp {
  createdAt: string;
  createdBy: string;
  lastModifiedAt: string;
  lastModifiedBy: string;
  deleted: boolean;
  deletedAt: string;
  deletedBy: string;
  authorizedAt: string;
  authorizedBy: string;
  id: number;
  reportingSegmentDataSourceId: string;
  reportingSessionDetailId: number;
  reportingSessionDetail: string;
  segmentIdentifier: string;
  dataProviderIdentificationNumber: string;
  dataProviderBranchID: string;
  creditFacilityAccountNumber: string;
  suitFiledStatus: string;
  suitReferenceNumber: string;
  suitAmount: string;
  dateOfSuit: string;
  typeOfCourt: string;
  dateOrderIssued: string;
}

export interface ConsumerSecurityTemp {
  createdAt: string;
  createdBy: string;
  lastModifiedAt: string;
  lastModifiedBy: string;
  deleted: boolean;
  deletedAt: string;
  deletedBy: string;
  authorizedAt: string;
  authorizedBy: string;
  id: number;
  reportingSegmentDataSourceId: string;
  reportingSessionDetailId: number;
  reportingSessionDetail: string;
  segmentIdentifier: string;
  dataProviderIdentificationNumber: string;
  dataProviderBranchID: string;
  creditFacilityNumber: string;
  customerNumber: string;
  internalReferenceNumberOfSecurity: string;
  typeOfSecurity: string;
  descriptionOfSecurity: string;
  natureOfCharge: string;
  dateOfSecurityPledge: string;
  securityCoveragePercentage: string;
  latestValueOfSecurity: string;
  dateOfLatestValuation: string;
  customerType: string;
  assetCode: string;
}

export interface ConsumerRelationshipTemp {
  createdAt: string;
  createdBy: string;
  lastModifiedAt: string;
  lastModifiedBy: string;
  deleted: boolean;
  deletedAt: string;
  deletedBy: string;
  authorizedAt: string;
  authorizedBy: string;
  id: number;
  reportingSegmentDataSourceId: string;
  reportingSessionDetailId: number;
  reportingSessionDetail: string;
  segmentIdentifier: string;
  dataProviderIdentificationNumber: string;
  dataProviderBranchID: string;
  creditFacilityNumber: string;
  ownCustomer: string;
  customerNumber: string;
  customerNumberOfRelationship: string;
  relationshipNature: string;
  relatedEntityType: string;
  relatedIndividualICNumber: string;
  expiryDateOfRelatedIndividualICNumber: string;
  relatedIndividualPreviousICNumber: string;
  relatedIndividualPassportNumber: string;
  expiryDateOfRelatedIndividualsPassport: string;
  relatedIndividualPreviousPassportNumber: string;
  relatedCommercialEntityCRN: string;
  relatedCommercialEntityPreviousCRN: string;
  relatedIndividualOrCommercialEntityIdentifierType: string;
  relatedIndividualUniformServiceOrCommercialEntityIdentificationNumber: string;
  relatedIndividualUniformServiceOrCommercialEntityPreviousIdentificationNumber: string;
  relatedIndividualUniformServiceOrCommercialEntityIdentificationNumberExpiryDate: string;
  relatedIndividualOrCommercialEntityName: string;
  relatedIndividualOrCommercialEntityPreviousName: string;
  relatedIndividualNationality: string;
  relatedIndividualDateOfBirthCommercialEntityDateOfRegistration: string;
  relatedIndividualGender: string;
  relatedCommercialEntityLegalConstitution: string;
  relationshipStatus: string;
  relatedIndividualOrCommercialEntityAddressType: string;
  relatedIndividualOrCommercialEntityAddressLine1: string;
  relatedIndividualOrCommercialEntityAddressLine2: string;
  relatedIndividualOrCommercialEntityAddressLine3: string;
  relatedIndividualOrCommercialEntityAddressPOBoxNumber: string;
  relatedIndividualOrCommercialEntityAddressKampong: string;
  relatedIndividualOrCommercialEntityAddressMukim: string;
  relatedIndividualOrCommercialEntityAddressDistrict: string;
  relatedIndividualOrCommercialEntityPostalCode: string;
  relatedIndividualOrCommercialEntityAddressCountry: string;
  relatedIndividualOrCommercialEntityTelephoneNumber: string;
  relatedIndividualOrCommercialEntityMobileNumber: string;
  relatedIndividualOrCommercialEntityEmailAddress: string;
}

export interface ConsumerGuarantorTemp {
  createdAt: string;
  createdBy: string;
  lastModifiedAt: string;
  lastModifiedBy: string;
  deleted: boolean;
  deletedAt: string;
  deletedBy: string;
  authorizedAt: string;
  authorizedBy: string;
  id: number;
  reportingSegmentDataSourceId: string;
  reportingSessionDetailId: number;
  reportingSessionDetail: string;
  segmentIdentifier: string;
  dataProviderIdentificationNumber: string;
  dataProviderBranchID: string;
  creditFacilityNumber: string;
  ownCustomer: string;
  customerNumber: string;
  customerNumberOfGuarantor: string;
  relationshipNature: string;
  guarantorEntityType: string;
  guarantorIndividualICNumber: string;
  expiryDateOfGuarantorIndividualICNumber: string;
  guarantorIndividualPreviousICNumber: string;
  guarantorIndividualPassportNumber: string;
  expiryDateOfGuarantorIndividualPassport: string;
  previousGuarantorIndividualPassportNumber: string;
  guarantorCommercialEntityCRN: string;
  guarantorCommercialEntityPreviousCRN: string;
  guarantorIndividualOrCommercialEntityIdentifierType: string;
  guarantorIndividualUniformServiceOrCommercialEntityIdentificationNumber: string;
  guarantorIndividualPreviousUniformServiceOrCommercialEntityPreviousIdentificationNumber: string;
  guarantorIndividualUniformServiceOrCommercialEntityIdentificationNumberExpiryDate: string;
  guarantorIndividualOrCommercialEntityName: string;
  guarantorIndividualOrCommercialEntityPreviousName: string;
  guarantorIndividualNationality: string;
  guarantorIndividualDateOfBirthCommercialEntityDateOfRegistration: string;
  guarantorIndividualGender: string;
  guarantorCommercialEntityLegalConstitution: string;
  guarantorIndividualOrCommercialEntityRelationshipStatus: string;
  guarantorIndividualOrCommercialEntityAddressType: string;
  guarantorIndividualOrCommercialEntityAddressLine1: string;
  guarantorIndividualOrCommercialEntityAddressLine2: string;
  guarantorIndividualOrCommercialEntityAddressLine3: string;
  relatedIndividualOrCommercialEntityAddressPOBoxNumber: string;
  guarantorIndividualOrCommercialEntityAddressKampong: string;
  guarantorIndividualOrCommercialEntityAddressMukim: string;
  guarantorIndividualOrCommercialEntityAddressDistrict: string;
  guarantorIndividualOrCommercialEntityPostalCode: string;
  guarantorIndividualOrCommercialEntityAddressCountry: string;
  guarantorIndividualOrCommercialEntityTelephoneNumber: string;
  guarantorIndividualOrCommercialEntityMobileNumber: string;
  guarantorIndividualOrCommercialEntityEmailAddress: string;
}

export interface ConsumerEmploymentTemp {
  createdAt: string;
  createdBy: string;
  lastModifiedAt: string;
  lastModifiedBy: string;
  deleted: boolean;
  deletedAt: string;
  deletedBy: string;
  authorizedAt: string;
  authorizedBy: string;
  id: number;
  reportingSegmentDataSourceId: string;
  reportingSessionDetailId: number;
  reportingSessionDetail: string;
  segmentIdentifier: string;
  dataProviderIdentificationNumber: string;
  dataProviderBranchID: string;
  creditFacilityNumber: string;
  customerNumber: string;
  employmentType: string;
  employerName: string;
  designation: string;
  employerBusinessActivityCode: string;
  dateHired: string;
  annualIncome: string;
  dateIncomeEmploymentInformationVerified: string;
  payBasis: string;
  currentSalaryTransferToBank: string;
}

export interface ConsumerCreditFacility {
  createdAt: string;
  createdBy: string;
  lastModifiedAt: string;
  lastModifiedBy: string;
  deleted: boolean;
  deletedAt: string;
  deletedBy: string;
  authorizedAt: string;
  authorizedBy: string;
  id: number;
  reportingSegmentDataSourceId: string;
  reportingSessionDetailId: number;
  reportingSessionDetail: string;
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
  goodValue: string;
  newOrUsedCode: string;
  goodBrand: string;
  manufacturingDate: string;
  registrationNumber: string;
  consumerCreditFacilityTempId: number;
  consumerCreditFacilityTemp: ConsumerCreditFacilityTemp;
  consumerCreditFacilityStructuredVerifications: ConsumerCreditFacilityStructuredVerification[];
  consumerCreditFacilityValueVerifications: ConsumerCreditFacilityValueVerification[];
}

export interface ConsumerCreditFacilityValueVerification {
  id: number;
  rules: Rule[];
  columns: string;
  verification: boolean;
  consumerCreditFacilityId: number;
  consumerCreditFacility: string;
}

export interface Rule {
  errors: string[];
  ruleName: string;
  columnName: string;
  success: boolean;
}

export interface ConsumerCreditFacilityStructuredVerification {
  id: number;
  consumerCreditFacilityId: number;
  consumerCreditFacility: string;
  subjectRequiredMinimumCount: number;
  subjectAvailableCount: number;
  subjectVerification: boolean;
  subjectVerificationRemark: string;
  securityRequiredMinimumCount: number;
  securityAvailableCount: number;
  securityVerification: boolean;
  securityVerificationRemark: string;
  guarantorRequiredMinimumCount: number;
  guarantorAvailableCount: number;
  guarantorVerification: boolean;
  guarantorVerificationRemark: string;
  suitFiledRequiredMinimumCount: number;
  suitFiledAvailableCount: number;
  suitFiledVerification: boolean;
  suitFiledVerificationRemark: string;
  verification: boolean;
  verificationRemark: boolean;
}

export interface ConsumerCreditFacilityTemp {
  createdAt: string;
  createdBy: string;
  lastModifiedAt: string;
  lastModifiedBy: string;
  deleted: boolean;
  deletedAt: string;
  deletedBy: string;
  authorizedAt: string;
  authorizedBy: string;
  id: number;
  reportingSegmentDataSourceId: string;
  reportingSessionDetailId: number;
  reportingSessionDetail: string;
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
  goodValue: string;
  newOrUsedCode: string;
  goodBrand: string;
  manufacturingDate: string;
  registrationNumber: string;
}

export interface ReportingSession {
  id: number;
  reportingDate: string;
  nextReportingDate: string;
  status: number;
  createdAt: string;
  createdBy: string;
  lastModifiedAt: string;
  lastModifiedBy: string;
  reportingSessionDetails: string[];
}

export interface Reporting {
  reportingId: string;
  name: string;
  reportingSegments: ReportingSegment[];
}

export interface ReportingSegment {
  reportingSegmentId: string;
  segmentName: string;
  reportingId: string;
  reporting: string;
  reportingSegmentDataSources: ReportingSegmentDataSource[];
  reportingSegmentFields: ReportingSegmentField[];
}

export interface ReportingSegmentDataSource {
  createdAt: string;
  createdBy: string;
  lastModifiedAt: string;
  lastModifiedBy: string;
  deleted: boolean;
  deletedAt: string;
  deletedBy: string;
  authorizedAt: string;
  authorizedBy: string;
  reportingSegmentDataSourceId: string;
  sourceName: string;
  active: boolean;
  serverName: string;
  dbName: string;
  userId: string;
  password: string;
  reportingSegmentId: string;
  reportingSegment: string;
  dataSourceTableConnection: DataSourceTableConnection;
  downloadHistorySummaries: DownloadHistorySummary[];
  status: number;
  authorizedStatus: number;
}

export interface DownloadHistorySummary {
  createdAt: string;
  createdBy: string;
  lastModifiedAt: string;
  lastModifiedBy: string;
  deleted: boolean;
  deletedAt: string;
  deletedBy: string;
  authorizedAt: string;
  authorizedBy: string;
  id: number;
  recordCount: number;
  result: number;
  resultRemark: string;
  downloadHistory: DownloadHistory;
  downloadHistoryId: number;
  reportingSegmentDataSource: string;
  reportingSegmentDataSourceId: string;
}

export interface DownloadHistory {
  createdAt: string;
  createdBy: string;
  lastModifiedAt: string;
  lastModifiedBy: string;
  deleted: boolean;
  deletedAt: string;
  deletedBy: string;
  authorizedAt: string;
  authorizedBy: string;
  id: number;
  status: number;
  sessionDetail: string;
  sessionDetailId: number;
  resultRemark: string;
  logger: string;
  downloadHistorySummaries: string[];
}

export interface DataSourceTableConnection {
  createdAt: string;
  createdBy: string;
  lastModifiedAt: string;
  lastModifiedBy: string;
  deleted: boolean;
  deletedAt: string;
  deletedBy: string;
  authorizedAt: string;
  authorizedBy: string;
  dataSourceTableConnectionId: string;
  tableConnection: string;
  filterCondition: string;
  reportingSegmentDataSource: string;
  reportingSegmentDataSourceId: string;
  authorizedStatus: number;
  finalQuery: string;
  isTestedFinalQuery: boolean;
  dataSourceTableConnectionFieldMappings: DataSourceTableConnectionFieldMapping[];
}

export interface DataSourceTableConnectionFieldMapping {
  createdAt: string;
  createdBy: string;
  lastModifiedAt: string;
  lastModifiedBy: string;
  deleted: boolean;
  deletedAt: string;
  deletedBy: string;
  authorizedAt: string;
  authorizedBy: string;
  dataSourceTableConnectionFieldMappingId: number;
  dataSourceTableConnectionId: string;
  dataSourceTableConnection: string;
  mappingType: number;
  reportingSegmentFieldId: number;
  reportingSegmentField: ReportingSegmentField;
  defaultValue: string;
  fieldMapping: string;
  condition: string;
  authorizedStatus: number;
}

export interface ReportingSegmentField {
  reportingSegmentFieldId: number;
  columName: string;
  name: string;
  options: string;
  reportingSegmentId: string;
  reportingSegment: string;
  type: string;
  length: number;
  description: string;
  active: boolean;
  catalogueType: string;
}
