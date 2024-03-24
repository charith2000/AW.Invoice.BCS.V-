import {Injectable, OnDestroy} from '@angular/core';
import {NavigationEnd, Router} from "@angular/router";
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class StaticDataService  {
  private dataMappingMenuSubject = new Subject<string>();
  dataMappingMenu$ = this.dataMappingMenuSubject.asObservable();

  constructor(private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.captureNavigationItem(event.urlAfterRedirects);
      }
    });
  }

  private captureNavigationItem(uri: string) {
    const segments = uri.split('/');
    const lastSegment = segments[segments.length - 1];
    this.dataMappingMenuSubject.next(lastSegment);
  }
}
