# 🔌 Backend Real-Time Implementation Guide

## Overview

The backend now includes Socket.IO for real-time bi-directional communication across all apps (Customer, Admin, Tailor, Delivery Partner).

## 🌟 New Features

### 1. Socket.IO Integration
- Real-time notifications
- Order status updates
- Payment confirmations
- Multi-room broadcasting
- JWT authentication for sockets

### 2. Room-Based Architecture
- **Customer Room:** All customers
- **Admin Room:** Administrators
- **Tailor Room:** All tailors
- **Delivery Room:** Delivery partners
- **Order Rooms:** Specific order tracking
- **User Rooms:** Individual user notifications

## 📦 Setup

### 1. Install Dependencies
```bash
cd backend
npm install
```

New dependency added: `socket.io@^4.6.0`

### 2. Environment Variables
Create `.env` file:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/metaia
JWT_SECRET=your_secret_key
NODE_ENV=development
```

### 3. Start Server
```bash
npm run dev
```

Server will start on `http://localhost:5000` with Socket.IO enabled.

## 🏗️ Architecture

### Socket Service
**File:** `backend/services/socketService.js`

```javascript
const socketService = require('./services/socketService');

// Initialize in server.js
socketService.initialize(server);

// Use in routes (available as req.socketService)
req.socketService.emitNewNotification(userId, notification);
```

### Server Initialization
**File:** `backend/server.js`

```javascript
const http = require('http');
const server = http.createServer(app);

// Initialize Socket.IO
socket Service.initialize(server);

// Make available in routes
app.use((req, res, next) => {
  req.socketService = socketService;
  next();
});
```

## 🔔 Socket Events

### Client → Server
```javascript
socket.emit('join_order_room', orderId);
socket.emit('leave_order_room', orderId);
```

### Server → Client
```javascript
// New notification
socket.on('new_notification', (data) => {
  console.log('Notification:', data);
});

// Order update
socket.on('order_update', (data) => {
  console.log('Order updated:', data);
});

// Payment update
socket.on('payment_update', (data) => {
  console.log('Payment status:', data);
});

// Tailor status
socket.on('tailor_status_update', (data) => {
  console.log('Tailor status:', data);
});
```

## 🛠️ Usage Examples

### 1. Creating an Order (with Real-Time Notifications)
**File:** `backend/controllers/orderController.js`

```javascript
exports.createOrder = async (req, res) => {
  // ... order creation logic ...
  
  const order = await Order.create(orderData);
  
  // Create notification
  const notification = await Notification.create({
    user: req.user.id,
    type: 'order',
    title: 'Order Placed Successfully',
    message: `Order ${order.orderNumber} created`,
    relatedOrder: order._id
  });

  // 🔥 Real-time notification
  req.socketService.emitNewNotification(req.user.id, notification);
  
  // 🔥 Notify admin
  req.socketService.emitOrderUpdate(
    order._id.toString(),
    req.user.id,
    order.tailor,
    order
  );
  
  res.status(201).json({ status: 'success', data: { order } });
};
```

### 2. Updating Order Status
**File:** `backend/controllers/orderController.js`

```javascript
exports.updateOrderStatus = async (req, res) => {
  // ... update logic ...
  
  const order = await Order.findByIdAndUpdate(orderId, { status });
  
  // Create notification
  const notification = await Notification.create({
    user: order.customer,
    type: 'order',
    title: 'Order Status Updated',
    message: `Status changed to ${status}`
  });

  // 🔥 Real-time updates
  req.socketService.emitNewNotification(order.customer.toString(), notification);
  req.socketService.emitOrderUpdate(
    order._id.toString(),
    order.customer.toString(),
    order.tailor,
    order
  );
  
  res.status(200).json({ status: 'success', data: { order } });
};
```

### 3. Payment Confirmation
```javascript
exports.verifyPayment = async (req, res) => {
  // ... verify payment ...
  
  const payment = await Payment.findOneAndUpdate(
    { razorpayOrderId: orderId },
    { status: 'completed' }
  );

  // 🔥 Real-time payment update
  req.socketService.emitPaymentUpdate(userId, {
    paymentId: payment._id,
    status: 'completed',
    amount: payment.amount
  });
  
  res.status(200).json({ status: 'success' });
};
```

## 🔐 Authentication

### Socket Authentication
Socket.IO connections require JWT token in handshake:

```javascript
// Client (Flutter)
final token = await storage.read(key: 'auth_token');
final socket = IO.io(
  baseUrl,
  IO.OptionBuilder()
    .setExtraHeaders({'Authorization': 'Bearer $token'})
    .build()
);

// Server validates token
io.use((socket, next) => {
  const token = socket.handshake.headers.authorization?.split(' ')[1];
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  socket.userId = decoded.userId;
  socket.userRole = decoded.role;
  next();
});
```

## 📊 Room Management

### Automatic Room Joining
When a user connects, they automatically join:
1. Their role room (`customer-room`, `admin-room`, etc.)
2. Their personal room (`user-{userId}`)

### Manual Order Rooms
Users can join specific order rooms:
```javascript
// Client
socket.emit('join_order_room', orderId);

// Server
socket.on('join_order_room', (orderId) => {
  socket.join(`order-${orderId}`);
});
```

## 🚀 Broadcasting Strategies

### 1. Send to Specific User
```javascript
req.socketService.sendToUser(userId, 'event_name', data);
```

### 2. Send to All Users with Role
```javascript
req.socketService.sendToRole('admin', 'event_name', data);
```

### 3. Send to Order Room
```javascript
req.socketService.sendToOrderRoom(orderId, 'event_name', data);
```

### 4. Broadcast to Everyone
```javascript
req.socketService.broadcast('event_name', data);
```

## 📝 API Endpoints

All existing REST endpoints remain functional. Socket.IO is additive.

### Orders
- `POST /api/orders` - Create order (+ real-time notification)
- `PUT /api/orders/:id/status` - Update status (+ real-time update)
- `GET /api/orders` - Get orders

### Notifications
- `GET /api/notifications` - Get all notifications
- `PUT /api/notifications/:id/read` - Mark as read
- `PUT /api/notifications/read-all` - Mark all as read

## 🧪 Testing

### Test Socket Connection
```bash
npm install -g socket.io-client

# In Node REPL
const io = require('socket.io-client');
const socket = io('http://localhost:5000', {
  extraHeaders: {
    Authorization: 'Bearer YOUR_JWT_TOKEN'
  }
});

socket.on('connect', () => console.log('Connected'));
socket.on('new_notification', (data) => console.log('Notification:', data));
```

### Monitor Connections
Check server logs:
```
🚀 METAIA Backend Server running on port 5000
📍 Environment: development
🔌 Socket.IO enabled for real-time updates
User connected: 60d5f48... (customer)
```

## 🔧 Troubleshooting

### Issue: Socket not connecting
**Solution:** Check CORS configuration in `socketService.js`
```javascript
cors: {
  origin: '*', // Update with your frontend URLs
  methods: ['GET', 'POST'],
}
```

### Issue: Authentication failed
**Solution:** Verify JWT token is valid and not expired
```bash
# Check token expiry
jwt.verify(token, process.env.JWT_SECRET)
```

### Issue: Events not received
**Solution:** Ensure client is listening to correct event names
```javascript
// Match server events exactly
socket.on('new_notification', callback); // ✅
socket.on('newNotification', callback);  // ❌
```

## 📈 Scaling

For production with multiple servers:
```javascript
// Use Redis adapter
const redis = require('socket.io-redis');
io.adapter(redis({ host: 'localhost', port: 6379 }));
```

## 🔒 Security

- ✅ JWT authentication required
- ✅ Room-based access control
- ✅ Input validation
- ✅ Rate limiting (implement with socket-io-rate-limiter)

## 📊 Performance

- ✅ Automatic reconnection
- ✅ Heartbeat mechanism
- ✅ Connection pooling
- ✅ Message queuing

## 🎯 Next Steps

1. **Test connections:** Use socket.io-client CLI
2. **Monitor logs:** Check user connections
3. **Verify events:** Ensure notifications arrive
4. **Implement admin app:** Connect to admin-room
5. **Add tailor app:** Connect to tailor-room

---

**Real-time backend powered by Socket.IO 4.6+**
