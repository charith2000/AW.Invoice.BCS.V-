import {Inject, Injectable} from '@angular/core';
import {HttpClient,HttpResponse, HttpParams} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {NgxUiLoaderService} from "ngx-ui-loader";
import {catchError, map} from "rxjs/operators";
import {NotificationService} from "./notification.service";
import {LoaderService} from "@core/services/loader.service";


@Injectable({
  providedIn: 'root'
})
export class ApiBaseService {

  constructor(private http: HttpClient,
              @Inject('BASE_URL') private baseUrl: string,
              private ngxLoader: NgxUiLoaderService,
              private notificationService: NotificationService,
              private loaderService: LoaderService) {
  }

  baseApiUrl = this.baseUrl;

  get<T>(path: string[],
         isLoaderOn = true,
         isShowError = true,
         params?: HttpParams): Observable<T> {

    const apiPath = `${this.baseApiUrl}${path.join('/')}`;
    console.log("New Get Request : ", apiPath);
    if (isLoaderOn) {
      // this.loaderService.showLoader();
      this.ngxLoader.start(apiPath);
    }
    return this.http.get<T>(apiPath, {params})
      .pipe(
        map(data => {
          if (isLoaderOn) {
            // this.loaderService.hideLoader();
            this.ngxLoader.stop(apiPath);
          }
          return data
        }),
        catchError(err => {
          if (isShowError) {
            this.showErrors(err.error);
          }

          if (isLoaderOn) {
            this.ngxLoader.stop(apiPath);
          }
          return throwError(err);
        }));
  }

  post<T>(path: string[],
          body: any,
          isLoaderOn = true,
          isShowSuccess = false,
          msg = ''): Observable<T> {
    if (isLoaderOn) {
      this.ngxLoader.start();
    }
    const apiPath = `${this.baseApiUrl}${path.join('/')}`;
    return this.http.post<T>(apiPath, body)
      .pipe(
        map(data => {
          if (isLoaderOn) {
            this.ngxLoader.stop();
          }
          if (isShowSuccess){
            this.notificationService.showSuccess(msg, 'Success')
          }

          return data as T;
        }),
        catchError(err => {
          this.showErrors(err.error);
          this.ngxLoader.stop();
          return throwError(err);
        }));
  }

  put<T>(path: string[],
         body: any,
         isLoaderOn = true,
         isShowSuccess = true,
         msg = ''): Observable<T> {
    if (isLoaderOn) {
      this.ngxLoader.start();
    }
    const apiPath = `${this.baseApiUrl}${path.join('/')}`;
    return this.http.put<T>(apiPath, body)
      .pipe(
        map(data => {
          if (isShowSuccess) {
            this.notificationService.showSuccess(msg, 'Success')
          }
          if (isLoaderOn) {
            this.ngxLoader.stop();
          }
          return data as T;
        }),
        catchError(err => {
          this.showErrors(err.error);
          if (isLoaderOn) {
            this.ngxLoader.stop();
          }
          return throwError(err);
        }));
  }

  delete<T>(path: string[],
            isLoaderOn = true,
            isShowSuccess = true,
            msg = ''): Observable<T> {
    this.ngxLoader.start();
    const apiPath = `${this.baseApiUrl}${path.join('/')}`;
    return this.http.delete<T>(apiPath)
      .pipe(
        map(data => {
          this.notificationService.showSuccess(msg, 'Success')
          console.log('Successfully Deleted!');
          this.ngxLoader.stop();
          return data as T;
        }),
        catchError(err => {
          this.showErrors(err.error);
          this.ngxLoader.stop();
          return throwError(err);
        }));
  }


  DOWNLOAD_FILE(path: string[],
                body: any,
                isLoaderOn = true,
                isShowSuccess = true,
                params?: HttpParams): Observable<HttpResponse<Blob>> {
    const apiPath = `${this.baseUrl}${path.join('/')}`;
    return this.http.post(apiPath, body, {observe: 'response', responseType: 'blob'})
      .pipe(
        map(
          data => {
            return data
          }
        )
      )
  }

  uploadFile<T>(path: string[],
                file: File,
                isLoaderOn = true,
                isShowSuccess = true,
                msg = ''): Observable<T> {
    if (isLoaderOn) {
      this.ngxLoader.start();
    }

    const apiPath = `${this.baseApiUrl}${path.join('/')}`;
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post<T>(apiPath, formData)
      .pipe(
        map(data => {
          if (isShowSuccess) {
            this.notificationService.showSuccess(msg, 'Success');
          }
          if (isLoaderOn) {
            this.ngxLoader.stop();
          }
          return data as T;
        }),
        catchError(err => {
          this.showErrors(err.error);
          this.ngxLoader.stop();
          return throwError(err);
        })
      );
  }




  private showErrors(error: {
    errors: any[];
    title: string | null;
    status: number;
    message: string | null
  } | null): void {
    if (error != null) {
      let errors = [] as string[];
      if (error.message != null) {
        if (error.errors != null && error.errors.length > 0) {
          error.errors.forEach(val => {
            errors.push(val)
          })
        }
        this.notificationService.showError(error.message, 'Error')
      } else {
        this.notificationService.showError('Server is not responding or cannot find error', 'Error')
      }
    } else {
      this.notificationService.showError('Server is not responding or cannot find error', 'Error')
    }
  }

}
