import { Component, Input, OnInit } from '@angular/core';
import { GlobalService } from 'src/app/helpers/global.service';
import { Publisher } from 'src/app/helpers/publisher';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  numberOfCartItems: number;

  constructor(private readonly _globalService: GlobalService) {
  }

  ngOnInit(): void {
    this._globalService.cartItemCommand.subscribe(count => {
      this.numberOfCartItems = count;
    });
  }

}
