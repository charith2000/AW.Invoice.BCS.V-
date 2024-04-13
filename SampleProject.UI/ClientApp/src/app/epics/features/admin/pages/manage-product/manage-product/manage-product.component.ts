import {Component, OnDestroy, OnInit} from '@angular/core';
import {BaseComponent} from "@core/components/base/base.component";
import {Observable} from "rxjs";
import {CatalogueType} from "@application/crib-catalogue-record/crib-catalogue.model";
import {CribCatalogueRecord} from "@application/crib-catalogue-record/crib-catalogue-record";
import {HttpClient} from "@angular/common/http";
import {MatDialog} from "@angular/material/dialog";
import {ApiBaseService} from "@core/services/api-base.service";
import {CribCatalogueTypeModel} from "@application/crib-catalogue-record/crib-catalogue-type.model";
import {CribCatalogueApi} from "@application/crib-catalogue-record/crib-catalogue.api";
import {
  AddCatalogPopoverComponent
} from "../../crib-catalogue-record/crib-catalogue-maintenace/components/crib-add-catalog-dialog/add-catalog-popover.component";
import {
  UpdateCribCatalogueDialogComponent
} from "../../crib-catalogue-record/crib-catalogue-maintenace/components/update-crib-catalogue-dialog/update-crib-catalogue-dialog.component";
import {map} from "rxjs/operators";
import {AddProductComponent} from "./components/add-product/add-product.component";
import {UpdateProductComponent} from "./components/update-product/update-product.component";

interface Product {
  id: string;
  name: string;
  description: string;
  price: string;
  status: string;
}

@Component({
  selector: 'app-manage-product',
  templateUrl: './manage-product.component.html',
  styleUrls: ['./manage-product.component.css']
})


export class ManageProductComponent extends BaseComponent implements OnInit, OnDestroy {

  selectedCatalogueType = null;
  catalogueTypes?: Observable<CatalogueType[]>;
  catalogueRecodes?: Observable<CribCatalogueRecord[]>;
  isPopupOpen = false;
  filteredCatalogueRecodes?: Observable<CribCatalogueRecord[]>;
  filterValue?: String;
  selectedRowIndex: number = -1;
  highlightedColumnIndex: number = -1;
  currentEditedRowIndex = -1;



  tableData: Product[] = [];



  constructor(private http: HttpClient,
              public dialog: MatDialog,
              private apiBaseService: ApiBaseService
  ) {
    super();
  }

  ngOnInit(): void {
    this.tableData.push(
      { id: '001', name: 'Product 1', description: 'Description 1', price: 'LKR 2500.00', status: 'Active' },
      { id: '002', name: 'Product 2', description: 'Description 2', price: 'LKR 2700.50', status: 'Inactive' },
      { id: '003', name: 'Product 3', description: 'Description 3', price: 'LKR 2800.60', status: 'Active' }

    );
  }

  openAddRecordDialog() {
    if (!this.isPopupOpen) {
      this.isPopupOpen = true

      const dialogRef = this.dialog.open(AddProductComponent,
        {data:
            {
              /*selectedCatalogue: this.selectedCatalogueType*/
            }
        });

      dialogRef.afterClosed()
        .subscribe(() => {
          this.isPopupOpen = false
          // this.getCatalogueRecordsByType(this.selectedCatalogueType ?? '');
        })
    }
  }

  openEditRecordDialog(record: Product, rowIndex: number) {
    if (!this.isPopupOpen) {
      this.isPopupOpen = true
      this.currentEditedRowIndex = rowIndex;
      const dialogRef = this.dialog.open(UpdateProductComponent,
        {
          data: {
            /*catalogueRecordId: record.catalogueRecordId,
            selectedCatalogue: this.selectedCatalogueType,
            cribId: record.cribId,
            bankId: record.bankId,
            description: record.description,
            status: record.status*/
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


}


