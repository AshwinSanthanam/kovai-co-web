import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { JwtDecoderService } from '../jwt-decoder.service';
import { StorageService } from '../storage.service';

@Injectable({
  providedIn: 'root'
})
export class AdminUserAuthGuard {

  constructor(
    private readonly _storageService: StorageService,
    private readonly _jwtDecoderService: JwtDecoderService,
    private readonly _router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const isLoggedIn: boolean = this._storageService.token != null && this._storageService.token != '';
    if(isLoggedIn) {
      const role = this._jwtDecoderService.decode(this._storageService.token).role;
      if(role == 'admin' || role == 'user') {
        return true;
      }
    }
    this._router.navigate(['/login']);
    return false;
  }
}
