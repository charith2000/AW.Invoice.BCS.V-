import {Component, OnDestroy, OnInit} from '@angular/core';
import {BaseComponent} from "@core/components/base/base.component";
import {HttpClient} from "@angular/common/http";
import {MatDialog} from "@angular/material/dialog";
import {ApiBaseService} from "@core/services/api-base.service";
// @ts-ignore
import {MatChipColor} from "@angular/material/chips";
import {AddExcludingFacilityComponent} from "./components/add-excluding-facility/add-excluding-facility.component";
import {
  UpdateExcludingFacilityComponent
} from "./components/update-excluding-facility/update-excluding-facility.component";
import {
  ExcludingCustomerTypeModel
} from "@application/excluding-customer/excluding-customer-type/excluding-customer-type.model";
import {Observable} from "rxjs";
import {
  ExcludingCustomerTypeApi
} from "@application/excluding-customer/excluding-customer-type/excluding-customer-type.api";
import {ExcludingCustomerModel} from "@application/excluding-customer/excluding-customer.model";
import {ExcludingCustomerApi} from "@application/excluding-customer/excluding-customer.api";
import {map} from "rxjs/operators";

@Component({
  selector: 'app-excluding-facility-maintenance',
  templateUrl: './excluding-facility-maintenance.component.html',
  styleUrls: ['./excluding-facility-maintenance.component.css']
})
export class ExcludingFacilityMaintenanceComponent extends BaseComponent implements OnInit, OnDestroy {
  selectedExcludingType = null
  excludingCustomerType? : Observable<ExcludingCustomerTypeModel[]>
  excludingCustomerRecord? : Observable<ExcludingCustomerModel[]>
  isPopupOpen = false;
  filterValue : string = ''
  filteredRecodes? : Observable<ExcludingCustomerModel[]>

  constructor(private http: HttpClient,
              public dialog: MatDialog,
              private apiBaseService: ApiBaseService
  ) {
    super();
  }

  ngOnInit(): void {
      this.excludingCustomerType = this.apiBaseService.get<ExcludingCustomerTypeModel[]>([ExcludingCustomerTypeApi.base],false)
  }

  openAddExcludingDialog() :void{
    if (!this.isPopupOpen) {
      this.isPopupOpen = true;
      const dialogRef = this.dialog.open(AddExcludingFacilityComponent, {
        data: { selectedExcludingType: this.selectedExcludingType },
        width: "500px"
      });

      dialogRef.afterClosed().subscribe(() => {
        this.isPopupOpen = false;
        this.getExcludingType(this.selectedExcludingType ?? '');
      });
    }
  }

  openEditExcludingDialog(record :ExcludingCustomerModel ) :void{
    if(!this.isPopupOpen){
      this.isPopupOpen = true;
      const dialogRef = this.dialog.open(UpdateExcludingFacilityComponent,
        {data: {
            selectedExcludingType: this.selectedExcludingType,
            excludingValue : record.excludingValue,
            status: record.status,
            authorizedStatus : record.authorizedStatus,
            remark : record.remark,
            excludingCustomerTypeId: record.excludingCustomerTypeId
          },
          width: "500px"
        });

      dialogRef.afterClosed().subscribe(() => {
        this.isPopupOpen = false;
        this.getExcludingType(this.selectedExcludingType ?? '');
      })
    }
  }

  onSelectExcludingType($event: any) {
    this.getExcludingType($event)
  }

  private getExcludingType(type: string) {
      this.excludingCustomerRecord= this.apiBaseService.get<ExcludingCustomerModel[]>([`${ExcludingCustomerApi.base}?$filter=excludingCustomerType eq '${type}'`], false, true);
      this.filteredRecodes = this.excludingCustomerRecord
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

  applyFilter() {
    let filterValueLower = this.filterValue?.toLowerCase();

    if (this.filterValue == '' || this.filterValue?.length == 0) {
      this.filteredRecodes = this.excludingCustomerRecord;
    } else {
      this.filteredRecodes = this.excludingCustomerRecord?.pipe(
        map(records => records.filter(record =>
          record.excludingValue.toLowerCase().includes(filterValueLower!)
        ))
      );
    }
  }
}
