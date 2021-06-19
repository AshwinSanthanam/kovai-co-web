import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { ProductTileComponent } from './product-tile/product-tile.component';
import { SpinnerComponent } from './spinner/spinner.component';
import { DialogComponent } from './dialog/dialog.component';



@NgModule({
  declarations: [
    NavBarComponent,
    ProductTileComponent,
    SpinnerComponent,
    DialogComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    NavBarComponent,
    ProductTileComponent,
    SpinnerComponent,
    DialogComponent
  ]
})
export class UiModule { }
