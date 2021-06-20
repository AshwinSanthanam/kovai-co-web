import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthenticateUserRequest } from '../api/models/user.model';
import { UserService } from '../api/user.service';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.scss']
})
export class UserLoginComponent implements OnInit {

  public loginForm: FormGroup;
  private _isPasswordVisible: boolean;
  private _responseErrorMessage: string;

  constructor(private readonly _userService: UserService) {
    this._isPasswordVisible = false;
    this._responseErrorMessage = '';
  }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      'email': new FormControl('', [Validators.required, Validators.email]),
      'password': new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(20)])
    });
  }

  public login(): void {
    this.loginForm.markAllAsTouched();
    if(this.loginForm.valid) {
      this._userService.authenticateUser(this.loginForm.value).subscribe(genericResponse => {
        this._responseErrorMessage = '';
        console.log(genericResponse);
      }, (response: HttpErrorResponse) => {
        if(response.status == 401) {
          this._responseErrorMessage = response.error.message;
        }
      });
    }
  }

  public validate(control: string, error: string): boolean {
    const formControl = this.loginForm.controls[control];
    return (formControl.errors != null && formControl.errors[error]) && ((formControl.touched && formControl.dirty) || formControl.touched);
  }

  public togglePasswordVisibility(): void {
    this._isPasswordVisible = !this._isPasswordVisible;
  }

  public get isPasswordVisible(): boolean {
    return this._isPasswordVisible;
  }

  public get responseErrorMessage(): string {
    return this._responseErrorMessage;
  }
}
