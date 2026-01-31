# MERN Stack Bakery E-Commerce Platform

A complete bakery shop e-commerce platform built with the MERN stack.

## Features

- 🛒 **Product Browsing**: View all bakery products with category filtering and search
- 🔐 **Mobile + Password Auth**: Simple authentication using mobile number and password
- 🛍️ **Shopping Cart**: Add products to cart (persists in localStorage for guests)
- 📦 **Order Management**: Place orders and track order history
- ❤️ **Wishlist**: Save favorite products
- 👨‍💼 **Admin Dashboard**: Manage products and orders

## Tech Stack

- **Frontend**: React.js (Vite), Tailwind CSS, Redux Toolkit, React Router
- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose
- **Image Upload**: Multer

## Project Structure

```
Anish_Backery/
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── uploads/
│   ├── server.js
│   └── seed.js
│
└── frontend/
    ├── src/
    │   ├── components/
    │   ├── pages/
    │   ├── store/
    │   └── utils/
    └── ...
```

## Setup Instructions

### Prerequisites
- Node.js (v18+)
- MongoDB (running locally or connection string)

### 1. Backend Setup

```bash
cd backend
npm install
```

Create `.env` file (already created with defaults):
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/bakery_db
JWT_SECRET=bakery_secret_key_change_in_production_2024
JWT_EXPIRE=7d
```

Seed the database with sample data:
```bash
npm run seed
```

Start the backend server:
```bash
npm run dev
```

### 2. Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

The frontend will run on http://localhost:3000

## Default Users

After running the seed script:

| Role  | Mobile Number | Password |
|-------|--------------|----------|
| Admin | 9999999999   | admin123 |
| User  | 8888888888   | user123  |

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login
- `GET /api/auth/me` - Get current user

### Products
- `GET /api/products` - Get all products (with filters)
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Create product (Admin)
- `PUT /api/products/:id` - Update product (Admin)
- `DELETE /api/products/:id` - Delete product (Admin)

### Orders
- `POST /api/orders` - Create order
- `GET /api/orders/myorders` - Get user's orders
- `GET /api/orders` - Get all orders (Admin)
- `PUT /api/orders/:id/status` - Update order status (Admin)

### Wishlist
- `GET /api/users/wishlist` - Get wishlist
- `POST /api/users/wishlist/:productId` - Add to wishlist
- `DELETE /api/users/wishlist/:productId` - Remove from wishlist
