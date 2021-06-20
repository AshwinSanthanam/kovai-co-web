import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Product } from 'src/app/api/models/product.model';
import { ProductService } from 'src/app/api/product.service';
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
  productId: number;
  public responseErrorMessage: string;

  @Input('edit-product-publisher')
  editProductPublisher: Publisher<Product>;

  @Output('get-product')
  productEmitter: EventEmitter<Product>;

  constructor(private readonly _productService: ProductService) {
    this._noPreview = "/assets/images/app/no-preview.jpg";
    this.productEmitter = new EventEmitter<Product>();
    this.productId = 0;
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

    this.editProductPublisher.subscribe(product => {
      this.productForm.reset();
      this.productId = product.id;
      this.productForm.patchValue({
        'name': product.name,
        'price': product.price,
        'imageUrl': product.imageUrl
      });
    });
  }

  submit() {
    this.productForm.markAllAsTouched();

    if(this.productForm.valid) {
      const formValue = this.productForm.value;
      const product: Product = {
        id: this.productId,
        name: formValue.name,
        price: formValue.price,
        imageUrl: formValue.imageUrl
      };
      this.productId = 0;
      this._productService.createOrUpdateProduct(product).
      subscribe(response => {
        this.productEmitter.emit(product);
        this.productForm.reset();
      }, (errorResponse: HttpErrorResponse) => this.responseErrorMessage = errorResponse.error.message);
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
