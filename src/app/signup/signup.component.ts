import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SocialUser } from 'angularx-social-login';
import { GenericResponse } from '../api/models/generic-response.model';
import { CreateUserRequest, CreateUserResponse, ExternalAuth } from '../api/models/user.model';
import { UserService } from '../api/user.service';
import { AuthService } from '../helpers/auth.service';
import { Publisher } from '../helpers/publisher';
import { StorageService } from '../helpers/storage.service';
import { SpinnerService } from '../ui/spinner/spinner.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  private _isPasswordVisible: boolean;
  private _responseErrorMessage: string;
  private _isAdminLogin: boolean;
  
  private readonly _confirmSignup: Publisher<boolean>;

  public loginForm: FormGroup;
  googleSignupErrorMessage: string;

  constructor(
    private readonly _userService: UserService,
    private readonly _spinnerService: SpinnerService,
    private readonly _router: Router,
    private readonly _authService: AuthService,
    private readonly _storageService: StorageService,
    private readonly _activatedRoute: ActivatedRoute) {
    this._isPasswordVisible = false;
    this._confirmSignup = new Publisher<boolean>();
  }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      'email': new FormControl('', [Validators.required, Validators.email]),
      'password': new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(20)])
    });

    this._activatedRoute.params.subscribe(params => {
      this._isAdminLogin = params['admin'] === 'admin';
    });
  } 

  public register(): void {
    this.loginForm.markAllAsTouched();

    if(this.loginForm.valid) {
      console.log(this.loginForm.value);
      const request = this.generateCreateUserRequest();

      this._spinnerService.runSpinner();
      if(this._isAdminLogin) {
        this._userService.createAdmin(request).subscribe(
          genericResponse => this.onSuccessFulSignUp(genericResponse),
          errorResponse => this.onSignUpFailure(errorResponse));
      }
      else {
        this._userService.createUser(request).subscribe(
          genericResponse => this.onSuccessFulSignUp(genericResponse),
          errorResponse => this.onSignUpFailure(errorResponse));
      }
    }
  }

  private onSuccessFulSignUp(genericResponse: GenericResponse<CreateUserResponse>): void {
    this._responseErrorMessage = '';
    this.loginForm.reset();
    this._spinnerService.stopSpinner();
    this._confirmSignup.publish(true);
  }

  private onSignUpFailure(errorResponse: HttpErrorResponse): void {
    this._responseErrorMessage = errorResponse.error.message;
    this.loginForm.reset();
    this._spinnerService.stopSpinner();
  }

  private generateCreateUserRequest(): CreateUserRequest {
    const request = new CreateUserRequest();
    request.email = this.loginForm.controls['email'].value;
    request.password = this.loginForm.controls['password'].value;
    return request;
  }

  public validate(control: string, error: string): boolean {
    const formControl = this.loginForm.controls[control];
    return (formControl.errors != null && formControl.errors[error]) && ((formControl.touched && formControl.dirty) || formControl.touched);
  }

  public togglePasswordVisibility(): void {
    this._isPasswordVisible = !this._isPasswordVisible;
  }

  public closeConfirmPopup(): void {
    this._confirmSignup.publish(false);
    if(this._isAdminLogin) {
      this._router.navigate(['/login/admin']);
    }
    else {
      this._router.navigate(['/login']);
    }
  }

  public googleSignIn(): void {
    this._authService.signInWithGoogle()
    .then(res => {
      const user: SocialUser = { ...res };
      const externalAuth: ExternalAuth = {
        idToken: user.idToken,
        provider: user.provider
      }
      this._spinnerService.runSpinner();

      if(this._isAdminLogin) {
        this._userService.authenticateExternalAdmin(externalAuth).subscribe(
          genericResponse => this.respondAuthenticateExternalUser(genericResponse),
          responseError => this.handleAuthenticateExternalUserError(responseError));
      }
      else {
        this._userService.authenticateExternalUser(externalAuth).subscribe(
          genericResponse => this.respondAuthenticateExternalUser(genericResponse),
          responseError => this.handleAuthenticateExternalUserError(responseError)); 
      }
    });
  }

  private respondAuthenticateExternalUser(genericResponse: GenericResponse<string>): void {
    this.googleSignupErrorMessage = '';
    this._storageService.token = genericResponse.payload;
    this._router.navigate(['product-browse']);
    this._spinnerService.stopSpinner();
  }

  private handleAuthenticateExternalUserError(responseError: HttpErrorResponse): void {
    this.googleSignupErrorMessage = responseError.error.message;
    this._spinnerService.stopSpinner();
  }

  public gotoLogin(): void {
    if(this._isAdminLogin) {
      this._router.navigate(['/login/admin']);
    }
    else {
      this._router.navigate(['/login']);
    }
  }

  public get isPasswordVisible(): boolean {
    return this._isPasswordVisible;
  }

  public get responseErrorMessage(): string {
    return this._responseErrorMessage;
  }

  public get confirmSignup(): Publisher<boolean> {
    return this._confirmSignup;
  }
}
