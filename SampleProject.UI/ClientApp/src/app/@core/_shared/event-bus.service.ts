import { Injectable } from '@angular/core';
import {filter, Subject, Subscription} from "rxjs";
import {map} from "rxjs/operators";
import {EventData} from "./event.class";

@Injectable({
  providedIn: 'root'
})
export class EventBusService {
  private subject$ = new Subject<EventData>();
  constructor() { }

  emit(event: EventData) {
    this.subject$.next(event);
  }

  on(eventName: string, action: any): Subscription {
    return this.subject$.pipe(
      filter((e: EventData) => e?.name === eventName),
      map((e: EventData) => e["value"])).subscribe(action);
  }
}
