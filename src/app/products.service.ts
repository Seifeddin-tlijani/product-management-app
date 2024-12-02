import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from './model/product.model';
import { map, Observable, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private readonly host = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.host}/products`);
  }

  getSelectedProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.host}/products?selected=true`);
  }

  getAvailableProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.host}/products?available=true`);
  }

  searchProducts(keyword: string): Observable<Product[]> {
    return this.http.get<Product[]>(
      `${this.host}/products?name_like=${keyword}`
    );
  }

  select(product: Product): Observable<Product> {
    product.selected = !product.selected;
    return this.http.put<Product>(
      `${this.host}/products/${product.id}`,
      product
    );
  }

  deleteProduct(product: Product): Observable<void> {
    return this.http.delete<void>(`${this.host}/products/${product.id}`);
  }

  save(product: any): Observable<any> {
    return this.getAllProducts().pipe(
      map((products: any[]) => {
        const lastId = products.length
          ? Math.max(...products.map((p) => parseInt(p.id)))
          : 0;
        const newProduct = { ...product, id: (lastId + 1).toString() };
        return newProduct;
      }),
      switchMap((newProduct) =>
        this.http.post<any>(`${this.host}/products`, newProduct)
      )
    );
  }

  getProduct(id: string): Observable<Product> {
    return this.http.get<Product>(`${this.host}/products/${id}`);
  }

  updateProduct(product: Product): Observable<Product> {
    return this.http.put<Product>(`${this.host}/products/${product.id}`, product);
  }
}
