import { Injectable } from '@angular/core';
import {environment} from "@environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {CatalogueType} from "@application/crib-catalogue-record/crib-catalogue.model";


@Injectable({
  providedIn: 'root'
})
export class CribCatalogueService {

  baseApiUrl: string = environment.baseApiUrl;
  constructor(private http: HttpClient) { }

  getAllCatalogueTypes(): Observable<CatalogueType[]>{
    return this.http.get<CatalogueType[]>(this.baseApiUrl + '/api/crib-catalog-type');
  }

}
