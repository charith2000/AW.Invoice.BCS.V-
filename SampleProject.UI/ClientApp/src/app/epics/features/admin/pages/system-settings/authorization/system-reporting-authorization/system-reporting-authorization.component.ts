import { Component } from '@angular/core';
import {AuthService} from "@core/services/auth.service";

@Component({
  selector: 'app-system-reporting-authorization',
  templateUrl: './system-reporting-authorization.component.html',
  styleUrls: ['./system-reporting-authorization.component.css']
})
export class SystemReportingAuthorizationComponent {

  constructor(private authService: AuthService) {
  }

  hasPermission(permission: string): boolean {

    const userRoles = this.authService.getUserRoles();
    return userRoles.includes(permission);
  }


}
