import {Component, OnDestroy} from '@angular/core';
import {Subject, Subscription} from "rxjs";

@Component({
  template: ''
})
export abstract  class BaseComponent implements OnDestroy {
  public subscription$ = new Subscription();

  ngOnDestroy(): void {
    console.log("Base ngOnDestroy")
    this.subscription$.unsubscribe();
  }

}
