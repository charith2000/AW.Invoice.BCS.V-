import {BrowserModule} from '@angular/platform-browser';
import {APP_INITIALIZER, NgModule} from '@angular/core';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {AppComponent} from './app.component';
import {HomeComponent} from './home/home.component';
import {NavBarComponent} from './layout/nav-bar/nav-bar.component';
import {UnauthorizedModule} from "@core/modules/unauthorized/unauthorized.module";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {en_US, NZ_I18N} from 'ng-zorro-antd/i18n';
import {DatePipe, NgOptimizedImage, registerLocaleData} from '@angular/common';
import en from '@angular/common/locales/en';
import {MatMenuModule} from "@angular/material/menu";
import {MatButtonModule} from '@angular/material/button';
import { MAT_RIPPLE_GLOBAL_OPTIONS } from '@angular/material/core';
import {MAT_DIALOG_DEFAULT_OPTIONS, MatDialogModule} from '@angular/material/dialog';
import {AppRoutingModule} from "./app-routing.module";
import {NgxUiLoaderConfig, NgxUiLoaderModule, POSITION, SPINNER} from "ngx-ui-loader";
import {ToastrModule} from "ngx-toastr";
import {NzIconModule} from "ng-zorro-antd/icon";
import {NzModalModule} from "ng-zorro-antd/modal";
import { ReportingSessionModalComponent } from '@core/modules/reporting-session-modal/reporting-session-modal.component';
import {NgZorroModule} from "@core/modules/ng-zorro/ng-zorro.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {SignalRService} from "@core/services/signal-r.service";
import {httpInterceptorProviders} from "@core/_helpers/http.interceptor";
import {AuthModule} from "@core/+auth/auth.module";
import {JwtModule} from "@auth0/angular-jwt";
import {NzMessageService} from "ng-zorro-antd/message";
import {NzDrawerService} from "ng-zorro-antd/drawer";
import { NotificationModalComponent } from './@core/modules/notification-modal/notification-modal.component';
import {NzStatisticModule} from "ng-zorro-antd/statistic";
import {MatIconModule} from "@angular/material/icon";
import { LoaderComponent } from './@core/modules/loader/loader.component';
import {LoaderService} from "@core/services/loader.service";
import {LoaderInterceptorService} from "@core/services/loader-interceptor.service";
import { UnderConstructonComponent } from './@core/modules/under-constructon/under-constructon.component';




registerLocaleData(en);

const ngxUiLoaderConfig: NgxUiLoaderConfig = {
  bgsColor: "#0050a0",
  bgsOpacity: 0.5,
  bgsPosition: POSITION.topCenter,
  bgsSize: 60,
  blur: 1,
  delay: 0,
  fastFadeOut: true,
  fgsColor: "#0050a0",
  fgsPosition: POSITION.centerCenter,
  fgsSize: 40,
  fgsType: SPINNER.circle,
  gap: 24,
  logoPosition: POSITION.centerCenter,
  logoSize: 120,
  logoUrl: "",
  masterLoaderId: "master",
  overlayBorderRadius: "0",
  overlayColor: "rgba(40,40,40,0.08)",
  pbColor: "#0050a0",
  pbDirection: "ltr",
  pbThickness: 3,
  hasProgressBar: true,
  text: "",
  textColor: "#FFFFFF",
  textPosition: POSITION.centerCenter,
  maxTime: -1,
  minTime: 300
};



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavBarComponent,
    ReportingSessionModalComponent,
    NotificationModalComponent,
    LoaderComponent,
    UnderConstructonComponent
  ],
  imports: [
    JwtModule.forRoot({
      config: {
        tokenGetter: () => {
          return sessionStorage.getItem('USER_KEY');
        },
      },
    }),
    BrowserModule.withServerTransition({appId: 'ng-cli-universal'}),
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    UnauthorizedModule,
    MatMenuModule,
    MatButtonModule,
    MatDialogModule,
    ToastrModule.forRoot(),
    NgxUiLoaderModule.forRoot(ngxUiLoaderConfig),
    NzIconModule,
    NzModalModule,
    NgZorroModule,
    ReactiveFormsModule,
    FormsModule,
    NgOptimizedImage,
    AuthModule,
    NzStatisticModule,
    MatIconModule
  ],
  providers: [
    DatePipe,
    SignalRService,
    NzMessageService,
    NzDrawerService,
    httpInterceptorProviders,
    {
      provide: APP_INITIALIZER,
      useFactory: (signalrService: SignalRService) => () => signalrService.startConnection(),
      deps: [SignalRService],
      multi: true,
    },
    LoaderService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoaderInterceptorService,
      multi: true,
    },
    {provide: NZ_I18N, useValue: en_US},
    {provide: MAT_RIPPLE_GLOBAL_OPTIONS, useValue: {disabled: true}},
    {provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {disableClose: true}},
  ],
  bootstrap: [AppComponent],
  exports: [
    NavBarComponent
  ]
})

export class AppModule {

}
