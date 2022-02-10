import { Component, OnInit } from '@angular/core';
import { User } from '../core/models/user.model';
import { GoogleAuthService } from '../core/services/google-auth.service';
import { FormBuilder } from "@angular/forms";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  user!: User;
  locationList?: string[];
  officeLocation = '';

  constructor(
    private userService: GoogleAuthService,
    private formBuilder: FormBuilder,
  ) {
  }

  ngOnInit(): void {
    this.userService.$currentUser
      .subscribe(data => {
        this.user = data;
        this.officeLocation = this.user.officeLocation || '';
      });
    this.locationList = ['Los Angeles', 'Cape Town', 'London'];
  }

  saveData(): void {
    if (this.officeLocation.length) {
      this.user.officeLocation = this.officeLocation;
    }
  }

}
