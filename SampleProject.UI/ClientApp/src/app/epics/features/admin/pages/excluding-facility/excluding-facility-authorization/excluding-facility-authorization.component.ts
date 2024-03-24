import {Component, HostListener, OnDestroy, OnInit} from '@angular/core';
import {BaseComponent} from "@core/components/base/base.component";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {MatDialog} from "@angular/material/dialog";
import {NzModalService} from "ng-zorro-antd/modal";
import {ApiBaseService} from "@core/services/api-base.service";
import {ExcludingCustomerModel} from "@application/excluding-customer/excluding-customer.model";
import {ExcludingCustomerApi} from "@application/excluding-customer/excluding-customer.api";

@Component({
  selector: 'app-excluding-facility-authorization',
  templateUrl: './excluding-facility-authorization.component.html',
  styleUrls: ['./excluding-facility-authorization.component.css']
})
export class ExcludingFacilityAuthorizationComponent extends BaseComponent implements OnInit, OnDestroy {

  excludingCustomerRecord?: Observable<ExcludingCustomerModel[]>
  setOfCheckedId = new Set<number>();
  listOfCurrentPageData: readonly ExcludingCustomerModel[] = [];
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
    this.getCatalogueRecordsByAuthorizationStatus()
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
      .forEach(({excludingCustomerTypeId}) => this.updateCheckedSet(excludingCustomerTypeId, checked));
    this.refreshCheckedStatus();
  }

  onItemChecked(id: number, checked: boolean) {
    this.updateCheckedSet(id, checked);
    this.refreshCheckedStatus();

  }

  onCurrentPageDataChange(pageData: readonly ExcludingCustomerModel[]) {
    this.listOfCurrentPageData = pageData

    this.checked = this.listOfCurrentPageData.length > 0 && this.listOfCurrentPageData.every(({excludingCustomerTypeId}) => this.setOfCheckedId.has(excludingCustomerTypeId));
    this.indeterminate = this.listOfCurrentPageData.some(({excludingCustomerTypeId}) => this.setOfCheckedId.has(excludingCustomerTypeId)) && !this.checked;

    this.isButtonDisabled = this.setOfCheckedId.size === 0;
  }

  refreshCheckedStatus(): void {
    const listOfEnabledData = this.listOfCurrentPageData;
    this.checked = listOfEnabledData.every(({excludingCustomerTypeId}) => this.setOfCheckedId.has(excludingCustomerTypeId));
    this.indeterminate = listOfEnabledData.some(({excludingCustomerTypeId}) => this.setOfCheckedId.has(excludingCustomerTypeId)) && !this.checked;

    this.isButtonDisabled = this.setOfCheckedId.size === 0;

  }

  disableAuthorizationButton(): void {
    this.isButtonDisabled = true;
    this.checked = false
    this.setOfCheckedId.clear()
  }

  onAuthorize(): void {
    this.apiBaseService
      .put<ExcludingCustomerModel[]>([`${ExcludingCustomerApi.authorize}?status=1`], Array.from(this.setOfCheckedId), true, true, 'Successfully Authorized !')
      .subscribe(() => {
        this.disableAuthorizationButton()
        this.getCatalogueRecordsByAuthorizationStatus()
      });

  }

  onOpenConfirmation(): void {
    this.modal.confirm({
      nzTitle: 'Do you want to authorize this record(s)?',
      nzIconType: 'exclamation-circle',
      nzContent: '<b></b>',
      nzOnOk: () => this.onAuthorize(),
      nzOkText: 'Yes',
      nzCancelText: 'No',
    });

  }

  private getCatalogueRecordsByAuthorizationStatus() {
    this.excludingCustomerRecord = this.apiBaseService.get<ExcludingCustomerModel[]>([`${ExcludingCustomerApi.base}?$filter=authorizedStatus eq 'Pending'`]);
  }

  formatString(inputText: string) {
    const humanized = inputText.replace(/([A-Z])/g, ' $1');
    return humanized.charAt(0).toUpperCase() + humanized.slice(1)
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
    }
    if (authorizedStatus == 2) {
      return 'alert alert-warning';
    } else {
      return 'alert alert-danger';
    }
  }
}
