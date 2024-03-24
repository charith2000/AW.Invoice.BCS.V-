import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {DataMappingMenuModel} from "@application/common-reporting-settings/data-mapping-menu.model";

@Injectable({
  providedIn: 'root'
})
export class StoreDataSourcesService {

  private storeDatasourceSubject = new BehaviorSubject<DataMappingMenuModel[]>([]);
  datasourceSubject$ : Observable<DataMappingMenuModel[]> = this.storeDatasourceSubject.asObservable();

  private storeDatasourceCNSubject = new BehaviorSubject<DataMappingMenuModel[]>([]);
  datasourceCNSubject$ : Observable<DataMappingMenuModel[]> = this.storeDatasourceCNSubject.asObservable();

  private storeDatasourceCMSubject = new BehaviorSubject<DataMappingMenuModel[]>([]);
  datasourceCMSubject$ : Observable<DataMappingMenuModel[]> = this.storeDatasourceCMSubject.asObservable();

  private storeDatasourceCNDCSubject = new BehaviorSubject<DataMappingMenuModel[]>([]);
  datasourceCNDCSubject$ : Observable<DataMappingMenuModel[]> = this.storeDatasourceCNDCSubject.asObservable();

  private storeDatasourceCMDCSubject = new BehaviorSubject<DataMappingMenuModel[]>([]);
  datasourceCMDCSubject$ : Observable<DataMappingMenuModel[]> = this.storeDatasourceCMDCSubject.asObservable();


  constructor() { }

  setDataSource(data: DataMappingMenuModel[]){
    this.storeDatasourceSubject.next(data)
  }
  getDataSource() : DataMappingMenuModel[] {
    return this.storeDatasourceSubject.getValue();
  }
  setDataSourceCN(data: DataMappingMenuModel[]){
    this.storeDatasourceCNSubject.next(data)
  }
  getDataSourceCN() : DataMappingMenuModel[] {
    return this.storeDatasourceCNSubject.getValue();
  }
  setDataSourceCm(data: DataMappingMenuModel[]){
    this.storeDatasourceCMSubject.next(data)
  }
  getDataSourceCM() : DataMappingMenuModel[] {
    return this.storeDatasourceCMSubject.getValue();
  }

  setDataSourceCNDC(data: DataMappingMenuModel[]){
    this.storeDatasourceCNDCSubject.next(data)
  }
  getDataSourceCNDC() : DataMappingMenuModel[] {
    return this.storeDatasourceCNDCSubject.getValue();
  }

  setDataSourceCMDC(data: DataMappingMenuModel[]){
    this.storeDatasourceCMDCSubject.next(data)
  }
  getDataSourceCMDC() : DataMappingMenuModel[] {
    return this.storeDatasourceCMDCSubject.getValue();
  }


}
