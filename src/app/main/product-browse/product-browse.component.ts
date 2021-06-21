import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/api/models/product.model';
import { ProductService } from 'src/app/api/product.service';
import { GlobalService } from 'src/app/helpers/global.service';
import { Publisher } from 'src/app/helpers/publisher';
import { SpinnerService } from 'src/app/ui/spinner/spinner.service';

@Component({
  selector: 'app-product-browse',
  templateUrl: './product-browse.component.html',
  styleUrls: ['./product-browse.component.scss']
})
export class ProductBrowseComponent implements OnInit {

  public adminMode: boolean;
  public productGrid: { isSelected: boolean, product: Product}[];

  public searchString: string = '';

  public numberOfSelectedTiles: number;
  public confirmDeleteCommand: Publisher<boolean>;
  numberProductsSelected: number;
  editProductPublisher: Publisher<Product>;
  openCreateProductCommand: Publisher<boolean>;

  constructor(
    private readonly _activatedRoute: ActivatedRoute,
    private readonly _productService: ProductService,
    private readonly _spinnerService: SpinnerService,
    private readonly _globalService: GlobalService) {
    this.numberOfSelectedTiles = 0;
    this.numberProductsSelected = 0;
    this.confirmDeleteCommand = new Publisher<boolean>();
    this.openCreateProductCommand = new Publisher<boolean>();
    this.editProductPublisher = new Publisher<Product>();
  }

  ngOnInit(): void {
    this._activatedRoute.params.subscribe(params => {
      this.adminMode = params['admin'] === 'admin';
    });

    this.getProducts();
  }

  public getProducts() {
    this._spinnerService.runSpinner();
    this._productService.getProducts(10, 0, this.searchString).subscribe(response => {
      const products = response.payload;
      this.productGrid = [];

      for (const product of products) {
        this.productGrid.push({ isSelected: false, product: product });
      }
      this.numberOfSelectedTiles = 0;
      this._spinnerService.stopSpinner();
    });
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
      let count = 0;
      this._spinnerService.runSpinner();
      for (const productTile of this.productGrid) {
        if(productTile.isSelected) {
          count++;
          this._productService.deleteProduct(productTile.product.id).subscribe(x => 
          {
            count--;
            if(count == 0) {
              this._spinnerService.stopSpinner();
              this.getProducts();
            }
          });
        }
      }
      this.numberOfSelectedTiles = 0;
    }
  }

  public closeDeletePopup(): void {
    this.confirmDeleteCommand.publish(false);
  }

  addToCart(i: number) {
    this.productGrid[i].isSelected = !this.productGrid[i].isSelected;
    console.log(this.productGrid[i].isSelected);
    if(this.productGrid[i].isSelected) {
      this.numberProductsSelected++;
    }
    else{
      this.numberProductsSelected--;
    }
    this._globalService.cartItemCommand.publish(this.numberProductsSelected);
  }

  openCreateProduct() {
    this.openCreateProductCommand.publish(true);
  }

  getCreatedOrEditedProduct(product: Product) {
    this.openCreateProductCommand.publish(false);
    this.getProducts();
  }

  openEditProduct() {
    const productToEdit = this.productGrid.filter(x => x.isSelected)[0].product;
    this.editProductPublisher.publish(productToEdit);
    this.openCreateProductCommand.publish(true);
  }
}
