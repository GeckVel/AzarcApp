import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { ReplaySubject } from 'rxjs';
import { User } from '../models/user.model';
declare let gapi: any;

@Injectable({
  providedIn: 'root'
})
export class GoogleAuthService {
  gapiIsLoaded = false;
  authInstance: any;
  $currentUser: ReplaySubject<User> = new ReplaySubject(1);

  static checkUser(newUser: User): User {
    const storedUser = localStorage.getItem('currentUser');
    const currentUser = !!storedUser ? JSON.parse(storedUser) : {name: null, email: null};
    if (currentUser?.name === newUser.name && currentUser.email === newUser.email) {
      return currentUser;
    } else {
      return newUser;
    }
  }

  async initGoogleAuth(): Promise<void> {
    const pload = new Promise((resolve) => {
      gapi.load('auth2', resolve);
    });

    return pload.then(async () => {
      await gapi.auth2
        .init({ client_id: environment.CLIENT_ID })
        .then((auth: any) => {
          this.gapiIsLoaded = true;
          this.authInstance = auth;
        });
    });
  }

  async authenticate(): Promise<any> {
    if (!this.gapiIsLoaded) {
      await this.initGoogleAuth();
    }

    return await this.authInstance.signIn();
  }

  async checkIfUserAuthenticated(): Promise<boolean> {
    if (!this.gapiIsLoaded) {
      await this.initGoogleAuth();
    }

    if (this.authInstance.isSignedIn.get()) {
      this.setGoogleUser(this.authInstance.currentUser.get().getBasicProfile());
      return true;
    }

    return false;
  }

  logoutUser(): void {
    this.authInstance.signOut();
    this.checkIfUserAuthenticated();
  }

  setGoogleUser(googleProfile: any): void {
    const name = googleProfile.getName();
    const email = googleProfile.getEmail();

    const userChecked = GoogleAuthService.checkUser({name, email});
    this.storeUser(userChecked);
  }

  storeUser(user: User): void {
    this.$currentUser.next(user);
    localStorage.setItem('currentUser', JSON.stringify(user));
  }
}
