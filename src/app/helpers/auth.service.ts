import { Injectable } from '@angular/core';
import { SocialAuthService } from "angularx-social-login";
import { GoogleLoginProvider } from "angularx-social-login";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private readonly _externalAuthService: SocialAuthService) {}

  public signInWithGoogle = ()=> {
    return this._externalAuthService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }
  
  public signOutExternal = () => {
    this._externalAuthService.signOut();
  }
}
