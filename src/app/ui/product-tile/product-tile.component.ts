import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-product-tile',
  templateUrl: './product-tile.component.html',
  styleUrls: ['./product-tile.component.scss']
})
export class ProductTileComponent implements OnInit {

  public isAdded: boolean;
  
  @Input('admin-mode')
  public adminMode: boolean;

  @Input('image-url')
  public imageUrl: string;

  @Output('add')
  public add: EventEmitter<boolean>;

  constructor() {
    this.adminMode = false;
    this.isAdded = false;
    this.add = new EventEmitter<boolean>();
  }

  ngOnInit(): void {
  }

  emitAddEvent() {
    this.isAdded = !this.isAdded;
    this.add.emit(this.isAdded);
  }

}
