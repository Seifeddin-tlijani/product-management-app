import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private apiUrl = 'http://localhost:3000/products'; // Adjust this URL according to your backend

  // Mock data for testing
  private mockProducts: Product[] = [
    {
      id: 1,
      name: 'Laptop Pro X',
      price: 1299.99,
      description: 'High-performance laptop',
      quantity: 15,
      available: true,
      selected: true
    },
    {
      id: 2,
      name: 'Smartphone Y',
      price: 799.99,
      description: 'Latest smartphone model',
      quantity: 25,
      available: true,
      selected: false
    },
    {
      id: 3,
      name: 'Tablet Z',
      price: 499.99,
      description: 'Lightweight tablet',
      quantity: 8,
      available: false,
      selected: false
    },
    {
      id: 4,
      name: 'Smart Watch',
      price: 299.99,
      description: 'Fitness tracking watch',
      quantity: 30,
      available: true,
      selected: true
    },
    {
      id: 5,
      name: 'Wireless Earbuds',
      price: 159.99,
      description: 'Premium audio earbuds',
      quantity: 0,
      available: false,
      selected: false
    },
    {
      id: 6,
      name: 'Gaming Console',
      price: 499.99,
      description: 'Next-gen gaming system',
      quantity: 12,
      available: true,
      selected: true
    },
    {
      id: 7,
      name: 'Digital Camera',
      price: 699.99,
      description: 'Professional DSLR camera',
      quantity: 5,
      available: true,
      selected: false
    },
    {
      id: 8,
      name: 'Smart Speaker',
      price: 99.99,
      description: 'AI-powered home speaker',
      quantity: 20,
      available: true,
      selected: false
    },
    {
      id: 9,
      name: 'External SSD',
      price: 179.99,
      description: '1TB portable drive',
      quantity: 0,
      available: false,
      selected: false
    },
    {
      id: 10,
      name: 'Gaming Mouse',
      price: 79.99,
      description: 'RGB gaming mouse',
      quantity: 45,
      available: true,
      selected: true
    }
  ];

  constructor(private http: HttpClient) { }

  getAllProducts(): Observable<Product[]> {
    // Return mock data for testing
    return of(this.mockProducts);
  }

  getProductById(id: number): Observable<Product> {
    const product = this.mockProducts.find(p => p.id === id);
    return of(product!);
  }

  createProduct(product: Product): Observable<Product> {
    // Simulate API call
    const newProduct = {
      ...product,
      id: this.mockProducts.length + 1
    };
    this.mockProducts.push(newProduct);
    return of(newProduct);
  }

  updateProduct(id: number, product: Product): Observable<Product> {
    const index = this.mockProducts.findIndex(p => p.id === id);
    if (index !== -1) {
      this.mockProducts[index] = { ...product, id };
      return of(this.mockProducts[index]);
    }
    return of(product);
  }

  deleteProduct(id: number): Observable<void> {
    const index = this.mockProducts.findIndex(p => p.id === id);
    if (index !== -1) {
      this.mockProducts.splice(index, 1);
    }
    return of(void 0);
  }
}
