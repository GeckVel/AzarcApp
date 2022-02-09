import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProfileComponent } from './profile/profile.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GoogleAuthService } from './core/services/google-auth.service';
import { AuthModule } from './auth/auth.module';
import { DashboardModule } from "./dashboard/dashboard.module";

@NgModule({
  declarations: [
    AppComponent,
    ProfileComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AuthModule,
    DashboardModule,
  ],
  providers: [GoogleAuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
