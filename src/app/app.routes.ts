import { Routes } from '@angular/router';
import { ProductsComponent } from './components/products/products.component';
import { ProductAddComponent } from './components/product-add/product-add.component';
import { EditProductComponent } from './components/edit-product/edit-product.component';

export const routes: Routes = [
  { path: '', redirectTo: 'products', pathMatch: 'full' },
  { path: 'products', component: ProductsComponent },
  { path: 'product-add', component: ProductAddComponent },
  { path: 'editProduct/:id', component: EditProductComponent },
];
