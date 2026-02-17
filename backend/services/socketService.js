const jwt = require('jsonwebtoken');

class SocketService {
  constructor() {
    this.io = null;
    this.connectedClients = new Map(); // userId -> socketId mapping
  }

  initialize(server) {
    this.io = require('socket.io')(server, {
      cors: {
        origin: '*', // Update with your frontend URLs in production
        methods: ['GET', 'POST'],
        credentials: true,
      },
    });

    this.io.use((socket, next) => {
      try {
        const token = socket.handshake.headers.authorization?.split(' ')[1];
        
        if (!token) {
          return next(new Error('Authentication error'));
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        socket.userId = decoded.userId;
        socket.userRole = decoded.role || '  customer';
        next();
      } catch (error) {
        next(new Error('Authentication error'));
      }
    });

    this.io.on('connection', (socket) => {
      console.log(`User connected: ${socket.userId} (${socket.userRole})`);
      
      // Store connected client
      this.connectedClients.set(socket.userId, socket.id);

      // Join role-based room
      socket.join(`${socket.userRole}-room`);
      
      // Join user-specific room
      socket.join(`user-${socket.userId}`);

      socket.on('disconnect', () => {
        console.log(`User disconnected: ${socket.userId}`);
        this.connectedClients.delete(socket.userId);
      });

      // Custom events
      socket.on('join_order_room', (orderId) => {
        socket.join(`order-${orderId}`);
        console.log(`User ${socket.userId} joined order room: ${orderId}`);
      });

      socket.on('leave_order_room', (orderId) => {
        socket.leave(`order-${orderId}`);
        console.log(`User ${socket.userId} left order room: ${orderId}`);
      });
    });

    console.log('Socket.IO initialized successfully');
  }

  // Send notification to specific user
  sendToUser(userId, event, data) {
    if (this.io) {
      this.io.to(`user-${userId}`).emit(event, data);
      console.log(`Sent ${event} to user ${userId}`);
    }
  }

  // Send notification to all users with specific role
  sendToRole(role, event, data) {
    if (this.io) {
      this.io.to(`${role}-room`).emit(event, data);
      console.log(`Sent ${event} to ${role} room`);
    }
  }

  // Send to specific order room
  sendToOrderRoom(orderId, event, data) {
    if (this.io) {
      this.io.to(`order-${orderId}`).emit(event, data);
      console.log(`Sent ${event} to order room: ${orderId}`);
    }
  }

  // Broadcast to all connected clients
  broadcast(event, data) {
    if (this.io) {
      this.io.emit(event, data);
      console.log(`Broadcasted ${event} to all clients`);
    }
  }

  // New notification
  emitNewNotification(userId, notification) {
    this.sendToUser(userId, 'new_notification', notification);
  }

  // Order update
  emitOrderUpdate(orderId, customerId, tailorId, orderData) {
    // Send to customer
    this.sendToUser(customerId, 'order_update', orderData);
    
    // Send to tailor if assigned
    if (tailorId) {
      this.sendToUser(tailorId, 'order_update', orderData);
    }
    
    // Send to order room
    this.sendToOrderRoom(orderId, 'order_update', orderData);
    
    // Send to admin room
    this.sendToRole('admin', 'order_update', orderData);
  }

  // Payment update
  emitPaymentUpdate(userId, paymentData) {
    this.sendToUser(userId, 'payment_update', paymentData);
    this.sendToRole('admin', 'payment_update', paymentData);
  }

  // Tailor status update
  emitTailorStatusUpdate(tailorId, statusData) {
    this.sendToUser(tailorId, 'tailor_status_update', statusData);
    this.sendToRole('admin', 'tailor_status_update', statusData);
  }

  // Delivery partner assignment
  emitDeliveryAssignment(deliveryPartnerId, deliveryData) {
    this.sendToUser(deliveryPartnerId, 'delivery_assignment', deliveryData);
    this.sendToRole('admin', 'delivery_update', deliveryData);
  }
}

module.exports = new SocketService();
