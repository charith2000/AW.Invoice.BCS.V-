import {Component, Input, OnInit} from '@angular/core';
import {ApiBaseService} from "@core/services/api-base.service";
import {FinalQueryApi} from "@application/data-mapping/finalQuery.api";
import {StaticDataService} from "@core/services/static-data.service";
import {NotificationService} from "@core/services/notification.service";
import {NzModalService} from "ng-zorro-antd/modal";
import {FinalQueryModel} from "@application/data-mapping/finalQuery.model";


@Component({
  selector: 'app-final-query',
  templateUrl: './final-query.component.html',
  styleUrls: ['./final-query.component.css']
})
export class FinalQueryComponent implements OnInit {

  @Input() code: string = '';
  finalQuery: string = ''
  responseMessage: string = ''

  constructor(
    private apiBaseService: ApiBaseService,
    private staticDataService: StaticDataService,
    private notificationService: NotificationService,
    private modal: NzModalService) {
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
    extraKeys: {'Ctrl-Space': 'autocomplete'},
    readOnly: true
  };

  private handleErrors() {
    console.log('handleErrors');
  }

  ngOnInit(): void {
    this.apiBaseService.get<any>([FinalQueryApi.base, this.code]).subscribe((res) => {
      this.finalQuery = res.finalQuery
    })
  }


  onSaveConnection(): void {

    let finalQueryModel = {
       dataSourceTableConnectionId : this.code,
      query : this.finalQuery,
    }
    this.apiBaseService.post<FinalQueryModel>
    ([FinalQueryApi.save],
      finalQueryModel,
      true,
      true,
      'Successfully save query !'
    ).subscribe(() => {

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
    let FinalQueryModel = {
      query: this.finalQuery,
      dataSourceId: this.code
    }
    this.apiBaseService.post<any>
    ([FinalQueryApi.test],
      FinalQueryModel,
      true,
      false
    ).subscribe((res) => {
      this.notificationService.showInfo(res.message, 'Success')
      this.responseMessage = res.message
      this.onOpenConfirmation()
    });
  }
}
