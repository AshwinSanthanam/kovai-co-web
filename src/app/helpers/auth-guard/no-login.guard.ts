import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { StorageService } from "../storage.service";

@Injectable({
    providedIn: 'root'
})
export class NoLogin implements CanActivate {

    constructor(
        private readonly _router: Router,
        private readonly _storageService: StorageService) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        const isLoggedIn: boolean = this._storageService.token != null && this._storageService.token != '';
        if(isLoggedIn) {
            this._router.navigate(['/product-browse']);
            return false;
        }
        return true;
    }

}