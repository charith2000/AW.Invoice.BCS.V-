import { Injectable } from '@angular/core';
import {MapAndVerificationSummery} from "@application/consumer-map-and-verification/consumer-map-and-verification.model";

@Injectable({
  providedIn: 'root'
})
export class VerificationDataStorageService {

  private passedRecords: MapAndVerificationSummery[] = [];
  private rejectRecords: MapAndVerificationSummery[] = [];
  private exceptionCount: number = 0;

  setPassedRecords(records: MapAndVerificationSummery[]): void {
    this.passedRecords = records;
  }

  getPassedRecords(): MapAndVerificationSummery[] {
    return this.passedRecords;
  }

  setRejectRecords(records: MapAndVerificationSummery[]): void {
    this.rejectRecords = records;
  }

  getRejectRecords(): MapAndVerificationSummery[] {
    return this.rejectRecords;
  }

  updateExceptionCount(count : number) : void {
    this.exceptionCount = count
  }
  getExceptionCount(): number{
    return this.exceptionCount;
  }
}
