import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalService } from 'src/app/helpers/global.service';
import { JwtDecoderService } from 'src/app/helpers/jwt-decoder.service';
import { Publisher } from 'src/app/helpers/publisher';
import { StorageService } from 'src/app/helpers/storage.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  numberOfCartItems: number;

  constructor(
    private readonly _router: Router,
    private readonly _globalService: GlobalService,
    private readonly _storageService: StorageService,
    private readonly _jwtDecoderService: JwtDecoderService) {
  }

  ngOnInit(): void {
    this._globalService.cartItemCommand.subscribe(count => {
      this.numberOfCartItems = count;
    });
  }

  public logout() {
    this._storageService.token = "";
    if(this.isAdmin) {
      this._router.navigate(['/signup/admin']);
    }
    else {
      this._router.navigate(['/signup']);
    }
  }

  get isAdmin(): boolean {
    return this._jwtDecoderService.decode(this._storageService.token).role === 'admin';
  }
}
