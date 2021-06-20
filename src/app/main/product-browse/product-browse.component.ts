import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/api/models/product.model';
import { Publisher } from 'src/app/helpers/publisher';

@Component({
  selector: 'app-product-browse',
  templateUrl: './product-browse.component.html',
  styleUrls: ['./product-browse.component.scss']
})
export class ProductBrowseComponent implements OnInit {

  public adminMode: boolean;
  public productGrid: { isSelected: boolean, product: Product}[];

  public numberOfSelectedTiles: number;
  public confirmDeleteCommand: Publisher<boolean>;

  constructor() {
    this.adminMode = false;
    this.numberOfSelectedTiles = 0;
    this.confirmDeleteCommand = new Publisher<boolean>();
  }

  ngOnInit(): void {
    const products = [
      { id: 1, name: 'sofa sets', price: 45000, imageUrl: 'https://images.pexels.com/photos/1866149/pexels-photo-1866149.jpeg' },
      { id: 2, name: 'beds', price: 12500, imageUrl: 'https://images.pexels.com/photos/1374125/pexels-photo-1374125.jpeg' },
      { id: 3, name: 'chairs', price: 2400, imageUrl: 'https://images.pexels.com/photos/1233340/pexels-photo-1233340.jpeg' },
      { id: 4, name: 'mattresses', price: 8600, imageUrl: 'https://images.pexels.com/photos/2374959/pexels-photo-2374959.jpeg' }
    ];
    this.productGrid = [];

    for (const product of products) {
      this.productGrid.push({ isSelected: false, product: product });
    }
  }

  public onProductTileClick(i: number): void {
    if(this.adminMode){
      this.productGrid[i].isSelected = !this.productGrid[i].isSelected;
        if(this.productGrid[i].isSelected) {
          this.numberOfSelectedTiles++;
        }
        else {
          this.numberOfSelectedTiles--;
        }
    }
  }

  public openDeletePopup(): void {
    this.confirmDeleteCommand.publish(true);
  }

  public deleteSelected(): void {
    this.confirmDeleteCommand.publish(false);

    if(this.adminMode) {
      const newArray = [];
      for (const productTile of this.productGrid) {
        if(!productTile.isSelected) {
          newArray.push(productTile);
        }
      }
      this.productGrid = newArray;
      this.numberOfSelectedTiles = 0;
    }
  }

  public closeDeletePopup(): void {
    this.confirmDeleteCommand.publish(false);
  }

  addToCart(i: number) {
    this.productGrid[i].isSelected = !this.productGrid[i].isSelected;
  }
}
