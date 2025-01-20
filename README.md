# Angular Application Documentation

## Overview
This project is an Angular application built using Angular CLI version 18. It features standalone components, utilizes native CSS and SCSS for styling and used unnecessary service for checking window size that we can remove and depend on MQ, includes routing, and integrates a navbar and footer across the application.

## Development Server
To start the development server, run:
```
ng serve
```
Navigate to `http://localhost:4200/` to view the application in your browser. The app will reload automatically on source file changes.

## Code Scaffolding
Generate new components, directives, pipes, services, classes, guards, interfaces, enums, or modules using:
```
ng generate component component-name
```

## Build
To build the project for production, use:
```
ng build
```
Build artifacts will be stored in the `dist/` directory.

## Running Tests
Execute unit tests with:
```
ng test
```
Run end-to-end tests with:
```
ng e2e
```
Ensure you have an appropriate package installed for end-to-end testing capabilities.

## Application Structure
- **Navbar and Footer**: Included in `app.component.html` for consistent navigation and footer across the app.
- **Home Page**: Contains banners, gallery, and courses components.
- **Courses Component**: Displays course cards with details. Clicking a course card navigates to its details page.
- **Course Details**: Allows adding/removing courses from the cart.
- **Cart Guard**: Prevents access to cart or checkout pages if the cart is empty.
- **Cart and Checkout**: Navigate to the cart page from the navbar icon or course details. Checkout includes a form with validation.
- **Payment Page**: After submitting the payment form, displays an order completion message for 3 seconds before returning to the homepage.
- **Error Handling**: Interceptor implemented to handle API requests and responses using interfaces for structured data handling.

## Further Help
For more detailed information on Angular CLI commands and options, refer to the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli).

