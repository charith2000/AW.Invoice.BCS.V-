export interface ReportingSegmentDataSourceModel {
  reportingSegmentDataSourceId: string;
  sourceName: string;
  active: boolean;
  serverName : string;
  dbName : string;
  userId: string;
  password : string;
  reportingSegmentId  : string;
  status: number;
  authorizedStatus: number;
  tableName: string;
  dataSourceConnectionId: string;
}
