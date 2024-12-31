# NestJS CRUD App

A comprehensive CRUD (Create, Read, Update, Delete) application built with NestJS, integrating **MongoDB**, **Multer**, and **Cloudinary** for seamless product management with image uploads.

## Features

- CRUD operations for managing products:
  - Create, read, update, delete products.
  - Supports file uploads for product images.
- Integration with **MongoDB** for data storage.
- File uploads using **Multer** and image hosting via **Cloudinary**.
- Secure endpoints with **JWT authentication** and **role-based access control**.
- Pagination and filtering for product listings.

## Technologies Used

- **NestJS**: A progressive Node.js framework for building efficient, reliable, and scalable server-side applications.
- **MongoDB**: A NoSQL database for storing product data.
- **Mongoose**: An ODM (Object Data Modeling) library for MongoDB and Node.js.
- **Multer**: A middleware for handling `multipart/form-data`, used for uploading files.
- **Cloudinary**: A cloud service for managing and hosting images.
- **Passport**: A middleware for authentication in Node.js applications.
- **JWT (JSON Web Tokens)**: For secure authentication and authorization.
- **Class-validator**: For validating request data.

## Installation

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/nestjs-crud-app.git
cd nestjs-crud-app
npm install
```

### 2. Create `.env.example` File

Create a `.env.example` file in the root directory and add the following environment variables:

```bash
MONGO_URI=YOUR_MONGO_URI
CLOUDINARY_CLOUD_NAME=YOUR_CLOUD_NAME
CLOUDINARY_API_KEY=YOUR_CLOUD_API_KEY
CLOUDINARY_API_SECRET=YOUR_CLOUD_SECRET
JWT_SECRET=YOUR_JWT_SECRET
```

## Usage

### Running the Application

To start the application, run:

```bash
npm run start:dev
```

### API Endpoints

- **GET /products**: Get all products with pagination and filtering.
- **POST /products**: Create a new product (Admin only).
- **GET /products/:id**: Get a single product by ID.
- **PUT /products/:id**: Update a product by ID (Admin only).
- **DELETE /products/:id**: Delete a product by ID (Admin only).

## Contribution

We welcome contributions to improve this project! To contribute, follow these steps:

1. **Fork the Repository**: Click the "Fork" button at the top right of this page.
2. **Clone Your Fork**: Clone your forked repository to your local machine.
   ```bash
   git clone https://github.com/your-username/nestjs-crud-app.git
   cd nestjs-crud-app
   ```
3. **Create a Branch**: Create a new branch for your feature or bugfix.
   ```bash
   git checkout -b feature/your-feature-name
   ```
4. **Make Changes**: Make your changes to the codebase.
5. **Commit Changes**: Commit your changes with a descriptive commit message.
   ```bash
   git add .
   git commit -m "Add feature/your-feature-name"
   ```
6. **Push Changes**: Push your changes to your forked repository.
   ```bash
   git push origin feature/your-feature-name
   ```
7. **Create a Pull Request**: Open a pull request to the main repository with a description of your changes.

## Contact

For any questions or suggestions, feel free to open an issue or contact the repository owner.

Happy coding!
