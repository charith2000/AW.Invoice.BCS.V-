import {ChangeDetectorRef, Directive, ElementRef, Input, Renderer2} from '@angular/core';
import {AuthService} from "@core/services/auth.service";

@Directive({
  selector: '[appPermission]'
})
export class PermissionDirective {

  constructor(private el: ElementRef,
              private renderer: Renderer2,
              private authService: AuthService,
              private cdr: ChangeDetectorRef) { }
  @Input('checkForPrefix') checkForPrefix: boolean = false;
  @Input('appPermission') set appRoleBasedNavigation( allowedRoles: string[]) {

    console.log('appPermission input updated with allowedRoles:', allowedRoles);
    console.log('checkForPrefix:', this.checkForPrefix);

    const isPrefixCheck = this.checkForPrefix;

    const userRoles = this.authService.getUserRoles();

    const checkPermissions = Array.isArray(allowedRoles) ? allowedRoles : [allowedRoles];


    if (isPrefixCheck) {
      const hasPrefix = userRoles.some(role => {
        const [prefix] = role.split(':');
        console.log('User Roles:', userRoles);
        console.log('Role:', role);
        console.log('Prefix:', prefix);
        return checkPermissions.includes(prefix);
      });

      if (!hasPrefix) {
        this.renderer.setStyle(this.el.nativeElement, 'display', 'none');

      }
    } else {
      if (!userRoles.some(role => allowedRoles.includes(role))) {
        this.renderer.setStyle(this.el.nativeElement, 'display', 'none');

      }
    }
  }



}


