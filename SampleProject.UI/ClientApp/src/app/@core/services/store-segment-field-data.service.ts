import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StoreSegmentFieldDataService {

  reportingSegments: any[] = [];

  constructor() {}

  storeData(data: any[]) {
    this.reportingSegments = data;
  }

  getStoredData() {
    return this.reportingSegments;
  }
}
