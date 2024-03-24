import {Component, OnInit} from '@angular/core';
import {
  DataMappingModel
} from "@application/data-mapping/data-mapping.model";
import {TableConnectionApi} from "@application/data-mapping/table-connection.api";
import {ActivatedRoute} from "@angular/router";
import {ApiBaseService} from "@core/services/api-base.service";
import {BaseComponent} from "@core/components/base/base.component";

@Component({
  selector: 'app-data-mapping',
  templateUrl: './data-mapping.component.html',
  styleUrls: ['./data-mapping.component.css']
})
export class DataMappingComponent extends BaseComponent implements OnInit {


  connectionData = {} as DataMappingModel;
  code: string = '';
  index = 0;

  constructor(
    private activatedRoute: ActivatedRoute,
    private apiBaseService: ApiBaseService
  ) {

    super();
  }


  onIndexChange(event: number): void {
    this.index = event;
  }

  ngOnInit() {
    this.subscription$.add(this.activatedRoute.params.subscribe(params => {
      const dataSourceName = params.id.toString().split('-')[1];
      console.log(dataSourceName);
      this.apiBaseService.get<DataMappingModel>([TableConnectionApi.base, params.id])
        .subscribe(res => {
          this.connectionData = res;
          this.code = params.id
        })
    }));

  }
}
