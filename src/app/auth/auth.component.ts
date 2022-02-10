import { Component, OnInit } from '@angular/core';
import { GoogleAuthService } from '../core/services/google-auth.service';
import { UserService } from '../core/services/user.service';
declare let gapi: any;

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent {
  googleUser: any;
  error = '';

  constructor(
    private googleAuthService: GoogleAuthService,
    private userService: UserService
  ) { }

  authenticate(): void {
    this.googleAuthService.authenticate().then(
      (gResponse: any) => {
        console.log('asdasd');
        this.googleUser = gResponse.getBasicProfile();
        this.userService.setGoogleUser(this.googleUser);
      },
      (error: string) => this.error = error
    );
  }

}
