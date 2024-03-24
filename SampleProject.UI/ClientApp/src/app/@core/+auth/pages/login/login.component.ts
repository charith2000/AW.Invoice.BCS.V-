import { Component } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "@core/services/auth.service";
import {StorageService} from "@core/services/storage.service";
import {Router} from "@angular/router";
import {Version} from "oidc-client";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];
  accessToken : string =''


  constructor(
    private authService: AuthService,
    private storageService: StorageService,
    private router: Router) { }

  loginForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password : new FormControl('', [Validators.required])
  })

  ngOnInit(): void {
    if (this.storageService.isLoggedIn()) {
      this.isLoggedIn = true;
      this.roles = this.storageService.getUser().roles;
    }
  }

  submitForm() : void {

    this.authService.login(this.loginForm.value.username!, this.loginForm.value.password!).subscribe({
      next: data => {
        debugger
        if(data.accessToken){
          this.storageService.saveUser(data);
          this.isLoginFailed = false;
          this.isLoggedIn = true;
          this.roles = this.storageService.getUser().roles;
          // this.reloadPage();
          this.router.navigate(['home']).then()
        }
      },
      error: err => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
      }
    });
  }

  reloadPage(): void {
    window.location.reload();
  }

  protected readonly Version = Version;
}
