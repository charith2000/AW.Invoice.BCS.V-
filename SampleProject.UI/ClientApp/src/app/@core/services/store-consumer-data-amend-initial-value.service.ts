import { Injectable } from '@angular/core';
import {AmenedValueVerificationModel} from "@application/consumer-data-amend/amened-value-verification.model";

@Injectable({
  providedIn: 'root'
})
export class StoreConsumerDataAmendInitialValueService {

 constructor() {
 }

 setFormattedValue(records: any[]): void {}

  private initialValues: { [creditFacilityNumber: string]: AmenedValueVerificationModel } = {};

  setValue(records: AmenedValueVerificationModel): void {
    if (records.consumerCreditFacility.creditFacilityNumber) {
      this.initialValues[records.consumerCreditFacility.creditFacilityNumber] = records;
    }
  }

  getCFInitialValue(creditFacilityNumber: string): AmenedValueVerificationModel | null {
    if (creditFacilityNumber in this.initialValues) {
      return this.initialValues[creditFacilityNumber];
    } else {
      return null;
    }
  }
  getCSInitialValue(): void {}
  getESInitialValue(): void {}
  getRSInitialValue(): void {}
  getGSInitialValue(): void {}
  getSSInitialValue(): void {}
  getSFInitialValue(): void {}

}
