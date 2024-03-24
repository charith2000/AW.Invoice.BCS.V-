import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CloseStatusService {

  constructor() { }

  private _closeStatus: number = 0;

  get closeStatus(): number {
    return this._closeStatus;
  }

  set closeStatus(value: number) {
    this._closeStatus = value;
  }

}
