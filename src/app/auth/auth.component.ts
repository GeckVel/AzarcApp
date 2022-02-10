import { Component } from '@angular/core';
import { GoogleAuthService } from '../core/services/google-auth.service';
import { Router } from '@angular/router';

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
    private router: Router
  ) {
  }

  authenticate(): void {
    this.googleAuthService.authenticate().then(
      (gResponse: any) => {
        this.googleUser = gResponse;
        this.router.navigateByUrl('/');
      },
      (error: string) => this.error = error
    );
  }

}
