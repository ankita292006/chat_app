# 💬 Real-Time Chat Application

A full-stack real-time chat application built using:

- Node.js
- Express.js
- MongoDB
- Socket.io
- JWT Authentication
- Bcrypt Password Hashing
- live demo:
-  ==> Available at your primary URL https://chat-app-eb0w.onrender.com 

---

## 🚀 Features

✅ User Registration  
✅ Secure Login (JWT Authentication)  
✅ Password Hashing (bcrypt)  
✅ Real-time Messaging (Socket.io)  
✅ Private Messaging  
✅ Online Users List  
✅ MongoDB Database  
✅ Deployed on Render  

---

## 🛠 Tech Stack

- Backend: Node.js + Express
- Database: MongoDB Atlas
- Real-time: Socket.io
- Authentication: JWT
- Deployment: Render

---

## 📦 Installation (Local Setup)

1. Clone the repository

https://ankita292006.github.io/chat_app/
2. Install dependencies
  npm install

4. Create a `.env` file
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key

6. Run the server
http://localhost:5000

---

## 🌍 Deployment

This app is deployed on Render.

Environment variables used:

- `MONGO_URI`
- `JWT_SECRET`
- `PORT` (provided automatically by Render)

---

## 🔐 Authentication Flow

1. User registers → password hashed using bcrypt
2. User logs in → JWT token generated
3. Token used for secure authentication

---

## 📡 Real-Time Chat

Socket.io handles:

- User connections
- Online users list
- Public messages
- Private messages
- User join/leave notifications

---

## 👩‍💻 Author

Ankita Negalur

---

## ⭐ Future Improvements

- Frontend UI improvements
- Message history storage
- Group chat feature
- Profile pictures
- Typing indicator
- Deployment of frontend separately
# chat_app
