import { Injectable } from '@angular/core';
import {NzNotificationService} from "ng-zorro-antd/notification";
import {NotificationModalComponent} from "@core/modules/notification-modal/notification-modal.component";
import {MatDialog} from "@angular/material/dialog";

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(
    private notification: NzNotificationService,
    private dialog: MatDialog
  ) {
  }


  showSuccess(message: string, title: string) {
    this.showNotification('success', message, title);
  }

  showError(message: string, title: string) {
    this.showNotification('error', message, title);
  }

  showInfo(message: string, title: string) {
    this.showNotification('info', message, title);
  }

  showWarning(message: string, title: string) {
    this.showNotification('warning', message, title);
  }

  // private showNotification(type: string, message: string, title: string) {
  //   this.notification.create(type, title, message, {
  //     nzClass: `notification-${type} `,
  //     nzPlacement: "topRight",
  //     nzPauseOnHover: true,
  //   });
  // }

  private showNotification(type: string, message: string, title: string) {
    const dialogRef = this.dialog.open(NotificationModalComponent, {
      data: { type, title, message },role: "alertdialog",
      position: {
        top: '10px',
        right: '10px',
      },
      width: "450px",


    });
  }
}
