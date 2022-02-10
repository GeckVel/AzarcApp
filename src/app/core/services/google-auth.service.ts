import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
declare let gapi: any;

@Injectable({
  providedIn: 'root'
})
export class GoogleAuthService {
  gapiIsLoaded = false;
  authInstance: any;

  constructor() { }

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

    return this.authInstance.isSignedIn.get();
  }
}
