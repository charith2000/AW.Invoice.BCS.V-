import { Component } from '@angular/core';
import {BaseComponent} from "@core/components/base/base.component";
import {Observable} from "rxjs";
import {AdHoc} from "@application/ad-hoc/ad-hoc.model";
import {HttpClient, HttpParams} from "@angular/common/http";
import {MatDialog} from "@angular/material/dialog";
import {ApiBaseService} from "@core/services/api-base.service";
import {
  AddNewAdHocScriptComponent
} from "../ad-hoc-maintenance/components/add-new-ad-hoc-script/add-new-ad-hoc-script.component";
import {
  UpdateAdHocScriptComponent
} from "../ad-hoc-maintenance/components/update-ad-hoc-script/update-ad-hoc-script.component";
import {AdHocApi} from "@application/ad-hoc/ad-hoc.api";
import {map} from "rxjs/operators";
import {ExecuteAdHocScriptComponent} from "./components/execute-ad-hoc-script/execute-ad-hoc-script.component";

@Component({
  selector: 'app-ad-hoc-execution',
  templateUrl: './ad-hoc-execution.component.html',
  styleUrls: ['./ad-hoc-execution.component.css']
})
export class AdHocExecutionComponent extends BaseComponent{
  selectedDataAmendingAreaType = null
  adHocs?: Observable<AdHoc[]>;
  isPopupOpen = false;
  filterValue : string = '';
  filteredRecodes? : Observable<AdHoc[]>;

  constructor(private http: HttpClient,
              public dialog: MatDialog,
              private apiBaseService: ApiBaseService
  ) {
    super();
  }

  openEditAdHocDialog(adHoc: AdHoc) :void{

    if(!this.isPopupOpen){
      this.isPopupOpen = true;
      const dialogRef = this.dialog.open(ExecuteAdHocScriptComponent,
        {data: {
            id: adHoc.id,
            //selectedDataAmendingAreaType: this.selectedDataAmendingAreaType,
            dataAmendingArea: adHoc.dataAmendingArea,
            description: adHoc.description,
            query: adHoc.query,
            status: adHoc.status
          },
          width: "800px"
        });

      dialogRef.afterClosed()
        .subscribe(() => {
          this.isPopupOpen = false
          this.getAdHocs(this.selectedDataAmendingAreaType ?? '')
        })
    }
  }

  onSelectReportingType($event: any) {
    this.getAdHocs($event)
  }

  private getAdHocs(type: string) {

    if (type === 'All') {
      this.adHocs = this.apiBaseService.get<AdHoc[]>([AdHocApi.AllActiveAuthorizedAdHocs], true, true);

    } else {
      const params = new HttpParams().set('dataAmendingArea', type);
      //this.adHocs = this.apiBaseService.get<AdHoc[]>([`${AdHocApi.ActiveAuthorizedAdHocs}?$filter=dataAmendingArea eq '${type}'`], true, true);
      this.adHocs = this.apiBaseService.get<AdHoc[]>([AdHocApi.ActiveAuthorizedAdHocs], true, true,  params);
      console.log(type)
    }
    this.filteredRecodes = this.adHocs

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
  applyFilter() {
    let filterValueLower = this.filterValue?.toLowerCase();

    if (this.filterValue == '' || this.filterValue?.length == 0) {
      this.filteredRecodes = this.adHocs;
    } else {
      this.filteredRecodes = this.adHocs?.pipe(
        map(records => records.filter(record =>
          record.description.toLowerCase().includes(filterValueLower!) || record.dataAmendingArea.toLowerCase().includes(filterValueLower!)
        ))
      );
    }
  }
}
