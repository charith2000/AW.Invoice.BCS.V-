import { Injectable } from '@angular/core';
import {Catalogue} from "@application/consumer-reporting-master-data/consumer-master-data.model";

@Injectable({
  providedIn: 'root'
})
export class StoreCatalogueDescriptionService {
  catalogueDescriptions: Catalogue[] = [];

  constructor() {}

  storeDescription(data: Catalogue[]) {
    this.catalogueDescriptions = data;
  }

  getStoredDescription() {
    return this.catalogueDescriptions;
  }
}
