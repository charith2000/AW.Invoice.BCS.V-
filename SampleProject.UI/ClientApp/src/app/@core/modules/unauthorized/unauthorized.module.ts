import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UnauthorizedComponent } from './unauthorized.component';
import {NgZorroModule} from "@core/modules/ng-zorro/ng-zorro.module";
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatButtonModule} from "@angular/material/button";
import {MatMenuModule} from "@angular/material/menu";
import {RouterLink} from "@angular/router";
import {NzTypographyModule} from "ng-zorro-antd/typography";

@NgModule({
  declarations: [
    UnauthorizedComponent,
  ],
  imports: [
    CommonModule,
    NgZorroModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatMenuModule,
    RouterLink,
    NzTypographyModule,

  ]
})
export class UnauthorizedModule { }
