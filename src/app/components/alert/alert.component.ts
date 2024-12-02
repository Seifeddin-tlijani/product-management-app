import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { AlertService } from '../../services/alert.service';

@Component({
  selector: 'app-alert',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div *ngIf="message" class="alert-container">
      <div [class]="'alert alert-' + type + ' alert-dismissible fade show'" role="alert">
        {{ message }}
        <button type="button" class="btn-close" (click)="clearMessage()" aria-label="Close"></button>
      </div>
    </div>
  `,
  styles: [`
    .alert-container {
      position: fixed;
      top: 20px;
      right: 20px;
      z-index: 1050;
      min-width: 300px;
    }
    .alert {
      margin-bottom: 10px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
  `]
})
export class AlertComponent implements OnInit, OnDestroy {
  type = 'info';
  message = '';
  private subscription: Subscription;
  private timeout: any;

  constructor(private alertService: AlertService) {
    this.subscription = this.alertService.alert$.subscribe(alert => {
      this.type = alert.type;
      this.message = alert.message;

      if (this.timeout) {
        clearTimeout(this.timeout);
      }

      if (alert.timeout !== 0) {
        this.timeout = setTimeout(() => {
          this.clearMessage();
        }, alert.timeout || 3000);
      }
    });
  }

  ngOnInit(): void {}

  ngOnDestroy() {
    this.subscription.unsubscribe();
    if (this.timeout) {
      clearTimeout(this.timeout);
    }
  }

  clearMessage() {
    this.message = '';
  }
}
