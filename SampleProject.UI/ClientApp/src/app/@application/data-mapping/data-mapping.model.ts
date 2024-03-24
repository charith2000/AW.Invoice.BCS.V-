export interface DataMappingModel{
  reportingSegmentDataSourceTableId : string,
  dataSourceTableConnectionId : string,
  tableConnection: string,
  filterCondition: string,
  finalTableQuery: string,
  finalQuery: string,
  authorizedStatus: number,
  dataSourceTableConnectionFieldMappings: DataSourceTableConnectionFieldMappings[]
}
export interface DataSourceTableConnectionFieldMappings {
  dataSourceTableConnectionFieldMappingId: number,
  dataSourceTableConnectionId: string,
  defaultValue?: string,
  mappingType: number,
  fieldMapping?: string,
  condition?: string,
  authorizedStatus: number,
  catalogueType: string,
  reportingSegmentField: ReportingSegmentField
}

export interface ReportingSegmentField{
  reportingSegmentFieldId: string,
  columName: string,
  name: string,
  options: string,
  reportingSegmentId: string,
  reportingSegment: string,
  type: string,
  length: string,
  description: string,
  active: boolean
}
