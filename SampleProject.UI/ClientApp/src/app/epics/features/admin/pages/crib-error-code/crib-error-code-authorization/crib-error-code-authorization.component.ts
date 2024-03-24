import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {MatDialog} from "@angular/material/dialog";
import {ApiBaseService} from "@core/services/api-base.service";
import {BaseComponent} from "@core/components/base/base.component";
import {ErrorCode} from "@application/crib-error-code/crib-error-code.model";
import {CribErrorCodeApi} from "@application/crib-error-code/crib-error-code.api";
import {NzModalService} from "ng-zorro-antd/modal";
// @ts-ignore
import {MatChipColor} from "@angular/material/chips";

@Component({
  selector: 'app-crib-error-code-authorization',
  templateUrl: './crib-error-code-authorization.component.html',
  styleUrls: ['./crib-error-code-authorization.component.css']
})
export class CribErrorCodeAuthorizationComponent extends BaseComponent implements OnInit, OnDestroy{


  errorCodes?: Observable<ErrorCode[]>;
  setOfCheckedId = new Set<string>();
  listOfCurrentPageData: readonly ErrorCode[] = [];
  indeterminate = false;
  checked = false;
  isButtonDisabled = true;

  updateCheckedSet(id: string, checked: boolean): void {
    if (checked) {
      this.setOfCheckedId.add(id);
    } else {
      this.setOfCheckedId.delete(id);
    }
  }
  onAllChecked(checked: boolean): void {
    this.checked = checked;
    this.listOfCurrentPageData
      .forEach(({ code }) => this.updateCheckedSet(code, checked));

    this.refreshCheckedStatus();
  }

  onItemChecked(id: string, checked: boolean) {
    this.updateCheckedSet(id,checked);
    this.refreshCheckedStatus();
  }

  onCurrentPageDataChange(pageData: readonly ErrorCode[]) {
    this.listOfCurrentPageData = pageData

    // this.setOfCheckedId.forEach(id => {
    //   const isChecked = this.listOfCurrentPageData.some(({ code }) => code === id);
    //   if (!isChecked) {
    //     this.setOfCheckedId.delete(id);
    //   }
    // });

    this.checked = this.listOfCurrentPageData.length > 0 && this.listOfCurrentPageData.every(({ code }) => this.setOfCheckedId.has(code));
    this.indeterminate = this.listOfCurrentPageData.some(({ code }) => this.setOfCheckedId.has(code)) && !this.checked;

    this.isButtonDisabled = this.setOfCheckedId.size === 0;

  }

  refreshCheckedStatus(): void {
    const listOfEnabledData = this.listOfCurrentPageData;
    this.checked = listOfEnabledData.every(({ code }) => this.setOfCheckedId.has(code));
    this.indeterminate = listOfEnabledData.some(({ code }) => this.setOfCheckedId.has(code)) && !this.checked;

    this.isButtonDisabled = this.setOfCheckedId.size === 0;
  }

  constructor(private http: HttpClient,
              public dialog: MatDialog,
              private modal: NzModalService,
              private apiBaseService: ApiBaseService
  ) {
    super();
  }
  disableAuthorizationButton(): void{
    this.isButtonDisabled = true;
    this.checked =false
    this.setOfCheckedId.clear()
  }

  onAuthorize(): void {
    const updatedRecords: ErrorCode[] = [];


    this.apiBaseService
      .put<ErrorCode[]>([`${CribErrorCodeApi.CribErrorCodeAuthorize}?status=1`], Array.from(this.setOfCheckedId), true, true,'Successfully Authorized !')
      .subscribe(result => {
        this.disableAuthorizationButton()
        this.getErrorCodeAuthorizeStatus()

      });

  }
  onOpenConfirmation():void{
    this.modal.confirm({
      nzTitle: 'Do you want to authorize this record(s)?',
      nzIconType: 'exclamation-circle',
      nzContent: '<b></b>',
      nzOnOk: () => this.onAuthorize(),
      nzOkText: 'Yes',
      nzCancelText: 'No',
    });

  }

  ngOnInit(): void {
    this.getErrorCodeAuthorizeStatus()
  }



  private getErrorCodeAuthorizeStatus() {
    this.errorCodes = this.apiBaseService.get<ErrorCode[]>([`${CribErrorCodeApi.CribErrorCode}?$filter=authorizedStatus eq 'Pending'`]);
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
}
