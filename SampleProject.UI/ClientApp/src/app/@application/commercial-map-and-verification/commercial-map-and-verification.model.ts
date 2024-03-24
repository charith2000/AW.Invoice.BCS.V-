import {AuthorizedStatus} from "@core/enums/authorized-status";
import {VerificationStatus} from "@application/consumer-map-and-verification/consumer-map-and-verification.model";
import {

  ReportingSessionDetail
} from "@application/consumer-map-and-verification/consumer-map-and-verification-security.model";



export interface CommercialMapAndVerificationModelDashBoard {
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
export interface CommercialMapAndVerificationSummery {
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
  authorizedStatus: AuthorizedStatus;
}

export interface CommercialMapAndVerification {
  id: number;
  commercialCreditFacilityTempId: number;
  commercialCreditFacilityValueVerifications: CommercialCreditFacilityValueVerification[];
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
  expectedNextInstallmentAmount?: any;
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
  reasonForReschedulingRestructuring: string;
  writeOffFlag: string;
  totalAmountWrittenOff: string;
  reasonForAmountWrittenOff: string;
  creditFacilityClosingDate: string;
  reasonForClosure: string;
  securityCoverageFlag: string;
  totalCashSpendsForBillingCycle?: any;
  totalRetailsSpendsForBillingCycle?: any;
  amountDisputed?: any;
  minimumPaymentDue?: any;
  minimumPaymentDueDate?: any;
  highestSingleValueTransactionForTheBillingCycle?: any;
  repaymentSources: string;
  transactionTypeCode: string;
  disputeStatus: string;
  disputeID: string;
  filler1?: any;
  filler2?: any;
  loanApplicationDate?: any;
  monthlyInstallmentAmount: string;
  firstPaymentDate?: any;
  daysPastDue: string;
  numberOfInstallmentOverdue?: any;
  installmentType: string;
  chargedAmount?: any;
  lastChargeDate?: any;
  flagCardUsed: string;
  cardUsageCount?: any;
  minimumPaymentIndicator: string;
  minimumPaymentPercentage?: any;
  numberOfServicesLines?: any;
  thirdPartyOwnership: string;
  goodType: string;
  goodValue?: any;
  newOrUsedCode: string;
  goodBrand?: any;
  manufacturingDate?: any;
  registrationNumber?: any;
  reportingSegmentDataSourceId: string;
  reportingSessionDetailId: number;
  reportingSessionDetail?: any;
  processType: number;
  createdAt: string;
  createdBy?: any;
  lastModifiedAt?: any;
  lastModifiedBy?: any;
  deleted: boolean;
  deletedAt?: any;
  deletedBy?: any;
  authorizedAt?: any;
  authorizedBy?: any;
}

export interface CommercialCreditFacilityValueVerification {
  commercialCreditFacilityId: number;
  commercialCreditFacility?: any;
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

export interface CommercialMapAndVerificationSubject {
  id: number;
  commercialSubjectTempId: number;
  commercialSubjectTemp?: any;
  commercialSubjectValueVerifications: CommercialSubjectValueVerification[];
  segmentIdentifier: string;
  dataProviderIdentificationNumber: string;
  dataProviderBranchID: string;
  creditFacilityNumber: string;
  customerNumber: string;
  commercialRegistrationNumber: string;
  previousCRN: string;
  identifierType: string;
  identificationNumber: string;
  previousIdentificationNumber: string;
  identificationNumberExpiryDate: string;
  subjectName: string;
  subjectPreviousName: string;
  subjectDateOfRegistration: string;
  businessActivityCode1: string;
  businessActivityCode2: string;
  businessActivityCode3: string;
  legalConstitution: string;
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
  emailAddress: string;
  identifierType1: string;
  identifierNumber1: string;
  identifierType2: string;
  identifierNumber2: string;
  identifierIssueDate1: string;
  identifierIssueCountry1: string;
  identifierExpiryDate1: string;
  identifierIssueDate2: string;
  identifierIssueCountry2: string;
  fullAddress1: string;
  fullAddress2: string;
  reportingSegmentDataSourceId: string;
  reportingSessionDetailId: number;
  reportingSessionDetail?: any;
  processType: number;
  createdAt: string;
  createdBy?: any;
  lastModifiedAt?: any;
  lastModifiedBy?: any;
  deleted: boolean;
  deletedAt?: any;
  deletedBy?: any;
  authorizedAt?: any;
  authorizedBy?: any;
}

export interface CommercialSubjectValueVerification {
  commercialSubjectId: number;
  commercialSubject?: any;
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
export interface CommercialMapAndVerificationGuarantorModel {
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
  commercialGuarantorTempId: number;
  commercialGuarantorTemp: CommercialGuarantorTemp;
  commercialGuarantorValueVerifications: CommercialGuarantorValueVerification[];
}

export interface CommercialGuarantorValueVerification {
  id: number;
  rules: Rule[];
  columns: string;
  verification: boolean;
  commercialGuarantorId: number;
  commercialGuarantor: string;
}
export interface CommercialMapAndVerificationSecurity {
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
  commercialSecurityTempId: number;
  commercialSecurityTemp: CommercialSecurityTemp;
  commercialSecurityValueVerifications: CommercialSecurityValueVerification[];
}

export interface CommercialSecurityValueVerification {
  id: number;
  rules: Rule[];
  columns: string;
  verification: boolean;
  commercialSecurityId: number;
  commercialSecurity: string;
}

export interface CommercialMapAndVerificationRelationshipModel {
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
  commercialRelationshipTempId: number;
  commercialRelationshipTemp: CommercialRelationshipTemp;
  commercialRelationshipValueVerifications: CommercialRelationshipValueVerification[];
}

export interface CommercialRelationshipValueVerification {
  id: number;
  rules: Rule[];
  columns: string;
  verification: boolean;
  commercialRelationshipId: number;
  commercialRelationship: string;
}

export interface CommercialMapAndVerificationSuitFieldModel {
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
  creditFacilityAccountNumber: string;
  suitFiledStatus: string;
  suitReferenceNumber: string;
  suitAmount: string;
  dateOfSuit: string;
  typeOfCourt: string;
  dateOrderIssued: string;
  commercialSuitFiledTempId: number;
  commercialSuitFiledTemp: CommercialSuitFiledTemp;
  commercialSuitFiledValueVerifications: CommercialSuitFiledValueVerification[];
}

export interface CommercialSuitFiledValueVerification {
  id: number;
  rules: Rule[];
  columns: string;
  verification: boolean;
  commercialSuitFiledId: number;
  commercialSuitFiled: string;
}
export interface CommercialSecurityTemp {
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

export interface CommercialRelationshipTemp {
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

export interface CommercialGuarantorTemp {
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
export interface CommercialSuitFiledTemp {
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
