# Gestion des Produits (Product Management System)

## Description

A modern web application built with Angular for managing products efficiently. This system allows users to perform CRUD operations (Create, Read, Update, Delete) on products with a user-friendly interface.

## Features

- **Product Management**
  - View all products in a responsive table
  - Add new products
  - Edit existing products
  - Delete products
  - Filter products by availability
  - Search products by name

- **User Interface**
  - Responsive design for all devices
  - Modern and intuitive navigation
  - Real-time feedback on actions
  - Loading states and error handling
  - Alert system for notifications

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)
- Angular CLI (v16 or higher)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/Seifeddin-tlijani/product-management-app.git
```

2. Navigate to the project directory:
```bash
cd gestion-produits
```

3. Install dependencies:
```bash
npm install
```

4. Start the development server:
```bash
ng serve
```

5. Open your browser and navigate to `http://localhost:4200`

## Technologies Used

- **Frontend Framework**: Angular 16
- **UI Components**: Bootstrap 5
- **Icons**: Font Awesome
- **State Management**: RxJS
- **HTTP Client**: Angular HttpClient
- **Routing**: Angular Router
- **Forms**: Angular Reactive Forms

## Project Structure

```
src/
├── app/
│   ├── components/
│   │   ├── nav-bar/
│   │   ├── products/
│   │   ├── product-add/
│   │   └── edit-product/
│   ├── services/
│   │   ├── products.service.ts
│   │   └── alert.service.ts
│   ├── models/
│   │   └── product.model.ts
│   └── state/
│       └── product.state.ts
├── assets/
└── environments/
```

## Features in Detail

### Product Management
- **List View**: Display products in a table with sorting and filtering options
- **Add Product**: Form with validation for adding new products
- **Edit Product**: Pre-populated form for updating existing products
- **Delete Product**: Confirmation dialog before deletion
- **Search**: Real-time search functionality
- **Filters**: Filter products by availability and selection status

### User Experience
- Loading indicators for async operations
- Error handling with user-friendly messages
- Responsive design for mobile and desktop
- Intuitive navigation with active state indicators
- Form validation with instant feedback

## Configuration

The application can be configured through environment files located in `src/environments/`:
- `environment.ts` for development
- `environment.prod.ts` for production

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Authors

- Your Name - Initial work

## Acknowledgments

- Angular team for the amazing framework
- Bootstrap team for the UI components
- All contributors who have helped with the project
