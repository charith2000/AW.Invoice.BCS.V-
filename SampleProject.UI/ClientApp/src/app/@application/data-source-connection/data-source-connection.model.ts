export interface DataSourceConnection {
  id : string;
  name: string;
  serverName: string;
  userId: string;
  dbName : string;
  password: string;
  status: number;
  authorizedStatus : number;

}

export interface ConnectionName {
  key: string;
  value: string;
}
