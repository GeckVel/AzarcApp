import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  $currentUser: Subject<User> = new Subject();

  static checkUser(newUser: User): User {
    const storedUser = localStorage.getItem('currentUser');
    const currentUser = !!storedUser ? JSON.parse(storedUser) : {name: null, email: null};
    if (currentUser?.name === newUser.name && currentUser.email === newUser.email) {
      return currentUser;
    } else {
      return newUser;
    }
  }

  setGoogleUser(googleProfile: any): void {
    const name = googleProfile.getName();
    const email = googleProfile.getEmail();

    const userChecked = UserService.checkUser({name, email});
    this.$currentUser.next(userChecked);

    localStorage.setItem('currentUser', JSON.stringify(userChecked));
  }

}
