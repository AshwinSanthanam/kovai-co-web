import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { UiModule } from './ui/ui.module';
import { ApiModule } from './api/api.module';
import { SignupComponent } from './signup/signup.component';
import { UserLoginComponent } from './user-login/user-login.component';
import { MainComponent } from './main/main.component';
import { ProductBrowseComponent } from './main/product-browse/product-browse.component';

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    UserLoginComponent,
    MainComponent,
    ProductBrowseComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    UiModule,
    ApiModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
