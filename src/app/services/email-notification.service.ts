import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface EmailNotificationSettings {
  lowStockThreshold: number;
  enableLowStockAlerts: boolean;
  enablePriceChangeAlerts: boolean;
  enableNewProductAlerts: boolean;
  recipientEmail: string;
}

@Injectable({
  providedIn: 'root'
})
export class EmailNotificationService {
  private apiUrl = 'http://localhost:3000/api/notifications'; // Your backend API URL

  constructor(private http: HttpClient) {}

  // Send low stock notification
  sendLowStockNotification(product: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/low-stock`, {
      product,
      type: 'LOW_STOCK'
    });
  }

  // Send price change notification
  sendPriceChangeNotification(product: any, oldPrice: number, newPrice: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/price-change`, {
      product,
      oldPrice,
      newPrice,
      type: 'PRICE_CHANGE'
    });
  }

  // Send new product notification
  sendNewProductNotification(product: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/new-product`, {
      product,
      type: 'NEW_PRODUCT'
    });
  }

  // Save notification settings
  saveNotificationSettings(settings: EmailNotificationSettings): Observable<any> {
    return this.http.post(`${this.apiUrl}/settings`, settings);
  }

  // Get notification settings
  getNotificationSettings(): Observable<EmailNotificationSettings> {
    return this.http.get<EmailNotificationSettings>(`${this.apiUrl}/settings`);
  }
}
