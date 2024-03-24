export interface DataMappingMenuModel{
  reportingId: string,
  name: string,
  reportingSegments : ReportingSegments[];
}

export interface ReportingSegments {
  reportingSegmentId: string,
  segmentName: string,
  reportingSegmentDataSources: ReportingSegmentDataSources[];
}

export interface ReportingSegmentDataSources{
  reportingSegmentDataSourceId: string,
  sourceName: string
}
