import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface Notification {
  id: number;
  message: string;
  icon: string;
  read: boolean;
  time: Date;
  type: 'success' | 'info' | 'warning' | 'error';
  action?: string;
}

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private notifications = new BehaviorSubject<Notification[]>([]);
  private notificationCount = new BehaviorSubject<number>(0);

  constructor() {
    // Load notifications from localStorage on service initialization
    this.loadNotifications();
  }

  getNotifications(): Observable<Notification[]> {
    return this.notifications.asObservable();
  }

  getNotificationCount(): Observable<number> {
    return this.notificationCount.asObservable();
  }

  addNotification(message: string, type: 'success' | 'info' | 'warning' | 'error', action?: string) {
    const notification: Notification = {
      id: Date.now(),
      message,
      icon: this.getIconForType(type),
      read: false,
      time: new Date(),
      type,
      action
    };

    const currentNotifications = this.notifications.getValue();
    const updatedNotifications = [notification, ...currentNotifications];
    
    // Keep only the last 10 notifications
    if (updatedNotifications.length > 10) {
      updatedNotifications.pop();
    }

    this.notifications.next(updatedNotifications);
    this.updateNotificationCount();
    this.saveNotifications();

    // Automatically remove success notifications after 5 seconds
    if (type === 'success') {
      setTimeout(() => {
        this.removeNotification(notification.id);
      }, 5000);
    }
  }

  markAsRead(notificationId: number) {
    const currentNotifications = this.notifications.getValue();
    const updatedNotifications = currentNotifications.map(notification => {
      if (notification.id === notificationId) {
        return { ...notification, read: true };
      }
      return notification;
    });

    this.notifications.next(updatedNotifications);
    this.updateNotificationCount();
    this.saveNotifications();
  }

  markAllAsRead() {
    const currentNotifications = this.notifications.getValue();
    const updatedNotifications = currentNotifications.map(notification => ({
      ...notification,
      read: true
    }));

    this.notifications.next(updatedNotifications);
    this.updateNotificationCount();
    this.saveNotifications();
  }

  removeNotification(notificationId: number) {
    const currentNotifications = this.notifications.getValue();
    const updatedNotifications = currentNotifications.filter(
      notification => notification.id !== notificationId
    );

    this.notifications.next(updatedNotifications);
    this.updateNotificationCount();
    this.saveNotifications();
  }

  clearAll() {
    this.notifications.next([]);
    this.updateNotificationCount();
    this.saveNotifications();
  }

  private updateNotificationCount() {
    const unreadCount = this.notifications.getValue().filter(n => !n.read).length;
    this.notificationCount.next(unreadCount);
  }

  private getIconForType(type: 'success' | 'info' | 'warning' | 'error'): string {
    switch (type) {
      case 'success':
        return 'bi bi-check-circle text-success';
      case 'info':
        return 'bi bi-info-circle text-info';
      case 'warning':
        return 'bi bi-exclamation-triangle text-warning';
      case 'error':
        return 'bi bi-x-circle text-danger';
      default:
        return 'bi bi-bell';
    }
  }

  private saveNotifications() {
    localStorage.setItem('notifications', JSON.stringify(this.notifications.getValue()));
  }

  private loadNotifications() {
    const savedNotifications = localStorage.getItem('notifications');
    if (savedNotifications) {
      const notifications = JSON.parse(savedNotifications);
      // Convert string dates back to Date objects
      notifications.forEach((notification: Notification) => {
        notification.time = new Date(notification.time);
      });
      this.notifications.next(notifications);
      this.updateNotificationCount();
    }
  }
}
