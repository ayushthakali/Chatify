# Chatify

**Chatify** is a full-stack, production-ready chat application that demonstrates modern web development practices. It enables real-time messaging with support for multiple simultaneous connections per user, image sharing, and robust security mechanisms. Built as a monorepo with clear separation of concerns, Chatify showcases best practices in authentication, state management, real-time communication, and scalable architecture.

---

### Key Highlights

- ✅ **Real-Time Messaging** via Socket.IO with multi-device support
- ✅ **JWT-Based Authentication** with secure HttpOnly cookies
- ✅ **Live User Presence Tracking** with online/offline status
- ✅ **Image Sharing** via Cloudinary integration
- ✅ **Optimistic UI Updates** for instant user feedback
- ✅ **Security Hardening** with Arcjet (rate limiting, bot detection, SQL injection shield)
- ✅ **Email Notifications** via Resend API
- ✅ **Production-Ready** deployment with static file serving

---

## Tech Stack

### Frontend

| Technology           | Purpose                                             |
| -------------------- | --------------------------------------------------- |
| **React 19**         | UI library with modern hooks and suspense support   |
| **React Router v6**  | Client-side routing with protected route guards     |
| **Vite**             | Fast build tool and dev server                      |
| **Zustand**          | Lightweight state management (no Redux boilerplate) |
| **Axios**            | HTTP client with built-in credential handling       |
| **Socket.IO Client** | Real-time bidirectional communication               |
| **TailwindCSS**      | Utility-first CSS framework                         |
| **DaisyUI**          | Component library built on TailwindCSS              |
| **React Icons**      | Icon library for UI elements                        |

### Backend

| Technology             | Purpose                                         |
| ---------------------- | ----------------------------------------------- |
| **Node.js**            | JavaScript runtime                              |
| **Express.js**         | Web server framework with middleware support    |
| **Socket.IO**          | Real-time, bidirectional communication protocol |
| **Mongoose**           | MongoDB object modeling and schema validation   |
| **MongoDB**            | NoSQL database for data persistence             |
| **JWT (jsonwebtoken)** | Token-based authentication                      |
| **bcryptjs**           | Password hashing and comparison                 |
| **Dotenv**             | Environment variable management                 |

### Cloud & External Services

| Service        | Purpose                                                  |
| -------------- | -------------------------------------------------------- |
| **Cloudinary** | Image hosting, optimization, and CDN delivery            |
| **Resend**     | Transactional email service                              |
| **Arcjet**     | Security: rate limiting, bot detection, injection shield |

---

## Socket.IO Real-Time Flow

### Connection Lifecycle

```
1. Client connects → Browser initiates WebSocket to /socket.io
2. JWT sent in cookie during handshake → socketAuthMiddleware validates
3. Connection established → userId added to userSocketMap[userId]
4. "getOnlineUsers" broadcast → All clients receive updated online list
5. Message sent → Server looks up recipient's socket IDs via userSocketMap
6. Multi-device delivery → "receiveMessage" emitted to each socket
7. User disconnects → Socket removed from userSocketMap
8. "getOnlineUsers" broadcast → User shown as offline (if no more sockets)
```

### Multi-Device Support

Data structure:

```javascript
userSocketMap = {
  userId1: Set(["socket-id-1", "socket-id-2"]), // 2 devices online
  userId2: Set(["socket-id-3"]), // 1 device online
};
```

Same user message delivery:

```javascript
const recipientSocketIds = userSocketMap.get(recipientId);
for (const socketId of recipientSocketIds) {
  io.to(socketId).emit("receiveMessage", message);
}
```

### Socket Events

| Event            | Direction        | Data                                     | Purpose                           |
| ---------------- | ---------------- | ---------------------------------------- | --------------------------------- |
| `connection`     | Server           | -                                        | Auto-emitted on client connect    |
| `disconnect`     | Server           | -                                        | Auto-emitted on client disconnect |
| `getOnlineUsers` | Server → Clients | [userId, ...]                            | Broadcast all online users        |
| `sendMessage`    | Client → Server  | {recipientId, text, image}               | Send new message                  |
| `receiveMessage` | Server → Clients | {\_id, senderId, text, image, timestamp} | Deliver message to recipient      |

### Defense-in-Depth with Arcjet

**Rate Limiting:**

- 100 requests per minute per IP address
- Protects against brute force attacks on login
- Returns 429 Too Many Requests when limit exceeded

**Bot Detection:**

- Identifies and blocks automated traffic
- Protects signup endpoints from registration spam

**SQL Injection Shield:**

- Analyzes request patterns for injection attempts
- Blocks suspicious queries before MongoDB receives them

---

## Performance Optimizations

- Optimistic UI Updates
- Real-Time Message Delivery
- Multi-Device Session Handling
- Efficient Presence Tracking
- Async Email Delivery

## Future Improvements

- **Typing Indicators:** Show when other user is composing message
- **Message Read Receipts:** Indicate message delivery and read status
- **Message Search:** Full-text search across all messages
- **User Profiles:** Edit profile, change password, profile picture upload
- **Group Chats:** Multiple users in single conversation
- **Message Reactions:** Emoji reactions to messages
- **Message Deletion/Editing:** Edit or delete sent messages with history
- **Voice Messages:** Record and send audio messages
- **Video Calling:** Real-time video chat using WebRTC
- **End-to-End Encryption:** E2E encryption for privacy (Signal protocol)
- **Message Persistence:** Offline message queue with sync on reconnect
- **Dark Mode:** Theme switcher with dark mode support
- **Push Notifications:** Native notifications for mobile devices
- **Admin Dashboard:** User management and analytics
- **Database Indexing:** Optimize queries for faster message retrieval

---

## License

This project is licensed under the MIT License - see the LICENSE file for details.

---

## Author

**Ayush Thakali**

- GitHub: [@ayushthakali](https://github.com/ayushthakali)
- Portfolio: https://ayushthakali.com.np
- Email: thakaliaayush@gmail.com
