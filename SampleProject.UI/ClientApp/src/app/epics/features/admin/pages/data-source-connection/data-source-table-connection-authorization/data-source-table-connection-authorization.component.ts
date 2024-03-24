import {Component, OnDestroy, OnInit} from '@angular/core';
import {BaseComponent} from "@core/components/base/base.component";
import {CribCatalogueRecord} from "@application/crib-catalogue-record/crib-catalogue-record";
import {HttpClient} from "@angular/common/http";
import {MatDialog} from "@angular/material/dialog";
import {NzModalService} from "ng-zorro-antd/modal";
import {ApiBaseService} from "@core/services/api-base.service";
import {CribCatalogueApi} from "@application/crib-catalogue-record/crib-catalogue.api";
import {DataSourceConnection} from "@application/data-source-connection/data-source-connection.model";
import {DataSourceConnectionApi} from "@application/data-source-connection/data-source-connection.api";

@Component({
  selector: 'app-data-source-table-connection-authorization',
  templateUrl: './data-source-table-connection-authorization.component.html',
  styleUrls: ['./data-source-table-connection-authorization.component.css']
})
export class DataSourceTableConnectionAuthorizationComponent extends BaseComponent implements OnInit, OnDestroy {

  dataSource : DataSourceConnection[] = [];
  setOfCheckedId = new Set<string>();
  listOfCurrentPageData: readonly DataSourceConnection[] = [];
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
    this.getUnAuthorized()
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
      .forEach(({id}) => this.updateCheckedSet(id, checked));
    this.refreshCheckedStatus();
  }

  onItemChecked(id: string, checked: boolean) {
    this.updateCheckedSet(id, checked);
    this.refreshCheckedStatus();

  }

  onCurrentPageDataChange(pageData: readonly DataSourceConnection[]) {
    this.listOfCurrentPageData = pageData

    this.checked = this.listOfCurrentPageData.length > 0 && this.listOfCurrentPageData.every(({ id }) => this.setOfCheckedId.has(id));
    this.indeterminate = this.listOfCurrentPageData.some(({ id }) => this.setOfCheckedId.has(id)) && !this.checked;
    this.isButtonDisabled = this.setOfCheckedId.size === 0;
  }

  refreshCheckedStatus(): void {
    const listOfEnabledData = this.listOfCurrentPageData;
    this.checked = listOfEnabledData.every(({id}) => this.setOfCheckedId.has(id));
    this.indeterminate = listOfEnabledData.some(({id}) => this.setOfCheckedId.has(id)) && !this.checked;

    this.isButtonDisabled = this.setOfCheckedId.size === 0;

  }
  disableAuthorizationButton(): void{
    this.isButtonDisabled = true;
    this.checked =false
    this.setOfCheckedId.clear()
  }

  onAuthorize(): void {
    this.apiBaseService
      .put<DataSourceConnection[]>([DataSourceConnectionApi.base,`${DataSourceConnectionApi.authorize}?status=1`], Array.from(this.setOfCheckedId), true, true, 'Successfully Authorized !')
      .subscribe(() => {
        this.getUnAuthorized()
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

  private getUnAuthorized() {
    this.apiBaseService.get<DataSourceConnection[]>([DataSourceConnectionApi.base, DataSourceConnectionApi.unauthorized]).subscribe((res)=>{
      this.dataSource = res
    });
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
