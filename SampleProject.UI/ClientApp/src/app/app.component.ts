import {Component, OnInit} from '@angular/core';
import {AuthService} from "@core/services/auth.service";
import {Router} from "@angular/router";
import { SignalRService } from '@core/services/signal-r.service';
import {Subscription} from "rxjs";
import {StorageService} from "@core/services/storage.service";
import {EventBusService} from "@core/_shared/event-bus.service";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  private roles: string[] = [];
  isLoggedIn = false;
  username?: string;
  title = 'app';
  value: any;
  eventBusSub?: Subscription;
  constructor(
    private storageService: StorageService,
    private eventBusService: EventBusService,
    private signalRService: SignalRService,
    private authService: AuthService,
              private router: Router) {}

  ngOnInit(): void {
   // this.signalRService.startConnection();
    // this.router.navigate(['/home']);
    // if(this.authService.isAuthenticated())
    //   this.router.navigate(['/home']);
    // else
    //   this.router.navigate(['/unauthorized']);

    this.isLoggedIn = this.storageService.isLoggedIn();

    if (this.isLoggedIn) {
      const user = this.storageService.getUser();
      this.roles = user.roles;
      this.username = user.username;
    }
    this.eventBusSub = this.eventBusService.on('logout', () => {
      this.logout();
    });
  }

  logout(): void {
    this.authService.logout().subscribe({
      next: res => {
        console.log(res);
        this.storageService.clean();
        window.location.reload();
      },
      error: err => {
        console.log(err);
      }
    });
  }
}
