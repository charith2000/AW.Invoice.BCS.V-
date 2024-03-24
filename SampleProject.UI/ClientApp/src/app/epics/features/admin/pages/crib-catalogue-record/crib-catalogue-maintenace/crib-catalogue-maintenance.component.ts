import {Component, OnDestroy, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AddCatalogPopoverComponent} from "./components/crib-add-catalog-dialog/add-catalog-popover.component";
import {MatDialog} from '@angular/material/dialog';
import {CatalogueType} from "@application/crib-catalogue-record/crib-catalogue.model";
import {CribCatalogueRecord} from "@application/crib-catalogue-record/crib-catalogue-record";
import {CribCatalogueTypeModel} from "@application/crib-catalogue-record/crib-catalogue-type.model";
import {CribCatalogueApi} from "@application/crib-catalogue-record/crib-catalogue.api";
import {ApiBaseService} from "@core/services/api-base.service";

import {
  UpdateCribCatalogueDialogComponent
} from "./components/update-crib-catalogue-dialog/update-crib-catalogue-dialog.component";
import {BaseComponent} from "@core/components/base/base.component";
import {map} from "rxjs/operators";
import {color} from "chart.js/helpers";


@Component({
  selector: 'app-crib-catalogue-maintenance',
  templateUrl: './crib-catalogue-maintenance.component.html',
  styleUrls: ['./crib-catalogue-maintenance.component.css'],

})
export class CribCatalogueMaintenanceComponent extends BaseComponent implements OnInit, OnDestroy {

  selectedCatalogueType = null;
  catalogueTypes?: Observable<CatalogueType[]>;
  catalogueRecodes?: Observable<CribCatalogueRecord[]>;
  isPopupOpen = false;
  filteredCatalogueRecodes?: Observable<CribCatalogueRecord[]>;
  filterValue?: String;
  selectedRowIndex: number = -1;
  highlightedColumnIndex: number = -1;
  currentEditedRowIndex = -1;


  constructor(private http: HttpClient,
              public dialog: MatDialog,
              private apiBaseService: ApiBaseService
  ) {
    super();
  }

  ngOnInit(): void {
    this.catalogueTypes = this.apiBaseService.get<CribCatalogueTypeModel[]>([CribCatalogueApi.CribCatalogueType]);
  }

  openAddRecordDialog() {
    if (!this.isPopupOpen) {
      this.isPopupOpen = true

      const dialogRef = this.dialog.open(AddCatalogPopoverComponent,
        {data: {selectedCatalogue: this.selectedCatalogueType}});

      dialogRef.afterClosed()
        .subscribe(() => {
          this.isPopupOpen = false
          this.getCatalogueRecordsByType(this.selectedCatalogueType ?? '')
        })
    }
  }

  openEditRecordDialog(record: CribCatalogueRecord, rowIndex: number) {
    if (!this.isPopupOpen) {
      this.isPopupOpen = true
      this.currentEditedRowIndex = rowIndex;
      const dialogRef = this.dialog.open(UpdateCribCatalogueDialogComponent,
        {
          data: {
            catalogueRecordId: record.catalogueRecordId,
            selectedCatalogue: this.selectedCatalogueType,
            cribId: record.cribId,
            bankId: record.bankId,
            description: record.description,
            status: record.status
          }
        }
      );

      dialogRef.afterClosed()
        .subscribe((value) => {
          this.isPopupOpen = false
          this.getCatalogueRecordsByType(this.selectedCatalogueType ?? '');
        })
    }
  }

  onSelectCatalogueType($event: any) {
    this.getCatalogueRecordsByType($event)
  }

  private getCatalogueRecordsByType(type: string) {
    this.catalogueRecodes = this.apiBaseService.get<CribCatalogueRecord[]>([`${CribCatalogueApi.CribCatalogueRecord}?$filter=catalogueType eq '${type}'`], false);
    this.filteredCatalogueRecodes = this.catalogueRecodes;
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
    }
    if (authorizedStatus == 2) {
      return 'alert alert-warning';
    } else {
      return 'alert alert-danger';
    }
  }


  applyFilter() {
    let filterValueLower = this.filterValue?.toLowerCase();

    if (this.filterValue == '' || this.filterValue?.length == 0) {
      this.filteredCatalogueRecodes = this.catalogueRecodes;
    } else {
      this.filteredCatalogueRecodes = this.catalogueRecodes?.pipe(
        map(records => records.filter(record => record.description.toLowerCase().includes(filterValueLower!) || record.cribId.toLowerCase().includes(filterValueLower!)))
      );

    }
  }

  onRowClick(rowIndex: number) {
    this.selectedRowIndex = rowIndex;
  }

  onColumnHeaderClick(columnIndex: number) {
    this.highlightedColumnIndex = columnIndex;
  }

  protected readonly color = color;
}


