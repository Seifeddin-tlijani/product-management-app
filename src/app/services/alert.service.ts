import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export interface Alert {
  type: 'success' | 'info' | 'warning' | 'danger';
  message: string;
  timeout?: number;
}

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  private alertSubject = new Subject<Alert>();
  alert$ = this.alertSubject.asObservable();

  constructor() {}

  success(message: string, timeout = 3000) {
    this.show({ type: 'success', message, timeout });
  }

  info(message: string, timeout = 3000) {
    this.show({ type: 'info', message, timeout });
  }

  warning(message: string, timeout = 3000) {
    this.show({ type: 'warning', message, timeout });
  }

  danger(message: string, timeout = 3000) {
    this.show({ type: 'danger', message, timeout });
  }

  private show(alert: Alert) {
    this.alertSubject.next(alert);
  }
}
