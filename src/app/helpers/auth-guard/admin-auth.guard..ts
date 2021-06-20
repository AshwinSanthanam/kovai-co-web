import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { JwtDecoderService } from '../jwt-decoder.service';
import { StorageService } from '../storage.service';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuard implements CanActivate {

  constructor(
    private readonly _storageService: StorageService,
    private readonly _jwtDecoderService: JwtDecoderService,
    private readonly _router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const isLoggedIn: boolean = this._storageService.token != null && this._storageService.token != '';
    if(isLoggedIn) {
      const role = this._jwtDecoderService.decode(this._storageService.token).role;
      if(role == 'admin') {
        return true;
      }
    }
    this._router.navigate(['/login']);
    return false;
  }
  
}
