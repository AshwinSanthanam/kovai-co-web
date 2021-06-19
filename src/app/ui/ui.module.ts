import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { ProductTileComponent } from './product-tile/product-tile.component';
import { SpinnerComponent } from './spinner/spinner.component';



@NgModule({
  declarations: [
    NavBarComponent,
    ProductTileComponent,
    SpinnerComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    NavBarComponent,
    ProductTileComponent,
    SpinnerComponent
  ]
})
export class UiModule { }
