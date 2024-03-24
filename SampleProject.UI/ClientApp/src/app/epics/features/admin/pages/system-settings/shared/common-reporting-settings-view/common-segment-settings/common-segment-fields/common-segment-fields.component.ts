import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges
} from '@angular/core';
import {ReportingSegmentFieldModel} from "@application/common-reporting-settings/reporting-segment.model";
import {MatDialog} from "@angular/material/dialog";
import {BaseComponent} from "@core/components/base/base.component";
import {UpdateSegmentComponent} from "./component/update-segment/update-segment.component";
import {Observable} from "rxjs";
import {ApiBaseService} from "@core/services/api-base.service";
import {ReportingMasterDataApi} from "@application/common-reporting-settings/reporting-master-data.api";
import {map} from "rxjs/operators";


@Component({
  selector: 'app-common-segment-fields',
  templateUrl: './common-segment-fields.component.html',
  styleUrls: ['./common-segment-fields.component.css'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class CommonSegmentFieldsComponent extends BaseComponent implements OnInit, OnChanges {

  @Input() segmentId: string | undefined;
  segmentField?: Observable<ReportingSegmentFieldModel[]>;
  selectedSegmentId : string = '';
  @Output() fieldsUpdated = new EventEmitter<ReportingSegmentFieldModel[]>();
  selectedRow: number = 0;
  currentPage = 1;
  pageSize = 10;
  filteredRecodes?: Observable<ReportingSegmentFieldModel[]>;
  filterValue?: String;
  selectedRowIndex: number = -1;
  highlightedColumnIndex: number = -1;
  isPopupOpen = false;

  constructor(
    public dialog: MatDialog,
    private apiBaseService: ApiBaseService
  ) {
    super()
  }

  ngOnInit(): void {

  }

  openEdit(data: ReportingSegmentFieldModel , index: number) {
    this.selectRow(index);

    if(!this.isPopupOpen){
      this.isPopupOpen = true
      const dialogRef = this.dialog.open(UpdateSegmentComponent, {
        data: {
          reportingSegmentFieldId: data.reportingSegmentFieldId,
          selectedSegmentId: this.segmentId,
          name: data.name,
          options: data.options,
          type: data.type,
          length: data.length,
          description: data.description,
          catalogueType: data.catalogueType
        }
      });
      this.subscription$.add(
        dialogRef.afterClosed().subscribe(() => {
          this.isPopupOpen = false
          this.getField()
        } ));
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.segmentId.currentValue && changes.segmentId.previousValue != changes.segmentId.currentValue) {
      this.selectedSegmentId = changes.segmentId.currentValue;
      this.getField();

    }
  }

  getField(): void {
    this.segmentField = this.apiBaseService.get<ReportingSegmentFieldModel[]>(
      [ReportingMasterDataApi.reportingSettings,this.selectedSegmentId, ReportingMasterDataApi.segmentFields],
      true, false);
    this.filteredRecodes = this.segmentField;
  }
  updateCurrentPage(event: any) {
    this.currentPage = event;
  }
  selectRow(index: number) {
    this.selectedRow = index;
  }
  applyFilter() {
    let filterValueLower = this.filterValue?.toLowerCase();

    if (this.filterValue == '' || this.filterValue?.length == 0) {
      this.filteredRecodes = this.segmentField;
    } else {
      this.filteredRecodes = this.segmentField?.pipe(
        map(records =>
          records.filter(
            record => record.name.toLowerCase().includes(filterValueLower!) ||
              record.options.toLowerCase().includes(filterValueLower!) ||
              record.type.toLowerCase().includes(filterValueLower!)
          ))
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
