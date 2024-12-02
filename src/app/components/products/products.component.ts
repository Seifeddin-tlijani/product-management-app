import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { catchError, map, Observable, of, startWith, switchMap } from 'rxjs';
import { AppDataState, DataStateEnum } from '../../state/product.state';
import { Product } from '../../model/product.model';
import { ProductsService } from '../../products.service';
import { Router } from '@angular/router';
import { AlertService } from '../../services/alert.service';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  products$: Observable<AppDataState<Product[]>> | null = null;
  readonly DataStateEnum = DataStateEnum;
  readonly LOW_STOCK_THRESHOLD = 5;

  constructor(
    private productsService: ProductsService,
    private router: Router,
    private alertService: AlertService
  ) {}

  ngOnInit(): void {
    this.onGetAllProducts();
  }

  onGetAllProducts() {
    this.products$ = this.productsService.getAllProducts().pipe(
      map((data) => {
        this.checkLowStock(data);
        return { dataState: DataStateEnum.LOADED, data: data };
      }),
      startWith({ dataState: DataStateEnum.LOADING }),
      catchError((err) =>
        of({ dataState: DataStateEnum.ERROR, errorMessage: err.message })
      )
    );
  }

  private checkLowStock(products: Product[]) {
    const lowStockProducts = products.filter(p => p.quantity <= this.LOW_STOCK_THRESHOLD);
    if (lowStockProducts.length > 0) {
      const message = lowStockProducts.length === 1
        ? `Low stock alert: ${lowStockProducts[0].name} (${lowStockProducts[0].quantity} remaining)`
        : `Low stock alert: ${lowStockProducts.length} products are running low`;
      this.alertService.warning(message, 5000);
    }
  }

  onGetSelectedProducts() {
    this.products$ = this.productsService.getSelectedProducts().pipe(
      map((data) => ({ dataState: DataStateEnum.LOADED, data: data })),
      startWith({ dataState: DataStateEnum.LOADING }),
      catchError((err) =>
        of({ dataState: DataStateEnum.ERROR, errorMessage: err.message })
      )
    );
  }

  onGetAvailableProducts() {
    this.products$ = this.productsService.getAvailableProducts().pipe(
      map((data) => ({ dataState: DataStateEnum.LOADED, data: data })),
      startWith({ dataState: DataStateEnum.LOADING }),
      catchError((err) =>
        of({ dataState: DataStateEnum.ERROR, errorMessage: err.message })
      )
    );
  }

  onSearch(dataForm: any) {
    const keyword = dataForm.keyword?.trim().toLowerCase();
    if (!keyword) {
      this.alertService.info('Please enter a search keyword');
      return;
    }

    this.products$ = this.productsService.searchProducts(keyword).pipe(
      map((data) => ({
        dataState: DataStateEnum.LOADED,
        data: data.filter((product) =>
          product.name.toLowerCase().includes(keyword)
        ),
      })),
      startWith({ dataState: DataStateEnum.LOADING }),
      catchError((err) =>
        of({ dataState: DataStateEnum.ERROR, errorMessage: err.message })
      )
    );
  }

  onSelect(p: Product) {
    this.productsService.select(p).subscribe({
      next: (data) => {
        p.selected = data.selected;
        this.alertService.success(`Product ${p.selected ? 'selected' : 'unselected'}`);
      },
      error: (err) => this.alertService.danger('Error updating product selection')
    });
  }

  onDelete(p: Product) {
    if (confirm('Are you sure you want to delete this product?')) {
      this.products$ = this.productsService.deleteProduct(p).pipe(
        map(() => {
          this.alertService.success('Product deleted successfully');
          return this.productsService.getAllProducts().pipe(
            map(data => ({dataState: DataStateEnum.LOADED, data: data}))
          );
        }),
        startWith({dataState: DataStateEnum.LOADING}),
        catchError(err => {
          this.alertService.danger('Error deleting product');
          return of({dataState: DataStateEnum.ERROR, errorMessage: err.message});
        })
      ).pipe(
        switchMap(result => result instanceof Observable ? result : of(result))
      );
    }
  }

  onNewProduct() {
    this.router.navigate(['/product-add']);
  }

  onEdit(p: Product) {
    this.router.navigate(['/editProduct', p.id]);
  }
}
