import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {HomeComponent} from "./home/home.component";
import {UnauthorizedComponent} from "@core/modules/unauthorized/unauthorized.component";
import {UnauthorizedModule} from "@core/modules/unauthorized/unauthorized.module";
import {LoginComponent} from "@core/+auth/pages/login/login.component";
import {AuthModule} from "@core/+auth/auth.module";
import {GuardService} from "@core/services/guard.service";
import {UnderConstructonComponent} from "@core/modules/under-constructon/under-constructon.component";


const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
    //canActivate: [GuardService],
    children: [
      {
        path: 'admin',
        loadChildren: () => import('./epics/features/admin/admin.module').then(m => m.AdminModule),

      },
      {
        path: 'commercial',
        loadChildren: () => import('./epics/features/commercial-reporting/commercial-reporting.module').then(m => m.CommercialReportingModule),

      }
    ]
  },
  {path: 'unauthorized', component: UnauthorizedComponent},



  {path: '', component: LoginComponent},
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    UnauthorizedModule
  ],
  exports: [RouterModule, UnauthorizedModule, AuthModule]
})

export class AppRoutingModule {
}
