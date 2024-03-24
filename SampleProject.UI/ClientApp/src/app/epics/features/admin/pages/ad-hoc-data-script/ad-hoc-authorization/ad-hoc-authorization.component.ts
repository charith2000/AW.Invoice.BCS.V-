import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {BusinessRule} from "@application/business-rule/business-rule.model";
import {HttpClient} from "@angular/common/http";
import {MatDialog} from "@angular/material/dialog";
import {NzModalService} from "ng-zorro-antd/modal";
import {ApiBaseService} from "@core/services/api-base.service";
import {BusinessRuleApi} from "@application/business-rule/business-rule.api";
import {AdHoc} from "@application/ad-hoc/ad-hoc.model";
import {BaseComponent} from "@core/components/base/base.component";
import {AdHocApi} from "@application/ad-hoc/ad-hoc.api";
// @ts-ignore
import {MatChipColor} from "@angular/material/chips";

@Component({
  selector: 'app-ad-hoc-authorization',
  templateUrl: './ad-hoc-authorization.component.html',
  styleUrls: ['./ad-hoc-authorization.component.css']
})
export class AdHocAuthorizationComponent extends BaseComponent implements OnInit, OnDestroy{

  adHocs?: Observable<AdHoc[]>;
  setOfCheckedId = new Set<number>();
  listOfCurrentPageData: readonly AdHoc[] = [];
  indeterminate = false;
  checked = false;
  isButtonDisabled = true;

  constructor(private http: HttpClient,
              public dialog: MatDialog,
              private modal: NzModalService,
              private apiBaseService: ApiBaseService
  ) {
    super();
  }

  ngOnInit(): void {
    this.getBusinessRulesAuthorizeStatus()
  }

  updateCheckedSet(id: number, checked: boolean): void {
    if (checked) {
      this.setOfCheckedId.add(id);
    } else {
      this.setOfCheckedId.delete(id);
    }
  }

  onAllChecked(checked: boolean): void {
    this.checked = checked;
    this.listOfCurrentPageData
      .forEach(({ id }) =>
        this.updateCheckedSet(id, checked));
    this.refreshCheckedStatus();
  }

  onItemChecked(id: number, checked: boolean) {
    this.updateCheckedSet(id,checked);
    this.refreshCheckedStatus();
  }

  onCurrentPageDataChange(pageData: readonly AdHoc[]) {
    this.listOfCurrentPageData = pageData

    this.checked = this.listOfCurrentPageData.length > 0 && this.listOfCurrentPageData.every(({ id }) => this.setOfCheckedId.has(id));
    this.indeterminate = this.listOfCurrentPageData.some(({ id }) => this.setOfCheckedId.has(id)) && !this.checked;

    this.isButtonDisabled = this.setOfCheckedId.size === 0;
  }

  refreshCheckedStatus(): void {
    const listOfEnabledData = this.listOfCurrentPageData;
    this.checked = listOfEnabledData.every(({ id }) => this.setOfCheckedId.has(id));
    this.indeterminate = listOfEnabledData.some(({ id }) => this.setOfCheckedId.has(id)) && !this.checked;
    this.isButtonDisabled = this.setOfCheckedId.size === 0;

  }
  disableAuthorizationButton(): void{
    this.isButtonDisabled = true;
    this.checked =false
    this.setOfCheckedId.clear()
  }

  onAuthorize(): void {
    this.apiBaseService
      .put<AdHoc[]>([`${AdHocApi.AdHocScriptAuthorize}?status=1`], Array.from(this.setOfCheckedId), true, true,'Successfully Authorized !')
      .subscribe(() => {
        this.getBusinessRulesAuthorizeStatus();
        this.disableAuthorizationButton();
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

  private getBusinessRulesAuthorizeStatus() {
    this.adHocs = this.apiBaseService.get<AdHoc[]>([`${AdHocApi.AdHocScript}?$filter=authorizedStatus eq 'Pending'`]);
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
