# METAIA Tailor App - Backend API

Backend API for the METAIA Tailor Application built with Node.js, Express, and MongoDB.

## Features

- 🔐 JWT Authentication & Authorization
- 👤 User Management (Customers, Tailors, Admins)
- 📦 Order Management System
- 📏 Measurements Management
- ⭐ Reviews & Ratings
- 🔔 Notifications System
- 🔒 Role-based Access Control
- ✅ Input Validation
- 🛡️ Security Best Practices

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (JSON Web Tokens)
- **Validation**: Express Validator
- **Password Hashing**: bcryptjs
- **Environment Variables**: dotenv

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- MongoDB (local or MongoDB Atlas)
- npm or yarn

### Installation

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file:
```bash
cp .env.example .env
```

4. Update the `.env` file with your configuration:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/metaia_tailor
JWT_SECRET=your_secret_key_here
JWT_EXPIRE=7d
NODE_ENV=development
```

5. Start the development server:
```bash
npm run dev
```

The server will start on `http://localhost:5000`

## API Endpoints

### Authentication (`/api/auth`)
- `POST /register` - Register new user
- `POST /login` - Login user
- `POST /send-otp` - Send OTP for verification
- `POST /verify-otp` - Verify OTP
- `GET /me` - Get current user (Protected)
- `POST /logout` - Logout user (Protected)

### Users (`/api/users`)
- `GET /profile` - Get user profile (Protected)
- `PUT /profile` - Update user profile (Protected)
- `PUT /change-password` - Change password (Protected)
- `GET /` - Get all users (Admin only)
- `GET /:id` - Get user by ID (Admin only)
- `DELETE /:id` - Delete user (Admin only)

### Orders (`/api/orders`)
- `POST /` - Create new order (Protected)
- `GET /` - Get user's orders (Protected)
- `GET /history` - Get order history (Protected)
- `GET /:id` - Get single order (Protected)
- `PUT /:id/status` - Update order status (Protected)
- `PUT /:id/cancel` - Cancel order (Protected)
- `GET /all/list` - Get all orders (Admin/Tailor)
- `PUT /:id` - Update order (Admin/Tailor)

### Measurements (`/api/measurements`)
- `GET /` - Get all measurements (Protected)
- `POST /` - Create new measurement (Protected)
- `GET /:id` - Get single measurement (Protected)
- `PUT /:id` - Update measurement (Protected)
- `DELETE /:id` - Delete measurement (Protected)
- `PUT /:id/set-default` - Set default measurement (Protected)

### Tailors (`/api/tailors`)
- `GET /` - Get all tailors (Public)
- `GET /:id` - Get tailor by ID (Public)
- `GET /:id/orders` - Get tailor's orders (Protected)
- `GET /:id/reviews` - Get tailor's reviews (Protected)

### Reviews (`/api/reviews`)
- `POST /` - Create review (Protected)
- `GET /my-reviews` - Get user's reviews (Protected)
- `GET /:id` - Get single review (Protected)
- `PUT /:id` - Update review (Protected)
- `DELETE /:id` - Delete review (Protected)

### Notifications (`/api/notifications`)
- `GET /` - Get all notifications (Protected)
- `PUT /:id/read` - Mark notification as read (Protected)
- `PUT /read-all` - Mark all as read (Protected)
- `DELETE /:id` - Delete notification (Protected)

## Database Models

### User
- Authentication details
- Profile information
- Role (customer/tailor/admin)
- Address
- Verification status

### Order
- Order details and status
- Customer and tailor references
- Measurements reference
- Design preferences
- Payment status
- Status history

### Measurement
- Body measurements
- Category-specific measurements
- Unit preferences
- Default flag

### Review
- Rating (1-5)
- Comment
- Images
- Order reference
- Response from tailor

### Notification
- Type (order/payment/delivery/promotion/system)
- Title and message
- Read status
- Related order reference

## Error Handling

The API uses a consistent error response format:

```json
{
  "status": "error",
  "message": "Error message here"
}
```

## Success Response

Successful responses follow this format:

```json
{
  "status": "success",
  "message": "Operation message",
  "data": {
    // Response data here
  }
}
```

## Security

- Passwords are hashed using bcryptjs
- JWT tokens for authentication
- Protected routes require valid tokens
- Role-based access control
- Input validation on all endpoints
- CORS enabled for frontend integration

## Development

Run in development mode with auto-reload:
```bash
npm run dev
```

Run in production mode:
```bash
npm start
```

## Environment Variables

Required environment variables:

- `PORT` - Server port (default: 5000)
- `MONGODB_URI` - MongoDB connection string
- `JWT_SECRET` - Secret key for JWT
- `JWT_EXPIRE` - JWT expiration time
- `NODE_ENV` - Environment (development/production)

## Contributing

1. Create a feature branch
2. Make your changes
3. Test thoroughly
4. Submit a pull request

## License

ISC
