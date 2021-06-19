import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { ProductTileComponent } from './product-tile/product-tile.component';



@NgModule({
  declarations: [
    NavBarComponent,
    ProductTileComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    NavBarComponent,
    ProductTileComponent
  ]
})
export class UiModule { }
