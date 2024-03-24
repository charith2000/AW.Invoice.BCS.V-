import { LoginComponent } from '@core/+auth/pages/login/login.component';
import { NgModule } from '@angular/core';
import {NgZorroModule} from "@core/modules/ng-zorro/ng-zorro.module";
import {ReactiveFormsModule} from "@angular/forms";
import {UnauthorizedComponent} from "@core/modules/unauthorized/unauthorized.component";
import {PermissionDirective} from "@core/+auth/permission.directive";




@NgModule({
  declarations: [
    LoginComponent,
    PermissionDirective,

  ],
  exports: [
    LoginComponent,
    PermissionDirective,

  ],
  imports: [
    NgZorroModule,
    ReactiveFormsModule,

  ]
})
export class AuthModule { }
