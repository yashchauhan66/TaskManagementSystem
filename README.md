# Task Management System

A full-stack task management application with user authentication and role-based access control.

##  Features

### Backend (Node.js + Express + MongoDB)
- **User Authentication**: Signup, Login with JWT tokens
- **Role-Based Access**: User and Admin roles
- **Task Management**: Create, Read, Update, Delete tasks
- **Security**: Password hashing, JWT authentication, CORS enabled
- **Database**: MongoDB with Mongoose ODM

### Frontend (React)
- **Modern UI**: Clean, responsive design with gradients
- **Authentication**: Login/Signup forms with role selection
- **Task Operations**: Create, view, and delete tasks
- **Component Architecture**: Modular components and pages
- **State Management**: React hooks for local state
- **Proxy Integration**: Seamless backend connection

##  Project Structure

```
fullBackendAssignment/
├── backend/
│   ├── config/
│   │   └── db.js              # Database connection
│   ├── controllers/
│   │   ├── userController.js  # User auth logic
│   │   └── taskController.js  # Task CRUD logic
│   ├── middleware/
│   │   ├── authMiddleware.js  # JWT authentication
│   │   └── roleMiddleware.js  # Role-based access
│   ├── models/
│   │   ├── UserModel.js       # User schema
│   │   └── TaskModel.js       # Task schema
│   ├── routes/
│   │   ├── userRoute.js       # User routes
│   │   └── taskRoute.js       # Task routes
│   ├── .env                   # Environment variables
│   ├── package.json           # Backend dependencies
│   └── server.js              # Express server
└── frontend/
    ├── src/
    │   ├── components/        # Reusable UI components
    │   │   ├── Auth.js
    │   │   ├── Header.js
    │   │   ├── TaskForm.js
    │   │   └── TaskList.js
    │   ├── pages/             # Complete page views
    │   │   ├── Dashboard.js
    │   │   └── LoginPage.js
    │   ├── styles/            # Component-specific CSS
    │   │   ├── Auth.css
    │   │   ├── Header.css
    │   │   ├── TaskForm.css
    │   │   ├── TaskList.css
    │   │   ├── Dashboard.css
    │   │   └── LoginPage.css
    │   ├── App.js              # Main application component
    │   ├── setupProxy.js       # Backend proxy configuration
    │   └── index.js            # React entry point
    └── package.json            # Frontend dependencies
```

## Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or cloud)
- npm or yarn

### Backend Setup

1. **Navigate to backend directory:**
   ```bash
   cd backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   Create a `.env` file with:
   ```
   MONGO_URL=your_mongodb_connection_string
   SECRET_KEY=your_jwt_secret_key
   ```

4. **Start the backend server:**
   ```bash
   npm start
   ```
   Backend will run on `http://localhost:5000`

### Frontend Setup

1. **Navigate to frontend directory:**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the frontend development server:**
   ```bash
   npm start
   ```
   Frontend will run on `http://localhost:3000`

##  API Endpoints

### Authentication
- `POST /api/v1/signup` - Create new user
- `POST /api/v1/login` - User login

### Tasks
- `POST /api/task/create` - Create new task
- `GET /api/task/get` - Get all user tasks
- `PUT /api/task/update/:id` - Update task
- `DELETE /api/task/delete/:id` - Delete task

##  Usage

1. **Start both servers** (backend on 5000, frontend on 3000)
2. **Open browser** to `http://localhost:3000`
3. **Sign up** for a new account (select User or Admin role)
4. **Login** with your credentials
5. **Create tasks** with title, description, and status
6. **Manage tasks** - view and delete your tasks
7. **Logout** when done

##  Security Features

- **JWT Authentication**: Secure token-based authentication
- **Password Hashing**: bcryptjs for secure password storage
- **Role-Based Access**: Different permissions for users and admins
- **CORS Enabled**: Cross-origin resource sharing configured
- **Environment Variables**: Sensitive data stored securely

##  Frontend Features

- **Responsive Design**: Works on desktop, tablet, and mobile
- **Modern UI**: Gradient backgrounds, smooth animations
- **Component Architecture**: Modular, reusable components
- **State Management**: Efficient React hooks usage
- **Error Handling**: User-friendly error messages
- **Auto-Login**: Persistent sessions with localStorage

##  Deployment Notes

### Backend Deployment
- Set production environment variables
- Use process manager like PM2
- Configure MongoDB connection for production
- Set up proper CORS for production domain

### Frontend Deployment
- Build the application: `npm run build`
- Deploy to static hosting (Vercel, Netlify, etc.)
- Ensure backend API is accessible from deployed frontend

##  Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

##  License

This project is for educational purposes. Feel free to use and modify as needed.

##  Troubleshooting

### Common Issues

1. **CORS Errors**: Ensure backend CORS is properly configured
2. **MongoDB Connection**: Check connection string in .env file
3. **JWT Token Issues**: Verify SECRET_KEY is set correctly
4. **Port Conflicts**: Change ports if 3000/5000 are occupied

### Development Tips

- Use browser DevTools for debugging API calls
- Check network tab for request/response details
- Verify MongoDB collections for data persistence
- Use console.log for debugging (remove in production)

---

