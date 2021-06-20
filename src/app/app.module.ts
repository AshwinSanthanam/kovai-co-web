import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SocialLoginModule, SocialAuthServiceConfig } from 'angularx-social-login';
import { GoogleLoginProvider } from 'angularx-social-login';

import { UiModule } from './ui/ui.module';
import { ApiModule } from './api/api.module';
import { SignupComponent } from './signup/signup.component';
import { UserLoginComponent } from './user-login/user-login.component';
import { MainComponent } from './main/main.component';
import { ProductBrowseComponent } from './main/product-browse/product-browse.component';
import { environment } from 'src/environments/environment';
import { CreateProductComponent } from './main/product-browse/create-product/create-product.component';

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    UserLoginComponent,
    MainComponent,
    ProductBrowseComponent,
    CreateProductComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    SocialLoginModule,
    UiModule,
    ApiModule
  ],
  providers: [
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(environment.externalAuth.googleClientId)
          },
        ],
      } as SocialAuthServiceConfig
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
