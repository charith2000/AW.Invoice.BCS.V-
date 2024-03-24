import {Component, OnDestroy, OnInit} from '@angular/core';
import {BaseComponent} from "@core/components/base/base.component";
import {DataSourceTableConnectionFieldMappings} from "@application/data-mapping/data-mapping.model";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {MatDialog} from "@angular/material/dialog";
import {NzModalService} from "ng-zorro-antd/modal";
import {ApiBaseService} from "@core/services/api-base.service";
import {TableConnectionApi} from "@application/data-mapping/table-connection.api";


@Component({
  selector: 'app-field-mapping-authorization',
  templateUrl: './field-mapping-authorization.component.html',
  styleUrls: ['./field-mapping-authorization.component.css']
})
export class FieldMappingAuthorizationComponent extends BaseComponent implements OnInit, OnDestroy {

  fieldMapping? : Observable<DataSourceTableConnectionFieldMappings[]>;
  setOfCheckedId = new Set<number>();
  listOfCurrentPageData: readonly DataSourceTableConnectionFieldMappings[] = [];
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
      .forEach(({ dataSourceTableConnectionFieldMappingId }) => this.updateCheckedSet(dataSourceTableConnectionFieldMappingId, checked));
    this.refreshCheckedStatus();
  }

  onItemChecked(id: number, checked: boolean) {
    this.updateCheckedSet(id, checked);
    this.refreshCheckedStatus();
  }

  onCurrentPageDataChange(pageData: readonly DataSourceTableConnectionFieldMappings[]) {
    this.listOfCurrentPageData = pageData

    this.checked = this.listOfCurrentPageData.length > 0 && this.listOfCurrentPageData.every(({ dataSourceTableConnectionFieldMappingId }) => this.setOfCheckedId.has(dataSourceTableConnectionFieldMappingId));
    this.indeterminate = this.listOfCurrentPageData.some(({ dataSourceTableConnectionFieldMappingId }) => this.setOfCheckedId.has(dataSourceTableConnectionFieldMappingId)) && !this.checked;

    this.isButtonDisabled = this.setOfCheckedId.size === 0;
  }

  refreshCheckedStatus(): void {
    const listOfEnabledData = this.listOfCurrentPageData;
    this.checked = listOfEnabledData.every(({ dataSourceTableConnectionFieldMappingId }) => this.setOfCheckedId.has(dataSourceTableConnectionFieldMappingId));
    this.indeterminate = listOfEnabledData.some(({ dataSourceTableConnectionFieldMappingId }) => this.setOfCheckedId.has(dataSourceTableConnectionFieldMappingId)) && !this.checked;

    this.isButtonDisabled = this.setOfCheckedId.size === 0;
  }

  onAuthorize(): void {

    this.apiBaseService
      .put<DataSourceTableConnectionFieldMappings[]>([`${TableConnectionApi.fieldAuthorize}?status=1`], Array.from(this.setOfCheckedId), true, true,'Successfully Authorized !')
      .subscribe(() => {
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
    this.fieldMapping = this.apiBaseService.get<DataSourceTableConnectionFieldMappings[]>
    ([TableConnectionApi.base, TableConnectionApi.fieldMapping,TableConnectionApi.unAuthorize])

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
  formatString(inputText: string) {
    if (inputText != null) {
      const humanized = inputText.replace(/([A-Z])/g, ' $1');
      return humanized.charAt(0).toUpperCase() + humanized.slice(1);
    }
    return ''
  }
}
