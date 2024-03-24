import {Component, Input, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {ViewFieldComponent} from "./view-field/view-field.component";
import {
  DataMappingModel, DataSourceTableConnectionFieldMappings
} from "@application/data-mapping/data-mapping.model";
import {BaseComponent} from "@core/components/base/base.component";
import {RowIndexMemoryService} from "@core/services/row-index-memory.service";



@Component({
  selector: 'app-field-mapping',
  templateUrl: './field-mapping.component.html',
  styleUrls: ['./field-mapping.component.css']
})
export class FieldMappingComponent extends BaseComponent implements OnInit {
  @Input() testConnection = {} as DataMappingModel;
  @Input() code: string = '';
  @Input() currentIndexChange: number = 0;
  isPopupOpen = false;
  filterValue?: String;
  filterData?: DataSourceTableConnectionFieldMappings[]
  currentPage = 1;
  pageSize = 10;
  // selectedRow: number = 0;
  selectedRowIndex: number = -1;
  highlightedColumnIndex: number = -1;
  originalSelectedRowIndex: number = -1;

  constructor(
    private rowIndexMemoryService: RowIndexMemoryService,
    public dialog: MatDialog
  ) {
    super();
  }

  ngOnInit(): void {
    this.filterData = this.testConnection.dataSourceTableConnectionFieldMappings
    this.subscription$.add(this.rowIndexMemoryService.selectedIndex$.subscribe((index) => {
      this.originalSelectedRowIndex = index;
      this.selectedRowIndex = index;
    }));
  }




  private handleErrors() {
    console.log('handleErrors');
  }

  onOpenView(dataMappingRecord: DataSourceTableConnectionFieldMappings, index: number): void {
    if (!this.isPopupOpen) {
      this.isPopupOpen = true
      const objectArray = this.testConnection.dataSourceTableConnectionFieldMappings;
      const dialogRef = this.dialog.open(ViewFieldComponent, {
        data: {
          currentIndex: index,
          dialogDataArray: objectArray
        },
        width: "700px",
        height: "800px"
      });
      this.subscription$.add(
        dialogRef.afterClosed()
          .subscribe((value) => {
              this.isPopupOpen = false
              console.log(value);
              const index = this.testConnection.dataSourceTableConnectionFieldMappings
                .findIndex(x => x.dataSourceTableConnectionFieldMappingId == value.dataSourceTableConnectionFieldMappingId)
              this.testConnection.dataSourceTableConnectionFieldMappings[index].mappingType = value.mappingType;
              this.testConnection.dataSourceTableConnectionFieldMappings[index].fieldMapping = value.fieldMapping;
              this.testConnection.dataSourceTableConnectionFieldMappings[index].condition = value.condition;
              this.testConnection.dataSourceTableConnectionFieldMappings[index].defaultValue = value.defaultValue;
              this.testConnection.dataSourceTableConnectionFieldMappings[index].catalogueType = value.catalogueType;
            }
          )
      );
    }


  }

  applyFilter() {
    let filterValueLower = this.filterValue?.toLowerCase();
    if (!filterValueLower || filterValueLower.length === 0) {
      this.filterData = this.testConnection.dataSourceTableConnectionFieldMappings;
    } else {
      this.filterData = this.testConnection.dataSourceTableConnectionFieldMappings.filter(record => {
        return record.reportingSegmentField.options?.toLowerCase().includes(filterValueLower!) ||
          record.reportingSegmentField.name?.toLowerCase().includes(filterValueLower!)
      });
    }

    // If a row was previously selected, set the selectedRowIndex to the remembered index
    if (this.originalSelectedRowIndex !== -1) {
      this.selectedRowIndex = this.originalSelectedRowIndex;
    }
  }

      updateCurrentPage(event: any) {
    this.currentPage = event;
  }

  // selectRow(index: number) {
  //   this.selectedRow = index;
  // }

  onRowClick(rowIndex: number) {
    this.selectedRowIndex = rowIndex;
  }

}
