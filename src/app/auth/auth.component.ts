import { Component, OnInit } from '@angular/core';
import { GoogleAuthService } from "../core/services/google-auth.service";
declare let gapi: any;

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent {
  googleUser: any;
  error = '';

  constructor(private gas: GoogleAuthService) { }

  authenticate(): void {
    this.gas.authenticate().then(
      (user: any) => this.googleUser = user,
      (error: string) => this.error = error
    );
  }

}
