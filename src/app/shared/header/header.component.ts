import { Component, OnInit } from '@angular/core';
import { User } from '../../core/models/user.model';
import { GoogleAuthService } from '../../core/services/google-auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  user?: User;

  constructor(
    private userService: GoogleAuthService,
    private router: Router
  ) {
  }

  async ngOnInit(): Promise<void> {
    this.userService.checkIfUserAuthenticated();
    this.userService.$currentUser
      .subscribe(data => this.user = data);
  }

  logoutUser(): void {
    this.userService.logoutUser();
    localStorage.removeItem('currentUser');
    this.router.navigateByUrl('/login');
  }

}
