import {Inject, Injectable} from '@angular/core';
import {HubConnection, HubConnectionBuilder} from '@microsoft/signalr';
import * as signalR from '@microsoft/signalr';
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SignalRService {

  private hubConnection!: HubConnection;
  connection!: signalR.HubConnection;
  url!: string
  progressMessage!: Subject<string>;
  mappingProgressMessage!: Subject<string>;

  constructor(@Inject('BASE_URL') private baseUrl: string) {
    this.progressMessage = new Subject<string>();
    this.mappingProgressMessage = new Subject<string>();

  }

  private removeApiPathFromUrl() {
    return this.baseUrl.replace('/api/', '/');
  }
  public startConnection(): void {
    this.hubConnection = new HubConnectionBuilder()
      .withUrl(`${this.removeApiPathFromUrl()}downloadHub`)
      .configureLogging(signalR.LogLevel.Information)
      .withAutomaticReconnect()
      .build()

    this.hubConnection.start()
      .then(() => console.log('SignalR connection started.'))
      .catch((err: any) => console.error('Error while starting SignalR connection:', err));


    this.hubConnection.on('consumerDownloadProcess', (message: string) => {
      this.progressMessage.next(message);
    });

    this.hubConnection.on('downloadNotification', (message: string) => {
      console.log(message);
    });

    this.hubConnection.on('sendDownloadNotification', (data: any) => {
      console.log(data)
    });

    this.hubConnection.on('ConsumerDataMappingProcess',(message:any) => {
      this.mappingProgressMessage.next(message)
    })

    //
    // this.hubConnection.on('commercialDownloadProcess', (message: string) => {
    //   this.progressMessage.next(message);
    // });
    //
    // this.hubConnection.on('downloadNotification', (message: string) => {
    //   console.log(message);
    // });
    //
    // this.hubConnection.on('sendDownloadNotification', (data: any) => {
    //   console.log(data)
    // });
    //
    // this.hubConnection.on('commercialDataMappingProcess',(message:any) => {
    //   this.mappingProgressMessage.next(message)
    // })
  }
}



