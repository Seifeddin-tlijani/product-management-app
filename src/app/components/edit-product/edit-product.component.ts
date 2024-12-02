import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from '../../products.service';
import { Product } from '../../model/product.model';

@Component({
  selector: 'app-edit-product',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {
  productId: string = '';
  productFormGroup?: FormGroup;
  submitted: boolean = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private productsService: ProductsService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.productId = this.activatedRoute.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.loadProduct();
  }

  loadProduct(): void {
    this.productsService.getProduct(this.productId).subscribe({
      next: (product) => {
        this.productFormGroup = this.fb.group({
          id: [product.id],
          name: [product.name, Validators.required],
          price: [product.price, [Validators.required, Validators.min(0)]],
          quantity: [product.quantity, [Validators.required, Validators.min(0)]],
          selected: [product.selected],
          available: [product.available]
        });
      },
      error: (err) => {
        console.error('Error loading product:', err);
        alert('Error loading product details');
        this.router.navigateByUrl('/products');
      }
    });
  }

  onUpdateProduct(): void {
    this.submitted = true;
    if (this.productFormGroup?.invalid) {
      return;
    }

    const updatedProduct = this.productFormGroup?.value;
    updatedProduct.price = Number(updatedProduct.price);
    updatedProduct.quantity = Number(updatedProduct.quantity);

    this.productsService.updateProduct(updatedProduct).subscribe({
      next: () => {
        alert('Product updated successfully');
        this.router.navigateByUrl('/products');
      },
      error: (err) => {
        console.error('Error updating product:', err);
        alert('Error updating product');
      }
    });
  }

  onCancel(): void {
    this.router.navigateByUrl('/products');
  }
}
