import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {
  ConsumerDltFileGeneratedModel
} from "@application/consumer-dlt-file-generation/consumer-dlt-file-generation.model";
import {
  CommercialDltFileGeneratedModel
} from "@application/commercial-dlt-file-generation/commercial-dlt-file-generation.model";

@Injectable({
  providedIn: 'root'
})
export class StoreDltFileService {

  private generatedFilesSubject = new BehaviorSubject<ConsumerDltFileGeneratedModel[]>([]);
  generatedFiles$: Observable<ConsumerDltFileGeneratedModel[]> = this.generatedFilesSubject.asObservable();

  private generatedCommercialFilesSubject = new BehaviorSubject<CommercialDltFileGeneratedModel[]>([]);
  generatedCommercialFiles$ : Observable<CommercialDltFileGeneratedModel[]> = this.generatedCommercialFilesSubject.asObservable();
  constructor() {
  }

  setGeneratedConsumerFile(data: ConsumerDltFileGeneratedModel[]) {
    this.generatedFilesSubject.next(data)
  }

  getGeneratedConsumerFile(): ConsumerDltFileGeneratedModel[] {
    return this.generatedFilesSubject.getValue();
  }
  setGeneratedCommercialFile(data: CommercialDltFileGeneratedModel[]) {
    this.generatedCommercialFilesSubject.next(data)
  }

  getGeneratedCommercialFile(): CommercialDltFileGeneratedModel[] {
    return this.generatedCommercialFilesSubject.getValue();
  }
}
