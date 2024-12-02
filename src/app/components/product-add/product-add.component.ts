import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductsService } from '../../products.service';
import { Product } from '../../model/product.model';
import { AlertService } from '../../services/alert.service';

@Component({
  selector: 'app-product-add',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css']
})
export class ProductAddComponent implements OnInit {
  productForm: FormGroup;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private productsService: ProductsService,
    private router: Router,
    private alertService: AlertService
  ) {
    this.productForm = this.formBuilder.group({
      name: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(0)]],
      quantity: ['', [Validators.required, Validators.min(0)]],
      available: [true],
      selected: [false]
    });
  }

  ngOnInit(): void {}

  // Convenience getter for easy access to form fields
  get f() {
    return this.productForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.productForm.invalid) {
      this.alertService.warning('Please fill in all required fields correctly');
      return;
    }

    const product: Product = this.productForm.value;
    
    this.productsService.save(product).subscribe({
      next: () => {
        this.alertService.success('Product added successfully!');
        this.router.navigateByUrl('/products');
      },
      error: (error) => {
        console.error('Error adding product:', error);
        this.alertService.danger('Error adding product. Please try again.');
      }
    });
  }

  onCancel() {
    this.router.navigateByUrl('/products');
  }
}
