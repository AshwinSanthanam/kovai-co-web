import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  public get token(): string {
    return localStorage.getItem('token');
  }

  public set token(value: string) {
    localStorage.setItem('token', value);
  }

  public get role(): string {
    return localStorage.getItem('role');
  }

  public set role(value: string) {
    localStorage.setItem('role', value);
  }
}
