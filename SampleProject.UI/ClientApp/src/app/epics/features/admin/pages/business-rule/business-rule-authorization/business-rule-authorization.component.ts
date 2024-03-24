import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {MatDialog} from "@angular/material/dialog";
import {NzModalService} from "ng-zorro-antd/modal";
import {ApiBaseService} from "@core/services/api-base.service";
import {BaseComponent} from "@core/components/base/base.component";
import {BusinessRule} from "@application/business-rule/business-rule.model";
import {BusinessRuleApi} from "@application/business-rule/business-rule.api";
// @ts-ignore
import {MatChipColor} from "@angular/material/chips";

@Component({
  selector: 'app-business-rule-authorization',
  templateUrl: './business-rule-authorization.component.html',
  styleUrls: ['./business-rule-authorization.component.css']
})
export class BusinessRuleAuthorizationComponent extends BaseComponent implements OnInit, OnDestroy{

  businessRules?: Observable<BusinessRule[]>;
  setOfCheckedId = new Set<number>();
  listOfCurrentPageData: readonly BusinessRule[] = [];
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
      .forEach(({ businessRuleId }) =>
        this.updateCheckedSet(businessRuleId, checked));
    this.refreshCheckedStatus();
  }

  onItemChecked(id: number, checked: boolean) {
    this.updateCheckedSet(id,checked);
    this.refreshCheckedStatus();
  }

  onCurrentPageDataChange(pageData: readonly BusinessRule[]) {
    this.listOfCurrentPageData = pageData

    this.checked = this.listOfCurrentPageData.length > 0 && this.listOfCurrentPageData.every(({ businessRuleId }) => this.setOfCheckedId.has(businessRuleId));
    this.indeterminate = this.listOfCurrentPageData.some(({ businessRuleId }) => this.setOfCheckedId.has(businessRuleId)) && !this.checked;

    this.isButtonDisabled = this.setOfCheckedId.size === 0;
  }

  refreshCheckedStatus(): void {
    const listOfEnabledData = this.listOfCurrentPageData;
    this.checked = listOfEnabledData.every(({ businessRuleId }) => this.setOfCheckedId.has(businessRuleId));
    this.indeterminate = listOfEnabledData.some(({ businessRuleId }) => this.setOfCheckedId.has(businessRuleId)) && !this.checked;
    this.isButtonDisabled = this.setOfCheckedId.size === 0;

  }
  disableAuthorizationButton(): void{
    this.isButtonDisabled = true;
    this.checked =false
    this.setOfCheckedId.clear()
  }

  onAuthorize(): void {
    this.apiBaseService
      .put<BusinessRule[]>([`${BusinessRuleApi.BusinessRuleAuthorize}?status=1`], Array.from(this.setOfCheckedId), true, true,'Successfully Authorized !')
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
    this.businessRules = this.apiBaseService.get<BusinessRule[]>([`${BusinessRuleApi.BusinessRule}?$filter=authorizedStatus eq 'Pending'`]);
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
