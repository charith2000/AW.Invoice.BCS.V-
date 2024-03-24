import {Component, OnDestroy, OnInit} from '@angular/core';
import {DataMappingModel} from "@application/data-mapping/data-mapping.model";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {MatDialog} from "@angular/material/dialog";
import {NzModalService} from "ng-zorro-antd/modal";
import {ApiBaseService} from "@core/services/api-base.service";
import {TableConnectionApi} from "@application/data-mapping/table-connection.api"
import {BaseComponent} from "@core/components/base/base.component";
import {TableConnectionDialogComponent} from "./table-connection-dialog/table-connection-dialog.component";


@Component({
  selector: 'app-table-connection',
  templateUrl: './table-connection.component.html',
  styleUrls: ['./table-connection.component.css']
})
export class TableConnectionComponent extends BaseComponent implements OnInit, OnDestroy {
  dataMapping?: Observable<DataMappingModel[]>;
  setOfCheckedId = new Set<string>();
  listOfCurrentPageData: readonly DataMappingModel[] = [];
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
    this.getDataMappingAuthorizeStatus()
  }

  updateCheckedSet(id: string, checked: boolean): void {
    if (checked) {
      console.log(id)
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

    this.checked = this.listOfCurrentPageData.length > 0 && this.listOfCurrentPageData.every(({ dataSourceTableConnectionId }) => this.setOfCheckedId.has(dataSourceTableConnectionId));
    this.indeterminate = this.listOfCurrentPageData.some(({ dataSourceTableConnectionId }) => this.setOfCheckedId.has(dataSourceTableConnectionId)) && !this.checked;

    this.isButtonDisabled = this.setOfCheckedId.size === 0;
  }

  refreshCheckedStatus(): void {
    const listOfEnabledData = this.listOfCurrentPageData;
    this.checked = listOfEnabledData.every(({ dataSourceTableConnectionId }) => this.setOfCheckedId.has(dataSourceTableConnectionId));
    this.indeterminate = listOfEnabledData.some(({ dataSourceTableConnectionId }) => this.setOfCheckedId.has(dataSourceTableConnectionId)) && !this.checked;

    this.isButtonDisabled = this.setOfCheckedId.size === 0;
  }

  onAuthorize(): void {

    this.apiBaseService
      .put<DataMappingModel[]>([`${TableConnectionApi.tableConnectionAuthorize}?status=1`], Array.from(this.setOfCheckedId), true, true,'Successfully Authorized !')
      .subscribe(result => {
        this.getDataMappingAuthorizeStatus()
        this.disableAuthorizationButton()
      });
  }

  disableAuthorizationButton(): void{
    this.isButtonDisabled = true;
    this.checked =false
    this.setOfCheckedId.clear()
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

  onOpenTableConnection(record :DataMappingModel ) {
    this.dialog.open(TableConnectionDialogComponent,
      {
        data: {
          tableConnection: record.tableConnection
        },
        width: "500px"

      }
    );
  }
  onOpenFilteringCondition(record :DataMappingModel) {
    this.dialog.open(TableConnectionDialogComponent,
      {
        data: {
          tableConnection : record.filterCondition
        },
        width: "500px"

      }
    );
  }
}
