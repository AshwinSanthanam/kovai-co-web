import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Product } from 'src/app/api/models/product.model';
import { Publisher } from 'src/app/helpers/publisher';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.scss']
})
export class CreateProductComponent implements OnInit {

  private readonly _noPreview: string;
  imagePreviewUrl: string;
  productForm: FormGroup;

  @Output('get-product')
  productEmitter: EventEmitter<Product>;

  constructor() {
    this._noPreview = "/assets/images/app/no-preview.jpg";
    this.productEmitter = new EventEmitter<Product>();
  }

  ngOnInit(): void {
    this.imagePreviewUrl = this._noPreview;

    this.productForm = new FormGroup({
      'name': new FormControl('', [Validators.required]),
      'price': new FormControl('', [Validators.required]),
      'imageUrl': new FormControl('')
    });

    this.productForm.controls['imageUrl'].valueChanges.subscribe(newValue => {
      if(newValue) {
        this.imagePreviewUrl = newValue;
      }
      else {
        this.imagePreviewUrl = this._noPreview;
      }
    });
  }

  submit() {
    this.productForm.markAllAsTouched();

    if(this.productForm.valid) {
      const formValue = this.productForm.value;
      const product: Product = {
        id: 0,
        name: formValue.name,
        price: formValue.price,
        imageUrl: formValue.imageUrl
      };
      this.productEmitter.emit(product);
      this.productForm.reset();
    }
  }

  cancel() {
    this.productEmitter.emit(null);
    this.productForm.reset();
  }

  public validate(control: string, error: string): boolean {
    const formControl = this.productForm.controls[control];
    return (formControl.errors != null && formControl.errors[error]) && ((formControl.touched && formControl.dirty) || formControl.touched);
  }

}
