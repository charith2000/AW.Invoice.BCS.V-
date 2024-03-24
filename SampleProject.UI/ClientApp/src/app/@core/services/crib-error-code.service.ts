import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { Observable } from 'rxjs';
import { ErrorCode } from '@application/crib-error-code/crib-error-code.model';

@Injectable({
  providedIn: 'root'
})
export class ErrorCodeService {

  baseApiUrl: string = environment.baseApiUrl;

  constructor(private http: HttpClient) { }

  getAllErrorCodes(): Observable<ErrorCode[]>{
    return this.http.get<ErrorCode[]>(this.baseApiUrl + '/api/crib-error-code');
  }

  searchErrorCode(): Observable<ErrorCode[]>{
    return this.http.get<ErrorCode[]>(this.baseApiUrl + '/api/crib-error-code/search')
  }

  addErrorCode(addErrorCodeRequest: ErrorCode): Observable<ErrorCode>{
    return this.http.post<ErrorCode>(this.baseApiUrl + '/api/crib-error-code',addErrorCodeRequest);
  }




}
