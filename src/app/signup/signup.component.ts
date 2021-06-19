import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CreateUserRequest } from '../api/models/user.model';
import { UserService } from '../api/user.service';
import { Publisher } from '../helpers/publisher';
import { SpinnerService } from '../ui/spinner/spinner.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  private _isPasswordVisible: boolean;
  private _responseErrorMessage: string;
  
  private readonly _confirmSignup: Publisher<boolean>;

  public loginForm: FormGroup;

  constructor(
    private readonly _userService: UserService,
    private readonly _spinnerService: SpinnerService,
    private readonly _router: Router) {
    this._isPasswordVisible = false;
    this._confirmSignup = new Publisher<boolean>();
  }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      'email': new FormControl('', [Validators.required, Validators.email]),
      'password': new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(20)])
    });
  } 

  public register(): void {
    this.loginForm.markAllAsTouched();

    if(this.loginForm.valid) {
      console.log(this.loginForm.value);
      const request = this.generateCreateUserRequest();

      this._spinnerService.runSpinner();
      this._userService.createUser(request).subscribe(genericResponse => {
        this._responseErrorMessage = '';
        this.loginForm.reset();
        this._spinnerService.stopSpinner();
        this._confirmSignup.publish(true);
      }, (errorResponse: HttpErrorResponse) => {
        if(errorResponse.status >= 400 && errorResponse.status < 500) {
          this._responseErrorMessage = errorResponse.error.message;
          this.loginForm.reset();
          this._spinnerService.stopSpinner();
        }
      });
    }
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
    this._router.navigate(['/login']);
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
