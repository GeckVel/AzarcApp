import { Component, OnInit } from '@angular/core';
import { User } from '../core/models/user.model';
import { GoogleAuthService } from '../core/services/google-auth.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  user!: User;
  locationList?: string[];
  officeLocation = '';
  userDetailsForm: FormGroup;

  constructor(
    private userService: GoogleAuthService,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar
  ) {
    this.userDetailsForm = this.formBuilder.group({
      residentialAddress: [''],
      officeLocation: [''],
    });
  }

  ngOnInit(): void {
    this.userService.$currentUser
      .subscribe(data => {
        this.user = data;
        this.officeLocation = this.user.officeLocation || '';
        this.userDetailsForm.patchValue(this.user);
      });
    this.locationList = ['Los Angeles', 'Cape Town', 'London'];
  }

  saveData(): void {
    if (this.userDetailsForm.dirty) {
      this.user = {...this.user, ...this.userDetailsForm.value};
      this.userService.storeUser(this.user);

      this.snackBar.open('Your profile successfully updated', 'OK', {
        horizontalPosition: 'center',
        verticalPosition: 'top',
        duration: 3000
      });
    }
  }

}
