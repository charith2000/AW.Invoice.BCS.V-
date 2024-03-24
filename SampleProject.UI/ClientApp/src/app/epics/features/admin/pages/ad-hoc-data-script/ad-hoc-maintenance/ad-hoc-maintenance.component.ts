import {Component, OnChanges, OnDestroy, OnInit} from '@angular/core';
import {BaseComponent} from "@core/components/base/base.component";
import {HttpClient} from "@angular/common/http";
import {MatDialog} from "@angular/material/dialog";
import {ApiBaseService} from "@core/services/api-base.service";
// @ts-ignore
import {MatChipColor} from "@angular/material/chips";
import {AddNewAdHocScriptComponent} from "./components/add-new-ad-hoc-script/add-new-ad-hoc-script.component";
import {UpdateAdHocScriptComponent} from "./components/update-ad-hoc-script/update-ad-hoc-script.component";
import {Observable} from "rxjs";
import {AdHoc} from "@application/ad-hoc/ad-hoc.model";
import {AdHocApi} from "@application/ad-hoc/ad-hoc.api";
import {map} from "rxjs/operators";

@Component({
  selector: 'app-ad-hoc-maintenance',
  templateUrl: './ad-hoc-maintenance.component.html',
  styleUrls: ['./ad-hoc-maintenance.component.css']
})
export class AdHocMaintenanceComponent extends BaseComponent {

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

  openAddAdHocDataScript() :void{
    if(!this.isPopupOpen){
      this.isPopupOpen = true;
      const dialogRef = this.dialog.open(AddNewAdHocScriptComponent,
        {data: {
            selectedDataAmendingAreaType: this.selectedDataAmendingAreaType},
          width: "500px"
        });

      dialogRef.afterClosed()
        .subscribe(() => {
          this.isPopupOpen = false
          this.getAdHocs(this.selectedDataAmendingAreaType ?? '')
        });
    }
  }
  openEditAdHocDialog(adHoc: AdHoc) :void{

    if(!this.isPopupOpen){
      this.isPopupOpen = true;
      const dialogRef = this.dialog.open(UpdateAdHocScriptComponent,
        {data: {
            id: adHoc.id,
            //selectedDataAmendingAreaType: this.selectedDataAmendingAreaType,
            dataAmendingArea: adHoc.dataAmendingArea,
            description: adHoc.description,
            query: adHoc.query,
            status: adHoc.status
          },
          width: "500px"
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
      this.adHocs = this.apiBaseService.get<AdHoc[]>([AdHocApi.AdHocScript], true, true);
    } else {
      this.adHocs = this.apiBaseService.get<AdHoc[]>([`${AdHocApi.AdHocScript}?$filter=dataAmendingArea eq '${type}'`], true, true);
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

