import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Chart, registerables } from 'chart.js';
import { ProductsService } from '../../services/products.service';
import { Product } from '../../models/product.model';
import { firstValueFrom } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

// Register Chart.js components
Chart.register(...registerables);

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, HttpClientModule, RouterModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  private productsService = inject(ProductsService);
  private charts: Chart[] = [];

  ngOnInit() {
    this.loadCharts();
  }

  ngOnDestroy() {
    // Cleanup charts
    this.charts.forEach(chart => chart.destroy());
  }

  private async loadCharts() {
    try {
      const products = await firstValueFrom(this.productsService.getAllProducts());
      if (products) {
        this.createProductStatusChart(products);
        this.createStockLevelChart(products);
        this.createPriceRangeChart(products);
        this.createAvailabilityChart(products);
      }
    } catch (error) {
      console.error('Error loading charts:', error);
    }
  }

  private createProductStatusChart(products: Product[]) {
    const selected = products.filter(p => p.selected).length;
    const notSelected = products.length - selected;

    const chart = new Chart('productStatusChart', {
      type: 'doughnut',
      data: {
        labels: ['Selected', 'Not Selected'],
        datasets: [{
          data: [selected, notSelected],
          backgroundColor: ['#4CAF50', '#F44336'],
          hoverOffset: 4
        }]
      },
      options: {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: 'Product Status Distribution'
          }
        }
      }
    });
    this.charts.push(chart);
  }

  private createStockLevelChart(products: Product[]) {
    const chart = new Chart('stockLevelChart', {
      type: 'bar',
      data: {
        labels: products.map(p => p.name),
        datasets: [{
          label: 'Stock Level',
          data: products.map(p => p.quantity),
          backgroundColor: '#2196F3',
          borderColor: '#1976D2',
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Quantity'
            }
          }
        },
        plugins: {
          title: {
            display: true,
            text: 'Stock Levels by Product'
          }
        }
      }
    });
    this.charts.push(chart);
  }

  private createPriceRangeChart(products: Product[]) {
    const priceRanges = this.calculatePriceRanges(products);
    const chart = new Chart('priceRangeChart', {
      type: 'pie',
      data: {
        labels: Object.keys(priceRanges),
        datasets: [{
          data: Object.values(priceRanges),
          backgroundColor: [
            '#FF9800',
            '#9C27B0',
            '#3F51B5',
            '#009688',
            '#FFC107'
          ]
        }]
      },
      options: {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: 'Price Range Distribution'
          }
        }
      }
    });
    this.charts.push(chart);
  }

  private createAvailabilityChart(products: Product[]) {
    const available = products.filter(p => p.available).length;
    const unavailable = products.length - available;

    const chart = new Chart('availabilityChart', {
      type: 'bar',
      data: {
        labels: ['Available', 'Unavailable'],
        datasets: [{
          label: 'Product Availability',
          data: [available, unavailable],
          backgroundColor: ['#8BC34A', '#FF5722']
        }]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              stepSize: 1
            }
          }
        },
        plugins: {
          title: {
            display: true,
            text: 'Product Availability Status'
          }
        }
      }
    });
    this.charts.push(chart);
  }

  private calculatePriceRanges(products: Product[]): { [key: string]: number } {
    const ranges: { [key: string]: number } = {
      '0-50': 0,
      '51-100': 0,
      '101-500': 0,
      '501-1000': 0,
      '1000+': 0
    };

    products.forEach(product => {
      if (product.price <= 50) ranges['0-50']++;
      else if (product.price <= 100) ranges['51-100']++;
      else if (product.price <= 500) ranges['101-500']++;
      else if (product.price <= 1000) ranges['501-1000']++;
      else ranges['1000+']++;
    });

    return ranges;
  }
}
