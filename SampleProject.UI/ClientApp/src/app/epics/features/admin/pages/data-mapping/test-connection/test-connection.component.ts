import {ChangeDetectionStrategy, Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';

import 'codemirror/mode/sql/sql'
import {StaticDataService} from "@core/services/static-data.service";
import {ApiBaseService} from "@core/services/api-base.service";
import {TableConnectionTestQueryApi} from "@application/data-mapping/table-connection/table-connection-test-query.api";
import {DataMappingModel} from "@application/data-mapping/data-mapping.model";
import {NzModalService} from "ng-zorro-antd/modal";
import {NotificationService} from "@core/services/notification.service";
import {TableConnectionApi} from "@application/data-mapping/table-connection.api";


@Component({
  selector: 'app-test-connection',
  templateUrl: './test-connection.component.html',
  styleUrls: ['./test-connection.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TestConnectionComponent implements OnChanges, OnInit{


  @Input() testConnection = {} as DataMappingModel;
  @Input() code: string = '';


  tableConnection = '';
  filterCondition = '';
  responseMessage = '';
  decodeTableConnection = ''
  decodeFilterCondition= ''


  encodeTableConnection: string = ''
  encodeFilterCondition: string = ''


  constructor(
    private staticDataService: StaticDataService,
    private apiBaseService: ApiBaseService,
    private notificationService: NotificationService,
    private modal: NzModalService
  ) {
  }


  ngOnChanges(changes: SimpleChanges): void {
    if (changes?.testConnection) {
      // this.tableConnection = decodeURIComponent(this.testConnection.tableConnection);
      // this.filterCondition = decodeURIComponent(this.testConnection.filterCondition);
      this.tableConnection = this.testConnection.tableConnection;
      this.filterCondition = this.testConnection.filterCondition;
      this.decodeQuery();
      this.tableConnection = this.decodeTableConnection
      this.filterCondition = this.decodeFilterCondition
    }
  }

  ngOnInit(): void {

  }

  options = {
    mode: 'text/x-mysql',
    lineNumbers: true,
    theme: 'ssms',
    showHint: true,
    indentWithTabs: true,
    smartIndent: true,
    autofocus: true,
    lint: {
      onUpdateLinting: this.handleErrors
    },
    extraKeys: {'Ctrl-Space': 'autocomplete'}
  };

  optionsReadOnly = {
    mode: 'text/x-mysql',
    lineNumbers: true,
    theme: 'ssms',
    showHint: true,
    indentWithTabs: true,
    smartIndent: true,
    autofocus: true,
    lint: {
      onUpdateLinting: this.handleErrors
    },
    extraKeys: {'Ctrl-Space': 'autocomplete'},
    readOnly: true
  };
  finaliseEncodeQuery = this.tableConnection + '\n' + this.filterCondition

  private handleErrors() {
    console.log('handleErrors');
  }

  decodeQuery(): void{
    const decodeTable = this.tableConnection;
    const decodeFilter = this.filterCondition;

    this.decodeTableConnection = decodeURIComponent(decodeTable);
    this.decodeFilterCondition = decodeURIComponent(decodeFilter);
  }

  combineTestQuery(): void {
    // const encodeTable = this.tableConnection;
    // const encodeFilter = this.filterCondition;

    this.finaliseEncodeQuery =  this.tableConnection + '\n' + this.filterCondition;
    // this.encodeTableConnection = btoa(encodeTable);
    // this.encodeFilterCondition = btoa(encodeFilter);
  }

  onSaveConnection() : void{
    this.combineTestQuery();
    let dataMappingModel = {
      dataSourceTableConnectionId : this.code,
      reportingSegmentDataSourceTableId: null,
      tableConnection: this.tableConnection,
      filterCondition: this.filterCondition,
      finalTableQuery : this.finaliseEncodeQuery,
      finalQuery : this.finaliseEncodeQuery,
    }
    this.apiBaseService.put<DataMappingModel>
    ([TableConnectionApi.base],
      dataMappingModel,
      true,
      true,
      'Successfully save query !'
    ).subscribe(()=>{

    });
  }
  onOpenConfirmation(): void {
    this.modal.confirm({
      nzTitle: 'Do you want to save this query ? ',
      nzIconType: 'exclamation-circle',
      nzContent: this.responseMessage,
      nzOnOk: () => this.onSaveConnection(),
      nzOkText: 'Yes',
      nzCancelText: 'No',
    });
  }

  onTestQuery(): void {
    this.combineTestQuery();
    let tableConnectionModel = {
      query: this.finaliseEncodeQuery,
      dataSourceId: this.code
    }
    this.apiBaseService.post<any>
    ([TableConnectionTestQueryApi.base],
      tableConnectionModel,
      true,
      false
    ).subscribe((res)=>{
      this.notificationService.showInfo(res.message, 'Success')
      this.responseMessage = res.message
      this.onOpenConfirmation()
    });
  }

  onClearTableConnection(): void {
    if (this.tableConnection == "# Add Your Query") {
      this.tableConnection = ""
    }
  }

  onClearFilteringCondition(): void {
    if (this.filterCondition == "# Add Your Query") {
      this.filterCondition = ""
    }
  }

}

