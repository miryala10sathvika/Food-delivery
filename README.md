#  Food-delivery - Full-Stack MERN Application

A complete, full-stack e-commerce platform built from the ground up using the MERN stack (MongoDB, Express, React, Node.js). This project features a responsive user-facing storefront for ordering food and a separate, dedicated admin panel for managing products and customer orders.

## Features

### Customer Frontend (`/frontend`)

*   **User Authentication:** Secure user registration and login using JWT (JSON Web Tokens).
*   **Dynamic Product Catalog:** Browse a list of available food items fetched from the backend.
*   **Category Filtering:** Filter food items by category (e.g., Salad, Rolls, Deserts).
*   **Shopping Cart:** Fully functional cart using React's Context API for state management. Users can add, remove, and view items.
*   **Secure Checkout:** Integrated **Stripe** for seamless and secure payment processing.
*   **Order History:** Registered users can view a list of their past orders and track their status.
*   **Responsive Design:** A mobile-first design ensures a great user experience on any device.

### Administrative Panel (`/admin`)

*   **Product Management (CRUD):**
    *   **Add Items:** A dedicated form to add new food items, including name, description, price, category, and an image upload feature.
    *   **List & View Items:** A tabular view of all food items currently in the database.
    *   **Remove Items:** Functionality to delete food items from the store.
*   **Order Management:**
    *   **View All Orders:** A comprehensive list of all customer orders, showing items, delivery address, and total amount.
    *   **Update Order Status:** Admins can update the status of an order (e.g., "Food Processing", "Out for Delivery", "Delivered"), which is then reflected on the customer's order page.
*   **Toast Notifications:** User-friendly notifications for actions like adding a product or updating an order status, powered by `react-toastify`.

## Tech Stack

| Component         | Technologies Used                                                                   |
| ----------------- | ----------------------------------------------------------------------------------- |
| **Frontend (User & Admin)** | React 19, JavaScript, Axios, HTML5, CSS3 |
| **Backend**       | Node.js, Express.js, Mongoose, JWT, Bcrypt.js, Stripe API, Multer, Dotenv        |
| **Database**      | MongoDB Atlas (NoSQL)                                                               |                                                             |

## 🏗️ Project Structure

The project is organized as a monorepo with three distinct parts:

```
.
├── 📂 admin/      # React frontend for the admin panel
├── 📂 backend/    # Node.js/Express.js backend server and API
├── 📂 frontend/   # React frontend for the customer-facing storefront
└── README.md
```

## 🔧 Setup and Installation

To run this project locally, follow these steps:

### Prerequisites

*   [Node.js](https://nodejs.org/) (v18.x or later recommended)
*   [npm](https://www.npmjs.com/)
*   A [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) account to get a database connection string.
*   A [Stripe](https://stripe.com/) account to get API keys for payment processing.

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/food-delivery.git
cd food-delivery
```

### 2. Backend Setup

```bash
# Navigate to the backend directory
cd backend

# Install dependencies
npm install

# Create a .env file in the backend directory
touch .env
```

Add the following environment variables to your `.env` file. Replace the placeholder values with your actual credentials.

```env
# Get your MongoDB connection string from MongoDB Atlas
MONGO_URI="mongodb+srv://<username>:<password>@cluster0.snmrt3o.mongodb.net/food-del"

# A strong, random secret for signing JWTs
JWT_SECRET="your_random_jwt_secret_string"

# Get your secret key from your Stripe dashboard
STRIPE_SECRET_KEY="sk_test_..."
```

Finally, start the backend server:

```bash
npm run server
```

The backend will be running on `http://localhost:4000`.

### 3. Frontend (Customer) Setup

```bash
# Open a new terminal and navigate to the frontend directory
cd frontend

# Install dependencies
npm install

# Start the frontend development server
npm run dev
```

The customer-facing app will be available at `http://localhost:5173` (or the port specified by Vite).

### 4. Admin Panel Setup

```bash
# Open a new terminal and navigate to the admin directory
cd admin

# Install dependencies
npm install

# Start the admin panel development server
npm run dev
```

The admin panel will be available at a different port, typically `http://localhost:5174` (or as specified by Vite).

## 🔐 API Endpoints

Here are the primary API routes defined in the backend:

| Method | Endpoint              | Description                               | 
| ------ | --------------------- | ----------------------------------------- | 
| POST   | `/api/users/register` | Register a new user.                      |
| POST   | `/api/users/login`    | Log in a user and get a JWT.              |
| POST   | `/api/food/add`       | Add a new food item (Admin only).         |
| GET    | `/api/food/list`      | Get a list of all food items.             |
| POST   | `/api/food/remove`    | Remove a food item (Admin only).          |
| POST   | `/api/cart/add`       | Add an item to the user's cart.           | 
| POST   | `/api/cart/remove`    | Remove an item from the user's cart.      | 
| POST   | `/api/cart/get`       | Get the user's current cart data.         | 
| POST   | `/api/order/place`    | Place a new order and create Stripe session. | 
| POST   | `/api/order/verify`   | Verify the payment status from Stripe.    |
| POST   | `/api/order/userorders` | Get all orders for the logged-in user.    | 
| GET    | `/api/order/list`     | Get all orders for the admin panel.       |
| POST   | `/api/order/status`   | Update the status of an order (Admin).    |

