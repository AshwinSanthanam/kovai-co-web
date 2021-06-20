import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { GenericResponse } from '../api/models/generic-response.model';
import { UserService } from '../api/user.service';
import { StorageService } from '../helpers/storage.service';
import { SpinnerService } from '../ui/spinner/spinner.service';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.scss']
})
export class UserLoginComponent implements OnInit {

  public loginForm: FormGroup;
  private _isPasswordVisible: boolean;
  private _responseErrorMessage: string;
  private _isAdminLogin: boolean;

  constructor(
    private readonly _userService: UserService,
    private readonly _spinnerService: SpinnerService,
    private readonly _router: Router,
    private readonly _storageService: StorageService,
    private readonly _activatedRoute: ActivatedRoute) {
    this._isPasswordVisible = false;
    this._responseErrorMessage = '';
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

  public login(): void {
    this.loginForm.markAllAsTouched();
    if(this.loginForm.valid) {
      this._spinnerService.runSpinner();
      if(this._isAdminLogin) {
        this._userService.authenticateAdmin(this.loginForm.value).subscribe(
          genericResponse => this.onSuccess(genericResponse), 
          errorResponse => this.onError(errorResponse));
      }
      else {
        this._userService.authenticateUser(this.loginForm.value).subscribe(
          genericResponse => this.onSuccess(genericResponse), 
          errorResponse => this.onError(errorResponse));
      }
    }
  }

  private onSuccess(genericResponse: GenericResponse<string>): void {
    this._responseErrorMessage = '';
    this._storageService.token = genericResponse.payload;
    this._spinnerService.stopSpinner();
    this._router.navigate(['/product-browse']);
  }

  private onError(errorResponse: HttpErrorResponse): void {
    if(errorResponse.status == 401) {
      this._responseErrorMessage = errorResponse.error.message;
    }
    this._spinnerService.stopSpinner();
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
