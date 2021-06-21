import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { ProductTileComponent } from './product-tile/product-tile.component';
import { SpinnerComponent } from './spinner/spinner.component';
import { DialogComponent } from './dialog/dialog.component';
import { CounterComponent } from './counter/counter.component';



@NgModule({
  declarations: [
    NavBarComponent,
    ProductTileComponent,
    SpinnerComponent,
    DialogComponent,
    CounterComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    NavBarComponent,
    ProductTileComponent,
    SpinnerComponent,
    DialogComponent,
    CounterComponent
  ]
})
export class UiModule { }
