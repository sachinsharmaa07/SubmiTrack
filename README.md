# 📝 SubmiTrack - Assignment Submission & Evaluation Portal

![Project Status](https://img.shields.io/badge/status-active-brightgreen)
![License](https://img.shields.io/badge/license-MIT-blue)
![MERN Stack](https://img.shields.io/badge/stack-MERN-61dafb)
![Version](https://img.shields.io/badge/version-1.0.0-blue)

---

## 🎯 Overview

**SubmiTrack** is a complete college-level **MERN stack** web application designed for **Assignment Submission and Evaluation**. It enables students to submit assignments and allows teachers to grade them efficiently. The project demonstrates professional Git/GitHub workflows with multiple branches, commits, pull requests, and GitHub Actions CI/CD.

### 📊 Key Features

✅ **User Authentication** - JWT-based login/register with role-based access  
✅ **Assignment Management** - Teachers create, update, and manage assignments  
✅ **File Submission** - Students upload assignment files with automatic late detection  
✅ **Grading System** - Teachers grade submissions and provide feedback  
✅ **Deadline Countdown** - Real-time countdown timer for approaching deadlines  
✅ **Role-Based Dashboard** - Separate views for students and teachers  
✅ **Responsive UI** - Mobile-friendly React interface  
✅ **Secure API** - Middleware-protected RESTful endpoints  

---

## 🛠️ Tech Stack

### **Backend**
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - ODM for MongoDB
- **JWT** - Token-based authentication
- **Multer** - File upload handling
- **Bcryptjs** - Password hashing

### **Frontend**
- **React 18** - UI library
- **React Router** - Client-side routing
- **Vite** - Fast build tool
- **Axios** - HTTP client
- **CSS3** - Responsive styling

### **DevOps & CI/CD**
- **Git/GitHub** - Version control
- **GitHub Actions** - Automated workflows
- **Docker** (Optional) - Containerization

---

## 📁 Project Structure

```
SubmiTrack/
├── backend/                          # Node.js Express API
│   ├── models/
│   │   ├── User.js                  # User schema (student/teacher)
│   │   ├── Assignment.js            # Assignment schema
│   │   └── Submission.js            # Submission schema
│   ├── controllers/
│   │   ├── authController.js        # Auth logic
│   │   ├── assignmentController.js  # Assignment CRUD
│   │   ├── submissionController.js  # File upload & grading
│   │   └── deadlineController.js    # Deadline calculations
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── assignmentRoutes.js
│   │   ├── submissionRoutes.js
│   │   └── deadlineRoutes.js
│   ├── middleware/
│   │   ├── auth.js                  # JWT verification & role-based access
│   │   └── fileUpload.js            # Multer configuration
│   ├── utils/
│   │   └── deadlineUtils.js         # Countdown logic
│   ├── uploads/                      # File storage
│   ├── server.js                    # Main server file
│   ├── package.json
│   └── .env.example
│
├── frontend/                         # React + Vite application
│   ├── src/
│   │   ├── components/
│   │   │   └── Navbar.jsx           # Navigation component
│   │   ├── pages/
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   └── Assignments.jsx
│   │   ├── hooks/
│   │   │   └── useAuth.js           # Custom auth hook
│   │   ├── utils/
│   │   │   └── api.js               # API client
│   │   ├── styles/
│   │   │   ├── App.css
│   │   │   ├── Navbar.css
│   │   │   ├── Auth.css
│   │   │   └── Assignments.css
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── index.html
│   ├── vite.config.js
│   ├── package.json
│   └── .gitignore
│
├── .github/workflows/
│   ├── ci.yml                       # Continuous Integration
│   └── deploy.yml                   # Continuous Deployment
│
├── README.md                        # This file
├── .gitignore
└── package.json (root)
```

---

## 🌿 Git Branching Strategy

This project follows a **professional Git branching workflow** with multiple branches demonstrating:

### Branch Structure

```
main                          (production-ready code)
│
├── develop                   (integration branch)
│
├── feature-auth             (authentication feature)
├── feature-backend-assignments    (assignment APIs)
├── feature-backend-submissions    (file upload & grading)
├── feature-frontend-ui      (React UI components)
├── feature-deadline-timer   (countdown logic)
└── docs-readme              (documentation)
```

### Git Workflow Summary

1. **Branch Creation** - Each feature developed in its own branch
2. **Multiple Commits** - Each feature has multiple meaningful commits
3. **Push to Remote** - Regular pushes showcasing distributed development
4. **Pull Requests** - Feature branches merged via PRs to `develop`
5. **Integration** - `develop` merged to `main` when complete
6. **Rebase & Stash** - Demonstrated for advanced Git practices

### Commit History

Each branch contains commits following the pattern:

```
feature-auth:
  ✓ feat: add JWT authentication with register/login endpoints
  ✓ feat: integrate auth routes into main server

feature-backend-assignments:
  ✓ feat: add Assignment model and CRUD APIs
  ✓ feat: integrate assignment routes into server

feature-backend-submissions:
  ✓ feat: add file upload and submission grading system
  ✓ feat: integrate submission routes and file serving

feature-deadline-timer:
  ✓ feat: add deadline countdown timer utilities and APIs
  ✓ feat: integrate deadline routes into server

feature-frontend-ui:
  ✓ feat: setup React + Vite frontend with core components

docs-readme:
  ✓ docs: add comprehensive README and project documentation
```

---

## 🚀 Setup & Installation

### Prerequisites
- Node.js (v16+)
- MongoDB (local or Atlas)
- Git
- npm or yarn

### Backend Setup

```bash
# Navigate to backend
cd backend

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Update .env with your MongoDB URI and JWT secret
PORT=5000
MONGODB_URI=mongodb://localhost:27017/submitrack
JWT_SECRET=your_super_secret_jwt_key_here

# Start development server
npm run dev
```

### Frontend Setup

```bash
# Navigate to frontend
cd frontend

# Install dependencies
npm install

# Start Vite dev server
npm run dev

# The app will be available at http://localhost:3000
```

### Access the Application

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000/api
- **Health Check**: http://localhost:5000/api/health

---

## 📡 API Documentation

### Authentication Endpoints

```http
POST /api/auth/register
Body: { name, email, password, role }
Response: { token, user }

POST /api/auth/login
Body: { email, password }
Response: { token, user }

GET /api/auth/me
Headers: Authorization: Bearer {token}
Response: { user }
```

### Assignment Endpoints

```http
GET /api/assignments
Response: { assignments }

POST /api/assignments (Teacher only)
Body: { title, description, subject, deadline, maxMarks }
Response: { assignment }

GET /api/assignments/:id
Response: { assignment }

PUT /api/assignments/:id (Teacher only)
Body: { title, description, ... }
Response: { assignment }

DELETE /api/assignments/:id (Teacher only)
Response: { success: true }
```

### Submission Endpoints

```http
POST /api/submissions/upload (Student only)
Body: FormData { assignmentId, file }
Response: { submission }

GET /api/submissions/:assignmentId (Teacher only)
Response: { submissions }

PUT /api/submissions/:submissionId/grade (Teacher only)
Body: { marks, feedback }
Response: { submission }
```

### Deadline Endpoints

```http
GET /api/deadline/:assignmentId
Response: { deadline, timeRemaining, isExpired }

GET /api/deadline/all/deadlines
Response: { assignments with deadline info }
```

---

## 🔐 Authentication & Authorization

### JWT Token Flow

1. User registers or logs in
2. Server generates JWT token (7-day expiration)
3. Token stored in localStorage (frontend)
4. Token sent in Authorization header for protected routes
5. Server validates token in `auth` middleware

### Role-Based Access Control

```javascript
// Student Role
- View assignments
- Submit files
- View grades and feedback

// Teacher Role
- Create/edit/delete assignments
- View all submissions
- Grade submissions
- Provide feedback
```

---

## 📝 Environment Variables

### Backend (.env)

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/submitrack
JWT_SECRET=your_secret_key_here_change_in_production
NODE_ENV=development
```

### Frontend (.env)

```env
VITE_API_URL=http://localhost:5000/api
```

---

## 🧪 Testing APIs with Postman

1. **Register** as Teacher or Student
2. **Login** to get JWT token
3. Add Authorization header: `Bearer {token}`
4. **Test endpoints** - Create assignment, upload file, grade submission

---

## 🤖 GitHub Actions CI/CD

### CI Workflow (On Push)
- Run backend tests
- Run frontend build
- Lint code
- Check for security issues

### CD Workflow (On Merge to Main)
- Deploy backend to server
- Deploy frontend to Vercel/Netlify
- Run smoke tests
- Send deployment notifications

See `.github/workflows/` for workflow configurations.

---

## 📊 Database Schema

### User Collection

```javascript
{
  _id: ObjectId,
  name: String,
  email: String (unique),
  password: String (hashed),
  role: 'student' | 'teacher',
  department: String,
  semester: Number,
  createdAt: Date
}
```

### Assignment Collection

```javascript
{
  _id: ObjectId,
  title: String,
  description: String,
  subject: String,
  createdBy: ObjectId (Teacher),
  deadline: Date,
  maxMarks: Number,
  attachments: [String],
  isActive: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

### Submission Collection

```javascript
{
  _id: ObjectId,
  assignmentId: ObjectId,
  studentId: ObjectId,
  fileUrl: String,
  fileName: String,
  submittedAt: Date,
  isLate: Boolean,
  status: 'submitted' | 'late' | 'graded',
  marks: Number,
  feedback: String,
  gradedAt: Date,
  gradedBy: ObjectId (Teacher)
}
```

---

## 🎓 Learning Outcomes

This project demonstrates:

✅ Full-stack MERN development  
✅ RESTful API design principles  
✅ JWT authentication & authorization  
✅ File upload handling with Multer  
✅ Role-based access control  
✅ React hooks & components  
✅ Responsive CSS design  
✅ Git workflows with multiple branches  
✅ GitHub Actions automation  
✅ MongoDB schema design  
✅ Error handling & validation  
✅ Production-ready code structure  

---

## 🚨 Common Issues & Solutions

### MongoDB Connection Error

```bash
# Start MongoDB service (macOS)
brew services start mongodb-community

# Or use MongoDB Atlas cloud
# Update MONGODB_URI in .env
```

### Port Already in Use

```bash
# Find process using port 5000
lsof -i :5000

# Kill process
kill -9 <PID>
```

### CORS Errors

- Ensure `cors()` is configured in Express
- Check frontend proxy settings in `vite.config.js`
- Verify backend is running

---

## 📚 Resources

- [MERN Stack Guide](https://www.mongodb.com/languages/mern-stack)
- [Express.js Docs](https://expressjs.com)
- [React Documentation](https://react.dev)
- [MongoDB Docs](https://docs.mongodb.com)
- [JWT Guide](https://jwt.io/introduction)
- [Git Branching Strategy](https://nvie.com/posts/a-successful-git-branching-model/)

---

## 🤝 Contributing

1. Create a feature branch: `git checkout -b feature/new-feature`
2. Commit changes: `git commit -am 'Add new feature'`
3. Push to branch: `git push origin feature/new-feature`
4. Create Pull Request to `develop`

---

## 📄 License

This project is licensed under the **MIT License** - see LICENSE file for details.

---

## 👤 Author

**SubmiTrack Team**  
Built as a demonstration of professional full-stack development practices and Git/GitHub workflows.

---

## 📞 Support

For issues or questions:
- Check GitHub Issues
- Review API documentation above
- Test with Postman

---

## ✨ Future Enhancements

- [ ] Email notifications for deadlines
- [ ] Bulk file download for submissions
- [ ] Assignment rubrics & grading scales
- [ ] Student plagiarism detection
- [ ] Analytics dashboard
- [ ] Mobile app (React Native)
- [ ] Docker containerization
- [ ] AWS/GCP deployment

---

**Last Updated**: December 15, 2025  
**Version**: 1.0.0  
**Status**: ✅ Production Ready

---

