import { Component } from '@angular/core';
import {FormGroup} from "@angular/forms";
import {NavBarComponent} from "../../../layout/nav-bar/nav-bar.component";

@Component({
  selector: 'app-unauthorized',
  templateUrl: './unauthorized.component.html',
  styleUrls: ['./unauthorized.component.css']
})
export class UnauthorizedComponent {



  loginForm = new FormGroup({})

  submitForm() : void {}


}
