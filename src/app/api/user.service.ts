import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { GenericResponse } from './models/generic-response.model';
import { 
  AuthenticateUserRequest, 
  CreateUserRequest, 
  CreateUserResponse, 
  ExternalAuth
} from './models/user.model';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  private readonly _baseUrl: string;

  constructor(private readonly _httpClient: HttpClient) {
    this._baseUrl = `${environment.apiUrl}/user`;
  }

  public createUser(request: CreateUserRequest): Observable<GenericResponse<CreateUserResponse>> {
    return this._httpClient.post<GenericResponse<CreateUserResponse>>(this._baseUrl, request);
  }

  public authenticateUser(request: AuthenticateUserRequest): Observable<GenericResponse<string>> {
    const url = `${this._baseUrl}/authenticate`;
    return this._httpClient.post<GenericResponse<string>>(url, request);
  }

  public authenticateAdmin(request: AuthenticateUserRequest): Observable<GenericResponse<string>> {
    const url = `${this._baseUrl}/authenticate/admin`;
    return this._httpClient.post<GenericResponse<string>>(url, request);
  }

  public authenticateExternalUser(request: ExternalAuth): Observable<GenericResponse<string>> {
    const url = `${this._baseUrl}/authenticate/external`;
    return this._httpClient.post<GenericResponse<string>>(url, request);
  }
}
