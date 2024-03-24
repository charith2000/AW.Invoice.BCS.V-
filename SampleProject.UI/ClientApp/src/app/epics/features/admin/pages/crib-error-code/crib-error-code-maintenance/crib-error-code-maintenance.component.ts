import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {NzButtonSize} from "ng-zorro-antd/button";
import {MatDialog} from "@angular/material/dialog";
import {ApiBaseService} from "@core/services/api-base.service";
import {ErrorCode} from "@application/crib-error-code/crib-error-code.model";
import {CribErrorCodeApi} from "@application/crib-error-code/crib-error-code.api";
import {
  CribAddErrorCodeDialogComponent
} from "./components/crib-add-error-code-dialog/crib-add-error-code-dialog.component";
import {HttpParams} from '@angular/common/http';
import {CribErrorCodeEditComponent} from "./components/crib-error-code-edit/crib-error-code-edit.component";
import {BaseComponent} from "@core/components/base/base.component";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {map} from "rxjs/operators";



@Component({
  selector: 'app-crib-error-code-maintenance',
  templateUrl: './crib-error-code-maintenance.component.html',
  styleUrls: ['./crib-error-code-maintenance.component.css']
})
export class CribErrorCodeMaintenanceComponent extends BaseComponent implements OnInit, OnDestroy {

  selectedErrorType: string | undefined;
  inputTextValue: string | undefined;
  clickSearch = false;
  selectedCode = null;
  size: NzButtonSize = 'large';
  initialSearch = false;
  errorCodes?: Observable<ErrorCode[]>;
  filteredRecodes?: Observable<ErrorCode[]>;
  isPopupOpen = false;
  filterValue?: String;
  constructor(private http: HttpClient,
              public dialog: MatDialog,
              private apiBaseService: ApiBaseService) {
    super();
  }

  ngOnInit(): void {

  }

  searchField = new FormGroup({
    inputTextValue : new FormControl('', [Validators.required])
  });

  openDialog() {
    if(!this.isPopupOpen){
      this.isPopupOpen = true
      const dialogRef = this.dialog.open(CribAddErrorCodeDialogComponent,
        {data: {selectedCode: this.selectedCode}});

      dialogRef.afterClosed()
        .subscribe(() => {
          this.isPopupOpen = false
          this.onSearch()
        })
    }
  }

  openEditDialog(errorCode: ErrorCode) {
    if(!this.isPopupOpen){
      this.isPopupOpen = true
      const dialogRef = this.dialog.open(CribErrorCodeEditComponent,
        {
          data: {
            id: errorCode.code,
            prefix: errorCode.prefix,
            suffix: errorCode.suffix,
            message: errorCode.message,
            gravityCode: errorCode.gravityCode,
            status: errorCode.status
          }
        }
      );

      dialogRef.afterClosed()
        .subscribe(() => {
          this.isPopupOpen = false
          this.onSearch()
        })
    }
  }


  onSearch() {
    this.clickSearch = true;
    this.initialSearch = true;

    let params = new HttpParams()

    if (this.selectedErrorType === 'All') {

      params = params.append('type', 'All');
      params = params.append('code', 'All');

      this.errorCodes = this.apiBaseService.get<ErrorCode[]>
      ([CribErrorCodeApi.CribErrorCodeSearch], true, true, params);
      this.filteredRecodes = this.errorCodes

    }
    else if(this.selectedErrorType !== undefined && this.inputTextValue !== undefined){

      params = params.append('type', this.selectedErrorType);
      params = params.append('code', this.inputTextValue);

      this.errorCodes = this.apiBaseService.get<ErrorCode[]>
      ([CribErrorCodeApi.CribErrorCodeSearch], true, true, params);
      this.filteredRecodes = this.errorCodes

    }

  }

  clearInputField(): void {
    this.inputTextValue = '';
    this.searchField.get('inputTextValue')?.setErrors(null);
    this.searchField.get('inputTextValue')?.markAsUntouched();
    this.searchField.get('inputTextValue')?.updateValueAndValidity();
  }

  disableSearchButton() {
    this.clickSearch = false;
  }

  statusChip(status: number): string {
    if (status == 1) {
      return 'alert alert-success';
    } else {
      return 'alert alert-danger';
    }
  }

  authorizeStatusChip(authorizedStatus: number): string {
    if (authorizedStatus == 1) {
      return 'alert alert-success';
    }if (authorizedStatus == 2) {
      return  'alert alert-warning';
    }
    else {
      return 'alert alert-danger';
    }
  }
  applyFilter() {
    let filterValueLower = this.filterValue?.toLowerCase();

    if (this.filterValue == '' || this.filterValue?.length == 0) {
      this.filteredRecodes = this.errorCodes;
    } else {
      this.filteredRecodes = this.errorCodes?.pipe(
        map(records => records.filter(record =>
          record.prefix.toLowerCase().includes(filterValueLower!) || record.suffix.toLowerCase().includes(filterValueLower!) ||
          record.message.toLowerCase().includes(filterValueLower!) || record.gravityCode.toLowerCase().includes(filterValueLower!) ||
          record.code.toLowerCase().includes(filterValueLower!)
        ))
      );

    }
  }
}
