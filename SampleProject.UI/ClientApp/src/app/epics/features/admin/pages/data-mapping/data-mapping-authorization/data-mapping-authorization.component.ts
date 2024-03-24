import {Component, OnDestroy, OnInit} from '@angular/core';
import {BaseComponent} from "@core/components/base/base.component";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {MatDialog} from "@angular/material/dialog";
import {NzModalService} from "ng-zorro-antd/modal";
import {ApiBaseService} from "@core/services/api-base.service";

// @ts-ignore
import {MatChipColor} from "@angular/material/chips";

import {DataMappingModel, DataSourceTableConnectionFieldMappings} from "@application/data-mapping/data-mapping.model";
import {TableConnectionApi} from "@application/data-mapping/table-connection.api";


@Component({
  selector: 'app-data-mapping-authorization',
  templateUrl: './data-mapping-authorization.component.html',
  styleUrls: ['./data-mapping-authorization.component.css']
})
export class DataMappingAuthorizationComponent extends BaseComponent implements OnInit, OnDestroy{
  dataMapping? : Observable<DataMappingModel[]>;
  setOfCheckedId = new Set<string>();
  listOfCurrentPageData: readonly DataMappingModel[] = [];
  indeterminate = false;
  checked = false;
  isButtonDisabled = true;

  constructor(private http: HttpClient,
              public dialog: MatDialog,
              private modal: NzModalService,
              private apiBaseService: ApiBaseService)
  {
     super();
  }

  ngOnInit(): void {
    this.getDataMappingAuthorizeStatus()
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
      .forEach(({ dataSourceTableConnectionId }) => this.updateCheckedSet(dataSourceTableConnectionId, checked));
    this.refreshCheckedStatus();
  }
  onItemChecked(id: string, checked: boolean) {
    this.updateCheckedSet(id, checked);
    this.refreshCheckedStatus();
  }
  onCurrentPageDataChange(pageData: readonly DataMappingModel[]) {
    this.listOfCurrentPageData = pageData
  }

  refreshCheckedStatus(): void {
    const listOfEnabledData = this.listOfCurrentPageData;
    this.checked = listOfEnabledData.every(({ dataSourceTableConnectionId }) => this.setOfCheckedId.has(dataSourceTableConnectionId));
    this.indeterminate = listOfEnabledData.some(({ dataSourceTableConnectionId }) => this.setOfCheckedId.has(dataSourceTableConnectionId)) && !this.checked;

    this.isButtonDisabled = this.setOfCheckedId.size === 0;
  }
  disableAuthorizationButton(): void{
    this.isButtonDisabled = true;
    this.checked =false
    this.setOfCheckedId.clear()
  }
  onAuthorize(): void {
    this.apiBaseService
      .put<DataSourceTableConnectionFieldMappings[]>([`${TableConnectionApi.tableConnectionAuthorize}?status=1`], Array.from(this.setOfCheckedId), true, true,'Successfully Authorized !')
      .subscribe(() => {
        this.disableAuthorizationButton()
        this.getDataMappingAuthorizeStatus()
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
  private getDataMappingAuthorizeStatus() {
    this.dataMapping = this.apiBaseService.get<DataMappingModel[]>
    ([TableConnectionApi.base,TableConnectionApi.unAuthorize])

  }
  setStatusColor(status: number): MatChipColor  {
    switch (status) {
      case 1: return 'green';
      default : return 'red'
    }
  }
  setAuthorizedStatusColor(authorizedStatus: number): MatChipColor  {
    switch (authorizedStatus) {
      case 1: return 'green';
      case 2: return '#ffbd05';
      default : return 'red'
    }
  }
  onOpenView() {
  }
}
