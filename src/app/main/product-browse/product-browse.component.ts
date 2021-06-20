import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-browse',
  templateUrl: './product-browse.component.html',
  styleUrls: ['./product-browse.component.scss']
})
export class ProductBrowseComponent implements OnInit {

  public adminMode: boolean;

  constructor() {
    this.adminMode = true;
  }

  ngOnInit(): void {
  }

}
