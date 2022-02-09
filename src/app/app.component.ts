import { Component, OnInit } from '@angular/core';
import { environment } from '../environments/environment';
declare let gapi: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  public gapiIsLoaded = false;
  public authInstance: any;
  public error = '';
  public googleUser: any;

  async ngOnInit(): Promise<void> {
    // if (await this.checkIfUserAuthenticated()) {
    //   this.googleUser = this.authInstance.currentUser.get();
    // }
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

    return new Promise(async () => {
      await this.authInstance.signIn().then(
        (user: any) => {this.googleUser = user.getBasicProfile(); console.log(user)},
        (error: string) => this.error = error);
    });
  }

  async checkIfUserAuthenticated(): Promise<boolean> {
    if (!this.gapiIsLoaded) {
      await this.initGoogleAuth();
    }

    return this.authInstance.isSignedIn.get();
  }

}
