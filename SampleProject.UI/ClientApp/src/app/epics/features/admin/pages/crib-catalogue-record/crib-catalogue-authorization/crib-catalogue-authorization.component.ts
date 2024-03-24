import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {CribCatalogueRecord} from "@application/crib-catalogue-record/crib-catalogue-record";
import {HttpClient} from "@angular/common/http";
import {MatDialog} from "@angular/material/dialog";
import {ApiBaseService} from "@core/services/api-base.service";
import {CribCatalogueApi} from "@application/crib-catalogue-record/crib-catalogue.api";
import {BaseComponent} from "@core/components/base/base.component";
import {NzModalService} from "ng-zorro-antd/modal";

@Component({
  selector: 'app-crib-catalogue-authorization',
  templateUrl: './crib-catalogue-authorization.component.html',
  styleUrls: ['./crib-catalogue-authorization.component.css']
})
export class CribCatalogueAuthorizationComponent extends BaseComponent implements OnInit, OnDestroy {


  catalogueRecodes?: Observable<CribCatalogueRecord[]>;
  setOfCheckedId = new Set<string>();
  listOfCurrentPageData: readonly CribCatalogueRecord[] = [];
  indeterminate = false;
  checked = false;
  isButtonDisabled = true;
  selectedRowIndex: number = -1

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
      .forEach(({catalogueRecordId}) => this.updateCheckedSet(catalogueRecordId, checked));
    this.refreshCheckedStatus();
  }

  onItemChecked(id: string, checked: boolean) {
    this.updateCheckedSet(id, checked);
    this.refreshCheckedStatus();

  }

  onCurrentPageDataChange(pageData: readonly CribCatalogueRecord[]) {
    this.listOfCurrentPageData = pageData

    this.checked = this.listOfCurrentPageData.length > 0 && this.listOfCurrentPageData.every(({ catalogueRecordId }) => this.setOfCheckedId.has(catalogueRecordId));
    this.indeterminate = this.listOfCurrentPageData.some(({ catalogueRecordId }) => this.setOfCheckedId.has(catalogueRecordId)) && !this.checked;

    this.isButtonDisabled = this.setOfCheckedId.size === 0;
  }

  refreshCheckedStatus(): void {
    const listOfEnabledData = this.listOfCurrentPageData;
    this.checked = listOfEnabledData.every(({catalogueRecordId}) => this.setOfCheckedId.has(catalogueRecordId));
    this.indeterminate = listOfEnabledData.some(({catalogueRecordId}) => this.setOfCheckedId.has(catalogueRecordId)) && !this.checked;

    this.isButtonDisabled = this.setOfCheckedId.size === 0;

  }
  disableAuthorizationButton(): void{
    this.isButtonDisabled = true;
    this.checked =false
    this.setOfCheckedId.clear()
  }

  onAuthorize(): void {
    this.apiBaseService
      .put<CribCatalogueRecord[]>([`${CribCatalogueApi.CribCatalogueAuthorize}?status=1`], Array.from(this.setOfCheckedId), true, true, 'Successfully Authorized !')
      .subscribe(() => {
        this.getCatalogueRecordsByAuthorizationStatus()
        this.disableAuthorizationButton()
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
    this.catalogueRecodes = this.apiBaseService.get<CribCatalogueRecord[]>([`${CribCatalogueApi.CribCatalogueRecord}?$filter=authorizedStatus eq 'Pending'`]);
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
    }if (authorizedStatus == 2) {
      return  'alert alert-warning';
    }
    else {
      return 'alert alert-danger';
    }
  }
  onRowClick(rowIndex: number) {
    this.selectedRowIndex = rowIndex;
  }

}
