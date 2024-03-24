import {Component, HostListener, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-notification-modal',
  templateUrl: './notification-modal.component.html',
  styleUrls: ['./notification-modal.component.css']
})
export class NotificationModalComponent {

  private timeoutId: any;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<NotificationModalComponent>) {
    this.startTimeout();
  }



  private startTimeout() {
    this.timeoutId = setTimeout(() => {
      this.closeDialog();
    }, 3000);
  }

  private clearTimeout() {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }
  }

  @HostListener('mouseover')
  onMouseOver() {
    this.clearTimeout();
  }

  @HostListener('mouseout')
  onMouseOut() {
    this.startTimeout();
  }

  getNotificationClass(): string {
    switch (this.data.type) {
      case 'success':
        return 'notification-success';
      case 'error':
        return 'notification-error';
      case 'info':
        return 'notification-info';
      case 'warning':
        return 'notification-warning';
      default:
        return '';
    }
  }

  getTittleColor() : string{
    switch (this.data.type) {
      case 'success':
        return 'notification-success-title';
      case 'error':
        return 'notification-error-title';
      case 'info':
        return 'notification-info-title';
      case 'warning':
        return 'notification-warning-title';
      default:
        return '';
    }
  }

  getIconForType(): string {
    switch (this.data.type) {
      case 'success':
        return 'la-check-circle';
      case 'error':
        return 'la-times-circle';
      case 'info':
        return 'la-info-circle';
      case 'warning':
        return 'la-exclamation-triangle';
      default:
        return '';
    }
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
