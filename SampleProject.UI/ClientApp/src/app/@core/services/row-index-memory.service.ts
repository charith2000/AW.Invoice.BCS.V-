import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class RowIndexMemoryService {
  private selectedIndexSubject = new BehaviorSubject<number>(-1);
  selectedIndex$ = this.selectedIndexSubject.asObservable();

  updateSelectedIndex(index: number) {
    this.selectedIndexSubject.next(index);
  }
}
