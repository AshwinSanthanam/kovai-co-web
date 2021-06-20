import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-tile',
  templateUrl: './product-tile.component.html',
  styleUrls: ['./product-tile.component.scss']
})
export class ProductTileComponent implements OnInit {

  @Input('admin-mode')
  public adminMode: boolean;

  @Input('image-url')
  public imageUrl: string;

  constructor() {
    this.adminMode = false;
  }

  ngOnInit(): void {
  }

}
